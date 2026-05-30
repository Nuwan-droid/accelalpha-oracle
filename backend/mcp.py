from datetime import datetime, timezone


def send_draft_via_mcp(email_address: str, email_body: str):
    timestamp = datetime.now(
        timezone.utc
    ).isoformat(timespec="seconds")

    log_text = (
        "========== MCP EMAIL DRAFT =========="
        f"\nRecipient: {email_address}"
        f"\nTimestamp (UTC): {timestamp}"
        "\n\nEmail Body:\n\n"
        f"{email_body}"
        "\n\n====================================="
    )

    print(f"\n{log_text}\n")

    return log_text