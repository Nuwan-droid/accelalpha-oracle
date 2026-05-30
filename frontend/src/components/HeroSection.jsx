import { useEffect, useMemo, useState } from "react";
import { ChevronsRight } from "lucide-react";
import accelalphaLogo from "../assets/logo.png";
import oraclePartnerLogo from "../assets/oracle-partner.png";
import shipSlideOne from "../assets/oracle-ship-1.jpg";
import shipSlideTwo from "../assets/oracle-ship-2.jpg";

const TARGET_DATE = new Date("2026-11-13T09:30:00");

function useCountdown(target) {
  const [timeLeft, setTimeLeft] = useState({});
  useEffect(() => {
    const calc = () => {
      const diff = target - new Date();
      if (diff <= 0)
        return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);
  return timeLeft;
}

export default function HeroSection({ theme, onToggleTheme }) {
  const {
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
  } = useCountdown(TARGET_DATE);
  const [mounted, setMounted] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => {
    setTimeout(() => setMounted(true), 50);
  }, []);

  const slides = useMemo(
    () => [
      {
        src: shipSlideOne,
        title: "Global Visibility",
        description:
          "Real-time insights across ocean freight, ports, and inland routing.",
      },
      {
        src: shipSlideTwo,
        title: "Predictive Control",
        description:
          "AI-assisted decisions for resilient supply chain execution.",
      },
    ],
    [],
  );

  useEffect(() => {
    const id = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5200);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <>
      <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&family=Roboto:wght@300;400;700;900&display=swap');

  .hero-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--theme-bg);
    color: var(--theme-text);
    min-height: 100svh;
    overflow: hidden;
    position: relative;
  }

  .hero-root::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(var(--theme-grid) 1px, transparent 1px),
      linear-gradient(90deg, var(--theme-grid) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 100%, black 30%, transparent 70%);
    pointer-events: none;
  }

  .hero-root::after {
    content: '';
    position: absolute;
    bottom: -80px;
    left: 50%;
    transform: translateX(-50%);
    width: 900px;
    height: 500px;
    background: radial-gradient(ellipse, var(--theme-glow) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 48px;
    border-bottom: 1px solid rgba(255,60,0,0.18);
    background: linear-gradient(
      90deg,
      rgba(12,16,26,0.75) 0%,
      rgba(12,16,26,0.35) 55%,
      rgba(12,16,26,0.15) 100%
    );
    backdrop-filter: blur(18px) saturate(140%);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 20;
  }

  .hero-nav::after {
    content: '';
    position: absolute;
    left: 48px;
    right: 48px;
    bottom: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      rgba(255,60,0,0.7),
      rgba(255,120,60,0.35),
      transparent 75%
    );
    opacity: 0.8;
    pointer-events: none;
  }

  .hero-nav-logo {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .hero-nav-logo img {
    height: 42px;
    width: auto;
    display: block;
    object-fit: contain;
  }

  .hero-nav-actions {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .partner-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    filter: grayscale(0.2);
    opacity: 0.95;
  }

  .partner-logo img {
    height: 42px;
    width: auto;
    display: block;
    object-fit: contain;
  }

  .theme-toggle {
    background: rgba(255,60,0,0.12);
    color: var(--theme-text);
    border: 1px solid rgba(255,60,0,0.35);
    padding: 8px 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border-radius: 999px;
    cursor: pointer;
    transition:
      border-color 0.2s,
      color 0.2s,
      transform 0.15s,
      background 0.2s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .theme-toggle:hover {
    border-color: rgba(255,120,60,0.55);
    background: rgba(255,60,0,0.2);
    transform: translateY(-1px);
  }

  .theme-toggle-icon {
    width: 16px;
    height: 16px;
    display: block;
  }

  .theme-toggle-label {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  .hero-tag {
    font-size: 32px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(218, 14, 14, 0.7);
    margin-bottom: 24px;
    animation: hero-fade-up 0.9s ease both;
    animation-delay: 0.1s;
  }

  @keyframes hero-fade-up {
    from {
      opacity: 0;
      transform: translateY(24px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes hero-float {
    0%,100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-6px);
    }
  }

  @keyframes hero-kenburns {
    from {
      transform: scale(1.02);
    }

    to {
      transform: scale(1.08);
    }
  }

  .hero-body {
    position: relative;
    z-index: 10;
    padding-top: 84px;
  }

  .hero-layout {
    position: relative;
    min-height: calc(100svh - 84px);
    height: auto;
    overflow: hidden;
    box-shadow: 0 30px 80px rgba(0,0,0,0.35);
  }

  .hero-layout::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(6,10,18,0.85) 0%,
      rgba(6,10,18,0.55) 40%,
      rgba(6,10,18,0.2) 70%,
      rgba(6,10,18,0.05) 100%
    );
    z-index: 0;
  }

  .hero-copy {
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 2;
    max-width: 520px;
    width: min(100%, 520px);
    margin: 72px 64px;
    padding: 28px 26px;
    animation: hero-fade-up 0.9s ease both;
  }

  .hero-headline {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(64px, 10vw, 128px);
    line-height: 0.92;
    margin: 0 0 8px;
    color: #f6f7fb;
    text-shadow: 0 10px 30px rgba(0,0,0,0.45);
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }

  .hero-headline.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .hero-headline .accent {
    color: var(--theme-accent);
    display: block;
  }

  .hero-sub {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(28px, 4vw, 52px);
    color: rgba(255,255,255,0.78);
    margin: 0 0 40px;
    opacity: 0;
    transform: translateY(20px);
    transition:
      opacity 0.8s ease 0.15s,
      transform 0.8s ease 0.15s;
  }

  .hero-sub.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .hero-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
    margin-bottom: 56px;
    opacity: 0;
    transition: opacity 0.8s ease 0.3s;
  }

  .hero-meta.visible {
    opacity: 1;
  }

  .hero-meta-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: rgba(255,255,255,0.72);
  }

  .hero-meta-icon {
    width: 32px;
    height: 32px;
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--theme-accent);
    background: rgba(0,0,0,0.35);
    flex-shrink: 0;
  }

  .hero-meta-icon svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
  }

  .hero-cta-row {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    opacity: 0;
    transform: translateY(16px);
    transition:
      opacity 0.8s ease 0.45s,
      transform 0.8s ease 0.45s;
  }

  .hero-cta-row.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .btn-primary {
    background: #ff3c00;
    color: #fff;
    border: none;
    padding: 14px 32px;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 3px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }

  .btn-secondary {
    background: transparent;
    color: var(--theme-text-muted);
    border: 1px solid var(--theme-border);
    padding: 14px 28px;
    font-size: 14px;
    border-radius: 3px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }

  .scroll-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    animation: scroll-bounce 1.6s ease-in-out infinite;
  }

  @keyframes scroll-bounce {
    0%, 100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(3px);
    }
  }

  .hero-countdown-wrap {
    background: #cf2a2a;
    border-top: 1px solid rgba(0,0,0,0.15);
    padding: clamp(18px, 3vw, 28px) clamp(20px, 5vw, 64px);
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5;
  }

  .hero-countdown-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: clamp(18px, 4vw, 48px);
    max-width: 1100px;
    margin: 0 auto;
  }

  .hero-countdown-label {
    text-align: left;
    font-size: clamp(20px, 2.2vw, 28px);
    line-height: 1.1;
    letter-spacing: 0.01em;
    text-transform: none;
    color: #fff;
    margin: 0;
    max-width: 280px;
  }

  .hero-countdown-divider {
    width: 1px;
    align-self: stretch;
    background: rgba(0,0,0,0.25);
  }

  .hero-countdown {
    display: flex;
    justify-content: flex-end;
    gap: clamp(16px, 4vw, 40px);
    flex-wrap: wrap;
  }

  .countdown-unit {
    text-align: center;
    min-width: 84px;
  }

  .countdown-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(40px, 6vw, 72px);
    color: #fff;
    line-height: 1;
    display: block;
    letter-spacing: 0.05em;
  }

  .countdown-lbl {
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.8);
    margin-top: 8px;
    display: block;
  }

  .hero-slider {
    position: absolute;
    inset: 0;
    overflow: hidden;
    z-index: 1;
    font-family: 'Roboto', sans-serif;
  }

  .hero-slider-controls {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 clamp(16px, 3vw, 32px);
    z-index: 3;
    pointer-events: none;
    animation: hero-fade-up 0.9s ease both;
    animation-delay: 0.4s;
  }

  .hero-slider-control {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.25);
    background: rgba(8,12,23,0.65);
    color: #fff;
    cursor: pointer;
    pointer-events: auto;
  }

  .hero-slider-control svg {
    width: 18px;
    height: 18px;
    stroke: currentColor;
  }

  .hero-slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    transform: scale(1.02);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }

  .hero-slide.active {
    opacity: 1;
    transform: scale(1);
    z-index: 1;
  }

  .hero-slide.active .hero-slide-image {
    animation: hero-kenburns 14s ease both;
  }

  .hero-slide-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: saturate(0.95) contrast(1.08);
  }

  .hero-slide-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(10,15,26,0.1) 0%,
      rgba(10,15,26,0.7) 80%
    );
    pointer-events: none;
  }

  .hero-wave {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      90deg,
      transparent,
      var(--theme-accent) 30%,
      var(--theme-accent-2) 70%,
      transparent
    );
    opacity: 0.6;
    animation: hero-float 6s ease-in-out infinite;
  }

  @media (max-width: 640px) {
    .hero-nav {
      padding: 14px 16px;
      gap: 10px;
      flex-direction: column;
      align-items: flex-start;
    }

    .hero-nav-actions {
      width: 100%;
      justify-content: space-between;
      gap: 12px;
    }

    .hero-nav-logo img,
    .partner-logo img {
      height: 32px;
    }

    .hero-copy {
      margin: 28px 16px 20px;
      max-width: none;
      padding: 0;
    }

    .hero-tag {
      font-size: 12px;
      letter-spacing: 0.14em;
      margin-bottom: 14px;
    }

    .hero-headline {
      font-size: clamp(46px, 18vw, 72px);
    }

    .hero-sub {
      font-size: clamp(22px, 10vw, 34px);
      margin-bottom: 28px;
    }

    .hero-meta {
      gap: 16px;
      margin-bottom: 32px;
      flex-direction: column;
    }

    .hero-meta-item {
      align-items: flex-start;
    }

    .hero-meta-item:last-child {
      display: none;
    }

    .hero-cta-row {
      gap: 12px;
    }

    .btn-primary,
    .btn-secondary {
      width: 100%;
      justify-content: center;
    }

    .hero-countdown-wrap {
      position: relative;
      padding: 20px 16px;
      margin-top: 16px;
    }

    .hero-countdown-inner {
      flex-direction: column;
      align-items: flex-start;
      gap: 14px;
    }

    .hero-countdown-divider {
      display: none;
    }

    .hero-countdown {
      justify-content: flex-start;
      gap: 16px;
      width: 100%;
    }

    .hero-slider-controls {
      display: none;
    }
  }

  @media (max-width: 960px) {
    .hero-layout {
      min-height: auto;
      height: auto;
    }

    .hero-copy {
      margin: 44px 24px 28px;
      max-width: none;
    }

    .hero-slider {
      position: relative;
      min-height: 66svh;
    }

    .hero-meta {
      gap: 20px;
    }

    .hero-meta-item {
      max-width: 100%;
    }

    .hero-countdown-wrap {
      position: relative;
      margin-top: 12px;
    }
  }
`}</style>

      <div className="hero-root reveal">
        {/* NAV */}
        <nav className="hero-nav">
          <div className="hero-nav-logo">
            <img src={accelalphaLogo} alt="Accelalpha" />
          </div>
          <div className="hero-nav-actions">
            <div className="partner-logo">
              <img src={oraclePartnerLogo} alt="Oracle Partner" />
            </div>
            <button className="theme-toggle" onClick={onToggleTheme}>
              <span className="theme-toggle-label">
                {theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"}
              </span>
              {theme === "dark" ? (
                <svg
                  className="theme-toggle-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
                </svg>
              ) : (
                <svg
                  className="theme-toggle-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* BODY */}
        <div className="hero-body">
          <div className="hero-layout">
            <div className="hero-copy">
              <div className="hero-tag">Exclusive Invitation</div>

              <h1 className={`hero-headline ${mounted ? "visible" : ""}`}>
                Troubled
                <span className="accent">Waters</span>
              </h1>

              <p className={`hero-sub ${mounted ? "visible" : ""}`}>
                Sailing with AI in Supply Chain
              </p>

              <div className={`hero-meta ${mounted ? "visible" : ""}`}>
                <div className="hero-meta-item">
                  <div className="hero-meta-icon" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="17" rx="2" />
                      <line x1="8" y1="2.5" x2="8" y2="6" />
                      <line x1="16" y1="2.5" x2="16" y2="6" />
                      <line x1="3" y1="9" x2="21" y2="9" />
                    </svg>
                  </div>
                  <span>13 November 2026 · 9:30 AM – 1:00 PM</span>
                </div>
                <div className="hero-meta-item">
                  <div className="hero-meta-icon" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 21s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                  </div>
                  <span>Marriott Resort, The Palm, Dubai</span>
                </div>
                <div className="hero-meta-item">
                  <div className="hero-meta-icon" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9.5 12.5l2 2a3 3 0 0 0 4.2 0l4.3-4.3" />
                      <path d="M14.5 11.5l-2-2a3 3 0 0 0-4.2 0L4 13.8" />
                      <path d="M4 8.8l4-4 4 4" />
                      <path d="M20 8.8l-4-4-2.5 2.5" />
                    </svg>
                  </div>
                  <span>Accelalpha × Oracle</span>
                </div>
              </div>

              <div className={`hero-cta-row ${mounted ? "visible" : ""}`}>
                <button
                  className="btn-primary"
                  onClick={() =>
                    document
                      .getElementById("interest-form")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Register Now
                  <span className="scroll-icon" aria-hidden="true">
                    <ChevronsRight size={16} />
                  </span>
                </button>
              </div>
            </div>

            <div className="hero-slider" aria-label="Event highlights">
              {slides.map((slide, index) => (
                <div
                  key={slide.title}
                  className={`hero-slide ${index === activeSlide ? "active" : ""}`}
                >
                  <img
                    className="hero-slide-image"
                    src={slide.src}
                    alt={slide.title}
                  />
                  <div className="hero-slide-overlay"></div>
                </div>
              ))}
            </div>
            <div className="hero-slider-controls" aria-hidden="true">
              <button
                className="hero-slider-control"
                type="button"
                aria-label="Previous slide"
                onClick={() =>
                  setActiveSlide(
                    (current) => (current - 1 + slides.length) % slides.length,
                  )
                }
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M19 12H5" />
                  <path d="M11 6l-6 6 6 6" />
                </svg>
              </button>
              <button
                className="hero-slider-control"
                type="button"
                aria-label="Next slide"
                onClick={() =>
                  setActiveSlide((current) => (current + 1) % slides.length)
                }
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>

            {/* COUNTDOWN */}
            <div className="hero-countdown-wrap">
              <div className="hero-countdown-inner">
                <p className="hero-countdown-label">
                  Count every
                  <br />
                  second until
                  <br />
                  the event
                </p>
                <div className="hero-countdown-divider" aria-hidden="true" />
                <div className="hero-countdown">
                  {[
                    { val: days, lbl: "Days" },
                    { val: hours, lbl: "Hours" },
                    { val: minutes, lbl: "Minutes" },
                    { val: seconds, lbl: "Seconds" },
                  ].map(({ val, lbl }) => (
                    <div className="countdown-unit" key={lbl}>
                      <span className="countdown-num">
                        {String(val).padStart(2, "0")}
                      </span>
                      <span className="countdown-lbl">{lbl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-wave" />
      </div>
    </>
  );
}
