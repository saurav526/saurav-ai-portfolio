import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Layers, Sparkles } from 'lucide-react';
import { ArchitectureEdge, ArchitectureNode } from '../types/portfolio';

interface ArchitectureDiagramProps {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
  accentColor?: string;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({
  nodes,
  edges,
  accentColor = '#8b5cf6',
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    nodes[0]?.id || ''
  );

  const selectedNode =
    nodes.find((n) => n.id === selectedNodeId) || nodes[0] || null;

  const connectedEdges = edges.filter(
    (e) => e.source === selectedNodeId || e.target === selectedNodeId
  );

  return (
    <div className="rounded-2xl border border-white/10 bg-[#070a14]/90 p-5 md:p-6 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/15"
            style={{ backgroundColor: `${accentColor}22` }}
          >
            <Layers className="w-4 h-4 text-cyan-300" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide">
              Interactive 3D System Architecture Pipeline
            </h4>
            <p className="text-xs text-slate-400">
              Click any architectural node to inspect data flow & layer responsibilities
            </p>
          </div>
        </div>
        <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/30">
          {nodes.length} Active Modules
        </span>
      </div>

      {/* Node Grid with Animated Flow Connectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {nodes.map((node, index) => {
          const isSelected = node.id === selectedNodeId;
          const outgoingEdge = edges.find((e) => e.source === node.id);

          return (
            <motion.button
              key={node.id}
              type="button"
              whileHover={{ y: -4, scale: 1.015 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setSelectedNodeId(node.id)}
              className={`text-left relative rounded-xl p-4 border transition-all duration-200 ${
                isSelected
                  ? 'bg-gradient-to-br from-violet-600/25 via-indigo-900/25 to-cyan-500/15 border-cyan-400/60 shadow-[0_0_25px_rgba(6,182,212,0.18)]'
                  : 'bg-white/[0.025] border-white/10 hover:border-violet-400/40 hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-cyan-300 border border-white/10">
                  <Cpu className="w-3 h-3" />
                  0{index + 1} • {node.layer}
                </span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                )}
              </div>

              <div className="font-semibold text-sm text-white mb-1">
                {node.label}
              </div>
              {node.sublabel && (
                <div className="text-xs text-slate-400 leading-relaxed">
                  {node.sublabel}
                </div>
              )}

              {outgoingEdge && (
                <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-violet-300/90">
                  <ArrowRight className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span className="truncate">
                    {outgoingEdge.label || 'Data Stream'}
                  </span>
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Selected Node Telemetry Inspector */}
      {selectedNode && (
        <div className="mt-5 rounded-xl bg-black/50 border border-white/10 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ACTIVE MODULE INSPECTOR — [{selectedNode.layer.toUpperCase()}]</span>
            </div>
            <div className="text-sm font-semibold text-white">
              {selectedNode.label}{' '}
              <span className="text-slate-400 font-normal">
                — {selectedNode.sublabel}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {connectedEdges.map((edge, idx) => {
              const sourceLabel =
                nodes.find((n) => n.id === edge.source)?.label || edge.source;
              const targetLabel =
                nodes.find((n) => n.id === edge.target)?.label || edge.target;
              return (
                <div
                  key={idx}
                  className="text-[11px] font-mono px-2.5 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/25 text-slate-200 flex items-center gap-1.5"
                >
                  <span className="text-violet-300">{sourceLabel}</span>
                  <ArrowRight className="w-3 h-3 text-cyan-400" />
                  <span className="text-cyan-300">{targetLabel}</span>
                  {edge.label && (
                    <span className="text-slate-400">({edge.label})</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
