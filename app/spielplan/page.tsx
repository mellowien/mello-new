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
    next: true,
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
    date: "Samstag, 12. September 2026",
    time: "16:00 Uhr",
    venue: "Wienerbergplatz",
    address: "Computerstraße 3 · 1100 Wien",
    type: "Auswärtsspiel",
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
    date: "Sonntag, 11. Oktober 2026",
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
}: {
  src?: string;
  alt: string;
  shape?: LogoShape;
}) {
  if (!src) {
    return (
      <div className="fixture-logo-fallback" aria-label={`${alt} Logo folgt`}>
        Logo
      </div>
    );
  }

  const shapeClass = shape ? ` is-${shape}-logo` : "";

  return (
    <div className={`fixture-logo-wrap${shapeClass}`}>
      <Image
        className="fixture-logo"
        src={src}
        alt={`${alt} Logo`}
        width={96}
        height={96}
      />
    </div>
  );
}

function SmallLogo({
  src,
  alt,
  shape,
}: {
  src?: string;
  alt: string;
  shape?: LogoShape;
}) {
  if (!src) {
    return (
      <span
        className="fixture-row-logo-fallback"
        aria-label={`${alt} Logo folgt`}
      />
    );
  }

  const shapeClass = shape ? ` is-${shape}-logo` : "";

  return (
    <span className={`fixture-row-logo-wrap${shapeClass}`}>
      <Image
        className="fixture-row-logo"
        src={src}
        alt=""
        width={40}
        height={40}
      />
    </span>
  );
}

function FixtureRow({ match }: { match: Match }) {
  const pending = match.phase === "Rückrunde";

  return (
    <article className="fixture-row">
      <div className="fixture-round">{match.round}</div>

      <div className="fixture-opponents">
        <div className="fixture-row-logos" aria-hidden="true">
          <SmallLogo
            src={match.homeLogo}
            alt={match.homeTeam}
            shape={match.homeLogoShape}
          />
          <span className="fixture-row-vs">VS</span>
          <SmallLogo
            src={match.awayLogo}
            alt={match.awayTeam}
            shape={match.awayLogoShape}
          />
        </div>

        <div className="fixture-row-teams">
          <p>
            {match.homeTeam} <span>vs.</span> {match.awayTeam}
          </p>
        </div>
      </div>

      <div className={`fixture-row-date${pending ? " is-pending" : ""}`}>
        <strong>{match.date}</strong>
        <br />
        <span>{match.time}</span>
      </div>

      <div className="fixture-row-venue">
        <strong>{match.venue}</strong>
        <br />
        {match.address}
      </div>

      <span className="fixture-type">{match.type}</span>
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
          --line: rgba(247, 247, 244, .12);
          --muted: rgba(247, 247, 244, .64);
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
          padding: 4.8rem 0 5.1rem;
          background:
            radial-gradient(
              ellipse 50% 128% at 96% 42%,
              rgba(13, 148, 136, .17),
              transparent 74%
            ),
            linear-gradient(116deg, #080808 0%, #080808 55%, #091311 100%);
        }

        .schedule-hero::after {
          content: "";
          position: absolute;
          right: -13rem;
          bottom: -18rem;
          width: 44rem;
          height: 44rem;
          border: 1px solid rgba(13, 148, 136, .14);
          border-radius: 50%;
          box-shadow:
            0 0 0 3.5rem rgba(13, 148, 136, .025),
            0 0 0 7rem rgba(13, 148, 136, .015);
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
          border: 1px solid rgba(247, 247, 244, .16);
          border-radius: 999px;
          padding: 0 1rem;
          color: rgba(247, 247, 244, .70);
          font-size: .63rem;
          font-weight: 800;
          letter-spacing: .12em;
          text-decoration: none;
          text-transform: uppercase;
          transition:
            color .2s ease,
            border-color .2s ease,
            background .2s ease;
        }

        .schedule-back:hover {
          border-color: rgba(13, 148, 136, .7);
          background: rgba(13, 148, 136, .08);
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
          box-shadow: 0 0 11px rgba(13, 148, 136, .78);
        }

        .schedule-title {
          margin: 0;
          color: var(--paper);
          font-size: clamp(3.65rem, 8vw, 8.6rem);
          font-weight: 900;
          letter-spacing: -.09em;
          line-height: .82;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .schedule-lead {
          max-width: 59ch;
          margin: 2.3rem 0 0;
          color: rgba(247, 247, 244, .74);
          font-size: clamp(1rem, 1.35vw, 1.16rem);
          line-height: 1.78;
        }

        .next-section {
          border-bottom: 1px solid var(--line);
          padding: 4.8rem 0;
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
          font-size: clamp(1.9rem, 3.5vw, 3.65rem);
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
          grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
          gap: clamp(1rem, 4vw, 4.6rem);
          align-items: center;
          overflow: hidden;
          margin-top: 2.1rem;
          border: 1px solid rgba(13, 148, 136, .62);
          border-radius: 1.15rem;
          padding: clamp(1.7rem, 4vw, 3.35rem);
          background:
            radial-gradient(
              circle at 90% 12%,
              rgba(13, 148, 136, .20),
              transparent 37%
            ),
            linear-gradient(
              145deg,
              rgba(13, 148, 136, .09),
              rgba(8, 8, 8, .96) 72%
            );
        }

        .next-fixture::before {
          content: "";
          position: absolute;
          right: -8rem;
          bottom: -8rem;
          width: 23rem;
          height: 23rem;
          border: 1px solid rgba(13, 148, 136, .18);
          border-radius: 50%;
          pointer-events: none;
        }

        .fixture-team {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: .95rem;
          min-width: 0;
        }

        .fixture-logo-wrap,
        .fixture-logo-fallback {
          display: flex;
          align-items: center;
          justify-content: center;
          width: clamp(5rem, 10vw, 7.4rem);
          height: clamp(5rem, 10vw, 7.4rem);
        }

        .fixture-logo-wrap.is-round-logo {
          overflow: hidden;
          border: 1px solid rgba(247, 247, 244, .16);
          border-radius: 50%;
          background: var(--paper);
          box-shadow:
            0 0 0 .18rem rgba(8, 8, 8, .96),
            0 0 1rem rgba(13, 148, 136, .12);
        }

        .fixture-logo-wrap.is-diamond-logo {
          overflow: hidden;
          background: var(--paper);
          clip-path: polygon(
            50% 2.5%,
            54% 3.5%,
            96.5% 46%,
            97.5% 50%,
            96.5% 54%,
            54% 96.5%,
            50% 97.5%,
            46% 96.5%,
            3.5% 54%,
            2.5% 50%,
            3.5% 46%,
            46% 3.5%
          );
          filter: drop-shadow(0 0 .65rem rgba(13, 148, 136, .15));
        }

        .fixture-logo-wrap.is-balloon-logo {
          overflow: hidden;
          border: 1px solid rgba(247, 247, 244, .16);
          border-radius: 58% 58% 44% 44% / 31% 31% 74% 74%;
          background: var(--paper);
          box-shadow:
            0 0 0 .18rem rgba(8, 8, 8, .96),
            0 0 1rem rgba(13, 148, 136, .12);
          transform: scaleX(.78) scaleY(1.06);
        }

        .fixture-logo {
          display: block;
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 0 1rem rgba(13, 148, 136, .14));
        }

        .fixture-logo-wrap.is-round-logo .fixture-logo,
        .fixture-logo-wrap.is-diamond-logo .fixture-logo,
        .fixture-logo-wrap.is-balloon-logo .fixture-logo {
          width: 100%;
          height: 100%;
          max-width: none;
          max-height: none;
          object-fit: cover;
          filter: none;
          transform: scale(1.08);
        }

        .fixture-logo-wrap.is-balloon-logo .fixture-logo {
          transform: scale(1.29) translateY(2%);
          transform-origin: center 45%;
        }

        .fixture-logo-fallback {
          border: 1px solid rgba(247, 247, 244, .16);
          border-radius: 50%;
          color: rgba(247, 247, 244, .28);
          font-size: .55rem;
          font-weight: 900;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        .fixture-team-name {
          margin: 0;
          color: var(--paper);
          font-size: clamp(1rem, 1.9vw, 1.6rem);
          font-weight: 900;
          letter-spacing: -.045em;
          line-height: .98;
          text-align: center;
          text-transform: uppercase;
        }

        .fixture-center {
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .fixture-competition {
          color: var(--teal);
          font-size: .64rem;
          font-weight: 900;
          letter-spacing: .15em;
          text-transform: uppercase;
        }

        .fixture-vs {
          margin: .85rem 0;
          color: var(--paper);
          font-size: clamp(2.15rem, 4.2vw, 3.95rem);
          font-weight: 900;
          letter-spacing: -.085em;
          line-height: .78;
        }

        .fixture-date {
          color: rgba(247, 247, 244, .72);
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
          margin: 1.8rem 0 0;
          color: rgba(247, 247, 244, .52);
          font-size: .74rem;
          font-weight: 700;
          letter-spacing: .05em;
          line-height: 1.6;
          text-align: center;
        }

        .schedule-list-section {
          padding: 5.8rem 0 6.4rem;
        }

        .schedule-list-head {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: 2.1rem;
        }

        .schedule-description {
          max-width: 45ch;
          margin: 0;
          color: var(--muted);
          font-size: .92rem;
          line-height: 1.68;
        }

        .phase-section + .phase-section {
          margin-top: 5.4rem;
        }

        .phase-heading {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.2rem;
        }

        .phase-heading h3 {
          margin: 0;
          color: var(--paper);
          font-size: clamp(1.35rem, 2.3vw, 2rem);
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
          grid-template-columns: 3.3rem minmax(0, 1.15fr) minmax(170px, .6fr) minmax(205px, .78fr) 8.9rem;
          align-items: center;
          gap: clamp(1rem, 2.4vw, 2.5rem);
          border-bottom: 1px solid var(--line);
          padding: 1.35rem 0;
          transition: background .2s ease;
        }

        .fixture-row:hover {
          background: rgba(13, 148, 136, .035);
        }

        .fixture-round {
          color: rgba(247, 247, 244, .33);
          font-size: .72rem;
          font-weight: 900;
          letter-spacing: .08em;
        }

        .fixture-opponents {
          display: flex;
          align-items: center;
          gap: .85rem;
          min-width: 0;
        }

        .fixture-row-logos {
          display: flex;
          align-items: center;
          gap: .3rem;
          flex: 0 0 auto;
        }

        .fixture-row-logo-wrap,
        .fixture-row-logo,
        .fixture-row-logo-fallback {
          width: 2rem;
          height: 2rem;
        }

        .fixture-row-logo-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
        }

        .fixture-row-logo {
          object-fit: contain;
        }

        .fixture-row-logo-wrap.is-round-logo {
          overflow: hidden;
          border: 1px solid rgba(247, 247, 244, .16);
          border-radius: 50%;
          background: var(--paper);
        }

        .fixture-row-logo-wrap.is-diamond-logo {
          overflow: hidden;
          background: var(--paper);
          clip-path: polygon(
            50% 3%,
            54% 4%,
            96% 46%,
            97% 50%,
            96% 54%,
            54% 96%,
            50% 97%,
            46% 96%,
            4% 54%,
            3% 50%,
            4% 46%,
            46% 4%
          );
        }

        .fixture-row-logo-wrap.is-balloon-logo {
          overflow: hidden;
          border: 1px solid rgba(247, 247, 244, .16);
          border-radius: 58% 58% 44% 44% / 31% 31% 74% 74%;
          background: var(--paper);
          transform: scaleX(.78) scaleY(1.06);
        }

        .fixture-row-logo-wrap.is-round-logo .fixture-row-logo,
        .fixture-row-logo-wrap.is-diamond-logo .fixture-row-logo,
        .fixture-row-logo-wrap.is-balloon-logo .fixture-row-logo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.08);
        }

        .fixture-row-logo-wrap.is-balloon-logo .fixture-row-logo {
          transform: scale(1.29) translateY(2%);
          transform-origin: center 45%;
        }

        .fixture-row-logo-fallback {
          display: block;
          border: 1px solid rgba(247, 247, 244, .14);
          border-radius: 50%;
        }

        .fixture-row-vs {
          color: rgba(247, 247, 244, .35);
          font-size: .6rem;
          font-weight: 900;
        }

        .fixture-row-teams {
          min-width: 0;
        }

        .fixture-row-teams p {
          margin: 0;
          color: var(--paper);
          font-size: .88rem;
          font-weight: 800;
          letter-spacing: -.015em;
          line-height: 1.36;
          text-transform: uppercase;
        }

        .fixture-row-teams span {
          color: var(--teal);
        }

        .fixture-row-date,
        .fixture-row-venue {
          color: rgba(247, 247, 244, .58);
          font-size: .75rem;
          font-weight: 700;
          line-height: 1.58;
        }

        .fixture-row-date strong,
        .fixture-row-venue strong {
          color: rgba(247, 247, 244, .83);
          font-weight: 800;
        }

        .fixture-row-date.is-pending {
          color: var(--teal);
          font-size: .73rem;
          font-weight: 900;
          letter-spacing: .09em;
          line-height: 1.7;
          text-transform: uppercase;
        }

        .fixture-row-date.is-pending strong {
          color: var(--teal);
          font-weight: 900;
        }

        .fixture-type {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          justify-self: end;
          width: 8.9rem;
          min-height: 1.9rem;
          border: 1px solid rgba(13, 148, 136, .4);
          border-radius: 999px;
          padding: 0 .55rem;
          color: var(--teal);
          background: rgba(13, 148, 136, .08);
          font-size: .55rem;
          font-weight: 900;
          letter-spacing: .11em;
          text-align: center;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .schedule-note {
          margin-top: 2.4rem;
          border-left: 2px solid var(--teal);
          padding: .25rem 0 .25rem 1.2rem;
          color: rgba(247, 247, 244, .56);
          font-size: .84rem;
          line-height: 1.65;
        }

        @media (max-width: 1120px) {
          .fixture-row {
            grid-template-columns: 3rem minmax(0, 1.2fr) minmax(165px, .65fr) 8.9rem;
          }

          .fixture-row-venue {
            display: none;
          }
        }

        @media (max-width: 900px) {
          .schedule-shell {
            width: min(100% - 2.5rem, 1440px);
          }

          .schedule-hero {
            padding: 4rem 0 4.2rem;
          }

          .next-fixture {
            grid-template-columns: 1fr;
            gap: 1.35rem;
          }

          .fixture-center {
            order: 2;
          }

          .fixture-team:first-child {
            order: 1;
          }

          .fixture-team:last-child {
            order: 3;
          }

          .schedule-list-head {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (max-width: 680px) {
          .fixture-row {
            grid-template-columns: 2.3rem minmax(0, 1fr) 7.6rem;
            gap: .8rem;
            padding: 1.15rem 0;
          }

          .fixture-row-date {
            display: none;
          }

          .fixture-row-logos {
            display: none;
          }

          .fixture-type {
            width: 7.6rem;
            min-height: 1.7rem;
            padding: 0 .4rem;
            font-size: .47rem;
          }
        }

        @media (max-width: 620px) {
          .schedule-page {
            padding-top: 72px;
          }

          .schedule-shell {
            width: min(100% - 2rem, 1440px);
          }

          .schedule-title {
            font-size: clamp(3rem, 14vw, 4.65rem);
            letter-spacing: -.08em;
          }

          .next-section {
            padding: 4.1rem 0;
          }

          .schedule-list-section {
            padding: 4.5rem 0 5rem;
          }

          .fixture-row-teams p {
            font-size: .78rem;
          }

          .phase-section + .phase-section {
            margin-top: 4rem;
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
            Der erste <span>Test.</span>
          </h2>

          <article className="next-fixture">
            <div className="fixture-team">
              <TeamLogo
                src={nextMatch.homeLogo}
                alt={nextMatch.homeTeam}
                shape={nextMatch.homeLogoShape}
              />
              <p className="fixture-team-name">{nextMatch.homeTeam}</p>
            </div>

            <div className="fixture-center">
              <div className="fixture-competition">{nextMatch.competition}</div>
              <div className="fixture-vs">VS</div>
              <div className="fixture-date">
                {nextMatch.date}
                <br />
                {nextMatch.time}
              </div>
            </div>

            <div className="fixture-team">
              <TeamLogo
                src={nextMatch.awayLogo}
                alt={nextMatch.awayTeam}
                shape={nextMatch.awayLogoShape}
              />
              <p className="fixture-team-name">{nextMatch.awayTeam}</p>
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