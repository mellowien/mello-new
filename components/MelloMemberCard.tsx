"use client";

import { useState } from "react";

type MelloMemberCardProps = {
  name?: string;
  memberId?: string;
  season?: string;
};

function PremiumQrPlaceholder() {
  return (
    <div className="mello-card-qr-wrap" aria-hidden="true">
      <div className="mello-card-qr">
        <span className="mello-card-qr-finder mello-card-qr-finder--top-left" />
        <span className="mello-card-qr-finder mello-card-qr-finder--top-right" />
        <span className="mello-card-qr-finder mello-card-qr-finder--bottom-left" />

        <span className="mello-card-qr-dot q1" />
        <span className="mello-card-qr-dot q2" />
        <span className="mello-card-qr-dot q3" />
        <span className="mello-card-qr-dot q4" />
        <span className="mello-card-qr-dot q5" />
        <span className="mello-card-qr-dot q6" />
        <span className="mello-card-qr-dot q7" />
        <span className="mello-card-qr-dot q8" />
        <span className="mello-card-qr-dot q9" />
        <span className="mello-card-qr-dot q10" />
        <span className="mello-card-qr-dot q11" />
        <span className="mello-card-qr-dot q12" />
        <span className="mello-card-qr-dot q13" />
        <span className="mello-card-qr-dot q14" />
        <span className="mello-card-qr-dot q15" />
        <span className="mello-card-qr-dot q16" />
        <span className="mello-card-qr-dot q17" />
        <span className="mello-card-qr-dot q18" />
        <span className="mello-card-qr-dot q19" />
        <span className="mello-card-qr-dot q20" />
      </div>

      <span className="mello-card-qr-label">Member Verify</span>
    </div>
  );
}

export default function MelloMemberCard({
  name = "Daniel Rezai",
  memberId = "MELLO-0001",
  season = "2026 / 27",
}: MelloMemberCardProps) {
  const [showBack, setShowBack] = useState(false);

  const nameParts = name.trim().split(/\s+/);
  const firstName = nameParts.slice(0, -1).join(" ") || nameParts[0];
  const lastName =
    nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

  const toggleCard = () => {
    setShowBack((current) => !current);
  };

  return (
    <div className="mello-card-showcase">
      <div className="mello-card-scene">
        <button
          type="button"
          className="mello-card-toggle"
          onClick={toggleCard}
          aria-label={
            showBack
              ? "Vorderseite der Mello Member Card anzeigen"
              : "Rückseite der Mello Member Card anzeigen"
          }
        >
          <div
            className={`mello-card-stage ${
              showBack ? "mello-card-stage--back" : "mello-card-stage--front"
            }`}
          >
            {/* ── VORDERSEITE ── */}
            <div
              className={`mello-card-face mello-card-face--front ${
                showBack ? "mello-card-face--leaving" : "mello-card-face--active"
              }`}
              aria-hidden={showBack}
            >
              <div className="mello-card-grain" />
              <div className="mello-card-inner-border" />
              <div className="mello-card-front-rings" />

              <div className="mello-card-front-center">
                <div className="mello-card-logo-wrap">
                  <img
                    src="/mello-wien.png"
                    alt=""
                    className="mello-card-logo"
                  />
                </div>

                <div className="mello-card-club-name">FC Mello Wien</div>
              </div>

              <div className="mello-card-front-bottom">
                <div className="mello-card-member-label">Member Card</div>

                <div className="mello-card-founding-mark">
                  <span>Founding Member</span>
                  <strong>{season}</strong>
                </div>
              </div>
            </div>

            {/* ── RÜCKSEITE ── */}
            <div
              className={`mello-card-face mello-card-face--back ${
                showBack ? "mello-card-face--active" : "mello-card-face--entering"
              }`}
              aria-hidden={!showBack}
            >
              <div className="mello-card-grain" />
              <div className="mello-card-inner-border" />

              <div className="mello-card-back-header">
                <div className="mello-card-back-brand">FC Mello Wien</div>

                <div className="mello-card-back-season">{season}</div>
              </div>

              <div className="mello-card-back-content">
                <div className="mello-card-back-member">
                  <div className="mello-card-back-name">
                    <span>{firstName}</span>
                    {lastName && <strong>{lastName}</strong>}
                  </div>
                </div>

                <PremiumQrPlaceholder />
              </div>

              <div className="mello-card-back-footer">
                <div className="mello-card-back-member-id">
                  <span>Member ID</span>
                  <strong>{memberId}</strong>
                </div>

                <div className="mello-card-back-founding">
                  Founding Member
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>

      <button
        type="button"
        className="mello-card-flip-button"
        onClick={toggleCard}
      >
        {showBack ? "Vorderseite anzeigen" : "Rückseite ansehen"}
        <span aria-hidden="true">↻</span>
      </button>

      <style>{`
        .mello-card-showcase {
          width: min(100%, 34rem);
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.1rem;
        }

        .mello-card-scene {
          width: 100%;
          perspective: 1700px;
          -webkit-perspective: 1700px;
        }

        .mello-card-toggle {
          width: 100%;
          display: block;
          padding: 0;
          border: 0;
          background: transparent;
          cursor: pointer;
        }

        .mello-card-stage {
          position: relative;
          width: 100%;
          aspect-ratio: 1.586 / 1;
          filter: drop-shadow(0 1.7rem 2.3rem rgba(0, 0, 0, .58));
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
        }

        .mello-card-face {
          position: absolute;
          inset: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
          padding: clamp(1.2rem, 3vw, 2rem);
          border: 1px solid rgba(247, 247, 244, .17);
          border-radius: 1.2rem;
          background:
            radial-gradient(
              circle at 91% 9%,
              rgba(13, 148, 136, .105) 0%,
              transparent 27%
            ),
            radial-gradient(
              circle at 10% 96%,
              rgba(13, 148, 136, .055) 0%,
              transparent 31%
            ),
            linear-gradient(135deg, #030303 0%, #0b0c0c 48%, #050606 100%);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, .075),
            inset 0 -1px 0 rgba(0, 0, 0, .8),
            inset 0 0 0 1px rgba(0, 0, 0, .46);
          color: #f7f7f4;
          text-align: left;
          transform-origin: center center;
          will-change: transform, opacity;
          transition:
            transform .72s cubic-bezier(.22, 1, .36, 1),
            opacity .18s ease;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }

        .mello-card-face--front {
          align-items: center;
          text-align: center;
        }

        .mello-card-face--front.mello-card-face--active {
          opacity: 1;
          transform: rotateY(0deg) translateZ(0);
          pointer-events: auto;
        }

        .mello-card-face--front.mello-card-face--leaving {
          opacity: 0;
          transform: rotateY(-180deg) translateZ(1px);
          pointer-events: none;
        }

        .mello-card-face--back.mello-card-face--entering {
          opacity: 0;
          transform: rotateY(180deg) translateZ(1px);
          pointer-events: none;
        }

        .mello-card-face--back.mello-card-face--active {
          opacity: 1;
          transform: rotateY(0deg) translateZ(0);
          pointer-events: auto;
        }

        .mello-card-stage--front:hover .mello-card-face--front {
          transform: rotateY(-5deg) rotateX(1.5deg) translateY(-.3rem);
        }

        .mello-card-stage--back:hover .mello-card-face--back {
          transform: rotateY(5deg) rotateX(-1.5deg) translateY(-.3rem);
        }

        .mello-card-grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: .25;
          background-image:
            repeating-radial-gradient(
              circle at 0 0,
              rgba(255, 255, 255, .06) 0,
              rgba(255, 255, 255, .06) 1px,
              transparent 1px,
              transparent 4px
            );
          mix-blend-mode: soft-light;
        }

        .mello-card-inner-border {
          position: absolute;
          inset: .42rem;
          border: 1px solid rgba(247, 247, 244, .06);
          border-radius: .88rem;
          pointer-events: none;
        }

        /* ── VORDERSEITE ── */
        .mello-card-front-rings {
          position: absolute;
          width: 20rem;
          height: 20rem;
          right: -11.5rem;
          top: -12.6rem;
          border: 1px solid rgba(13, 148, 136, .105);
          border-radius: 50%;
          box-shadow:
            0 0 0 2.8rem rgba(13, 148, 136, .016),
            0 0 0 5.5rem rgba(13, 148, 136, .01);
          pointer-events: none;
        }

        .mello-card-front-center {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: auto 0;
        }

        .mello-card-logo-wrap {
          width: clamp(4.2rem, 10vw, 6.1rem);
          height: clamp(4.2rem, 10vw, 6.1rem);
          display: grid;
          place-items: center;
          overflow: hidden;
          border-radius: 50%;
          padding: .18rem;
          background: linear-gradient(
            145deg,
            rgba(94, 234, 212, .78),
            rgba(13, 148, 136, .16)
          );
          box-shadow:
            0 0 1.5rem rgba(13, 148, 136, .14),
            0 .65rem 1.55rem rgba(0, 0, 0, .5);
        }

        .mello-card-logo {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          border-radius: 50%;
          background: #080808;
        }

        .mello-card-club-name {
          margin-top: .95rem;
          color: rgba(247, 247, 244, .95);
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(.7rem, 1.65vw, 1rem);
          font-weight: 900;
          letter-spacing: .16em;
          line-height: 1;
          text-transform: uppercase;
        }

        .mello-card-front-bottom {
          position: relative;
          z-index: 1;
          width: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1rem;
          text-align: left;
        }

        .mello-card-member-label {
          color: rgba(247, 247, 244, .5);
          font-family: var(--font-body), Arial, sans-serif;
          font-size: clamp(.43rem, .95vw, .58rem);
          font-weight: 800;
          letter-spacing: .17em;
          text-transform: uppercase;
        }

        .mello-card-founding-mark {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: .22rem;
          color: #0d9488;
          font-family: var(--font-body), Arial, sans-serif;
          font-size: clamp(.42rem, .9vw, .56rem);
          font-weight: 800;
          letter-spacing: .14em;
          line-height: 1;
          text-align: right;
          text-transform: uppercase;
        }

        .mello-card-founding-mark strong {
          color: rgba(247, 247, 244, .76);
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(.58rem, 1.2vw, .72rem);
          font-weight: 800;
          letter-spacing: .08em;
        }

        /* ── RÜCKSEITE: MINIMAL PREMIUM ── */
        .mello-card-face--back {
          background: linear-gradient(
            135deg,
            #030303 0%,
            #0a0b0b 52%,
            #050505 100%
          );
        }

        .mello-card-back-header {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          text-transform: uppercase;
        }

        .mello-card-back-brand {
          color: rgba(247, 247, 244, .92);
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(.66rem, 1.4vw, .86rem);
          font-weight: 900;
          letter-spacing: .13em;
          line-height: 1;
        }

        .mello-card-back-season {
          color: #0d9488;
          font-family: var(--font-body), Arial, sans-serif;
          font-size: clamp(.44rem, .9vw, .56rem);
          font-weight: 800;
          letter-spacing: .15em;
          line-height: 1;
          white-space: nowrap;
        }

        .mello-card-back-content {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
          margin: auto 0;
        }

        .mello-card-back-member {
          min-width: 0;
        }

        .mello-card-back-name {
          display: flex;
          flex-direction: column;
          text-transform: uppercase;
        }

        .mello-card-back-name span,
        .mello-card-back-name strong {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(1.4rem, 4vw, 2.7rem);
          font-weight: 900;
          letter-spacing: -.055em;
          line-height: .86;
        }

        .mello-card-back-name span {
          color: rgba(247, 247, 244, .96);
        }

        .mello-card-back-name strong {
          color: #0d9488;
        }

        .mello-card-qr-wrap {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: .42rem;
          padding: .38rem;
          border: 1px solid rgba(210, 216, 214, .2);
          border-radius: .34rem;
          background: rgba(210, 216, 214, .025);
        }

        .mello-card-qr {
          width: clamp(3.4rem, 7vw, 4.5rem);
          aspect-ratio: 1;
          position: relative;
          overflow: hidden;
          border-radius: .12rem;
          background:
            linear-gradient(
              90deg,
              transparent 0 10%,
              rgba(201, 208, 206, .65) 10% 18%,
              transparent 18% 26%,
              rgba(201, 208, 206, .48) 26% 34%,
              transparent 34% 44%,
              rgba(201, 208, 206, .65) 44% 52%,
              transparent 52% 64%,
              rgba(201, 208, 206, .4) 64% 72%,
              transparent 72% 82%,
              rgba(201, 208, 206, .58) 82% 90%,
              transparent 90%
            ),
            linear-gradient(
              0deg,
              transparent 0 8%,
              rgba(201, 208, 206, .52) 8% 16%,
              transparent 16% 26%,
              rgba(201, 208, 206, .64) 26% 34%,
              transparent 34% 44%,
              rgba(201, 208, 206, .4) 44% 52%,
              transparent 52% 62%,
              rgba(201, 208, 206, .6) 62% 70%,
              transparent 70% 82%,
              rgba(201, 208, 206, .48) 82% 90%,
              transparent 90%
            );
          opacity: .9;
        }

        .mello-card-qr-finder {
          position: absolute;
          width: 27%;
          aspect-ratio: 1;
          border: 2px solid rgba(224, 230, 228, .82);
          box-sizing: border-box;
        }

        .mello-card-qr-finder::after {
          content: "";
          position: absolute;
          inset: 22%;
          background: rgba(224, 230, 228, .82);
        }

        .mello-card-qr-finder--top-left {
          left: 3%;
          top: 3%;
        }

        .mello-card-qr-finder--top-right {
          right: 3%;
          top: 3%;
        }

        .mello-card-qr-finder--bottom-left {
          left: 3%;
          bottom: 3%;
        }

        .mello-card-qr-dot {
          position: absolute;
          width: 8%;
          aspect-ratio: 1;
          background: rgba(214, 221, 219, .7);
        }

        .q1 { left: 38%; top: 8%; }
        .q2 { left: 48%; top: 18%; }
        .q3 { left: 37%; top: 28%; }
        .q4 { left: 58%; top: 31%; }
        .q5 { left: 40%; top: 40%; }
        .q6 { left: 51%; top: 42%; }
        .q7 { left: 70%; top: 43%; }
        .q8 { left: 31%; top: 51%; }
        .q9 { left: 45%; top: 54%; }
        .q10 { left: 58%; top: 55%; }
        .q11 { left: 72%; top: 57%; }
        .q12 { left: 39%; top: 65%; }
        .q13 { left: 51%; top: 67%; }
        .q14 { left: 65%; top: 68%; }
        .q15 { left: 33%; top: 77%; }
        .q16 { left: 47%; top: 80%; }
        .q17 { left: 59%; top: 79%; }
        .q18 { left: 72%; top: 79%; }
        .q19 { left: 84%; top: 67%; }
        .q20 { left: 83%; top: 88%; }

        .mello-card-qr-label {
          color: rgba(212, 219, 217, .55);
          font-family: var(--font-body), Arial, sans-serif;
          font-size: clamp(.28rem, .55vw, .38rem);
          font-weight: 800;
          letter-spacing: .13em;
          line-height: 1;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .mello-card-back-footer {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1rem;
        }

        .mello-card-back-member-id {
          display: flex;
          flex-direction: column;
          gap: .3rem;
          text-transform: uppercase;
        }

        .mello-card-back-member-id span {
          color: rgba(247, 247, 244, .4);
          font-family: var(--font-body), Arial, sans-serif;
          font-size: clamp(.38rem, .78vw, .5rem);
          font-weight: 800;
          letter-spacing: .15em;
        }

        .mello-card-back-member-id strong {
          color: rgba(247, 247, 244, .76);
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(.53rem, 1.05vw, .68rem);
          font-weight: 800;
          letter-spacing: .1em;
        }

        .mello-card-back-founding {
          color: #0d9488;
          font-family: var(--font-body), Arial, sans-serif;
          font-size: clamp(.4rem, .84vw, .54rem);
          font-weight: 800;
          letter-spacing: .16em;
          line-height: 1.2;
          text-align: right;
          text-transform: uppercase;
        }

        .mello-card-flip-button {
          border: 1px solid rgba(13, 148, 136, .48);
          border-radius: 99px;
          background: transparent;
          color: #0d9488;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: .5rem;
          font-family: var(--font-body), Arial, sans-serif;
          font-size: .67rem;
          font-weight: 800;
          letter-spacing: .12em;
          padding: .72rem 1.25rem;
          text-transform: uppercase;
          transition: background .2s ease, color .2s ease, transform .2s ease;
        }

        .mello-card-flip-button:hover {
          background: #0d9488;
          color: #080808;
          transform: translateY(-1px);
        }

        @media (max-width: 560px) {
          .mello-card-face {
            border-radius: 1rem;
            padding: 1.1rem;
          }

          .mello-card-inner-border {
            border-radius: .7rem;
          }

          .mello-card-front-bottom,
          .mello-card-back-footer {
            gap: .6rem;
          }

          .mello-card-back-content {
            gap: .7rem;
          }

          .mello-card-qr-wrap {
            padding: .28rem;
          }

          .mello-card-qr {
            width: 3.1rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mello-card-face {
            transition: none;
          }

          .mello-card-stage--front:hover .mello-card-face--front,
          .mello-card-stage--back:hover .mello-card-face--back {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}