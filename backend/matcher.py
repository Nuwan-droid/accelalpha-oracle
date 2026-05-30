import math
import os
import re
from collections import Counter

Agenda_path = os.path.join(os.path.dirname(__file__), "Agenda.txt")

Stopwords = {
    "a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "has", "have",
    "in", "is", "it", "its", "of", "on", "or", "that", "the", "to", "was", "were",
    "with", "you", "your", "we", "our", "their", "they", "this", "these", "those",
}

def _extract_field(block: str, field: str) -> str:
    match = re.search(rf"^{re.escape(field)}:\s*(.+)$", block, re.MULTILINE)
    return match.group(1).strip() if match else ""


def _split_speaker(speaker_raw: str) -> tuple[str, str]:
    speaker_raw = speaker_raw.strip()
    if "(" in speaker_raw and speaker_raw.endswith(")"):
        name, role = speaker_raw.rsplit("(", 1)
        return name.strip(), role[:-1].strip()
    if " - " in speaker_raw:
        name, role = speaker_raw.split(" - ", 1)
        return name.strip(), role.strip()
    return speaker_raw, ""


def _parse_focus_keywords(raw_keywords: str) -> list[str]:
    return [keyword.strip() for keyword in raw_keywords.split(",") if keyword.strip()]


def _session_text(session: dict[str, object]) -> str:
    speaker_line = f"Speaker: {session.get('speaker', '')}"
    role = session.get("role", "")
    if role:
        speaker_line += f" ({role})"

    parts = [
        f"Time: {session.get('time', '')}",
        f"Title: {session.get('title', '')}",
        speaker_line,
    ]
    focus_keywords = session.get("focus_keywords", [])
    if focus_keywords:
        parts.append(f"Focus Keywords: {', '.join(focus_keywords)}")
    description = session.get("description", "")
    if description:
        parts.append(f"Description: {description}")
    return "\n".join(parts)


def load_agenda(filepath: str | None = None) -> list[dict[str, object]]:
    if filepath is None:
        filepath = Agenda_path

    if not os.path.exists(filepath):
        return []

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    blocks = re.findall(r"\[SESSION_\d+\](.*?)(?=\[SESSION_\d+\]|$)", content, re.DOTALL)
    sessions: list[dict[str, object]] = []

    for idx, block in enumerate(blocks, start=1):
        block = block.strip()
        if not block:
            continue

        time = _extract_field(block, "Time")
        title = _extract_field(block, "Title")
        speaker_raw = _extract_field(block, "Speaker")
        focus_keywords_raw = _extract_field(block, "Focus Keywords")
        description = _extract_field(block, "Description")
        speaker, role = _split_speaker(speaker_raw)

        session = {
            "id": idx,
            "time": time.replace(" - ", " – ") if time else "",
            "title": title,
            "speaker": speaker,
            "role": role,
            "focus_keywords": _parse_focus_keywords(focus_keywords_raw),
            "description": description,
        }
        session["source_text"] = _session_text(session)
        sessions.append(session)

    return sessions


def _tokenize(text: str) -> list[str]:
    tokens = re.findall(r"[a-zA-Z0-9']+", text.lower())
    return [token for token in tokens if token not in Stopwords and len(token) > 1]


def _build_idf(documents: list[list[str]]) -> dict[str, float]:
    doc_count = len(documents)
    df = Counter()
    for tokens in documents:
        df.update(set(tokens))
    return {term: math.log((doc_count + 1) / (freq + 1)) + 1.0 for term, freq in df.items()}


def _to_tfidf(tokens: list[str], idf: dict[str, float]) -> dict[str, float]:
    tf = Counter(tokens)
    if not tf:
        return {}
    max_tf = max(tf.values())
    return {term: (count / max_tf) * idf.get(term, 1.0) for term, count in tf.items()}


def _cosine_similarity(vec_a: dict[str, float], vec_b: dict[str, float]) -> float:
    if not vec_a or not vec_b:
        return 0.0
    common = set(vec_a) & set(vec_b)
    dot = sum(vec_a[token] * vec_b[token] for token in common)
    norm_a = math.sqrt(sum(value * value for value in vec_a.values()))
    norm_b = math.sqrt(sum(value * value for value in vec_b.values()))
    if norm_a == 0.0 or norm_b == 0.0:
        return 0.0
    return dot / (norm_a * norm_b)


def find_best_session(user_input: str, agenda_filepath: str | None = None) -> dict[str, object]:
    sessions = load_agenda(agenda_filepath)
    if not sessions:
        return {
            "id": 0,
            "time": "",
            "title": "",
            "speaker": "",
            "role": "",
            "focus_keywords": [],
            "description": "",
            "source_text": "",
            "score": 0.0,
        }

    session_tokens = []
    for session in sessions:
        combined_text = " ".join(
            [
                str(session.get("title", "")),
                str(session.get("speaker", "")),
                str(session.get("role", "")),
                " ".join(session.get("focus_keywords", [])),
                str(session.get("description", "")),
            ]
        )
        session_tokens.append(_tokenize(combined_text))

    idf = _build_idf(session_tokens)
    query_vec = _to_tfidf(_tokenize(user_input), idf)

    best_idx = 0
    best_score = -1.0
    for idx, tokens in enumerate(session_tokens):
        score = _cosine_similarity(query_vec, _to_tfidf(tokens, idf))
        if score > best_score:
            best_score = score
            best_idx = idx

    best_session = dict(sessions[best_idx])
    best_session["score"] = round(max(best_score, 0.0), 4)
    return best_session