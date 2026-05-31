import { useEffect, useMemo, useState } from "react";
import { ChevronsRight } from "lucide-react";
import accelalphaLogo from "../assets/logo.png";
import oraclePartnerLogo from "../assets/oracle-partner.png";
import shipSlideOne from "../assets/oracle-ship-1.jpg";
import shipSlideTwo from "../assets/oracle-ship-2.jpg";
import "../styles/herosection.css";

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
    <div className="hero-root reveal">
      {/* ── Nav ── */}
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

      {/* ── Body ── */}
      <div className="hero-body">
        <div className="hero-layout">
          {/* Copy */}
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

          {/* Slider */}
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
                <div className="hero-slide-overlay" />
              </div>
            ))}
          </div>

          {/* Slider Controls */}
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

          {/* Countdown */}
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
  );
}
