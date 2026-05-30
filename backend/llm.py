import os
import requests
from dotenv import load_dotenv

load_dotenv()

def generate_invitation(
    name,
    email,
    focus,
    matched_session
):

    api_key = os.getenv(
        "OPENROUTER_API_KEY"
    )

    if not api_key:
        raise ValueError(
            "OPENROUTER_API_KEY not found in .env"
        )

    session_text = matched_session.get(
        "source_text",
        ""
    )

    prompt = f"""
You are generating a professional B2B conference invitation email.

STRICT RULES are :-
1. Use ONLY the session information provided below.
2. Do NOT invent speakers.
3. Do NOT invent times.
4. Do NOT invent topics.
5. Do NOT invent credentials.
6. Do NOT mention sessions not provided.
7. If information is missing, omit it.
8. Keep the email professional and concise.
9. Output only the email.

Visitor Name:
{name}

Visitor Email:
{email}

Professional Focus:
{focus}

MATCHED SESSION:

{session_text}

Generate:

Subject: <subject line>

Email Body:
<body>
"""

    try:

        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json"
            },
            json={
                "model": "google/gemma-4-26b-a4b-it:free",
                "messages": [
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            },
            timeout=60
        )

        response.raise_for_status()

        result = response.json()

        return (
            result["choices"][0]
            ["message"]["content"]
            .strip()
        )

    except Exception as e:

        print(
            f"OpenRouter Error: {e}"
        )

        return f"""
Subject: Recommended Session for You

Dear {name},

Based on your professional focus:

{focus}

We recommend attending:

{matched_session.get('title', '')}

Speaker: {matched_session.get('speaker', '')}

Time: {matched_session.get('time', '')}

{matched_session.get('description', '')}

We look forward to welcoming you.

Regards,
Accelalpha & Oracle
"""