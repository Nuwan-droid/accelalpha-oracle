import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowUp } from "lucide-react";

import HeroSection from "./components/HeroSection";
import SpeakersSection from "./components/SpeakersSection";
import AgendaSection from "./components/AgendaSection";
import InterestForm from "./components/InterestForm";
import ResultView from "./components/ResultView";

const API_URL = "https://accelalpha-oracle.onrender.com/match";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;

    return () => {
      root.style.colorScheme = "";
    };
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 320);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme((current) =>
      current === "dark" ? "light" : "dark"
    );
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setResult(null);

      const response = await axios.post(
        API_URL,
        formData
      );

      setResult(response.data);

      setTimeout(() => {
        document
          .getElementById("result")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 200);
    } catch (err) {
      console.error(err);

      const errorMessage =
        err?.response?.data?.detail ||
        err?.message ||
        "Failed to generate invitation.";

      setResult({
        error: errorMessage,
      });

      setTimeout(() => {
        document
          .getElementById("result")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 200);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <HeroSection
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <SpeakersSection />

      <AgendaSection />

      <InterestForm
        onSubmit={handleSubmit}
        loading={loading}
      />

      <ResultView data={result} />

      {showTopButton && (
        <button
          type="button"
          className="scroll-top-btn"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          aria-label="Jump to top"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}