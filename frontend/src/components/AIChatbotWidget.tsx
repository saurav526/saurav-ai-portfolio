import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Bot,
  MessageSquareCode,
  RotateCcw,
  Send,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import { PortfolioData } from '../types/portfolio';
import { generateLocalAssistantAnswer } from '../services/api';

interface AIChatbotWidgetProps {
  portfolio: PortfolioData;
  isOpen: boolean;
  onToggle: () => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  mode?: string;
  sources?: string[];
}

const INITIAL_SUGGESTIONS = [
  "Tell me about Saurav's 5 flagship AI projects",
  'Explain the Clinical Risk & Patient Outcome Intelligence System',
  "What are Saurav's Generative AI and Agentic AI skills?",
  "Tell me about Saurav's Data Science Internship",
  'How can I contact Saurav?',
];

export const AIChatbotWidget: React.FC<AIChatbotWidgetProps> = ({
  portfolio,
  isOpen,
  onToggle,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hi! I'm **Saurav AI**, the grounded portfolio assistant for **${portfolio.profile.name}**. Ask me anything about his **5 flagship AI & ML projects**, **technical skills**, **EduSkills (AICTE & Siemens) internship**, **B.Tech education**, or **contact details**!`,
      mode: 'verified_knowledge_engine',
      sources: ['Verified Resume', 'Portfolio Database'],
    },
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>(INITIAL_SUGGESTIONS);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isStreaming, isOpen]);

  const sendMessage = async (questionText?: string) => {
    const query = (questionText ?? input).trim();
    if (!query || isStreaming) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
    };

    const assistantMsgId = `assistant-${Date.now() + 1}`;
    setMessages((prev) => [
      ...prev,
      userMsg,
      {
        id: assistantMsgId,
        role: 'assistant',
        content: '',
        mode: 'streaming',
      },
    ]);
    setInput('');
    setIsStreaming(true);

    const historyPayload = messages.slice(-6).map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const resp = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          session_id: 'visitor-web-session',
          history: historyPayload,
        }),
      });

      if (resp.ok && resp.body) {
        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = '';
        let buffer = '';

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (!line.startsWith('data:')) continue;
            const rawJson = line.replace(/^data:\s*/, '').trim();
            if (!rawJson) continue;
            try {
              const event = JSON.parse(rawJson);
              if (event.type === 'token') {
                accumulated += event.content;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMsgId ? { ...m, content: accumulated } : m
                  )
                );
              } else if (event.type === 'done') {
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMsgId
                      ? {
                          ...m,
                          mode: event.mode,
                          sources: event.sources,
                        }
                      : m
                  )
                );
                if (
                  Array.isArray(event.suggested_followups) &&
                  event.suggested_followups.length > 0
                ) {
                  setSuggestions(event.suggested_followups);
                }
              }
            } catch {
              // ignore malformed SSE chunk
            }
          }
        }
        setIsStreaming(false);
        return;
      }
    } catch {
      // Fallback to local verified RAG with simulated streaming
    }

    const fallback = generateLocalAssistantAnswer(query, portfolio);
    const words = fallback.reply.split(' ');
    let currentText = '';

    for (let i = 0; i < words.length; i += 3) {
      currentText +=
        (i === 0 ? '' : ' ') + words.slice(i, i + 3).join(' ');
      const snapshot = currentText;
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsgId
            ? {
                ...m,
                content: snapshot,
                mode: fallback.mode,
                sources: fallback.sources,
              }
            : m
        )
      );
      await new Promise((r) => setTimeout(r, 18));
    }

    setSuggestions(fallback.suggested_followups);
    setIsStreaming(false);
  };

  const resetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content: `Conversation cleared. Ask me anything about **${portfolio.profile.name}'s** AI systems, technical skills, education, or internship!`,
        mode: 'verified_knowledge_engine',
        sources: ['Verified Resume'],
      },
    ]);
    setSuggestions(INITIAL_SUGGESTIONS);
  };

  // Format simple markdown bold & bullets cleanly
  const renderFormattedText = (text: string) => {
    return text.split('\n').map((line, i) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={i} className={line.trim() === '' ? 'h-2' : 'leading-relaxed'}>
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={j} className="font-semibold text-white">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <span key={j}>{part}</span>;
          })}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        type="button"
        onClick={onToggle}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle Saurav AI Assistant"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 text-white font-semibold text-xs shadow-[0_0_30px_rgba(139,92,246,0.55)] border border-white/20"
      >
        <div className="relative">
          <Bot className="w-5 h-5 text-cyan-200" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </div>
        <span className="hidden sm:inline">Ask Saurav AI</span>
      </motion.button>

      {/* Assistant Modal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.22 }}
            className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[430px] max-h-[78vh] flex flex-col rounded-2xl border border-violet-500/40 bg-[#070a15]/95 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3.5 border-b border-white/10 bg-gradient-to-r from-violet-950/60 via-slate-900/60 to-cyan-950/50 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-violet-600/25 border border-violet-400/40 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-cyan-300" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>Saurav AI</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      RAG Grounded
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Verified Portfolio Knowledge Assistant
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={resetChat}
                  title="Reset Conversation"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onToggle}
                  title="Close Assistant"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Container */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-3.5 max-h-[46vh]"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white'
                        : 'bg-white/[0.04] border border-white/10 text-slate-200'
                    }`}
                  >
                    {msg.content ? (
                      renderFormattedText(msg.content)
                    ) : (
                      <div className="flex items-center gap-1.5 py-1 text-cyan-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:150ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:300ms]" />
                        <span className="ml-1 font-mono text-[10px]">
                          Synthesizing verified portfolio data...
                        </span>
                      </div>
                    )}

                    {msg.role === 'assistant' &&
                      msg.sources &&
                      msg.sources.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-white/10 flex flex-wrap items-center gap-1">
                          <span className="text-[10px] font-mono text-slate-400">
                            Sources:
                          </span>
                          {msg.sources.map((src, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                            >
                              {src}
                            </span>
                          ))}
                        </div>
                      )}
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5 text-cyan-200" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Suggested Follow-up Chips */}
            <div className="px-4 py-2 border-t border-white/5 bg-black/30">
              <div className="text-[10px] font-mono text-slate-400 mb-1.5 flex items-center gap-1">
                <MessageSquareCode className="w-3 h-3 text-violet-400" />
                <span>SUGGESTED QUERIES:</span>
              </div>
              <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {suggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    type="button"
                    disabled={isStreaming}
                    onClick={() => sendMessage(sug)}
                    className="shrink-0 text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-violet-500/20 border border-white/10 hover:border-violet-400/40 text-slate-300 hover:text-white transition"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="p-3 border-t border-white/10 bg-[#05070f] flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Saurav's projects, skills, RAG, MCP..."
                className="flex-1 bg-white/[0.04] border border-white/10 focus:border-cyan-400/60 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || isStreaming}
                className="p-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 disabled:opacity-40 text-white transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
