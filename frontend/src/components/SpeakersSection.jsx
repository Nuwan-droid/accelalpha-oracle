import speakerDavidMoono from "../assets/speakers/1.png";
import speakerJoeSpear from "../assets/speakers/2.png";
import speakerRamanKumar from "../assets/speakers/3.png";
import speakerRichardBuxton from "../assets/speakers/4.png";
import speakerTamerHamed from "../assets/speakers/5.png";
import speakerSrivatsavSarvepalli from "../assets/speakers/6.png";
import speakerUjjwalKumar from "../assets/speakers/7.png";
import speakerRohanChitnis from "../assets/speakers/8.png";

const SPEAKERS = [
  {
    name: "Dr Raman Kumar",
    role: "CEO",
    company: "Al-Futtaim Logistics",
    image: speakerRamanKumar,
    accent: "accent",
  },
  {
    name: "David Moono",
    role: "Global Logistics Manager",
    company: "Weatherford",
    image: speakerDavidMoono,
  },
  {
    name: "Tamer Hamed",
    role: "CIO",
    company: "Dubai Cable Company",
    image: speakerTamerHamed,
  },
  {
    name: "Richard Buxton",
    role: "VP EMEA",
    company: "Accelalpha",
    image: speakerRichardBuxton,
  },
  {
    name: "Joe Spear",
    role: "Partner",
    company: "Accelalpha",
    image: speakerJoeSpear,
  },
  {
    name: "Srivatsav Sarvepalli",
    role: "Regional Director Supply Chain Solutions, ECEMEA",
    company: "Oracle",
    image: speakerSrivatsavSarvepalli,
  },
  {
    name: "Rohan Chitnis",
    role: "Sales Director Applications",
    company: "Oracle",
    image: speakerRohanChitnis,
  },
  {
    name: "Ujjwal Kumar",
    role: "Principal Domain Lead, ECEMEA",
    company: "Oracle",
    image: speakerUjjwalKumar,
  },
];

export default function SpeakersSection() {
  return (
    <section className="speakers-root" id="speakers">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Playfair+Display:wght@600;700&display=swap');

        .speakers-root {
          background: var(--theme-bg);
          color: var(--theme-text);
          padding: clamp(56px, 7vw, 88px) clamp(20px, 4vw, 56px);
          position: relative;
          overflow: hidden;
          font-family: 'Montserrat', sans-serif;
        }

        .speakers-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 10% 10%, rgba(255, 255, 255, 0.8), transparent 50%),
            radial-gradient(circle at 90% 20%, rgba(255, 120, 90, 0.18), transparent 55%),
            radial-gradient(circle at 50% 90%, rgba(255, 200, 140, 0.2), transparent 60%);
          opacity: 0.55;
          pointer-events: none;
        }

        .speakers-header {
          text-align: center;
          position: relative;
          margin-bottom: clamp(36px, 4.5vw, 60px);
        }

        .speakers-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 0 0 10px;
          color: var(--text-h);
        }

        .speakers-title-rule {
          width: 48px;
          height: 2px;
          margin: 0 auto;
          background: linear-gradient(90deg, transparent, var(--theme-accent), transparent);
        }

        .speakers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: clamp(24px, 3vw, 40px);
          position: relative;
          z-index: 1;
        }

        .speaker-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
        }

        .speaker-avatar {
          width: clamp(140px, 18vw, 180px);
          aspect-ratio: 1 / 1;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.7);
          border: 10px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
          display: grid;
          place-items: center;
          position: relative;
          overflow: hidden;
        }

        .speaker-card.accent .speaker-avatar::before {
          content: '';
          position: absolute;
          inset: -6px;
          border-radius: 999px;
          border: 10px solid rgba(216, 30, 30, 0.9);
          border-bottom-color: transparent;
          border-left-color: transparent;
          transform: rotate(-35deg);
        }

        .speaker-image {
          width: 84%;
          height: 84%;
          border-radius: 999px;
          object-fit: cover;
          background: #fff;
        }

        .speaker-name {
          font-weight: 700;
          font-size: 18px;
          margin: 0;
          color: var(--text-h);
        }

        .speaker-role {
          margin: 0;
          font-size: 13px;
          color: var(--theme-text-muted);
        }

        .speaker-company {
          margin: 0;
          font-size: 14px;
          font-weight: 700;
          color: #d62020;
        }

        @media (max-width: 640px) {
          .speaker-avatar {
            border-width: 8px;
          }
        }
      `}</style>

      <div className="speakers-header">
        <h2 className="speakers-title">Our Speakers</h2>
        <div className="speakers-title-rule" />
      </div>

      <div className="speakers-grid">
        {SPEAKERS.map((speaker) => (
          <article
            key={speaker.name}
            className={`speaker-card ${speaker.accent ? "accent" : ""}`}
          >
            <div className="speaker-avatar">
              <img
                src={speaker.image}
                alt={speaker.name}
                className="speaker-image"
                loading="lazy"
              />
            </div>
            <h3 className="speaker-name">{speaker.name}</h3>
            <p className="speaker-role">{speaker.role}</p>
            <p className="speaker-company">{speaker.company}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
