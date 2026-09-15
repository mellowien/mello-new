import Image from "next/image";
import Link from "next/link";

const MELLO_LOGO = "/mello-wien.png";

type LogoShape = "round" | "diamond" | "balloon";

type Match = {
  round: string;
  phase: "Hinrunde" | "Rückrunde";
  competition: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo?: string;
  awayLogo?: string;
  homeLogoShape?: LogoShape;
  awayLogoShape?: LogoShape;
  date: string;
  time: string;
  venue: string;
  address: string;
  type: "Heimspiel" | "Auswärtsspiel";
  result?: string;
  status?: "finished" | "upcoming";
  next?: boolean;
};

const HOME_VENUE = "Polizeisportanlage";
const HOME_ADDRESS = "Dampfschiffhaufen 2 · 1220 Wien";

const MATCHES: Match[] = [
  {
    round: "01",
    phase: "Hinrunde",
    competition: "1. Klasse A",
    homeTeam: "FC Mello Wien",
    awayTeam: "FC Polska",
    homeLogo: MELLO_LOGO,
    awayLogo: "/polska-wien.png",
    date: "Sonntag, 06. September 2026",
    time: "11:30 Uhr",
    venue: HOME_VENUE,
    address: HOME_ADDRESS,
    type: "Heimspiel",
    result: "1 : 5",
    status: "finished",
  },
  {
    round: "02",
    phase: "Hinrunde",
    competition: "1. Klasse A",
    homeTeam: "Peñarol Wien",
    awayTeam: "FC Mello Wien",
    homeLogo: "/penarol-wien.png",
    awayLogo: MELLO_LOGO,
    homeLogoShape: "round",
    date: "Sonntag, 13. September 2026",
    time: "14:00 Uhr",
    venue: "Wienerbergplatz",
    address: "Computerstraße 3 · 1100 Wien",
    type: "Auswärtsspiel",
    result: "4 : 1",
    status: "finished",
  },
  {
    round: "03",
    phase: "Hinrunde",
    competition: "1. Klasse A",
    homeTeam: "FC Mello Wien",
    awayTeam: "Yellow Star",
    homeLogo: MELLO_LOGO,
    awayLogo: "/yellow-star.png",
    awayLogoShape: "round",
    date: "Sonntag, 20. September 2026",
    time: "11:30 Uhr",
    venue: HOME_VENUE,
    address: HOME_ADDRESS,
    type: "Heimspiel",
    status: "upcoming",
    next: true,
  },
  {
    round: "04",
    phase: "Hinrunde",
    competition: "1. Klasse A",
    homeTeam: "Penzinger SV",
    awayTeam: "FC Mello Wien",
    homeLogo: "/penzing.png",
    awayLogo: MELLO_LOGO,
    date: "Samstag, 26. September 2026",
    time: "18:00 Uhr",
    venue: "Kinkplatz – Austria 13",
    address: "Kinkplatz · 1140 Wien",
    type: "Auswärtsspiel",
  },
  {
    round: "05",
    phase: "Hinrunde",
    competition: "1. Klasse A",
    homeTeam: "FC Mello Wien",
    awayTeam: "ASK Erlaa Torpedo 03",
    homeLogo: MELLO_LOGO,
    awayLogo: "/erlaa-torpedo.png",
    date: "Sonntag, 04. Oktober 2026",
    time: "11:30 Uhr",
    venue: HOME_VENUE,
    address: HOME_ADDRESS,
    type: "Heimspiel",
  },
  {
    round: "06",
    phase: "Hinrunde",
    competition: "1. Klasse A",
    homeTeam: "Vienna 2016",
    awayTeam: "FC Mello Wien",
    homeLogo: "/Vienna2016.png",
    awayLogo: MELLO_LOGO,
    homeLogoShape: "diamond",
    date: "Samstag, 10. Oktober 2026",
    time: "17:00 Uhr",
    venue: "Donaustadt – Gemeinde Wien 22",
    address: "Am Langen Felde 60 · 1220 Wien",
    type: "Auswärtsspiel",
  },
  {
    round: "07",
    phase: "Hinrunde",
    competition: "1. Klasse A",
    homeTeam: "FC Mello Wien",
    awayTeam: "ESV Ottakring",
    homeLogo: MELLO_LOGO,
    awayLogo: "/Ottakring.png",
    date: "Sonntag, 25. Oktober 2026",
    time: "11:30 Uhr",
    venue: HOME_VENUE,
    address: HOME_ADDRESS,
    type: "Heimspiel",
  },
  {
    round: "08",
    phase: "Hinrunde",
    competition: "1. Klasse A",
    homeTeam: "Mariahilf",
    awayTeam: "FC Mello Wien",
    homeLogo: "/Mariahilf.jpeg",
    awayLogo: MELLO_LOGO,
    homeLogoShape: "round",
    date: "Sonntag, 01. November 2026",
    time: "14:15 Uhr",
    venue: "SGP Simmering",
    address: "Leberstraße 84 · 1110 Wien",
    type: "Auswärtsspiel",
  },
  {
    round: "09",
    phase: "Hinrunde",
    competition: "1. Klasse A",
    homeTeam: "FC Mello Wien",
    awayTeam: "Srbija Wien",
    homeLogo: MELLO_LOGO,
    awayLogo: "/Srbija.png",
    awayLogoShape: "round",
    date: "Sonntag, 08. November 2026",
    time: "11:30 Uhr",
    venue: HOME_VENUE,
    address: HOME_ADDRESS,
    type: "Heimspiel",
  },
  {
    round: "10",
    phase: "Hinrunde",
    competition: "1. Klasse A",
    homeTeam: "Margaretner AC",
    awayTeam: "FC Mello Wien",
    homeLogo: "/Margareten.jpeg",
    awayLogo: MELLO_LOGO,
    homeLogoShape: "balloon",
    date: "Sonntag, 15. November 2026",
    time: "12:00 Uhr",
    venue: "Gem. Wien 10, Eibesbrunnerg.",
    address: "Eibesbrunnergasse 13 · 1100 Wien",
    type: "Auswärtsspiel",
  },
  {
    round: "11",
    phase: "Hinrunde",
    competition: "1. Klasse A",
    homeTeam: "FC Mello Wien",
    awayTeam: "Besa Wien",
    homeLogo: MELLO_LOGO,
    awayLogo: "/Besa.jpeg",
    awayLogoShape: "round",
    date: "Sonntag, 22. November 2026",
    time: "11:30 Uhr",
    venue: HOME_VENUE,
    address: HOME_ADDRESS,
    type: "Heimspiel",
  },
  {
    round: "12",
    phase: "Hinrunde",
    competition: "1. Klasse A",
    homeTeam: "Gipsy Kings Vienna",
    awayTeam: "FC Mello Wien",
    homeLogo: "/Gipsy.png",
    awayLogo: MELLO_LOGO,
    date: "Sonntag, 29. November 2026",
    time: "14:00 Uhr",
    venue: "FavAC",
    address: "Kennergasse 3 · 1100 Wien",
    type: "Auswärtsspiel",
  },
  {
    round: "13",
    phase: "Rückrunde",
    competition: "1. Klasse A",
    homeTeam: "FC Mello Wien",
    awayTeam: "Gipsy Kings Vienna",
    homeLogo: MELLO_LOGO,
    awayLogo: "/Gipsy.png",
    date: "Termin folgt",
    time: "Anpfiff folgt",
    venue: HOME_VENUE,
    address: HOME_ADDRESS,
    type: "Heimspiel",
  },
  {
    round: "14",
    phase: "Rückrunde",
    competition: "1. Klasse A",
    homeTeam: "FC Polska",
    awayTeam: "FC Mello Wien",
    homeLogo: "/polska-wien.png",
    awayLogo: MELLO_LOGO,
    date: "Termin folgt",
    time: "Anpfiff folgt",
    venue: "FavAC",
    address: "Kennergasse 3 · 1100 Wien",
    type: "Auswärtsspiel",
  },
  {
    round: "15",
    phase: "Rückrunde",
    competition: "1. Klasse A",
    homeTeam: "FC Mello Wien",
    awayTeam: "Peñarol Wien",
    homeLogo: MELLO_LOGO,
    awayLogo: "/penarol-wien.png",
    awayLogoShape: "round",
    date: "Termin folgt",
    time: "Anpfiff folgt",
    venue: HOME_VENUE,
    address: HOME_ADDRESS,
    type: "Heimspiel",
  },
  {
    round: "16",
    phase: "Rückrunde",
    competition: "1. Klasse A",
    homeTeam: "Yellow Star",
    awayTeam: "FC Mello Wien",
    homeLogo: "/yellow-star.png",
    awayLogo: MELLO_LOGO,
    homeLogoShape: "round",
    date: "Termin folgt",
    time: "Anpfiff folgt",
    venue: "Simmering",
    address: "Simmeringer Hauptstraße 207–211 · 1110 Wien",
    type: "Auswärtsspiel",
  },
  {
    round: "17",
    phase: "Rückrunde",
    competition: "1. Klasse A",
    homeTeam: "FC Mello Wien",
    awayTeam: "Penzinger SV",
    homeLogo: MELLO_LOGO,
    awayLogo: "/penzing.png",
    date: "Termin folgt",
    time: "Anpfiff folgt",
    venue: HOME_VENUE,
    address: HOME_ADDRESS,
    type: "Heimspiel",
  },
  {
    round: "18",
    phase: "Rückrunde",
    competition: "1. Klasse A",
    homeTeam: "ASK Erlaa Torpedo 03",
    awayTeam: "FC Mello Wien",
    homeLogo: "/erlaa-torpedo.png",
    awayLogo: MELLO_LOGO,
    date: "Termin folgt",
    time: "Anpfiff folgt",
    venue: "ASK Erlaa",
    address: "Meischlgasse 26 · 1230 Wien",
    type: "Auswärtsspiel",
  },
  {
    round: "19",
    phase: "Rückrunde",
    competition: "1. Klasse A",
    homeTeam: "FC Mello Wien",
    awayTeam: "Vienna 2016",
    homeLogo: MELLO_LOGO,
    awayLogo: "/Vienna2016.png",
    awayLogoShape: "diamond",
    date: "Termin folgt",
    time: "Anpfiff folgt",
    venue: HOME_VENUE,
    address: HOME_ADDRESS,
    type: "Heimspiel",
  },
  {
    round: "20",
    phase: "Rückrunde",
    competition: "1. Klasse A",
    homeTeam: "ESV Ottakring",
    awayTeam: "FC Mello Wien",
    homeLogo: "/Ottakring.png",
    awayLogo: MELLO_LOGO,
    date: "Termin folgt",
    time: "Anpfiff folgt",
    venue: "Slovan HAC",
    address: "Steinbruchstraße 5a · 1140 Wien",
    type: "Auswärtsspiel",
  },
  {
    round: "21",
    phase: "Rückrunde",
    competition: "1. Klasse A",
    homeTeam: "FC Mello Wien",
    awayTeam: "Mariahilf",
    homeLogo: MELLO_LOGO,
    awayLogo: "/Mariahilf.jpeg",
    awayLogoShape: "round",
    date: "Termin folgt",
    time: "Anpfiff folgt",
    venue: HOME_VENUE,
    address: HOME_ADDRESS,
    type: "Heimspiel",
  },
  {
    round: "22",
    phase: "Rückrunde",
    competition: "1. Klasse A",
    homeTeam: "Srbija Wien",
    awayTeam: "FC Mello Wien",
    homeLogo: "/Srbija.png",
    awayLogo: MELLO_LOGO,
    homeLogoShape: "round",
    date: "Termin folgt",
    time: "Anpfiff folgt",
    venue: "Rennweg",
    address: "Grasbergergasse 18 · 1030 Wien",
    type: "Auswärtsspiel",
  },
  {
    round: "23",
    phase: "Rückrunde",
    competition: "1. Klasse A",
    homeTeam: "FC Mello Wien",
    awayTeam: "Margaretner AC",
    homeLogo: MELLO_LOGO,
    awayLogo: "/Margareten.jpeg",
    awayLogoShape: "balloon",
    date: "Termin folgt",
    time: "Anpfiff folgt",
    venue: HOME_VENUE,
    address: HOME_ADDRESS,
    type: "Heimspiel",
  },
  {
    round: "24",
    phase: "Rückrunde",
    competition: "1. Klasse A",
    homeTeam: "Besa Wien",
    awayTeam: "FC Mello Wien",
    homeLogo: "/Besa.jpeg",
    awayLogo: MELLO_LOGO,
    homeLogoShape: "round",
    date: "Termin folgt",
    time: "Anpfiff folgt",
    venue: "FavAC",
    address: "Kennergasse 3 · 1100 Wien",
    type: "Auswärtsspiel",
  },
];

function TeamLogo({
  src,
  alt,
  shape,
  compact = false,
}: {
  src?: string;
  alt: string;
  shape?: LogoShape;
  compact?: boolean;
}) {
  if (!src) {
    return (
      <span
        className={`team-logo-fallback${compact ? " is-compact" : ""}`}
        aria-label={`${alt} Logo folgt`}
      >
        Logo
      </span>
    );
  }

  const shapeClass = shape ? ` is-${shape}-logo` : "";

  return (
    <span
      className={`team-logo-wrap${shapeClass}${
        compact ? " is-compact" : ""
      }`}
    >
      <Image
        className="team-logo"
        src={src}
        alt={`${alt} Logo`}
        width={compact ? 48 : 112}
        height={compact ? 48 : 112}
      />
    </span>
  );
}

function FixtureStatus({ match }: { match: Match }) {
  if (match.status === "finished") {
    return (
      <div className="fixture-result" aria-label={`Endstand ${match.result}`}>
        <span>Endstand</span>
        <strong>{match.result}</strong>
      </div>
    );
  }

  if (match.next) {
    return <span className="fixture-status is-next">Nächstes Spiel</span>;
  }

  return <span className="fixture-status">{match.type}</span>;
}

function FixtureRow({ match }: { match: Match }) {
  const isFinished = match.status === "finished";
  const isNext = match.next;

  return (
    <article
      className={`fixture-row${isFinished ? " is-finished" : ""}${
        isNext ? " is-next" : ""
      }`}
    >
      <div className="fixture-round">{match.round}</div>

      <div className="fixture-clubs">
        <div className="fixture-club">
          <TeamLogo
            src={match.homeLogo}
            alt={match.homeTeam}
            shape={match.homeLogoShape}
            compact
          />
          <span>{match.homeTeam}</span>
        </div>

        <span className="fixture-vs">VS</span>

        <div className="fixture-club">
          <TeamLogo
            src={match.awayLogo}
            alt={match.awayTeam}
            shape={match.awayLogoShape}
            compact
          />
          <span>{match.awayTeam}</span>
        </div>
      </div>

      <div className="fixture-details">
        <div className="fixture-date">
          <strong>{match.date}</strong>
          <span>{match.time}</span>
        </div>

        <div className="fixture-venue">
          <strong>{match.venue}</strong>
          <span>{match.address}</span>
        </div>
      </div>

      <FixtureStatus match={match} />
    </article>
  );
}

export default function SpielplanPage() {
  const nextMatch = MATCHES.find((match) => match.next) ?? MATCHES[0];

  const firstLegMatches = MATCHES.filter(
    (match) => match.phase === "Hinrunde",
  );

  const secondLegMatches = MATCHES.filter(
    (match) => match.phase === "Rückrunde",
  );

  return (
    <main className="schedule-page">
      <style>{`
        .schedule-page {
          --ink: #080808;
          --paper: #f7f7f4;
          --teal: #0d9488;
          --teal-bright: #14b8a6;
          --line: rgba(247,247,244,.12);
          --muted: rgba(247,247,244,.62);
          min-height: 100vh;
          overflow: hidden;
          background: var(--ink);
          color: var(--paper);
          font-family: Arial, Helvetica, sans-serif;
          padding-top: 88px;
        }

        .schedule-page * {
          box-sizing: border-box;
        }

        .schedule-shell {
          width: min(100% - 6rem, 1440px);
          margin: 0 auto;
        }

        .schedule-hero {
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid var(--line);
          padding: 4.7rem 0 4.9rem;
          background:
            radial-gradient(
              ellipse 50% 128% at 96% 42%,
              rgba(13,148,136,.17),
              transparent 74%
            ),
            linear-gradient(116deg,#080808 0%,#080808 55%,#091311 100%);
        }

        .schedule-hero::after {
          content: "";
          position: absolute;
          right: -13rem;
          bottom: -18rem;
          width: 44rem;
          height: 44rem;
          border: 1px solid rgba(13,148,136,.14);
          border-radius: 50%;
          box-shadow:
            0 0 0 3.5rem rgba(13,148,136,.025),
            0 0 0 7rem rgba(13,148,136,.015);
          pointer-events: none;
        }

        .schedule-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 1000px;
        }

        .schedule-back {
          display: inline-flex;
          align-items: center;
          min-height: 2.6rem;
          gap: .55rem;
          border: 1px solid rgba(247,247,244,.16);
          border-radius: 999px;
          padding: 0 1rem;
          color: rgba(247,247,244,.70);
          font-size: .63rem;
          font-weight: 800;
          letter-spacing: .12em;
          text-decoration: none;
          text-transform: uppercase;
          transition: color .2s ease, border-color .2s ease, background .2s ease;
        }

        .schedule-back:hover {
          border-color: rgba(13,148,136,.7);
          background: rgba(13,148,136,.08);
          color: var(--teal);
        }

        .schedule-eyebrow {
          display: flex;
          align-items: center;
          gap: .65rem;
          margin: 2rem 0 1.55rem;
          color: var(--teal);
          font-size: .67rem;
          font-weight: 900;
          letter-spacing: .16em;
          text-transform: uppercase;
        }

        .schedule-eyebrow::before {
          content: "";
          width: .42rem;
          height: .42rem;
          border-radius: 50%;
          background: var(--teal);
          box-shadow: 0 0 11px rgba(13,148,136,.78);
        }

        .schedule-title {
          margin: 0;
          color: var(--paper);
          font-size: clamp(3.65rem,8vw,8.6rem);
          font-weight: 900;
          letter-spacing: -.09em;
          line-height: .82;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .schedule-lead {
          max-width: 59ch;
          margin: 2.3rem 0 0;
          color: rgba(247,247,244,.74);
          font-size: clamp(1rem,1.35vw,1.16rem);
          line-height: 1.78;
        }

        .next-section {
          border-bottom: 1px solid var(--line);
          padding: 4.35rem 0;
          background: #090a0a;
        }

        .section-kicker {
          margin: 0 0 .75rem;
          color: var(--teal);
          font-size: .65rem;
          font-weight: 900;
          letter-spacing: .16em;
          text-transform: uppercase;
        }

        .section-title {
          margin: 0;
          color: var(--paper);
          font-size: clamp(1.9rem,3.5vw,3.65rem);
          font-weight: 900;
          letter-spacing: -.07em;
          line-height: .88;
          text-transform: uppercase;
        }

        .section-title span {
          color: var(--teal);
        }

        .next-fixture {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0,1fr) auto minmax(0,1fr);
          gap: clamp(1rem,4vw,4.6rem);
          align-items: center;
          overflow: hidden;
          margin-top: 2rem;
          border: 1px solid rgba(13,148,136,.62);
          border-radius: 1.15rem;
          padding: clamp(1.6rem,4vw,3rem);
          background:
            radial-gradient(circle at 90% 12%,rgba(13,148,136,.20),transparent 37%),
            linear-gradient(145deg,rgba(13,148,136,.09),rgba(8,8,8,.96) 72%);
        }

        .next-fixture::before {
          content: "";
          position: absolute;
          right: -8rem;
          bottom: -8rem;
          width: 23rem;
          height: 23rem;
          border: 1px solid rgba(13,148,136,.18);
          border-radius: 50%;
          pointer-events: none;
        }

        .next-team {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: .8rem;
          min-width: 0;
        }

        .team-logo-wrap,
        .team-logo-fallback {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: clamp(4.7rem,9vw,6.9rem);
          height: clamp(4.7rem,9vw,6.9rem);
          flex: 0 0 auto;
        }

        .team-logo-wrap {
          overflow: hidden;
        }

        .team-logo-wrap.is-round-logo {
          border: 1px solid rgba(247,247,244,.16);
          border-radius: 50%;
          background: var(--paper);
          box-shadow:
            0 0 0 .16rem rgba(8,8,8,.96),
            0 0 1rem rgba(13,148,136,.12);
        }

        .team-logo-wrap.is-diamond-logo {
          background: var(--paper);
          clip-path: polygon(
            50% 2.5%,54% 3.5%,96.5% 46%,97.5% 50%,96.5% 54%,
            54% 96.5%,50% 97.5%,46% 96.5%,3.5% 54%,2.5% 50%,
            3.5% 46%,46% 3.5%
          );
          filter: drop-shadow(0 0 .65rem rgba(13,148,136,.15));
        }

        .team-logo-wrap.is-balloon-logo {
          border: 1px solid rgba(247,247,244,.16);
          border-radius: 58% 58% 44% 44% / 31% 31% 74% 74%;
          background: var(--paper);
          transform: scaleX(.78) scaleY(1.06);
        }

        .team-logo {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 0 .8rem rgba(13,148,136,.12));
        }

        .team-logo-wrap.is-round-logo .team-logo,
        .team-logo-wrap.is-diamond-logo .team-logo,
        .team-logo-wrap.is-balloon-logo .team-logo {
          object-fit: cover;
          filter: none;
          transform: scale(1.08);
        }

        .team-logo-wrap.is-balloon-logo .team-logo {
          transform: scale(1.29) translateY(2%);
          transform-origin: center 45%;
        }

        .team-logo-fallback {
          border: 1px solid rgba(247,247,244,.16);
          border-radius: 50%;
          color: rgba(247,247,244,.28);
          font-size: .5rem;
          font-weight: 900;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        .next-team-name {
          margin: 0;
          color: var(--paper);
          font-size: clamp(.95rem,1.7vw,1.45rem);
          font-weight: 900;
          letter-spacing: -.045em;
          line-height: 1;
          text-align: center;
          text-transform: uppercase;
        }

        .next-center {
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .next-competition {
          color: var(--teal);
          font-size: .64rem;
          font-weight: 900;
          letter-spacing: .15em;
          text-transform: uppercase;
        }

        .next-vs {
          margin: .75rem 0;
          color: var(--paper);
          font-size: clamp(2.15rem,4.2vw,3.95rem);
          font-weight: 900;
          letter-spacing: -.085em;
          line-height: .78;
        }

        .next-date {
          color: rgba(247,247,244,.72);
          font-size: .71rem;
          font-weight: 800;
          letter-spacing: .1em;
          line-height: 1.65;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .next-venue {
          position: relative;
          z-index: 1;
          margin: 1.4rem 0 0;
          color: rgba(247,247,244,.52);
          font-size: .74rem;
          font-weight: 700;
          letter-spacing: .05em;
          line-height: 1.6;
          text-align: center;
        }

        .schedule-list-section {
          padding: 5rem 0 6rem;
        }

        .schedule-list-head {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .schedule-description {
          max-width: 46ch;
          margin: 0;
          color: var(--muted);
          font-size: .92rem;
          line-height: 1.68;
        }

        .phase-section + .phase-section {
          margin-top: 4.7rem;
        }

        .phase-heading {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: .9rem;
        }

        .phase-heading h3 {
          margin: 0;
          color: var(--paper);
          font-size: clamp(1.35rem,2.3vw,2rem);
          font-weight: 900;
          letter-spacing: -.055em;
          line-height: .95;
          text-transform: uppercase;
        }

        .phase-heading span {
          width: 100%;
          height: 1px;
          background: var(--line);
        }

        .fixtures-list {
          border-top: 1px solid var(--line);
        }

        .fixture-row {
          display: grid;
          grid-template-columns: 2.7rem minmax(17rem,1.3fr) minmax(16rem,.95fr) 8.6rem;
          align-items: center;
          gap: clamp(.9rem,2vw,2rem);
          border-bottom: 1px solid var(--line);
          min-height: 5.35rem;
          padding: .75rem 0;
          transition: background .2s ease, border-color .2s ease;
        }

        .fixture-row:hover {
          background: rgba(13,148,136,.035);
        }

        .fixture-row.is-finished {
          background: rgba(247,247,244,.018);
        }

        .fixture-row.is-next {
          background:
            linear-gradient(90deg,rgba(13,148,136,.075),rgba(13,148,136,.018) 58%,transparent);
          border-bottom-color: rgba(13,148,136,.3);
        }

        .fixture-round {
          color: rgba(247,247,244,.33);
          font-size: .68rem;
          font-weight: 900;
          letter-spacing: .08em;
        }

        .fixture-clubs {
          display: flex;
          align-items: center;
          gap: .45rem;
          min-width: 0;
        }

        .fixture-club {
          display: flex;
          align-items: center;
          gap: .55rem;
          min-width: 0;
          flex: 1 1 0;
        }

        .fixture-club:last-child {
          flex-direction: row-reverse;
          text-align: right;
        }

        .team-logo-wrap.is-compact,
        .team-logo-fallback.is-compact {
          width: 2.15rem;
          height: 2.15rem;
        }

        .fixture-club span {
          color: var(--paper);
          font-size: .76rem;
          font-weight: 800;
          letter-spacing: -.02em;
          line-height: 1.18;
          overflow-wrap: anywhere;
          text-transform: uppercase;
        }

        .fixture-vs {
          color: var(--teal);
          font-size: .52rem;
          font-weight: 900;
          flex: 0 0 auto;
          letter-spacing: .08em;
        }

        .fixture-details {
          display: grid;
          grid-template-columns: minmax(0,1fr) minmax(0,1fr);
          gap: 1.1rem;
          min-width: 0;
        }

        .fixture-date,
        .fixture-venue {
          display: flex;
          flex-direction: column;
          gap: .18rem;
          min-width: 0;
        }

        .fixture-date strong,
        .fixture-venue strong {
          color: rgba(247,247,244,.84);
          font-size: .68rem;
          font-weight: 800;
          line-height: 1.3;
        }

        .fixture-date span,
        .fixture-venue span {
          color: rgba(247,247,244,.49);
          font-size: .62rem;
          font-weight: 700;
          line-height: 1.35;
        }

        .fixture-status,
        .fixture-result {
          justify-self: end;
          align-items: center;
          justify-content: center;
          width: 8.6rem;
          min-height: 1.85rem;
          border-radius: 999px;
          padding: 0 .55rem;
          text-align: center;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .fixture-status {
          display: inline-flex;
          border: 1px solid rgba(13,148,136,.4);
          background: rgba(13,148,136,.08);
          color: var(--teal);
          font-size: .52rem;
          font-weight: 900;
          letter-spacing: .11em;
        }

        .fixture-status.is-next {
          border-color: var(--teal);
          background: var(--teal);
          color: var(--ink);
        }

        .fixture-result {
          display: flex;
          flex-direction: column;
          gap: .06rem;
          border: 1px solid rgba(247,247,244,.18);
          background: rgba(247,247,244,.035);
          color: rgba(247,247,244,.5);
          font-size: .45rem;
          font-weight: 900;
          letter-spacing: .1em;
          line-height: 1;
        }

        .fixture-result strong {
          color: var(--paper);
          font-size: .82rem;
          font-weight: 900;
          letter-spacing: -.03em;
        }

        .schedule-note {
          margin-top: 2.4rem;
          border-left: 2px solid var(--teal);
          padding: .25rem 0 .25rem 1.2rem;
          color: rgba(247,247,244,.56);
          font-size: .84rem;
          line-height: 1.65;
        }

        @media (max-width: 1120px) {
          .fixture-row {
            grid-template-columns: 2.5rem minmax(15rem,1.2fr) minmax(10rem,.7fr) 7.7rem;
          }

          .fixture-details {
            grid-template-columns: 1fr;
            gap: .35rem;
          }

          .fixture-venue {
            display: none;
          }

          .fixture-status,
          .fixture-result {
            width: 7.7rem;
          }
        }

        @media (max-width: 900px) {
          .schedule-shell {
            width: min(100% - 2.5rem,1440px);
          }

          .schedule-hero {
            padding: 4rem 0 4.2rem;
          }

          .next-fixture {
            grid-template-columns: 1fr;
            gap: 1.15rem;
          }

          .next-center {
            order: 2;
          }

          .next-team:first-child {
            order: 1;
          }

          .next-team:last-child {
            order: 3;
          }

          .schedule-list-head {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (max-width: 680px) {
          .schedule-page {
            padding-top: 72px;
          }

          .schedule-shell {
            width: min(100% - 2rem,40rem);
          }

          .schedule-title {
            font-size: clamp(3rem,14vw,4.65rem);
            letter-spacing: -.08em;
          }

          .schedule-hero {
            padding: 2.9rem 0 3.2rem;
          }

          .schedule-lead {
            font-size: .96rem;
            line-height: 1.7;
            margin-top: 1.65rem;
          }

          .next-section {
            padding: 3.65rem 0;
          }

          .next-fixture {
            margin-top: 1.65rem;
            padding: 1.4rem 1rem;
          }

          .next-team {
            gap: .6rem;
          }

          .next-team .team-logo-wrap,
          .next-team .team-logo-fallback {
            width: 4.3rem;
            height: 4.3rem;
          }

          .next-team-name {
            font-size: .9rem;
          }

          .next-competition {
            font-size: .54rem;
          }

          .next-vs {
            font-size: 2rem;
            margin: .55rem 0;
          }

          .next-date {
            font-size: .61rem;
            line-height: 1.5;
            white-space: normal;
          }

          .next-venue {
            font-size: .68rem;
            margin-top: 1rem;
          }

          .schedule-list-section {
            padding: 4rem 0 4.7rem;
          }

          .schedule-list-head {
            margin-bottom: 1.45rem;
          }

          .schedule-description {
            font-size: .86rem;
            line-height: 1.6;
          }

          .phase-section + .phase-section {
            margin-top: 3.7rem;
          }

          .phase-heading {
            gap: .75rem;
            margin-bottom: .75rem;
          }

          .phase-heading h3 {
            font-size: 1.55rem;
          }

          .fixture-row {
            display: grid;
            grid-template-columns: 2.25rem minmax(0,1fr);
            gap: .7rem .85rem;
            min-height: 0;
            padding: 1.05rem 0;
          }

          .fixture-row.is-next {
            margin: 0 -.55rem;
            padding: 1.05rem .55rem;
          }

          .fixture-round {
            align-self: start;
            padding-top: .4rem;
          }

          .fixture-clubs {
            gap: .35rem;
            width: 100%;
          }

          .fixture-club {
            gap: .42rem;
          }

          .team-logo-wrap.is-compact,
          .team-logo-fallback.is-compact {
            width: 2rem;
            height: 2rem;
          }

          .fixture-club span {
            font-size: .71rem;
            line-height: 1.16;
          }

          .fixture-vs {
            font-size: .46rem;
          }

          .fixture-details {
            grid-column: 2;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: .6rem .85rem;
            margin-top: .1rem;
          }

          .fixture-date,
          .fixture-venue {
            display: flex;
            gap: .12rem;
          }

          .fixture-date strong,
          .fixture-venue strong {
            font-size: .61rem;
          }

          .fixture-date span,
          .fixture-venue span {
            font-size: .56rem;
            line-height: 1.3;
          }

          .fixture-status,
          .fixture-result {
            grid-column: 2;
            justify-self: start;
            margin-top: .15rem;
            width: 100%;
            max-width: 12rem;
            min-height: 1.8rem;
          }

          .fixture-status {
            font-size: .49rem;
          }

          .fixture-result {
            flex-direction: row;
            gap: .45rem;
            justify-content: flex-start;
            padding-left: .8rem;
          }

          .fixture-result strong {
            font-size: .78rem;
          }

          .schedule-note {
            font-size: .79rem;
            margin-top: 2rem;
            padding-left: 1rem;
          }
        }

        @media (max-width: 380px) {
          .schedule-shell {
            width: min(100% - 1.5rem,40rem);
          }

          .fixture-row {
            grid-template-columns: 1.8rem minmax(0,1fr);
            gap: .65rem;
          }

          .fixture-details {
            grid-template-columns: 1fr;
            gap: .35rem;
          }

          .fixture-club span {
            font-size: .67rem;
          }

          .team-logo-wrap.is-compact,
          .team-logo-fallback.is-compact {
            width: 1.82rem;
            height: 1.82rem;
          }
        }
      `}</style>

      <section className="schedule-hero">
        <div className="schedule-shell schedule-hero-inner">
          <Link className="schedule-back" href="/">
            <span aria-hidden="true">←</span> Zur Startseite
          </Link>

          <p className="schedule-eyebrow">FC Mello Wien · Kampfmannschaft</p>

          <h1 className="schedule-title">Spielplan.</h1>

          <p className="schedule-lead">
            Alle Spiele von FC Mello Wien in der 1. Klasse A. Heimspiele finden
            an der Polizeisportanlage am Dampfschiffhaufen statt — wir freuen
            uns auf jede Unterstützung an der Seitenlinie.
          </p>
        </div>
      </section>

      <section className="next-section">
        <div className="schedule-shell">
          <p className="section-kicker">Als Nächstes</p>

          <h2 className="section-title">
            Der nächste <span>Test.</span>
          </h2>

          <article className="next-fixture">
            <div className="next-team">
              <TeamLogo
                src={nextMatch.homeLogo}
                alt={nextMatch.homeTeam}
                shape={nextMatch.homeLogoShape}
              />
              <p className="next-team-name">{nextMatch.homeTeam}</p>
            </div>

            <div className="next-center">
              <div className="next-competition">{nextMatch.competition}</div>
              <div className="next-vs">VS</div>
              <div className="next-date">
                {nextMatch.date}
                <br />
                {nextMatch.time}
              </div>
            </div>

            <div className="next-team">
              <TeamLogo
                src={nextMatch.awayLogo}
                alt={nextMatch.awayTeam}
                shape={nextMatch.awayLogoShape}
              />
              <p className="next-team-name">{nextMatch.awayTeam}</p>
            </div>
          </article>

          <p className="next-venue">
            {nextMatch.venue} · {nextMatch.address}
          </p>
        </div>
      </section>

      <section className="schedule-shell schedule-list-section">
        <div className="schedule-list-head">
          <div>
            <p className="section-kicker">Saison 2026 / 27</p>

            <h2 className="section-title">
              Alle <span>Spiele.</span>
            </h2>
          </div>

          <p className="schedule-description">
            Termine, Uhrzeiten und Spielorte können sich ändern. Bei
            Verschiebungen aktualisieren wir den Spielplan so rasch wie
            möglich.
          </p>
        </div>

        <div className="phase-section">
          <div className="phase-heading">
            <h3>Hinrunde</h3>
            <span aria-hidden="true" />
          </div>

          <div className="fixtures-list">
            {firstLegMatches.map((match) => (
              <FixtureRow key={match.round} match={match} />
            ))}
          </div>
        </div>

        <div className="phase-section">
          <div className="phase-heading">
            <h3>Rückrunde</h3>
            <span aria-hidden="true" />
          </div>

          <div className="fixtures-list">
            {secondLegMatches.map((match) => (
              <FixtureRow key={match.round} match={match} />
            ))}
          </div>
        </div>

        <p className="schedule-note">
          Spielplan-Stand: September 2026. Die Termine der Rückrunde werden
          ergänzt, sobald sie offiziell feststehen.
        </p>
      </section>
    </main>
  );
}