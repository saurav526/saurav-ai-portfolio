import asyncio
import json
from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.models.models import ChatAuditLog
from app.schemas.schemas import ChatRequest, ChatResponse
from app.services.ai_assistant import generate_assistant_reply

router = APIRouter(prefix="/api/chat", tags=["Saurav AI Assistant"])


@router.post("", response_model=ChatResponse)
async def chat_with_saurav_ai(
    payload: ChatRequest,
    db: Session = Depends(get_db),
):
    history_dicts = [{"role": h.role, "content": h.content} for h in payload.history]
    reply, mode, sources, followups = await generate_assistant_reply(
        payload.message,
        history_dicts,
        db,
    )

    log_entry = ChatAuditLog(
        session_id=payload.session_id,
        user_message=payload.message,
        assistant_response=reply,
        mode=mode,
    )
    db.add(log_entry)
    db.commit()

    return ChatResponse(
        reply=reply,
        mode=mode,
        sources=sources,
        suggested_followups=followups,
    )


@router.post("/stream")
async def stream_chat_with_saurav_ai(
    payload: ChatRequest,
    db: Session = Depends(get_db),
):
    history_dicts = [{"role": h.role, "content": h.content} for h in payload.history]
    reply, mode, sources, followups = await generate_assistant_reply(
        payload.message,
        history_dicts,
        db,
    )

    log_entry = ChatAuditLog(
        session_id=payload.session_id,
        user_message=payload.message,
        assistant_response=reply,
        mode=mode,
    )
    db.add(log_entry)
    db.commit()

    async def event_generator():
        words = reply.split(" ")
        chunk_size = 3
        for i in range(0, len(words), chunk_size):
            piece = " ".join(words[i : i + chunk_size])
            if i + chunk_size < len(words):
                piece += " "
            yield f"data: {json.dumps({'type': 'token', 'content': piece})}\n\n"
            await asyncio.sleep(0.015)

        yield f"data: {json.dumps({'type': 'done', 'mode': mode, 'sources': sources, 'suggested_followups': followups})}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")
