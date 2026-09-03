"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ConvergingText() {
  const sectionRef = useRef<HTMLElement>(null);
  const targetProgress = useRef(0);
  const smoothProgress = useRef(0);
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateMotionPreference = () => {
      setReduceMotion(mediaQuery.matches);
    };

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      targetProgress.current = 1;
      smoothProgress.current = 1;
      setProgress(1);
      return;
    }

    let animationFrame = 0;
    let previousTime = 0;

    const updateScrollTarget = () => {
      const section = sectionRef.current;

      if (!section) return;

      const rect = section.getBoundingClientRect();
      const start = window.innerHeight * 1.02;
      const end = window.innerHeight * 0.36;
      const value = (start - rect.top) / (start - end);

      targetProgress.current = Math.min(1, Math.max(0, value));
    };

    const animate = (time: number) => {
      if (!previousTime) previousTime = time;

      const delta = Math.min(time - previousTime, 50);
      previousTime = time;

      const smoothness = 1 - Math.exp(-delta / 320);

      smoothProgress.current +=
        (targetProgress.current - smoothProgress.current) * smoothness;

      setProgress(smoothProgress.current);
      animationFrame = window.requestAnimationFrame(animate);
    };

    updateScrollTarget();
    animationFrame = window.requestAnimationFrame(animate);

    window.addEventListener("scroll", updateScrollTarget, {
      passive: true,
    });

    window.addEventListener("resize", updateScrollTarget);

    return () => {
      window.removeEventListener("scroll", updateScrollTarget);
      window.removeEventListener("resize", updateScrollTarget);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [reduceMotion]);

  const easedProgress = progress * progress * (3 - 2 * progress);
  const topOffset = -30 * (1 - easedProgress);
  const bottomOffset = 30 * (1 - easedProgress);

  const copyProgress = reduceMotion
    ? 1
    : Math.min(1, Math.max(0, (easedProgress - 0.22) / 0.72));

  return (
    <section className="wwp-statement" ref={sectionRef}>
      <style>{`
        .wwp-statement {
          background: var(--mello-black, #080808);
          border-bottom: 1px solid var(--mello-line, #222222);
          color: #f7f7f4;
          overflow: clip;
          position: relative;
        }

        .wwp-statement::before {
          background:
            radial-gradient(
              ellipse 45% 45% at 80% 40%,
              rgba(13,148,136,.07) 0%,
              transparent 72%
            );
          content: "";
          inset: 0;
          pointer-events: none;
          position: absolute;
        }

        .wwp-statement-content {
          margin: 0 auto;
          padding: 4rem 0 7rem;
          position: relative;
          width: min(100% - 6rem, 1440px);
          z-index: 1;
        }

        .wwp-statement-grid {
          align-items: center;
          column-gap: clamp(3rem, 8vw, 10rem);
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(17rem, 28rem);
        }

        .wwp-statement-label {
          color: #0d9488;
          font-family: var(--font-body), Arial, sans-serif;
          font-size: .68rem;
          font-weight: 700;
          letter-spacing: .15em;
          margin-bottom: 2rem;
          text-transform: uppercase;
        }

        .wwp-line-wrap {
          overflow: visible;
          white-space: nowrap;
        }

        .wwp-line {
          color: #f7f7f4;
          display: block;
          font-family: var(--font-display), Arial, Helvetica, sans-serif;
          font-size: clamp(3.2rem, 8vw, 8.5rem);
          font-weight: 400;
          letter-spacing: .01em;
          line-height: .84;
          text-transform: uppercase;
          width: max-content;
          will-change: transform;
        }

        .wwp-line--outline {
          color: transparent;
          margin-top: .12em;
          paint-order: stroke fill;
          -webkit-text-stroke: 1.4px rgba(247,247,244,.72);
        }

        .wwp-statement-copy {
          color: rgba(247,247,244,.78);
          font-family: var(--font-body), Arial, sans-serif;
          font-size: clamp(1rem, 1.15vw, 1.08rem);
          line-height: 1.6;
          will-change: opacity;
        }

        .wwp-statement-copy p {
          margin: 0 0 1.35rem;
        }

        .wwp-statement-link {
          border-bottom: 1px solid rgba(13,148,136,.7);
          color: #0d9488;
          display: inline-block;
          font-family: var(--font-body), Arial, sans-serif;
          font-size: .68rem;
          font-weight: 700;
          letter-spacing: .14em;
          padding-bottom: .35rem;
          text-decoration: none;
          text-transform: uppercase;
          transition: border-color .2s ease, color .2s ease;
        }

        .wwp-statement-link:hover {
          border-color: #f7f7f4;
          color: #f7f7f4;
        }

        .wwp-statement-progress {
          background: rgba(247,247,244,.18);
          bottom: 1.5rem;
          height: 1px;
          left: 50%;
          position: absolute;
          transform: translateX(-50%);
          width: min(14rem, calc(100% - 4rem));
        }

        .wwp-statement-progress span {
          background: #0d9488;
          box-shadow: 0 0 8px rgba(13,148,136,.45);
          display: block;
          height: 100%;
          transform-origin: left;
          width: 100%;
        }

        @media (max-width: 768px) {
          .wwp-statement {
            overflow: hidden;
          }

          .wwp-statement::before {
            background:
              radial-gradient(
                ellipse 76% 46% at 88% 42%,
                rgba(13,148,136,.08) 0%,
                transparent 72%
              );
          }

          .wwp-statement-content {
            padding: 3.35rem 0 4.85rem;
            width: min(100% - 2.25rem, 40rem);
          }

          .wwp-statement-grid {
            display: block;
          }

          .wwp-statement-label {
            font-size: .62rem;
            letter-spacing: .17em;
            margin-bottom: 1.15rem;
          }

          .wwp-line-wrap {
            overflow: visible;
            white-space: normal;
          }

          .wwp-line {
            font-size: clamp(2.75rem, 13vw, 4.6rem);
            letter-spacing: -.025em;
            line-height: .88;
            max-width: 100%;
            transform: none !important;
            white-space: normal;
            width: 100%;
          }

          .wwp-line--outline {
            margin-top: .1em;
            -webkit-text-stroke: 1px rgba(247,247,244,.74);
          }

          .wwp-statement-copy {
            background: rgba(247,247,244,.025);
            border-left: 2px solid rgba(13,148,136,.72);
            box-sizing: border-box;
            color: rgba(247,247,244,.72);
            font-size: .96rem;
            line-height: 1.68;
            margin-top: 2.15rem;
            max-width: 34ch;
            opacity: 1 !important;
            padding: .15rem 0 .15rem 1rem;
            pointer-events: auto !important;
          }

          .wwp-statement-copy p {
            margin-bottom: 1.1rem;
          }

          .wwp-statement-link {
            align-items: center;
            background: #0d9488;
            border: 1px solid #0d9488;
            border-radius: 99px;
            box-sizing: border-box;
            color: #080808;
            display: inline-flex;
            font-size: .65rem;
            justify-content: center;
            letter-spacing: .13em;
            min-height: 48px;
            padding: .85rem 1.15rem;
            width: 100%;
          }

          .wwp-statement-link:hover {
            background: #14b8a6;
            border-color: #14b8a6;
            color: #080808;
          }

          .wwp-statement-progress {
            bottom: 1.2rem;
            width: min(11rem, calc(100% - 4rem));
          }
        }

        @media (max-width: 360px) {
          .wwp-statement-content {
            width: min(100% - 2rem, 40rem);
          }

          .wwp-line {
            font-size: 2.55rem;
          }

          .wwp-statement-copy {
            font-size: .91rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .wwp-line {
            transform: none !important;
            will-change: auto;
          }

          .wwp-statement-copy {
            opacity: 1 !important;
            will-change: auto;
          }

          .wwp-statement-progress span {
            transform: scaleX(1) !important;
          }
        }
      `}</style>

      <div className="wwp-statement-content">
        <div className="wwp-statement-grid">
          <div>
            <div className="wwp-statement-label">Unser Ansatz</div>

            <div className="wwp-line-wrap">
              <div
                className="wwp-line"
                style={{
                  transform: `translateX(${reduceMotion ? 0 : topOffset}vw)`,
                }}
              >
                Fußball
              </div>
            </div>

            <div className="wwp-line-wrap">
              <div
                className="wwp-line wwp-line--outline"
                style={{
                  transform: `translateX(${
                    reduceMotion ? 0 : bottomOffset
                  }vw)`,
                }}
              >
                Neu gedacht
              </div>
            </div>
          </div>

          <div
            className="wwp-statement-copy"
            style={{
              opacity: copyProgress,
              pointerEvents: copyProgress > 0.8 ? "auto" : "none",
            }}
          >
            <p>
              Mello verbindet Fußball mit einer Vereinsstruktur, die Mitglieder
              aktiv mitgestalten können.
            </p>

            <Link className="wwp-statement-link" href="/ueber-uns">
              Mehr über uns&nbsp;→
            </Link>
          </div>
        </div>
      </div>

      <div className="wwp-statement-progress" aria-hidden="true">
        <span
          style={{
            transform: `scaleX(${reduceMotion ? 1 : progress})`,
          }}
        />
      </div>
    </section>
  );
}