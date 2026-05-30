import { useState } from "react";
import { motion } from "framer-motion";

export default function InterestForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    focus: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!form.name.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!form.email.trim()) {
      alert("Please enter your email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!form.focus.trim()) {
      alert("Please describe your professional focus or career challenges");
      return;
    }

    onSubmit(form);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

        .interest-root {
          background: var(--theme-bg-alt);
          color: var(--theme-text);
          padding: clamp(56px, 8vw, 84px) 20px;
          font-family: 'DM Sans', sans-serif;
        }

        .interest-wrap {
          max-width: 700px;
          width: min(100%, 700px);
          margin: 0 auto;
          background: var(--theme-card);
          border: 1px solid var(--theme-border);
          border-radius: 8px;
          padding: clamp(24px, 4vw, 36px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          animation: interest-rise 0.8s ease both;
          transform-origin: center top;
        }

        @keyframes interest-rise {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.985);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .interest-eyebrow {
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--theme-accent);
          margin-bottom: 10px;
        }

        .interest-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(36px, 6vw, 56px);
          margin: 0 0 12px;
          line-height: 1;
        }

        .interest-sub {
          font-size: 14px;
          color: var(--theme-text-muted);
          margin: 0 0 28px;
          line-height: 1.7;
        }

        .interest-field {
          width: 100%;
          background: transparent;
          border: 1px solid var(--theme-border);
          color: var(--theme-text);
          padding: 14px 16px;
          font-size: 14px;
          border-radius: 4px;
          margin-bottom: 14px;
          font-family: 'DM Sans', sans-serif;
          box-sizing: border-box;
          transition: border-color 0.2s;
          resize: vertical;
        }

        .interest-field:focus {
          outline: none;
          border-color: var(--theme-accent);
        }

        .interest-field::placeholder {
          color: var(--theme-text-faint);
        }

        .interest-actions {
          margin-top: 12px;
        }

        .interest-btn {
          background: var(--theme-accent);
          color: #fff;
          border: none;
          padding: 14px 26px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .interest-btn:hover:not(:disabled) {
          background: #e03000;
          transform: translateY(-1px);
        }

        .interest-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .interest-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .interest-note {
          margin-top: 16px;
          font-size: 12px;
          color: var(--theme-text-faint);
          line-height: 1.6;
        }

        @media (max-width: 640px) {
          .interest-wrap {
            padding: 22px;
            border-radius: 12px;
          }

          .interest-root {
            padding-left: 16px;
            padding-right: 16px;
          }

          .interest-btn {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .interest-title {
            font-size: clamp(30px, 10vw, 40px);
          }

          .interest-sub {
            font-size: 13px;
          }

          .interest-field {
            padding: 12px 14px;
            font-size: 13px;
          }

          .interest-btn {
            padding: 12px 20px;
          }
        }
      `}</style>

      <section
        className="interest-root reveal reveal-delay-2"
        id="interest-form"
      >
        <motion.div
          className="interest-wrap"
          initial={{ opacity: 0, y: 24, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <h2 className="interest-title">Find Your Perfect Session</h2>

          <input
            className="interest-field"
            name="name"
            value={form.name}
            placeholder="Full Name"
            onChange={handleChange}
          />

          <input
            className="interest-field"
            name="email"
            type="email"
            value={form.email}
            placeholder="Corporate Email Address"
            onChange={handleChange}
          />

          <textarea
            className="interest-field"
            name="focus"
            rows={5}
            value={form.focus}
            placeholder="Tell us, your professional focus,current challenges, or areas of interest"
            onChange={handleChange}
          />

          <div className="interest-actions">
            <button
              className="interest-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading
                ? "Matching Session..."
                : "Get Personalized Invitation →"}
            </button>
          </div>
        </motion.div>
      </section>
    </>
  );
}
