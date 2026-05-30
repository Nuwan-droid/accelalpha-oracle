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

const API_BASE = (import.meta.env.VITE_API_URL); 
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
    () => (active === "All" ? sessions : sessions.filter((s) => s.tag === active)),
    [sessions, active],
  );

  const toggleExpand = (id) => setExpanded((p) => (p === id ? null : id));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── Root ─────────────────────────────────────── */
        .ag-root {
          background: var(--theme-bg-alt);
          font-family: 'DM Sans', sans-serif;
          color: var(--theme-text);
          padding: clamp(56px, 7vw, 88px) clamp(20px, 4vw, 56px);
          position: relative;
        }

        /* Subtle dot pattern */
        .ag-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, var(--theme-grid) 1px, transparent 1px);
          background-size: 22px 22px;
          pointer-events: none;
        }

        /* ── Section label ───────────────────────────── */
        .ag-section-label {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-size: 10px;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: var(--theme-accent);
          font-weight: 600;
          margin-bottom: 16px;
        }
        .ag-label-rule {
          width: 32px;
          height: 1.5px;
          background: var(--theme-accent);
          border-radius: 2px;
        }

        /* ── Header ──────────────────────────────────── */
        .ag-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 28px;
          margin-bottom: 56px;
          position: relative;
        }
        .ag-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(44px, 6vw, 80px);
          font-weight: 700;
          line-height: .92;
          color: var(--text-h);
          margin: 0;
          letter-spacing: -.02em;
        }
        .ag-title em {
          font-style: italic;
          color: var(--theme-accent);
        }
        .ag-subtitle {
          font-size: 13px;
          color: var(--theme-text-muted);
          margin-top: 10px;
          font-weight: 400;
          max-width: 320px;
          line-height: 1.6;
        }

        /* ── Controls ────────────────────────────────── */
        .ag-controls {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
          width: min(100%, 640px);
        }
        /* Tag pills */
        .ag-tag-strip {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }
        .ag-tag-pill-filter {
          font-size: 11px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          padding: 5px 13px;
          border-radius: 100px;
          border: 1.5px solid var(--theme-border-mid);
          background: var(--theme-card-strong);
          color: var(--theme-text-muted);
          cursor: pointer;
          letter-spacing: .03em;
          transition: all .15s ease;
          white-space: nowrap;
        }
        .ag-tag-pill-filter:hover {
          border-color: var(--theme-accent);
          color: var(--theme-accent);
          background: rgba(194,57,12,0.08);
        }
        .ag-tag-pill-filter.active {
          background: var(--theme-accent);
          border-color: var(--theme-accent);
          color: #fff;
        }

        /* Divider */
        .ag-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(to right, var(--theme-border-mid), transparent);
          margin-bottom: 48px;
          position: relative;
        }

        /* ── Timeline ────────────────────────────────── */
        .ag-timeline {
          position: relative;
        }

        /* ── Row ─────────────────────────────────────── */
        .ag-row {
          display: grid;
          grid-template-columns: 96px 1fr;
          gap: 0 24px;
          align-items: start;
          margin-bottom: 4px;
          position: relative;
        }
        .ag-row + .ag-row {
          padding-top: 2px;
        }

        /* Time col */
        .ag-time-col {
          padding-top: 20px;
          text-align: right;
        }
        .ag-time {
          font-size: 11px;
          font-weight: 600;
          color: var(--theme-text-faint);
          letter-spacing: .06em;
          text-transform: uppercase;
          line-height: 1;
        }
        .ag-time-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--dot-bg, #d9d0c5);
          border: 2px solid var(--dot-border, #c5bbad);
          margin: 6px 0 0 auto;
          transition: transform .2s ease;
        }
        .ag-row:hover .ag-time-dot {
          transform: scale(1.5);
          background: var(--dot-active, #c2390c);
          border-color: var(--dot-active, #c2390c);
        }

        /* Connector line (between dots) */
        .ag-row:not(:last-child) .ag-time-col::after {
          content: '';
          display: block;
          width: 1px;
          background: linear-gradient(to bottom, var(--theme-border-mid), transparent);
          margin: 0 auto;
          min-height: 28px;
          height: calc(100% - 42px);
        }

        /* Card */
        .ag-card {
          background: var(--theme-card);
          border: 1.5px solid var(--theme-border-mid);
          border-radius: 12px;
          padding: 18px 22px;
          cursor: pointer;
          transition: border-color .18s ease, box-shadow .18s ease, transform .18s ease;
          margin-bottom: 10px;
          position: relative;
          overflow: hidden;
        }
        .ag-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: var(--card-accent, var(--theme-border-mid));
          border-radius: 3px 0 0 3px;
        }
        .ag-card:hover {
          border-color: var(--card-accent, var(--theme-border-mid));
          box-shadow: var(--shadow);
          transform: translateY(-1px);
        }

        .ag-card-top {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .ag-icon-box {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: var(--icon-bg, var(--theme-card-strong));
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--icon-color, var(--theme-text-muted));
          transition: transform .18s ease;
        }
        .ag-card:hover .ag-icon-box {
          transform: scale(1.06);
        }
        .ag-card-info {
          flex: 1;
          min-width: 0;
        }
        .ag-session-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-h);
          margin: 0 0 3px;
          line-height: 1.35;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ag-speaker-line {
          font-size: 12px;
          color: var(--theme-text-muted);
          margin: 0;
          line-height: 1.4;
        }
        .ag-role-line {
          font-size: 11px;
          color: var(--theme-text-faint);
          margin: 2px 0 0;
        }

        .ag-card-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .ag-tag {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .14em;
          text-transform: uppercase;
          padding: 3px 9px;
          border-radius: 100px;
          background: var(--tag-bg, var(--theme-card-strong));
          color: var(--tag-text, var(--theme-text-muted));
          border: 1px solid var(--tag-border, var(--theme-border-mid));
          white-space: nowrap;
        }
        .ag-chevron {
          color: var(--theme-text-faint);
          display: flex;
          flex-shrink: 0;
          transition: color .15s;
        }
        .ag-card:hover .ag-chevron { color: var(--theme-text-muted); }

        /* Expanded body */
        .ag-desc {
          font-size: 13px;
          color: var(--theme-text-muted);
          line-height: 1.75;
          padding: 14px 0 2px 54px;
          border-top: 1px solid var(--theme-border);
          margin-top: 14px;
        }

        /* States */
        .ag-state {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 40px 20px;
          border: 1.5px dashed var(--theme-border-mid);
          border-radius: 12px;
          font-size: 13px;
          color: var(--theme-text-muted);
          background: var(--theme-card);
        }
        .ag-spin { animation: spin 1s linear infinite; display: flex; }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Mobile */
        @media (max-width: 640px) {
          .ag-root { padding: 48px 16px; }
          .ag-row { grid-template-columns: 70px 1fr; gap: 0 14px; }
          .ag-controls { align-items: flex-start; width: 100%; }
          .ag-tag-strip {
            justify-content: flex-start;
            flex-wrap: nowrap;
            overflow-x: auto;
            padding-bottom: 4px;
            scrollbar-width: none;
          }
          .ag-tag-strip::-webkit-scrollbar {
            display: none;
          }
          .ag-tag-pill-filter {
            flex: 0 0 auto;
          }
          .ag-title { font-size: clamp(36px, 10vw, 52px); }
        }

        @media (max-width: 520px) {
          .ag-row {
            grid-template-columns: 1fr;
          }

          .ag-time-col {
            text-align: left;
            padding-top: 0;
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 8px;
          }

          .ag-row:not(:last-child) .ag-time-col::after {
            display: none;
          }

          .ag-time-dot {
            margin: 0;
          }

          .ag-card {
            padding: 16px 18px;
          }

          .ag-card-top {
            align-items: flex-start;
            gap: 10px;
          }

          .ag-card-right {
            flex-direction: column;
            align-items: flex-end;
            gap: 6px;
          }

          .ag-session-title {
            white-space: normal;
          }

          .ag-desc {
            padding: 12px 0 2px 0;
          }
        }

        @media (max-width: 360px) {
          .ag-tag {
            font-size: 8px;
            padding: 2px 7px;
          }
        }

        @media (max-width: 900px) {
          .ag-header {
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 32px;
          }

          .ag-controls {
            align-items: flex-start;
            width: 100%;
          }

          .ag-tag-strip {
            justify-content: flex-start;
          }
        }
      `}</style>
      <section className="ag-root" id="agenda-section">
        {/* ── Header ── */}
        <div className="ag-header">
          <div>
            <h2 className="ag-title">
              Event <em>Agenda</em>
            </h2>
          </div>

          <div className="ag-controls">
            {/* Tag filter pills */}
            {!loading && allTags.length > 1 && (
              <div className="ag-tag-strip">
                {allTags.map((tag) => {
                  return (
                    <button
                      key={tag}
                      type="button"
                      className={`ag-tag-pill-filter ${active === tag ? "active" : ""}`}
                      onClick={() => setActive(tag)}
                    >
                      {tag}
                    </button>
                  );
                })}
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
                        onKeyDown={(e) =>
                          e.key === "Enter" && toggleExpand(s.id)
                        }
                      >
                        <div className="ag-card-top">
                          <div className="ag-icon-box">
                            <Icon size={17} />
                          </div>
                          <div className="ag-card-info">
                            <p className="ag-session-title">
                              {s.title || "Untitled"}
                            </p>
                            <p className="ag-speaker-line">
                              {s.speaker || "—"}
                            </p>
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
    </>
  );
}
