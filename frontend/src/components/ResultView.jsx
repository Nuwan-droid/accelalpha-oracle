import { motion } from "framer-motion";

export default function ResultView({ data }) {
  if (!data) return null;

  const isError = Boolean(data?.error);

  const details = data?.matched_session_details || {};
  const mcpLog = data?.mcp_log || "";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

        .rv-root{
          background: radial-gradient(circle at 15% 0%, rgba(255, 80, 60, 0.08), transparent 45%),
            var(--theme-bg);
          color:var(--theme-text);
          padding: clamp(56px, 7vw, 80px) clamp(20px, 4vw, 48px);
          font-family:'DM Sans',sans-serif;
        }

        .rv-eyebrow{
          font-size:25px;
          text-transform:uppercase;
          letter-spacing:.16em;
          color:var(--theme-success);
          margin-bottom:25px;
        }

        .rv-title{
          font-family:'Bebas Neue',sans-serif;
          font-size:clamp(40px,6vw,68px);
          margin:0 0 40px;
          color:var(--text-h);
        }

        .rv-grid{
          display:grid;
          grid-template-columns:1fr 1.6fr;
          gap:28px;
          max-width:1100px;
          margin:0 auto;
        }

        .rv-card{
          background:var(--theme-card);
          border:1px solid var(--theme-border);
          border-radius:14px;
          box-shadow: 0 18px 42px rgba(15, 23, 42, 0.08);
          transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
        }

        .rv-card:hover{
          transform: translateY(-4px);
          border-color: rgba(255,60,0,0.35);
          box-shadow: 0 24px 60px rgba(15, 23, 42, 0.12);
        }

        .rv-session{
          padding:26px;
          border-top:4px solid var(--theme-accent);
          background: linear-gradient(160deg, rgba(255, 255, 255, 0.02), transparent 90%);
        }

        .rv-label{
          font-size:15px;
          letter-spacing:.18em;
          text-transform:uppercase;
          color:var(--theme-accent);
          margin-bottom:14px;
        }

        .rv-time{
          font-family:'Bebas Neue',sans-serif;
          font-size:30px;
          margin-bottom:10px;
          color:var(--text-h);
        }

        .rv-session-title{
          font-size:20px;
          font-weight:600;
          margin-bottom:12px;
          color:var(--text-h);
        }

        .rv-speaker{
          font-size:14px;
          margin-bottom:6px;
        }

        .rv-role{
          font-size:12px;
          color:var(--theme-text-muted);
          margin-bottom:16px;
        }

        .rv-description{
          font-size:15px;
          line-height:1.8;
          color:var(--theme-text-muted);
        }

        .rv-email-header{
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:12px;
          padding:18px 22px;
          border-bottom:1px solid var(--theme-border);
          background:-var(--theme-card); ;
        }

        .rv-email-title{
          text-align:center;
          width:100%;
        }

        .rv-log{
          margin: 18px 20px 22px;
          padding: 16px 18px;
          border-radius: 10px;
          background: rgba(10, 12, 18, 0.04);
          border: 1px solid var(--theme-border);
          font-family: sans-serif;
          font-size: 12px;
          line-height: 1.3;
          color: var(--theme-text);
          white-space: pre-wrap;
        }

        .rv-error{
          max-width:600px;
          padding:24px;
          border-left:4px solid var(--theme-accent);
          background:var(--theme-card);
          border-radius:10px;
        }

        .rv-btn{
          background:var(--theme-accent);
          color:#fff;
          border:none;
          padding:12px 24px;
          cursor:pointer;
          margin-top:16px;
          border-radius:6px;
        }
    
        @media(max-width:768px){
          .rv-root{
            padding:48px 20px;
          }

          .rv-grid{
            grid-template-columns:1fr;
          }

          .rv-email-header{
            flex-direction:column;
            align-items:flex-start;
          }

          .rv-email-title{
            text-align:left;
          }

        }

        @media (max-width: 520px) {
          .rv-root {
            padding: 40px 16px;
          }

          .rv-title {
            font-size: clamp(32px, 10vw, 44px);
            margin-bottom: 28px;
          }

          .rv-card {
            border-radius: 12px;
          }

          .rv-session {
            padding: 20px;
          }

          .rv-email-header {
            padding: 14px 18px;
          }

          .rv-log {
            margin: 14px 16px 18px;
            font-size: 11px;
          }
        }
      `}</style>

      <section
        id="result"
        className="rv-root reveal"
      >
        {isError ? (
          <div className="rv-error">
            <p className="rv-eyebrow">
              Request Failed
            </p>

            <h2 className="rv-title">
              Unable To Generate Match
            </h2>

            <p>{data.error}</p>

            <button
              className="rv-btn"
              onClick={() =>
                document
                  .getElementById(
                    "interest-form"
                  )
                  ?.scrollIntoView({
                    behavior: "smooth"
                  })
              }
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <p className="rv-eyebrow">
              Match Found
            </p>


            <div className="rv-grid">

              {/* Session Card */}

              <motion.div
                className="rv-card rv-session"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >

                <p className="rv-label">
                  Best Matching Session
                </p>

                <div className="rv-time">
                  {details.time || "TBA"}
                </div>

                <div className="rv-session-title">
                  {details.title}
                </div>

                <div className="rv-speaker">
                  {details.speaker}
                </div>

                {details.role && (
                  <div className="rv-role">
                    {details.role}
                  </div>
                )}

                <div className="rv-description">
                  {details.description}
                </div>

              </motion.div>

              {/* Email Card */}

              <motion.div
                className="rv-card"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
              >

                <div className="rv-email-header">

                  <div className="rv-email-title">

                    <div className="rv-label">
                      MCP EMAIL DRAFT
                    </div>

                  </div>

                </div>

                <div className="rv-log">
                  {mcpLog || "MCP EMAIL DRAFT not available."}
                </div>

              </motion.div>

            </div>
          </>
        )}
      </section>
    </>
  );
}