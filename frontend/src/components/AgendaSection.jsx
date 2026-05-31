import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BadgeCheck,
  Mic2,
  Wrench,
  Brain,
  Coffee,
  MessageSquare,
  HelpCircle,
  UtensilsCrossed,
  HandshakeIcon,
  ChevronDown,
  Calendar,
  Loader2,
} from "lucide-react";
import "../styles/agendasection.css";

const API_BASE = import.meta.env.VITE_API_URL;
const SESSIONS_API = `${API_BASE}/sessions`;

const TAG_CONFIG = {
  "Check-in": {
    icon: BadgeCheck,
    color: "#7c6f9f",
    bg: "#ede9f8",
    text: "#4a3d72",
  },
  Opening: {
    icon: HandshakeIcon,
    color: "#2563c4",
    bg: "#deeaf9",
    text: "#1a3e80",
  },
  Keynote: { icon: Mic2, color: "#c2390c", bg: "#fce8e1", text: "#7d2007" },
  Workshop: { icon: Wrench, color: "#6d28d9", bg: "#ede9fb", text: "#4c1d95" },
  Innovation: { icon: Brain, color: "#0d7a5f", bg: "#d8f3ec", text: "#0a4f3e" },
  Break: { icon: Coffee, color: "#92400e", bg: "#fdf0e0", text: "#5c2a08" },
  "Case Study": {
    icon: Calendar,
    color: "#b45309",
    bg: "#fdf3dc",
    text: "#7c3a0a",
  },
  Panel: {
    icon: MessageSquare,
    color: "#1d63c4",
    bg: "#dde9fb",
    text: "#12367c",
  },
  Closing: {
    icon: HelpCircle,
    color: "#c2390c",
    bg: "#fce8e1",
    text: "#7d2007",
  },
  Networking: {
    icon: UtensilsCrossed,
    color: "#0d7a5f",
    bg: "#d8f3ec",
    text: "#0a4f3e",
  },
};

const DEFAULT_TAG = { color: "#6b7280", bg: "#f0eeea", text: "#374151" };

export default function AgendaSection() {
  const [sessions, setSessions] = useState([]);
  const [active, setActive] = useState("All");
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(SESSIONS_API);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        if (mounted) setSessions(Array.isArray(data) ? data : []);
      } catch (e) {
        if (mounted) setError(e.message || "Failed to fetch sessions");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const allTags = useMemo(() => {
    const tags = sessions.map((s) => s?.tag).filter(Boolean);
    return ["All", ...new Set(tags)];
  }, [sessions]);

  const filtered = useMemo(
    () =>
      active === "All" ? sessions : sessions.filter((s) => s.tag === active),
    [sessions, active],
  );

  const toggleExpand = (id) => setExpanded((p) => (p === id ? null : id));

  return (
    <section className="ag-root" id="agenda-section">
      {/* ── Header ── */}
      <div className="ag-header">
        <div>
          <h2 className="ag-title">
            Event <em>Agenda</em>
          </h2>
        </div>

        <div className="ag-controls">
          {!loading && allTags.length > 1 && (
            <div className="ag-tag-strip">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={`ag-tag-pill-filter ${active === tag ? "active" : ""}`}
                  onClick={() => setActive(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="ag-divider" />

      {/* ── Timeline ── */}
      <div className="ag-timeline">
        {error ? (
          <div className="ag-state">{error}</div>
        ) : loading ? (
          <div className="ag-state">
            <span className="ag-spin">
              <Loader2 size={18} />
            </span>
            Loading sessions…
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                className="ag-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                No sessions match your search.
              </motion.div>
            ) : (
              filtered.map((s, i) => {
                const isOpen = expanded === s.id;
                const cfg = TAG_CONFIG[s.tag] || DEFAULT_TAG;
                const Icon = cfg.icon || Calendar;

                return (
                  <motion.div
                    key={s.id}
                    className="ag-row"
                    style={{
                      "--dot-bg": cfg.bg,
                      "--dot-border": cfg.color,
                      "--dot-active": cfg.color,
                      "--card-accent": cfg.color,
                      "--icon-bg": cfg.bg,
                      "--icon-color": cfg.color,
                      "--tag-bg": cfg.bg,
                      "--tag-text": cfg.text,
                      "--tag-border": cfg.color + "55",
                    }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.22, delay: i * 0.035 }}
                  >
                    {/* Time */}
                    <div className="ag-time-col">
                      <p className="ag-time">{s.time || "TBA"}</p>
                      <div className="ag-time-dot" />
                    </div>

                    {/* Card */}
                    <div
                      className="ag-card"
                      onClick={() => toggleExpand(s.id)}
                      role="button"
                      aria-expanded={isOpen}
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && toggleExpand(s.id)}
                    >
                      <div className="ag-card-top">
                        <div className="ag-icon-box">
                          <Icon size={17} />
                        </div>
                        <div className="ag-card-info">
                          <p className="ag-session-title">
                            {s.title || "Untitled"}
                          </p>
                          <p className="ag-speaker-line">{s.speaker || "—"}</p>
                          {s.role && <p className="ag-role-line">{s.role}</p>}
                        </div>
                        <div className="ag-card-right">
                          <span className="ag-tag">{s.tag || "Session"}</span>
                          <motion.span
                            className="ag-chevron"
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown size={14} />
                          </motion.span>
                        </div>
                      </div>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.24, ease: "easeInOut" }}
                            style={{ overflow: "hidden" }}
                          >
                            <div className="ag-desc">
                              {s.description || "No description available."}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
