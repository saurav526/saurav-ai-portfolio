from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.models.models import ContactSubmission
from app.schemas.schemas import ContactRequest, ContactResponse
from app.services.email_service import send_contact_email_or_fallback

router = APIRouter(prefix="/api/contact", tags=["Contact"])


@router.post("", response_model=ContactResponse)
def submit_contact_form(
    payload: ContactRequest,
    db: Session = Depends(get_db),
):
    # Honeypot spam protection
    if payload.honeypot and payload.honeypot.strip() != "":
        raise HTTPException(status_code=400, detail="Spam submission rejected.")

    delivery_mode, mailto_url = send_contact_email_or_fallback(
        name=payload.name.strip(),
        sender_email=payload.email,
        subject=payload.subject.strip(),
        message=payload.message.strip(),
    )

    submission = ContactSubmission(
        name=payload.name.strip(),
        email=payload.email,
        subject=payload.subject.strip(),
        message=payload.message.strip(),
        status="received",
        delivery_method=delivery_mode,
    )
    db.add(submission)
    db.commit()
    db.refresh(submission)

    if delivery_mode == "smtp_delivered":
        msg = "Thank you! Your message has been stored and delivered via email to Saurav Kumar."
    else:
        msg = (
            "Your message has been securely saved to the portfolio database! "
            "Because no external SMTP server is configured in this environment, a direct mailto fallback link is also provided."
        )

    return ContactResponse(
        success=True,
        message=msg,
        submission_id=submission.id,
        delivery_mode=delivery_mode,
        mailto_fallback_url=mailto_url,
    )

# Contact routes for handling contact form submissions, including spam protection via a honeypot field. The route processes the submission, attempts to send an email via SMTP or provides a mailto fallback, and stores the submission in the database. It returns a response indicating success, delivery mode, and any relevant messages or fallback URLs.