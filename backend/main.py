from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from matcher import find_best_session
from llm import generate_invitation
from mcp import send_draft_via_mcp

import os
import re

app = FastAPI(
    title="Conference Matcher API",
    description="RAG-powered session matching and invitation generation",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
async def root():
    return {
        "message": "Welcome to the Conference Matcher API!"
    }


AGENDA_PATH = os.path.join(
    os.path.dirname(__file__),
    "Agenda.txt"
)

TAG_STYLES = {
    "Check-in": {"color": "#888", "icon": "🪪"},
    "Opening": {"color": "#0078dc", "icon": "👋"},
    "Keynote": {"color": "#ff3c00", "icon": "🎤"},
    "Workshop": {"color": "#7c3aed", "icon": "🛠️"},
    "Panel": {"color": "#ffaf00", "icon": "💬"},
    "Closing": {"color": "#888", "icon": "🎉"},
    "Break": {"color": "#00a98f", "icon": "☕"},
    "Session": {"color": "#555", "icon": "📌"},
}


def extract_field(block, field):
    match = re.search(rf"{field}:\s*(.*)", block)
    return match.group(1).strip() if match else ""


def split_speaker_and_role(speaker_raw):
    if " - " in speaker_raw:
        speaker, role = speaker_raw.split(" - ", 1)
        return speaker.strip(), role.strip()

    if "(" in speaker_raw and speaker_raw.endswith(")"):
        speaker, role = speaker_raw.rsplit("(", 1)
        return speaker.strip(), role[:-1].strip()

    return speaker_raw.strip(), ""


def tag_for_title(title):
    title = title.lower()

    if "registration" in title:
        return "Check-in"

    if "welcome" in title:
        return "Opening"

    if "keynote" in title:
        return "Keynote"

    if "workshop" in title:
        return "Workshop"

    if "panel" in title:
        return "Panel"

    if "closing" in title:
        return "Closing"

    if "break" in title or "lunch" in title:
        return "Break"

    return "Session"


def load_sessions(filepath: str = AGENDA_PATH):

    if not os.path.exists(filepath):
        return []

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    blocks = re.findall(
        r"\[SESSION_\d+\](.*?)(?=\[SESSION_\d+\]|$)",
        content,
        re.DOTALL
    )

    sessions = []

    for idx, block in enumerate(blocks, start=1):

        block = block.strip()

        if not block:
            continue

        time = extract_field(block, "Time")
        title = extract_field(block, "Title")
        speaker_raw = extract_field(block, "Speaker")
        description = extract_field(block, "Description")

        speaker, role = split_speaker_and_role(
            speaker_raw
        )

        tag = tag_for_title(title)

        style = TAG_STYLES.get(
            tag,
            TAG_STYLES["Session"]
        )

        sessions.append({
            "id": idx,
            "time": time.replace(" - ", " – "),
            "title": title,
            "speaker": speaker,
            "role": role,
            "tag": tag,
            "color": style["color"],
            "icon": style["icon"],
            "description": description
        })

    return sessions


def format_session_for_display(session):

    if not session:
        return ""

    lines = [
        f"Time: {session.get('time', '')}",
        f"Title: {session.get('title', '')}",
        f"Speaker: {session.get('speaker', '')}"
    ]

    if session.get("role"):
        lines[-1] += f" ({session['role']})"

    if session.get("focus_keywords"):
        lines.append(
            "Focus Keywords: "
            + ", ".join(session["focus_keywords"])
        )

    if session.get("description"):
        lines.append(
            f"Description: {session['description']}"
        )


    return "\n".join(lines)


@app.get("/sessions")
async def get_sessions():
    return load_sessions()


class UserInput(BaseModel):
    name: str
    email: str
    focus: str


@app.post("/match")
async def match_session(data: UserInput):

    # RAG Retrieval
    matched_session = find_best_session(
        data.focus
    )

    matched_session_text = (
        format_session_for_display(
            matched_session
        )
    )

    # LLM Email Generation
    email_draft = generate_invitation(
        name=data.name,
        email=data.email,
        focus=data.focus,
        matched_session=matched_session
    )

    # MCP Simulation Trigger
    mcp_log = send_draft_via_mcp(
        email_address=data.email,
        email_body=email_draft
    )

    return {
        "success": True,
        "visitor": {
            "name": data.name,
            "email": data.email,
        },
        "matched_session": matched_session_text,
        "matched_session_details": matched_session,
        "email_draft": email_draft,
        "mcp_log": mcp_log
    }