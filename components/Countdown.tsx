"use client";

import { useEffect, useRef, useState } from "react";

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
const UPCOMING_MATCHES = MATCHES;

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
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
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
    if (!source || source === MELLO_LOGO) {
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

      const imageData = context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height,
      );

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

function ClubLogo({
  src,
  alt,
  transparentSrc,
  active = false,
  mobile = false,
}: {
  src: string;
  alt: string;
  transparentSrc?: string;
  active?: boolean;
  mobile?: boolean;
}) {
  const size = mobile ? "4.25rem" : active ? "3.45rem" : "2.8rem";

  return (
    <img
      src={transparentSrc || src}
      alt={alt}
      width={80}
      height={80}
      style={{
        display: "block",
        height: size,
        imageRendering: "auto",
        objectFit: "contain",
        width: size,
      }}
    />
  );
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="countdown-unit">
      <div className="countdown-unit-value">
        {String(value).padStart(2, "0")}
      </div>
      <div className="countdown-unit-label">{label}</div>
    </div>
  );
}

function Separator() {
  return <div className="countdown-separator">:</div>;
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
        boxSizing: "border-box",
        minHeight: "10.2rem",
        opacity: active ? 1 : 0.65,
        padding: active ? "1.2rem 1rem .85rem" : ".85rem .8rem",
        position: "relative",
        transform: active ? "scale(1)" : "scale(.88)",
        transformOrigin: "center center",
        transition:
          "transform .5s cubic-bezier(.25,1,.5,1), opacity .5s cubic-bezier(.25,1,.5,1), background .5s ease, border-color .5s ease, padding .5s ease",
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
        }}
      >
        {match.competition}
      </div>

      <div
        style={{
          alignItems: "center",
          display: "grid",
          gap: ".45rem",
          gridTemplateColumns: "minmax(0, 1fr) auto minmax(0, 1fr)",
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
              overflowWrap: "anywhere",
              textAlign: "center",
              textTransform: "uppercase",
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
              overflowWrap: "anywhere",
              textAlign: "center",
              textTransform: "uppercase",
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

  return {
    fontScale: 0.8,
    label: teamName.replace(/^FC\s+/i, "").split(" ")[0],
    widthScale: 0.9,
  };
}

export default function Countdown() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  const swipeStartX = useRef<number | null>(null);
  const swipeStartY = useRef<number | null>(null);
  const wheelLock = useRef(false);

  const { days, hours, minutes, seconds } = useCountdown(NEXT_MATCH.date);

  const polskaLogo = useTransparentLogo("/polska-wien.png");
  const penarolLogo = useTransparentLogo("/penarol-wien.png");
  const yellowStarLogo = useTransparentLogo("/yellow-star.png");
  const penzingLogo = useTransparentLogo("/penzing.png");
  const erlaaTorpedoLogo = useTransparentLogo("/erlaa-torpedo.png");

  const logos: Record<string, string> = {
    "/polska-wien.png": polskaLogo,
    "/penarol-wien.png": penarolLogo,
    "/yellow-star.png": yellowStarLogo,
    "/penzing.png": penzingLogo,
    "/erlaa-torpedo.png": erlaaTorpedoLogo,
  };

  const mobileActiveMatch = UPCOMING_MATCHES[mobileActiveIndex];

  const previousIndex = activeIndex > 0 ? activeIndex - 1 : null;
  const nextIndex =
    activeIndex < MATCHES.length - 1 ? activeIndex + 1 : null;

  const previousMobileIndex =
    mobileActiveIndex > 0 ? mobileActiveIndex - 1 : null;

  const nextMobileIndex =
    mobileActiveIndex < UPCOMING_MATCHES.length - 1
      ? mobileActiveIndex + 1
      : null;

  const nextMatchHomeWatermark = getWatermarkTeam(NEXT_MATCH.homeTeam);
  const nextMatchAwayWatermark = getWatermarkTeam(NEXT_MATCH.awayTeam);

  const transparentLogo = (source: string) => logos[source] || source;

  const goToPreviousMatch = () => {
    setActiveIndex((current) => Math.max(0, current - 1));
  };

  const goToNextMatch = () => {
    setActiveIndex((current) => Math.min(MATCHES.length - 1, current + 1));
  };

  const goToPreviousMobileMatch = () => {
    setMobileActiveIndex((current) => Math.max(0, current - 1));
  };

  const goToNextMobileMatch = () => {
    setMobileActiveIndex((current) =>
      Math.min(UPCOMING_MATCHES.length - 1, current + 1),
    );
  };

  const getSwipeDirection = (event: React.PointerEvent<HTMLElement>) => {
    if (swipeStartX.current === null || swipeStartY.current === null) {
      return null;
    }

    const deltaX = event.clientX - swipeStartX.current;
    const deltaY = event.clientY - swipeStartY.current;

    swipeStartX.current = null;
    swipeStartY.current = null;

    const isHorizontalSwipe =
      Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.35;

    if (!isHorizontalSwipe) return null;

    return deltaX < 0 ? "next" : "previous";
  };

  const handleSwipeStart = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    swipeStartX.current = event.clientX;
    swipeStartY.current = event.clientY;
  };

  const handleDesktopSwipeEnd = (event: React.PointerEvent<HTMLElement>) => {
    const direction = getSwipeDirection(event);

    if (direction === "next") goToNextMatch();
    if (direction === "previous") goToPreviousMatch();
  };

  const handleMobileSwipeEnd = (event: React.PointerEvent<HTMLElement>) => {
    const direction = getSwipeDirection(event);

    if (direction === "next") goToNextMobileMatch();
    if (direction === "previous") goToPreviousMobileMatch();
  };

  const handleDesktopTrackpadWheel = (
    event: React.WheelEvent<HTMLElement>,
  ) => {
    const isHorizontalGesture =
      Math.abs(event.deltaX) > Math.abs(event.deltaY) &&
      Math.abs(event.deltaX) > 12;

    if (!isHorizontalGesture || wheelLock.current) return;

    event.preventDefault();
    wheelLock.current = true;

    if (event.deltaX > 0) {
      goToNextMatch();
    } else {
      goToPreviousMatch();
    }

    window.setTimeout(() => {
      wheelLock.current = false;
    }, 500);
  };

  const handleMobileTrackpadWheel = (
    event: React.WheelEvent<HTMLElement>,
  ) => {
    const isHorizontalGesture =
      Math.abs(event.deltaX) > Math.abs(event.deltaY) &&
      Math.abs(event.deltaX) > 12;

    if (!isHorizontalGesture || wheelLock.current) return;

    event.preventDefault();
    wheelLock.current = true;

    if (event.deltaX > 0) {
      goToNextMobileMatch();
    } else {
      goToPreviousMobileMatch();
    }

    window.setTimeout(() => {
      wheelLock.current = false;
    }, 500);
  };

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
    <section className="countdown-section">
      <style>{`
        .countdown-section {
          background:
            radial-gradient(ellipse 48% 32% at 50% 0%, rgba(13,148,136,.075), transparent 75%),
            #080808;
          border-bottom: 1px solid rgba(247,247,244,.18);
          overflow: hidden;
          padding: 2.15rem 0 2.4rem;
          position: relative;
        }

        .countdown-desktop {
          display: block;
        }

        .countdown-mobile {
          display: none;
        }

        .countdown-swipe-area {
          touch-action: pan-y;
        }

        .countdown-unit {
          min-width: 3.12rem;
          text-align: center;
        }

        .countdown-unit-value {
          color: rgba(13,148,136,.72);
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(1.95rem,3vw,2.45rem);
          font-variant-numeric: tabular-nums lining-nums;
          font-weight: 700;
          letter-spacing: -.045em;
          line-height: .92;
        }

        .countdown-unit-label {
          color: rgba(247,247,244,.3);
          font-family: Arial, Helvetica, sans-serif;
          font-size: .4rem;
          font-weight: 700;
          letter-spacing: .14em;
          margin-top: .3rem;
          text-transform: uppercase;
        }

        .countdown-separator {
          color: rgba(13,148,136,.42);
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(1.45rem,2.25vw,1.85rem);
          font-weight: 700;
          padding-bottom: .86rem;
        }

        @media (max-width: 768px) {
          .countdown-section {
            padding: 2.1rem 0 2.8rem;
          }

          .countdown-desktop {
            display: none !important;
          }

          .countdown-mobile {
            display: block !important;
          }

          .countdown-mobile-wrap {
            box-sizing: border-box;
            margin: 0 auto;
            max-width: 34rem;
            padding: 0 1.25rem;
            width: 100%;
          }

          .countdown-mobile-top {
            min-height: auto;
            padding-top: .1rem;
            position: relative;
          }

          .countdown-mobile-kicker {
            align-items: center;
            color: rgba(13,148,136,.82);
            display: flex;
            font-family: Arial, Helvetica, sans-serif;
            font-size: .61rem;
            font-weight: 800;
            gap: .65rem;
            justify-content: center;
            letter-spacing: .18em;
            margin-bottom: .85rem;
            position: relative;
            text-transform: uppercase;
            z-index: 2;
          }

          .countdown-mobile-kicker::before,
          .countdown-mobile-kicker::after {
            background: rgba(13,148,136,.48);
            content: "";
            height: 1px;
            max-width: 3.5rem;
            width: 18%;
          }

          .countdown-mobile-clock {
            align-items: flex-end;
            display: flex;
            gap: .18rem;
            justify-content: center;
            margin-top: 1.25rem;
            position: relative;
            z-index: 1;
          }

          .countdown-mobile-clock .countdown-unit {
            min-width: 2.9rem;
          }

          .countdown-mobile-clock .countdown-unit-value {
            color: rgba(13,148,136,.9);
            font-size: clamp(1.85rem,9vw,2.55rem);
            letter-spacing: -.07em;
          }

          .countdown-mobile-clock .countdown-unit-label {
            color: rgba(247,247,244,.42);
            font-size: .38rem;
            letter-spacing: .1em;
            margin-top: .32rem;
          }

          .countdown-mobile-clock .countdown-separator {
            color: rgba(13,148,136,.45);
            font-size: 1.35rem;
            padding-bottom: .72rem;
          }

          .countdown-mobile-match-meta {
            color: rgba(247,247,244,.56);
            font-family: Arial, Helvetica, sans-serif;
            font-size: .5rem;
            font-weight: 800;
            letter-spacing: .11em;
            margin-top: .95rem;
            position: relative;
            text-align: center;
            text-transform: uppercase;
            z-index: 1;
          }

          .countdown-mobile-match-meta span {
            color: #0d9488;
            padding: 0 .25rem;
          }

          .countdown-mobile-divider {
            background: rgba(247,247,244,.1);
            height: 1px;
            margin: 1.35rem 0 1.55rem;
          }

          .countdown-mobile-upcoming-title {
            align-items: center;
            color: #0d9488;
            display: flex;
            font-family: Arial, Helvetica, sans-serif;
            font-size: .59rem;
            font-weight: 800;
            justify-content: space-between;
            letter-spacing: .15em;
            margin-bottom: .8rem;
            text-transform: uppercase;
          }

          .countdown-mobile-schedule-link {
            color: rgba(247,247,244,.82);
            font-size: .48rem;
            letter-spacing: .1em;
            text-decoration: none;
          }

          .countdown-mobile-swipe-panel {
            box-sizing: border-box;
            padding: .1rem 0 1.15rem;
            touch-action: pan-y;
            user-select: none;
            width: 100%;
          }

          .countdown-mobile-slider {
            background:
              radial-gradient(circle at 85% 10%, rgba(13,148,136,.11), transparent 30%),
              linear-gradient(145deg, rgba(247,247,244,.045), rgba(247,247,244,.015));
            border: 1px solid rgba(247,247,244,.14);
            border-radius: .95rem;
            box-sizing: border-box;
            min-height: 11rem;
            padding: 1rem .9rem .9rem;
            width: 100%;
          }

          .countdown-mobile-slider-competition {
            color: rgba(13,148,136,.9);
            font-family: Arial, Helvetica, sans-serif;
            font-size: .54rem;
            font-weight: 800;
            letter-spacing: .15em;
            text-align: center;
            text-transform: uppercase;
          }

          .countdown-mobile-slider-teams {
            align-items: center;
            display: grid;
            gap: .45rem;
            grid-template-columns: minmax(0,1fr) auto minmax(0,1fr);
            margin: .92rem 0 .75rem;
          }

          .countdown-mobile-team {
            align-items: center;
            display: flex;
            flex-direction: column;
            gap: .5rem;
            min-width: 0;
          }

          .countdown-mobile-team-name {
            color: #f7f7f4;
            font-family: Arial, Helvetica, sans-serif;
            font-size: clamp(.72rem,3.35vw,.88rem);
            font-weight: 800;
            letter-spacing: .025em;
            line-height: 1.15;
            min-width: 0;
            overflow-wrap: anywhere;
            text-align: center;
            text-transform: uppercase;
          }

          .countdown-mobile-vs {
            align-self: center;
            color: #0d9488;
            font-family: Arial, Helvetica, sans-serif;
            font-size: .68rem;
            font-weight: 900;
            letter-spacing: .08em;
            padding-bottom: 1.15rem;
          }

          .countdown-mobile-slider-date {
            border-top: 1px solid rgba(247,247,244,.1);
            color: rgba(247,247,244,.75);
            font-family: Arial, Helvetica, sans-serif;
            font-size: .61rem;
            font-weight: 800;
            letter-spacing: .065em;
            margin-top: .25rem;
            padding-top: .7rem;
            text-align: center;
            text-transform: uppercase;
          }

          .countdown-mobile-navigation {
            align-items: center;
            display: grid;
            gap: .75rem;
            grid-template-columns: 2.55rem minmax(0,1fr) 2.55rem;
            margin-top: 1rem;
          }

          .countdown-mobile-arrow {
            align-items: center;
            background: transparent;
            border: 1px solid rgba(247,247,244,.24);
            border-radius: 50%;
            color: #f7f7f4;
            cursor: pointer;
            display: flex;
            font-size: 1rem;
            height: 2.5rem;
            justify-content: center;
            padding: 0;
            transition: all .2s ease;
            width: 2.5rem;
          }

          .countdown-mobile-arrow:disabled {
            cursor: default;
            opacity: .25;
          }

          .countdown-mobile-arrow.next {
            background: #0d9488;
            border-color: #0d9488;
            color: #080808;
          }

          .countdown-mobile-dots {
            align-items: center;
            display: flex;
            gap: .42rem;
            justify-content: center;
          }

          .countdown-mobile-dot {
            background: rgba(247,247,244,.3);
            border: 0;
            border-radius: 999px;
            cursor: pointer;
            height: .62rem;
            padding: 0;
            transition: width .25s ease, background .25s ease;
            width: .62rem;
          }

          .countdown-mobile-dot.active {
            background: #0d9488;
            width: 1.25rem;
          }
        }

        @media (max-width: 360px) {
          .countdown-mobile-wrap {
            padding-left: 1rem;
            padding-right: 1rem;
          }

          .countdown-mobile-clock .countdown-unit {
            min-width: 2.55rem;
          }

          .countdown-mobile-clock .countdown-unit-value {
            font-size: 1.7rem;
          }

          .countdown-mobile-clock .countdown-separator {
            font-size: 1.2rem;
          }

          .countdown-mobile-slider {
            padding-left: .65rem;
            padding-right: .65rem;
          }

          .countdown-mobile-team-name {
            font-size: .68rem;
          }
        }
      `}</style>

      <div className="countdown-desktop">
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

          <div style={{ marginTop: "clamp(7rem, 11vh, 10rem)" }}>
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
                  }}
                >
                  Zum Spielplan
                  <span style={{ fontSize: ".6rem" }}>→</span>
                </a>

                <div style={{ display: "flex", gap: ".4rem" }}>
                  <button
                    aria-label="Vorheriges Spiel"
                    disabled={previousIndex === null}
                    onClick={goToPreviousMatch}
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
                      width: "2rem",
                    }}
                  >
                    ←
                  </button>

                  <button
                    aria-label="Nächstes Spiel"
                    disabled={nextIndex === null}
                    onClick={goToNextMatch}
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
                      width: "2rem",
                    }}
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            <div
              className="countdown-swipe-area"
              onPointerDown={handleSwipeStart}
              onPointerUp={handleDesktopSwipeEnd}
              onPointerCancel={handleDesktopSwipeEnd}
              onWheel={handleDesktopTrackpadWheel}
              style={{
                cursor: "grab",
                overflow: "hidden",
                padding: "1rem 0 1.5rem",
                position: "relative",
                touchAction: "pan-y",
                userSelect: "none",
                width: "100%",
              }}
            >
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  transform: `translate3d(calc(50% - 15rem - ${activeIndex} * 31.2rem), 0, 0)`,
                  transition: "transform .65s cubic-bezier(.25,1,.5,1)",
                  width: "100%",
                  willChange: "transform",
                }}
              >
                {MATCHES.map((match, index) => (
                  <div
                    key={`${match.displayDate}-${match.homeTeam}`}
                    onClick={() => setActiveIndex(index)}
                    style={{
                      cursor: index === activeIndex ? "default" : "pointer",
                      flex: "0 0 30rem",
                      marginRight: "1.2rem",
                    }}
                  >
                    <MatchCard
                      active={index === activeIndex}
                      isNextMatch={index === 0}
                      logos={logos}
                      match={match}
                    />
                  </div>
                ))}
              </div>
            </div>

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
                      background: isActive
                        ? "#0d9488"
                        : "rgba(247,247,244,.32)",
                      border: 0,
                      borderRadius: "999px",
                      cursor: "pointer",
                      height: ".7rem",
                      padding: 0,
                      transition:
                        "width .35s cubic-bezier(.25,1,.5,1), background .25s ease",
                      width: isActive ? "1.25rem" : ".7rem",
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="countdown-mobile">
        <div className="countdown-mobile-wrap">
          <div className="countdown-mobile-top">
            <div className="countdown-mobile-kicker">Nächstes Spiel</div>

            <div className="countdown-mobile-clock">
              <Unit value={days} label="Tage" />
              <Separator />
              <Unit value={hours} label="Std." />
              <Separator />
              <Unit value={minutes} label="Min." />
              <Separator />
              <Unit value={seconds} label="Sek." />
            </div>

            <div className="countdown-mobile-match-meta">
              {NEXT_MATCH.competition}
              <span>·</span>
              {NEXT_MATCH.displayDate}
              <span>·</span>
              {NEXT_MATCH.displayTime}
            </div>
          </div>

          <div className="countdown-mobile-divider" />

          <div className="countdown-mobile-upcoming-title">
            <span>Die nächsten Spiele</span>
            <a className="countdown-mobile-schedule-link" href="/spielplan">
              Spielplan →
            </a>
          </div>

          <div
            className="countdown-mobile-swipe-panel countdown-swipe-area"
            onPointerDown={handleSwipeStart}
            onPointerUp={handleMobileSwipeEnd}
            onPointerCancel={handleMobileSwipeEnd}
            onWheel={handleMobileTrackpadWheel}
          >
            <article className="countdown-mobile-slider">
              <div className="countdown-mobile-slider-competition">
                {mobileActiveMatch.competition}
              </div>

              <div className="countdown-mobile-slider-teams">
                <div className="countdown-mobile-team">
                  <ClubLogo
                    alt={mobileActiveMatch.homeTeam}
                    mobile
                    src={mobileActiveMatch.homeLogo}
                    transparentSrc={transparentLogo(
                      mobileActiveMatch.homeLogo,
                    )}
                  />

                  <div className="countdown-mobile-team-name">
                    {mobileActiveMatch.homeTeam}
                  </div>
                </div>

                <div className="countdown-mobile-vs">VS</div>

                <div className="countdown-mobile-team">
                  <ClubLogo
                    alt={mobileActiveMatch.awayTeam}
                    mobile
                    src={mobileActiveMatch.awayLogo}
                    transparentSrc={transparentLogo(
                      mobileActiveMatch.awayLogo,
                    )}
                  />

                  <div className="countdown-mobile-team-name">
                    {mobileActiveMatch.awayTeam}
                  </div>
                </div>
              </div>

              <div className="countdown-mobile-slider-date">
                {mobileActiveMatch.displayDate}
                <span style={{ color: "#0d9488", padding: "0 .28rem" }}>
                  ·
                </span>
                {mobileActiveMatch.displayTime}
              </div>
            </article>

            <div className="countdown-mobile-navigation">
              <button
                aria-label="Vorheriges Spiel"
                className="countdown-mobile-arrow"
                disabled={previousMobileIndex === null}
                onClick={goToPreviousMobileMatch}
                type="button"
              >
                ←
              </button>

              <div className="countdown-mobile-dots">
                {UPCOMING_MATCHES.map((match, index) => (
                  <button
                    aria-current={
                      index === mobileActiveIndex ? "true" : undefined
                    }
                    aria-label={`${index + 1}. Spiel: ${match.homeTeam} gegen ${match.awayTeam}`}
                    className={`countdown-mobile-dot ${
                      index === mobileActiveIndex ? "active" : ""
                    }`}
                    key={`${match.displayDate}-${match.homeTeam}`}
                    onClick={() => setMobileActiveIndex(index)}
                    type="button"
                  />
                ))}
              </div>

              <button
                aria-label="Nächstes Spiel"
                className="countdown-mobile-arrow next"
                disabled={nextMobileIndex === null}
                onClick={goToNextMobileMatch}
                type="button"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}