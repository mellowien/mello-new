"use client";

import { useEffect, useState } from "react";

const MELLO_LOGO = "/mello-wien.png";

const MATCHES = [
  {
    competition: "1. Klasse A",
    homeTeam: "FC Mello Wien",
    awayTeam: "FC Polska",
    homeLogo: MELLO_LOGO,
    awayLogo: "/polska-wien.png",
    date: new Date("2026-09-06T11:30:00"),
    displayDate: "So | 06.09.2026",
    displayTime: "11:30 Uhr",
  },
  {
    competition: "1. Klasse A",
    homeTeam: "Penarol Wien",
    awayTeam: "FC Mello Wien",
    homeLogo: "/penarol-wien.png",
    awayLogo: MELLO_LOGO,
    date: new Date("2026-09-12T16:00:00"),
    displayDate: "Sa | 12.09.2026",
    displayTime: "16:00 Uhr",
  },
  {
    competition: "1. Klasse A",
    homeTeam: "FC Mello Wien",
    awayTeam: "Yellow Star",
    homeLogo: MELLO_LOGO,
    awayLogo: "/yellow-star.png",
    date: new Date("2026-09-20T11:30:00"),
    displayDate: "So | 20.09.2026",
    displayTime: "11:30 Uhr",
  },
  {
    competition: "1. Klasse A",
    homeTeam: "Penzinger SV",
    awayTeam: "FC Mello Wien",
    homeLogo: "/penzing.png",
    awayLogo: MELLO_LOGO,
    date: new Date("2026-09-26T18:00:00"),
    displayDate: "Sa | 26.09.2026",
    displayTime: "18:00 Uhr",
  },
  {
    competition: "1. Klasse A",
    homeTeam: "FC Mello Wien",
    awayTeam: "ASK Erlaa Torpedo 03",
    homeLogo: MELLO_LOGO,
    awayLogo: "/erlaa-torpedo.png",
    date: new Date("2026-10-04T11:30:00"),
    displayDate: "So | 04.10.2026",
    displayTime: "11:30 Uhr",
  },
];

const NEXT_MATCH = MATCHES[0];

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function useCountdown(target: Date): TimeLeft {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const update = () => {
      const difference = target.getTime() - Date.now();

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / 86400000),
        hours: Math.floor((difference % 86400000) / 3600000),
        minutes: Math.floor((difference % 3600000) / 60000),
        seconds: Math.floor((difference % 60000) / 1000),
      });
    };

    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, [target]);

  return timeLeft;
}

function removeOuterWhiteBackground(
  imageData: ImageData,
  width: number,
  height: number,
) {
  const { data } = imageData;
  const seen = new Uint8Array(width * height);
  const queue: number[] = [];

  const add = (x: number, y: number) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const position = y * width + x;
    const pixel = position * 4;

    const isWhite =
      data[pixel] > 225 &&
      data[pixel + 1] > 225 &&
      data[pixel + 2] > 225;

    if (seen[position] || !isWhite) return;

    seen[position] = 1;
    queue.push(position);
  };

  for (let x = 0; x < width; x++) {
    add(x, 0);
    add(x, height - 1);
  }

  for (let y = 0; y < height; y++) {
    add(0, y);
    add(width - 1, y);
  }

  while (queue.length > 0) {
    const position = queue.shift();
    if (position === undefined) continue;

    const x = position % width;
    const y = Math.floor(position / width);
    data[position * 4 + 3] = 0;

    add(x - 1, y);
    add(x + 1, y);
    add(x, y - 1);
    add(x, y + 1);
  }

  return imageData;
}

function useTransparentLogo(source: string) {
  const [src, setSrc] = useState(source);

  useEffect(() => {
    if (!source) {
      setSrc("");
      return;
    }

    if (source === MELLO_LOGO) {
      setSrc(source);
      return;
    }

    const image = new window.Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      const context = canvas.getContext("2d");
      if (!context) {
        setSrc(source);
        return;
      }

      context.drawImage(image, 0, 0);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      context.putImageData(
        removeOuterWhiteBackground(imageData, canvas.width, canvas.height),
        0,
        0,
      );
      setSrc(canvas.toDataURL("image/png"));
    };

    image.onerror = () => {
      setSrc(source);
    };

    image.src = source;
  }, [source]);

  return src;
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ minWidth: "3.12rem", textAlign: "center" }}>
      <div
        style={{
          color: "rgba(13,148,136,.72)",
          fontFamily: '"Helvetica Neue", Arial, sans-serif',
          fontSize: "clamp(1.95rem, 3vw, 2.45rem)",
          fontVariantNumeric: "tabular-nums lining-nums",
          fontWeight: 700,
          letterSpacing: "-.045em",
          lineHeight: 0.92,
        }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <div
        style={{
          color: "rgba(247,247,244,.3)",
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: ".4rem",
          fontWeight: 700,
          letterSpacing: ".14em",
          marginTop: ".3rem",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function Separator() {
  return (
    <div
      style={{
        color: "rgba(13,148,136,.42)",
        fontFamily: '"Helvetica Neue", Arial, sans-serif',
        fontSize: "clamp(1.45rem, 2.25vw, 1.85rem)",
        fontWeight: 700,
        paddingBottom: ".86rem",
      }}
    >
      :
    </div>
  );
}

function EmptyLogo({ active = false }: { active?: boolean }) {
  const size = active ? "3.45rem" : "2.8rem";

  return (
    <div
      aria-hidden="true"
      style={{
        alignItems: "center",
        border: "1px solid rgba(247,247,244,.13)",
        borderRadius: "50%",
        color: "rgba(247,247,244,.2)",
        display: "flex",
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: ".38rem",
        fontWeight: 700,
        height: size,
        justifyContent: "center",
        letterSpacing: ".08em",
        textTransform: "uppercase",
        width: size,
      }}
    >
      Logo
    </div>
  );
}

function ClubLogo({
  src,
  alt,
  transparentSrc,
  active = false,
}: {
  src: string;
  alt: string;
  transparentSrc?: string;
  active?: boolean;
}) {
  const size = active ? "3.45rem" : "2.8rem";

  if (!src) {
    return <EmptyLogo active={active} />;
  }

  return (
    <img
      src={transparentSrc || src}
      alt={alt}
      width={72}
      height={72}
      style={{
        display: "block",
        height: size,
        imageRendering: "auto",
        objectFit: "contain",
        width: size,
        transition: "height 0.4s ease, width 0.4s ease",
      }}
    />
  );
}

function MatchCard({
  match,
  active,
  isNextMatch = false,
  logos,
}: {
  match: (typeof MATCHES)[number];
  active: boolean;
  isNextMatch?: boolean;
  logos: Record<string, string>;
}) {
  const transparentLogo = (source: string) => logos[source] || source;

  return (
    <article
      style={{
        background: active
          ? "linear-gradient(135deg, rgba(13,148,136,.14), rgba(15,17,17,.98) 62%)"
          : "rgba(247,247,244,.055)",
        border: active
          ? "1px solid rgba(13,148,136,.78)"
          : "1px solid rgba(247,247,244,.13)",
        borderRadius: "1rem",
        boxShadow: active ? "0 0 25px rgba(13,148,136,.08)" : "none",
        minHeight: "10.2rem",
        padding: active ? "1.2rem 1rem .85rem" : ".85rem .8rem",
        position: "relative",
        boxSizing: "border-box",
        transform: active ? "scale(1)" : "scale(0.88)",
        opacity: active ? 1 : 0.65,
        transition:
          "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s cubic-bezier(0.25, 1, 0.5, 1), background 0.5s ease, border-color 0.5s ease, padding 0.5s ease",
        transformOrigin: "center center",
      }}
    >
      {isNextMatch && (
        <div
          style={{
            background: "#0d9488",
            borderRadius: "0 0 .48rem .48rem",
            color: "#080808",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: ".43rem",
            fontWeight: 800,
            left: "50%",
            letterSpacing: ".13em",
            padding: ".24rem .65rem",
            position: "absolute",
            textTransform: "uppercase",
            top: 0,
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
          }}
        >
          Nächstes Spiel
        </div>
      )}

      <div
        style={{
          color: active ? "rgba(13,148,136,.9)" : "rgba(247,247,244,.55)",
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: ".52rem",
          fontWeight: 800,
          letterSpacing: ".13em",
          marginBottom: active ? ".72rem" : ".5rem",
          marginTop: active && isNextMatch ? ".38rem" : 0,
          textAlign: "center",
          textTransform: "uppercase",
          transition: "color 0.4s ease, margin 0.4s ease",
        }}
      >
        {match.competition}
      </div>

      <div
        style={{
          alignItems: "center",
          display: "grid",
          gap: ".45rem",
          gridTemplateColumns: "minmax(3rem, 1fr) auto minmax(3rem, 1fr)",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: ".28rem",
            minWidth: 0,
          }}
        >
          <ClubLogo
            active={active}
            alt={match.homeTeam}
            src={match.homeLogo}
            transparentSrc={transparentLogo(match.homeLogo)}
          />

          <span
            style={{
              color: "#f7f7f4",
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: active ? ".57rem" : ".5rem",
              fontWeight: 800,
              letterSpacing: ".04em",
              lineHeight: 1.1,
              textAlign: "center",
              textTransform: "uppercase",
              transition: "font-size 0.4s ease",
            }}
          >
            {match.homeTeam}
          </span>
        </div>

        <span
          style={{
            color: active ? "#0d9488" : "rgba(247,247,244,.38)",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: active ? ".7rem" : ".56rem",
            fontWeight: 800,
            letterSpacing: ".1em",
            transition: "font-size 0.4s ease, color 0.4s ease",
          }}
        >
          VS
        </span>

        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: ".28rem",
            minWidth: 0,
          }}
        >
          <ClubLogo
            active={active}
            alt={match.awayTeam}
            src={match.awayLogo}
            transparentSrc={transparentLogo(match.awayLogo)}
          />

          <span
            style={{
              color: "#f7f7f4",
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: active ? ".57rem" : ".5rem",
              fontWeight: 800,
              letterSpacing: ".04em",
              lineHeight: 1.1,
              textAlign: "center",
              textTransform: "uppercase",
              transition: "font-size 0.4s ease",
            }}
          >
            {match.awayTeam}
          </span>
        </div>
      </div>

      <div
        style={{
          color: active
            ? "rgba(247,247,244,.78)"
            : "rgba(247,247,244,.68)",
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: active ? ".66rem" : ".58rem",
          fontWeight: 700,
          letterSpacing: ".075em",
          marginTop: active ? ".78rem" : ".95rem",
          textAlign: "center",
          textTransform: "uppercase",
          transition: "font-size 0.4s ease, margin 0.4s ease",
        }}
      >
        {match.displayDate}
        <span
          style={{
            color: active
              ? "rgba(13,148,136,.88)"
              : "rgba(13,148,136,.66)",
            padding: "0 .28rem",
          }}
        >
          ·
        </span>
        {match.displayTime}
      </div>
    </article>
  );
}

function getWatermarkTeam(teamName: string) {
  if (teamName.includes("Mello")) {
    return { fontScale: 0.8, label: "Mello", widthScale: 0.94 };
  }
  if (teamName.includes("Polska")) {
    return { fontScale: 0.8, label: "Polska", widthScale: 0.9 };
  }
  if (teamName.includes("Penarol")) {
    return { fontScale: 0.8, label: "Penarol", widthScale: 0.9 };
  }
  if (teamName.includes("Yellow Star")) {
    return { fontScale: 0.58, label: "Yellow Star", widthScale: 0.92 };
  }
  if (teamName.includes("Penzinger")) {
    return { fontScale: 0.8, label: "Penzing", widthScale: 0.94 };
  }
  if (teamName.includes("Erlaa")) {
    return { fontScale: 0.8, label: "Erlaa", widthScale: 0.92 };
  }

  return {
    fontScale: 0.8,
    label: teamName
      .replace(/^FC\s+/i, "")
      .replace(/^ASK\s+/i, "")
      .replace(/^SV\s+/i, "")
      .replace(/^SC\s+/i, "")
      .split(" ")[0],
    widthScale: 0.9,
  };
}

export default function Countdown() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextMatchHomeWatermark = getWatermarkTeam(NEXT_MATCH.homeTeam);
  const nextMatchAwayWatermark = getWatermarkTeam(NEXT_MATCH.awayTeam);

  const { days, hours, minutes, seconds } = useCountdown(NEXT_MATCH.date);

  const polskaLogo = useTransparentLogo("/polska-wien.png");
  const penarolLogo = useTransparentLogo("/penarol-wien.png");
  const yellowStarLogo = useTransparentLogo("/yellow-star.png");
  const penzingLogo = useTransparentLogo("/penzing.png");
  const erlaaTorpedoLogo = useTransparentLogo("/erlaa-torpedo.png");

  const logos = {
    "/polska-wien.png": polskaLogo,
    "/penarol-wien.png": penarolLogo,
    "/yellow-star.png": yellowStarLogo,
    "/penzing.png": penzingLogo,
    "/erlaa-torpedo.png": erlaaTorpedoLogo,
  };

  const previousIndex = activeIndex > 0 ? activeIndex - 1 : null;
  const nextIndex =
    activeIndex < MATCHES.length - 1 ? activeIndex + 1 : null;

  const backgroundNameStyle = {
    color: "rgba(13,148,136,.045)",
    fontFamily:
      '"Arial Black", "Arial Bold", Impact, Haettenschweiler, "Helvetica Neue", Arial, sans-serif',
    fontSize: "clamp(3.8rem, 7.3vw, 8.35rem)",
    fontWeight: 900,
    letterSpacing: "-.075em",
    lineHeight: 0.72,
    pointerEvents: "none" as const,
    position: "relative" as const,
    textTransform: "uppercase" as const,
    userSelect: "none" as const,
    whiteSpace: "nowrap" as const,
    zIndex: 0,
  };

  return (
    <section
      style={{
        background:
          "radial-gradient(ellipse 48% 32% at 50% 0%, rgba(13,148,136,.075), transparent 75%), #080808",
        borderBottom: "1px solid rgba(247,247,244,.18)",
        overflow: "hidden",
        padding: "2.15rem 0 2.4rem",
        position: "relative",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(135deg, transparent 0%, rgba(13,148,136,.1) 50%, transparent 100%)",
          height: "100%",
          left: 0,
          opacity: 0.4,
          pointerEvents: "none",
          position: "absolute",
          top: 0,
          transform: "skewX(-22deg) translateX(-70%)",
          width: "15rem",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(135deg, transparent 0%, rgba(13,148,136,.1) 50%, transparent 100%)",
          height: "100%",
          opacity: 0.4,
          pointerEvents: "none",
          position: "absolute",
          right: 0,
          top: 0,
          transform: "skewX(-22deg) translateX(70%)",
          width: "15rem",
        }}
      />

      <div
        style={{
          margin: "0 auto",
          maxWidth: "78rem",
          padding: "0 3rem",
          position: "relative",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            gap: ".6rem",
            justifyContent: "center",
            marginBottom: ".58rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <span
            style={{
              background: "rgba(13,148,136,.42)",
              height: "1px",
              width: "1.8rem",
            }}
          />
          <span
            style={{
              color: "rgba(13,148,136,.72)",
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: ".48rem",
              fontWeight: 800,
              letterSpacing: ".2em",
              textTransform: "uppercase",
            }}
          >
            Nächstes Spiel
          </span>
          <span
            style={{
              background: "rgba(13,148,136,.42)",
              height: "1px",
              width: "1.8rem",
            }}
          />
        </div>

        <div
          style={{
            alignItems: "center",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto minmax(0, 1fr)",
            minHeight: "6.75rem",
            position: "relative",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              ...backgroundNameStyle,
              fontSize: `calc(clamp(3.8rem, 7.3vw, 8.35rem) * ${nextMatchHomeWatermark.fontScale})`,
              justifySelf: "end",
              marginRight: "clamp(2.5rem, 5vw, 5.5rem)",
              transform: `translateY(-4%) scaleX(${1.06 * nextMatchHomeWatermark.widthScale})`,
            }}
          >
            {nextMatchHomeWatermark.label}
          </div>

          <div
            style={{
              alignItems: "flex-end",
              display: "flex",
              gap: ".28rem",
              justifyContent: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <Unit value={days} label="Tage" />
            <Separator />
            <Unit value={hours} label="Std." />
            <Separator />
            <Unit value={minutes} label="Min." />
            <Separator />
            <Unit value={seconds} label="Sek." />
          </div>

          <div
            aria-hidden="true"
            style={{
              ...backgroundNameStyle,
              fontSize: `calc(clamp(3.8rem, 7.3vw, 8.35rem) * ${nextMatchAwayWatermark.fontScale})`,
              justifySelf: "start",
              marginLeft: "clamp(2.5rem, 5vw, 5.5rem)",
              transform: `translateY(-4%) scaleX(${1.06 * nextMatchAwayWatermark.widthScale})`,
            }}
          >
            {nextMatchAwayWatermark.label}
          </div>
        </div>

        <div
          style={{
            marginTop: "clamp(7rem, 11vh, 10rem)",
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: ".85rem",
            }}
          >
            <div
              style={{
                color: "#0d9488",
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: ".52rem",
                fontWeight: 800,
                letterSpacing: ".16em",
                textTransform: "uppercase",
              }}
            >
              Die nächsten Spiele
            </div>

            <div
              style={{
                alignItems: "center",
                display: "flex",
                gap: ".75rem",
              }}
            >
              {/* Zum Spielplan Button */}
              <a
                href="/spielplan"
                style={{
                  alignItems: "center",
                  background: "rgba(247,247,244,.06)",
                  border: "1px solid rgba(247,247,244,.18)",
                  borderRadius: "99px",
                  color: "#f7f7f4",
                  display: "inline-flex",
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontSize: ".46rem",
                  fontWeight: 800,
                  gap: ".35rem",
                  letterSpacing: ".12em",
                  padding: ".48rem .95rem",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(13,148,136,.7)";
                  e.currentTarget.style.color = "#0d9488";
                  e.currentTarget.style.background = "rgba(13,148,136,.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(247,247,244,.18)";
                  e.currentTarget.style.color = "#f7f7f4";
                  e.currentTarget.style.background = "rgba(247,247,244,.06)";
                }}
              >
                Zum Spielplan
                <span style={{ fontSize: ".6rem" }}>→</span>
              </a>

              <div
                style={{
                  display: "flex",
                  gap: ".4rem",
                }}
              >
                <button
                  aria-disabled={previousIndex === null}
                  aria-label="Vorheriges Spiel"
                  disabled={previousIndex === null}
                  onClick={() => {
                    if (previousIndex !== null) {
                      setActiveIndex(previousIndex);
                    }
                  }}
                  type="button"
                  style={{
                    alignItems: "center",
                    background: "transparent",
                    border: "1px solid rgba(247,247,244,.22)",
                    borderRadius: "50%",
                    color: "#f7f7f4",
                    cursor: previousIndex === null ? "default" : "pointer",
                    display: "flex",
                    fontSize: ".9rem",
                    height: "2rem",
                    justifyContent: "center",
                    opacity: previousIndex === null ? 0.25 : 1,
                    transition: "all 0.2s ease",
                    width: "2rem",
                  }}
                >
                  ←
                </button>

                <button
                  aria-disabled={nextIndex === null}
                  aria-label="Nächstes Spiel"
                  disabled={nextIndex === null}
                  onClick={() => {
                    if (nextIndex !== null) {
                      setActiveIndex(nextIndex);
                    }
                  }}
                  type="button"
                  style={{
                    alignItems: "center",
                    background: "#0d9488",
                    border: "1px solid #0d9488",
                    borderRadius: "50%",
                    color: "#080808",
                    cursor: nextIndex === null ? "default" : "pointer",
                    display: "flex",
                    fontSize: ".9rem",
                    height: "2rem",
                    justifyContent: "center",
                    opacity: nextIndex === null ? 0.25 : 1,
                    transition: "all 0.2s ease",
                    width: "2rem",
                  }}
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Der fließende Bayern-Track */}
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              width: "100%",
              padding: "1rem 0 1.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                transform: `translate3d(calc(50% - 15rem - ${activeIndex} * 31.2rem), 0, 0)`,
                transition: "transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)",
                willChange: "transform",
              }}
            >
              {MATCHES.map((match, idx) => (
                <div
                  key={`${match.displayDate}-${match.homeTeam}`}
                  onClick={() => setActiveIndex(idx)}
                  style={{
                    flex: "0 0 30rem",
                    marginRight: "1.2rem",
                    cursor: idx === activeIndex ? "default" : "pointer",
                  }}
                >
                  <MatchCard
                    active={idx === activeIndex}
                    isNextMatch={idx === 0}
                    logos={logos}
                    match={match}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div
            aria-label="Spielauswahl"
            style={{
              alignItems: "center",
              display: "flex",
              gap: ".4rem",
              justifyContent: "center",
              marginTop: ".4rem",
              position: "relative",
              zIndex: 2,
            }}
          >
            {MATCHES.map((match, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  aria-current={isActive ? "true" : undefined}
                  aria-label={`${index + 1}. Spiel: ${match.homeTeam} gegen ${match.awayTeam}`}
                  key={`${match.displayDate}-${match.homeTeam}`}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                  style={{
                    alignItems: "center",
                    background: isActive
                      ? "#0d9488"
                      : "rgba(247,247,244,.32)",
                    border: 0,
                    borderRadius: "999px",
                    cursor: "pointer",
                    display: "flex",
                    height: ".7rem",
                    justifyContent: "center",
                    padding: 0,
                    position: "relative",
                    transition:
                      "width 350ms cubic-bezier(0.25, 1, 0.5, 1), background 250ms ease",
                    width: isActive ? "1.25rem" : ".7rem",
                  }}
                  onMouseEnter={(event) => {
                    if (!isActive) {
                      event.currentTarget.style.background =
                        "rgba(13,148,136,.72)";
                    }
                  }}
                  onMouseLeave={(event) => {
                    if (!isActive) {
                      event.currentTarget.style.background =
                        "rgba(247,247,244,.32)";
                    }
                  }}
                >
                  <span
                    style={{
                      height: 1,
                      overflow: "hidden",
                      position: "absolute",
                      width: 1,
                    }}
                  >
                    {`${index + 1}. Spiel`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}