import smtplib
from email.message import EmailMessage
from urllib.parse import quote
from app.core.config import settings


def send_contact_email_or_fallback(
    name: str,
    sender_email: str,
    subject: str,
    message: str,
) -> tuple[str, str]:
    """
    Sends an email via SMTP if SMTP_HOST, SMTP_USER, and SMTP_PASSWORD are configured.
    Otherwise returns a clean mailto fallback URL so the user's message is stored in DB
    and can also be launched in their mail client if desired.
    """
    receiver = settings.CONTACT_RECEIVER_EMAIL or "sauravtiwari2712005@gmail.com"
    body_text = (
        f"New Portfolio Contact Message\n"
        f"-----------------------------\n"
        f"From: {name} <{sender_email}>\n"
        f"Subject: {subject}\n\n"
        f"{message}\n"
    )
    encoded_subject = quote(f"[Portfolio] {subject}")
    encoded_body = quote(f"From: {name} ({sender_email})\n\n{message}")
    mailto_url = f"mailto:{receiver}?subject={encoded_subject}&body={encoded_body}"

    if settings.SMTP_HOST and settings.SMTP_USER and settings.SMTP_PASSWORD:
        try:
            msg = EmailMessage()
            msg["Subject"] = f"[Saurav Portfolio Contact] {subject}"
            msg["From"] = settings.SMTP_USER
            msg["To"] = receiver
            msg["Reply-To"] = sender_email
            msg.set_content(body_text)

            with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=10) as server:
                server.starttls()
                server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
                server.send_message(msg)
            return "smtp_delivered", mailto_url
        except Exception:
            return "database_saved_smtp_fallback", mailto_url

    return "database_saved_with_mailto_fallback", mailto_url
