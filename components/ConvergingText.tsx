"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ConvergingText() {
  const sectionRef = useRef<HTMLElement>(null);
  const targetProgress = useRef(0);
  const smoothProgress = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
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
  }, []);

  const easedProgress = progress * progress * (3 - 2 * progress);
  const topOffset = -30 * (1 - easedProgress);
  const bottomOffset = 30 * (1 - easedProgress);

  const copyProgress = Math.min(
    1,
    Math.max(0, (easedProgress - 0.22) / 0.72),
  );

  return (
    <section className="wwp-statement" ref={sectionRef}>
      <style>{`
        .wwp-statement {
          position: relative;
          overflow: clip;
          background: var(--mello-black, #080808);
          border-bottom: 1px solid var(--mello-line, #222222);
          color: #f7f7f4;
        }

        .wwp-statement-content {
          width: min(100% - 6rem, 1440px);
          margin: 0 auto;
          padding: 4rem 0 7rem;
        }

        .wwp-statement-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(17rem, 28rem);
          align-items: center;
          column-gap: clamp(3rem, 8vw, 10rem);
        }

        .wwp-statement-label {
          margin-bottom: 2rem;
          color: #0d9488;
          font-family: var(--font-body), Arial, sans-serif;
          font-size: .68rem;
          font-weight: 700;
          letter-spacing: .15em;
          text-transform: uppercase;
        }

        .wwp-line-wrap {
          overflow: visible;
          white-space: nowrap;
        }

        .wwp-line {
          display: block;
          width: max-content;
          color: #f7f7f4;
          font-family: var(--font-display), Arial, Helvetica, sans-serif;
          font-size: clamp(3.2rem, 8vw, 8.5rem);
          font-weight: 400;
          letter-spacing: .01em;
          line-height: .84;
          text-transform: uppercase;
          will-change: transform;
        }

        .wwp-line--outline {
          margin-top: .12em;
          color: transparent;
          -webkit-text-stroke: 1.4px rgba(247, 247, 244, .72);
          paint-order: stroke fill;
        }

        .wwp-statement-copy {
          color: rgba(247, 247, 244, .78);
          font-family: var(--font-body), Arial, sans-serif;
          font-size: clamp(1rem, 1.15vw, 1.08rem);
          line-height: 1.6;
          will-change: opacity;
        }

        .wwp-statement-copy p {
          margin: 0 0 1.35rem;
        }

        .wwp-statement-link {
          display: inline-block;
          padding-bottom: .35rem;
          border-bottom: 1px solid rgba(13, 148, 136, .7);
          color: #0d9488;
          font-family: var(--font-body), Arial, sans-serif;
          font-size: .68rem;
          font-weight: 700;
          letter-spacing: .14em;
          text-decoration: none;
          text-transform: uppercase;
          transition: border-color .2s ease, color .2s ease;
        }

        .wwp-statement-link:hover {
          border-color: #f7f7f4;
          color: #f7f7f4;
        }

        .wwp-statement-progress {
          position: absolute;
          bottom: 1.5rem;
          left: 50%;
          width: min(14rem, calc(100% - 4rem));
          height: 1px;
          transform: translateX(-50%);
          background: rgba(247, 247, 244, .18);
        }

        .wwp-statement-progress span {
          display: block;
          width: 100%;
          height: 100%;
          transform-origin: left;
          background: #0d9488;
          box-shadow: 0 0 8px rgba(13, 148, 136, .45);
        }

        @media (max-width: 767px) {
          .wwp-statement-content {
            width: min(100% - 2.5rem, 1440px);
            padding: 3.5rem 0 5rem;
          }

          .wwp-statement-grid {
            grid-template-columns: 1fr;
            row-gap: 3rem;
          }

          .wwp-statement-label {
            margin-bottom: 1.5rem;
          }

          .wwp-line {
            font-size: clamp(2.8rem, 12.3vw, 5rem);
            line-height: .9;
          }

          .wwp-line--outline {
            -webkit-text-stroke-width: 1px;
          }

          .wwp-statement-copy {
            max-width: 31rem;
            font-size: .95rem;
          }

          .wwp-statement-progress {
            bottom: 1rem;
            width: min(10rem, calc(100% - 4rem));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .wwp-line {
            transform: none !important;
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
                  transform: `translateX(${topOffset}vw)`,
                }}
              >
                Fußball
              </div>
            </div>

            <div className="wwp-line-wrap">
              <div
                className="wwp-line wwp-line--outline"
                style={{
                  transform: `translateX(${bottomOffset}vw)`,
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
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
    </section>
  );
}