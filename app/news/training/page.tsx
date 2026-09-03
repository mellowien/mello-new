import Image from "next/image";
import Link from "next/link";

const interview = [
  {
    question:
      "Daniel, wenn du auf die vergangenen zwei Monate zurückblickst: Wie hat diese Vorbereitung begonnen?",
    answer: (
      <>
        <p>
          Ehrlich gesagt war der Start ein wenig chaotisch. Unser Kader stand
          noch nicht ganz fest, Spieler waren noch nicht gemeldet und es gab
          einige Unsicherheiten, ob sich wirklich alles rechtzeitig ausgeht.
          Für einen neuen Verein gehört das vermutlich dazu — entspannt macht
          es die Sache aber nicht.
        </p>

        <p>
          Dazu kamen Bedingungen, die es uns auch nicht gerade leicht gemacht
          haben. Teilweise hatten wir über 40 Grad, dann wieder Gewitter, die
          uns gefühlt ertränkt haben. Aber genau in solchen Momenten trennt sich
          auch die Spreu vom Weizen. Die Jungs haben durchgezogen. Und dank
          unserer Lage an der Alten Donau konnte man nach einer heißen Einheit
          auch einmal ins Wasser springen und sich abkühlen.
        </p>
      </>
    ),
  },
  {
    question:
      "Was war die größte Aufgabe, als sich die Mannschaft erst finden musste?",
    answer: (
      <>
        <p>
          Es gab eigentlich fast nur neue Gesichter. Untereinander kannte sich
          zu Beginn mehr oder weniger noch niemand. Deshalb ging es nicht nur
          darum, ein System zu vermitteln oder körperlich besser zu werden. Es
          ging vor allem darum, aus vielen einzelnen Spielern eine Mannschaft
          zu machen.
        </p>

        <p>
          Und genau da ist in diesen zwei Monaten unglaublich viel passiert.
          Heute versteht sich die Gruppe auch abseits des Platzes sehr gut,
          jeder zieht an einem Strang und es entsteht eine echte Community. Ich
          habe die Jungs erst letztes Wochenende zu mir eingeladen. Wir haben
          den Nachmittag damit verbracht, über Fußball, die Meisterschaft, Gott
          und die Welt zu reden. Für mich ist das bisher eines der größten
          Highlights.
        </p>
      </>
    ),
  },
  {
    question:
      "Wie sieht die Arbeit auf dem Platz an einem Donnerstag aus?",
    answer: (
      <>
        <p>
          Donnerstag ist unser Platz-Tag an der Polizeisportanlage. Wir starten
          mit Laufübungen, Dehnen darf natürlich nicht fehlen, und dann geht es
          in die fußballerische Arbeit: Passformen, Spielformen mit Abschluss
          und taktikorientiertes Training.
        </p>

        <p>
          Unser Ziel ist, dass die Spieler unser System nicht nur kennen,
          sondern es wirklich im Kopf haben und in den richtigen Momenten
          abrufen können. Jeder soll wissen, welche Rolle er hat und was er für
          die Mannschaft tun muss. Im Spielverständnis haben wir hier bereits
          einen großen Schritt nach vorne gemacht.
        </p>
      </>
    ),
  },
  {
    question:
      "Neben den Platz-Einheiten gibt es dienstags und sonntags euren eigenen Laufplan. Was steckt dahinter?",
    answer: (
      <>
        <p>
          Den Laufplan hat das Trainerteam mit Unterstützung von KI entwickelt.
          Er ist darauf ausgelegt, dass wir als Mannschaft die Ausdauer
          aufbauen, die wir für eine ganze Saison in der 1. Klasse A brauchen.
          Dienstag und Sonntag stehen deshalb ganz bewusst im Zeichen der
          Laufarbeit.
        </p>

        <p>
          Es geht dabei nicht darum, einfach nur Kilometer zu sammeln. Wir
          wollen eine Basis schaffen, die es uns ermöglicht, über 90 Minuten
          konzentriert, mutig und als Team zu spielen. Die Spieler haben den
          Plan sehr gut angenommen und die Entwicklung ist bei vielen wirklich
          enorm.
        </p>
      </>
    ),
  },
  {
    question: "Wo siehst du die größten Entwicklungen innerhalb der Gruppe?",
    answer: (
      <>
        <p>
          Bei manchen Spielern ist die Entwicklung gewaltig. Wir haben unter
          anderem auch Jungs, die davor noch nie in einem Verein gespielt haben
          — und heute würdest du ihnen das nicht mehr ansehen. Das ist ein
          großes Kompliment an ihren Einsatz und an die Bereitschaft,
          dazuzulernen.
        </p>

        <p>
          Gleichzeitig ist die Moral in der Mannschaft top. Das liegt auch
          daran, dass wir erfahrenere Spieler wie Marco Miuli haben. Marco
          zieht alle mit, hebt das Niveau und übernimmt Verantwortung. Deshalb
          ist es uns leichtgefallen, ihm für die kommende Saison die
          Kapitänsbinde zu überreichen.
        </p>
      </>
    ),
  },
  {
    question:
      "Was nimmst du aus der Vorbereitung mit, wenn am Sonntag der erste Spieltag beginnt?",
    answer: (
      <>
        <p>
          Wir gehen mit einem guten Gefühl in die Saison. Natürlich wissen wir,
          dass ein erstes Spiel noch keine gesamte Meisterschaft entscheidet.
          Aber wir haben in den letzten Wochen gesehen, dass diese Mannschaft
          zusammenhält, lernen will und bereit ist, füreinander zu arbeiten.
        </p>

        <p>
          Jetzt geht es darum, das alles auch auf den Platz zu bringen. Die
          Vorbereitung ist vorbei, der erste echte Test kommt am Sonntag. Dann
          zählt nicht mehr, was wir geplant haben — sondern was wir als
          Mannschaft daraus machen.
        </p>
      </>
    ),
  },
];

export default function TrainingPage() {
  return (
    <main className="training-report-page">
      <style>{`
        .training-report-page {
          --ink: #080808;
          --paper: #f7f7f4;
          --teal: #0d9488;
          --teal-bright: #14b8a6;
          --line: rgba(247,247,244,.12);
          --muted: rgba(247,247,244,.66);
          background: var(--ink);
          color: var(--paper);
          font-family: Arial, Helvetica, sans-serif;
          min-height: 100vh;
          overflow: hidden;
          padding-top: 88px;
        }

        .training-report-page * {
          box-sizing: border-box;
        }

        .report-shell {
          margin: 0 auto;
          width: min(100% - 6rem, 1440px);
        }

        .report-hero {
          background:
            radial-gradient(
              ellipse 45% 125% at 96% 43%,
              rgba(13,148,136,.16),
              transparent 74%
            ),
            linear-gradient(116deg,#080808 0%,#080808 55%,#091311 100%);
          border-bottom: 1px solid var(--line);
          overflow: hidden;
          padding: 4.7rem 0 4.45rem;
          position: relative;
        }

        .report-hero::after {
          border: 1px solid rgba(13,148,136,.14);
          border-radius: 50%;
          bottom: -17rem;
          box-shadow:
            0 0 0 3.5rem rgba(13,148,136,.025),
            0 0 0 7rem rgba(13,148,136,.015);
          content: "";
          height: 42rem;
          pointer-events: none;
          position: absolute;
          right: -12rem;
          width: 42rem;
        }

        .report-hero-inner {
          max-width: 980px;
          position: relative;
          z-index: 1;
        }

        .report-back {
          align-items: center;
          border: 1px solid rgba(247,247,244,.16);
          border-radius: 999px;
          color: rgba(247,247,244,.70);
          display: inline-flex;
          font-size: .63rem;
          font-weight: 800;
          gap: .55rem;
          letter-spacing: .12em;
          min-height: 2.6rem;
          padding: 0 1rem;
          text-decoration: none;
          text-transform: uppercase;
          transition: color .2s ease, border-color .2s ease, background .2s ease;
        }

        .report-back:hover {
          background: rgba(13,148,136,.08);
          border-color: rgba(13,148,136,.7);
          color: var(--teal);
        }

        .report-meta {
          align-items: center;
          color: var(--teal);
          display: flex;
          font-size: .67rem;
          font-weight: 900;
          letter-spacing: .16em;
          margin: 2rem 0 1.65rem;
          text-transform: uppercase;
        }

        .report-title {
          align-items: flex-start;
          display: flex;
          flex-direction: column;
          font-size: clamp(3.35rem,7.4vw,7.7rem);
          font-weight: 900;
          gap: .17em;
          letter-spacing: -.055em;
          line-height: .84;
          margin: 0;
          max-width: 12ch;
          text-transform: uppercase;
        }

        .report-title span {
          display: block;
          line-height: .84;
        }

        .report-title .title-solid {
          color: var(--paper);
        }

        .report-title .title-outline {
          color: transparent;
          -webkit-text-stroke: 1.25px rgba(247,247,244,.75);
        }

        .report-title .title-final {
          color: var(--paper);
          display: inline-block;
          letter-spacing: -.04em;
          max-width: none;
          white-space: nowrap;
          width: max-content;
        }

        .report-title em {
          color: var(--teal);
          font-style: normal;
          -webkit-text-stroke: 0;
        }

        .report-lead {
          color: rgba(247,247,244,.74);
          font-size: clamp(1rem,1.35vw,1.17rem);
          line-height: 1.78;
          margin: 2.25rem 0 0;
          max-width: 64ch;
        }

        .report-byline {
          align-items: center;
          color: rgba(247,247,244,.52);
          display: flex;
          font-size: .68rem;
          font-weight: 800;
          gap: .75rem;
          letter-spacing: .11em;
          margin: 2rem 0 0;
          text-transform: uppercase;
        }

        .report-byline::before {
          background: var(--teal);
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(13,148,136,.75);
          content: "";
          height: .45rem;
          width: .45rem;
        }

        .venue-section {
          background: #090a0a;
          border-bottom: 1px solid var(--line);
          padding: 3.8rem 0 0;
        }

        .venue-figure {
          background: #101010;
          border: 1px solid rgba(13,148,136,.45);
          border-radius: 1rem 1rem 0 0;
          margin: 0;
          overflow: hidden;
          position: relative;
        }

        .venue-image {
          display: block;
          filter: saturate(.82) contrast(1.04);
          height: clamp(19rem,39vw,35rem);
          object-fit: cover;
          opacity: .84;
          width: 100%;
        }

        .venue-figure::after {
          background:
            linear-gradient(
              90deg,
              rgba(8,8,8,.65) 0%,
              rgba(8,8,8,.10) 60%,
              rgba(13,148,136,.10) 100%
            ),
            linear-gradient(
              0deg,
              rgba(8,8,8,.82) 0%,
              transparent 48%
            );
          content: "";
          inset: 0;
          pointer-events: none;
          position: absolute;
        }

        .venue-caption {
          bottom: clamp(1.25rem,4vw,3.2rem);
          left: clamp(1.25rem,4vw,3.5rem);
          max-width: 32rem;
          position: absolute;
          z-index: 1;
        }

        .venue-kicker {
          color: var(--teal);
          font-size: .64rem;
          font-weight: 900;
          letter-spacing: .16em;
          margin: 0 0 .65rem;
          text-transform: uppercase;
        }

        .venue-caption h2 {
          color: var(--paper);
          font-size: clamp(1.8rem,3.6vw,3.7rem);
          font-weight: 900;
          letter-spacing: -.07em;
          line-height: .87;
          margin: 0;
          text-transform: uppercase;
        }

        .venue-caption p {
          color: rgba(247,247,244,.72);
          font-size: .83rem;
          font-weight: 700;
          letter-spacing: .04em;
          line-height: 1.55;
          margin: .8rem 0 0;
        }

        .report-content {
          display: grid;
          gap: clamp(3rem,9vw,10rem);
          grid-template-columns: minmax(0,1fr) minmax(240px,.28fr);
          padding: 5.8rem 0 6.4rem;
        }

        .interview {
          max-width: 51rem;
        }

        .interview-intro {
          border-left: 2px solid var(--teal);
          margin: 0 0 4rem;
          padding: .3rem 0 .3rem 1.45rem;
        }

        .interview-intro p {
          color: rgba(247,247,244,.84);
          font-size: clamp(1.22rem,2vw,1.76rem);
          font-weight: 800;
          letter-spacing: -.035em;
          line-height: 1.23;
          margin: 0;
        }

        .interview-block {
          margin: 0 0 4.3rem;
        }

        .interview-question-label {
          color: var(--teal);
          font-size: .64rem;
          font-weight: 900;
          letter-spacing: .17em;
          margin: 0 0 .8rem;
          text-transform: uppercase;
        }

        .interview-question {
          color: var(--paper);
          font-size: clamp(1.55rem,2.8vw,2.65rem);
          font-weight: 900;
          letter-spacing: -.06em;
          line-height: .95;
          margin: 0 0 1.65rem;
          max-width: 25ch;
          text-transform: uppercase;
        }

        .interview-answer {
          max-width: 44rem;
        }

        .interview-answer p {
          color: var(--muted);
          font-size: clamp(1rem,1.2vw,1.08rem);
          line-height: 1.86;
          margin: 0 0 1.45rem;
        }

        .interview-answer p:last-child {
          margin-bottom: 0;
        }

        .captain-feature {
          background:
            radial-gradient(
              ellipse 58% 100% at 100% 52%,
              rgba(13,148,136,.17),
              transparent 75%
            ),
            #0b0d0d;
          border: 1px solid rgba(13,148,136,.52);
          border-radius: 1rem;
          margin: 4.6rem 0;
          overflow: hidden;
          position: relative;
        }

        .captain-image-wrap {
          background: #111;
          min-height: 29rem;
          overflow: hidden;
          position: relative;
        }

        .captain-image {
          display: block;
          filter: saturate(.84) contrast(1.05);
          height: 100%;
          min-height: 29rem;
          object-fit: cover;
          object-position: center;
          opacity: .88;
          width: 100%;
        }

        .captain-image-wrap::after {
          background:
            linear-gradient(
              90deg,
              rgba(8,8,8,.1) 0%,
              rgba(8,8,8,.78) 100%
            ),
            linear-gradient(
              0deg,
              rgba(8,8,8,.55) 0%,
              transparent 48%
            );
          content: "";
          inset: 0;
          pointer-events: none;
          position: absolute;
        }

        .captain-copy {
          bottom: clamp(1.35rem,4vw,2.7rem);
          position: absolute;
          right: clamp(1.35rem,4vw,3rem);
          width: min(100% - 2.7rem,24rem);
          z-index: 1;
        }

        .captain-kicker {
          color: var(--teal);
          font-size: .63rem;
          font-weight: 900;
          letter-spacing: .16em;
          margin: 0 0 .72rem;
          text-transform: uppercase;
        }

        .captain-copy h3 {
          color: var(--paper);
          font-size: clamp(2rem,4vw,4.15rem);
          font-weight: 900;
          letter-spacing: -.075em;
          line-height: .84;
          margin: 0;
          text-transform: uppercase;
        }

        .captain-copy p {
          color: rgba(247,247,244,.72);
          font-size: .9rem;
          line-height: 1.62;
          margin: 1rem 0 0;
        }

        .report-aside {
          align-self: start;
          border-top: 1px solid var(--line);
          padding-top: 1.35rem;
          position: sticky;
          top: 7rem;
        }

        .aside-block {
          border-bottom: 1px solid var(--line);
          margin: 0 0 1.35rem;
          padding: 0 0 1.35rem;
        }

        .aside-label {
          color: rgba(247,247,244,.42);
          font-size: .62rem;
          font-weight: 900;
          letter-spacing: .15em;
          margin: 0 0 .65rem;
          text-transform: uppercase;
        }

        .aside-value {
          color: var(--paper);
          font-size: .92rem;
          font-weight: 700;
          line-height: 1.56;
          margin: 0;
        }

        .quote-section {
          background:
            radial-gradient(
              ellipse 48% 130% at 100% 50%,
              rgba(13,148,136,.17),
              transparent 75%
            ),
            #090a0a;
          border-bottom: 1px solid var(--line);
          border-top: 1px solid var(--line);
          padding: 5.4rem 0;
        }

        .quote-inner {
          max-width: 68rem;
        }

        .quote-kicker {
          color: var(--teal);
          font-size: .65rem;
          font-weight: 900;
          letter-spacing: .17em;
          margin: 0 0 1.15rem;
          text-transform: uppercase;
        }

        .quote-text {
          color: var(--paper);
          font-size: clamp(2.5rem,5.3vw,6.15rem);
          font-weight: 900;
          letter-spacing: -.085em;
          line-height: .85;
          margin: 0;
          max-width: 18ch;
          text-transform: uppercase;
        }

        .quote-text span {
          color: transparent;
          -webkit-text-stroke: 1px rgba(247,247,244,.72);
        }

        .quote-author {
          color: rgba(247,247,244,.60);
          font-size: .7rem;
          font-weight: 900;
          letter-spacing: .13em;
          margin: 1.75rem 0 0;
          text-transform: uppercase;
        }

        .report-outro {
          padding: 5.4rem 0 6.3rem;
        }

        .report-outro-inner {
          max-width: 50rem;
        }

        .outro-kicker {
          color: var(--teal);
          font-size: .65rem;
          font-weight: 900;
          letter-spacing: .17em;
          margin: 0 0 .9rem;
          text-transform: uppercase;
        }

        .outro-title {
          color: var(--paper);
          font-size: clamp(2.2rem,4.3vw,4.55rem);
          font-weight: 900;
          letter-spacing: -.075em;
          line-height: .86;
          margin: 0;
          max-width: 14ch;
          text-transform: uppercase;
        }

        .outro-title span {
          color: var(--teal);
        }

        .outro-copy {
          color: var(--muted);
          font-size: 1.04rem;
          line-height: 1.8;
          margin: 1.65rem 0 0;
          max-width: 54ch;
        }

        .outro-link {
          align-items: center;
          background: var(--teal);
          border: 1px solid var(--teal);
          border-radius: 999px;
          color: var(--ink);
          display: inline-flex;
          font-size: .64rem;
          font-weight: 900;
          gap: .65rem;
          justify-content: center;
          letter-spacing: .13em;
          margin-top: 2rem;
          min-height: 3rem;
          padding: 0 1.2rem;
          text-decoration: none;
          text-transform: uppercase;
          transition: background .2s ease, transform .2s ease;
        }

        .outro-link:hover {
          background: var(--teal-bright);
          transform: translateY(-2px);
        }

        @media (max-width: 900px) {
          .report-shell {
            width: min(100% - 2.5rem,1440px);
          }

          .report-hero {
            padding: 4rem 0 3.7rem;
          }

          .report-content {
            gap: 1rem;
            grid-template-columns: 1fr;
            padding: 4.7rem 0 5rem;
          }

          .report-aside {
            border-top: 1px solid var(--line);
            display: grid;
            gap: 1.25rem;
            grid-template-columns: repeat(3,1fr);
            margin-top: 1rem;
            position: static;
          }

          .aside-block {
            border-bottom: 0;
            margin: 0;
          }

          .captain-feature {
            margin: 3.8rem 0;
          }

          .quote-section {
            padding: 4.5rem 0;
          }
        }

        @media (max-width: 620px) {
          .training-report-page {
            padding-top: 68px;
          }

          .report-shell {
            width: min(100% - 2.25rem,40rem);
          }

          .report-hero {
            background:
              radial-gradient(
                ellipse 115% 62% at 100% 6%,
                rgba(13,148,136,.13),
                transparent 72%
              ),
              linear-gradient(145deg,#080808 0%,#08110f 100%);
            padding: 2.4rem 0 2.75rem;
          }

          .report-hero::after {
            bottom: -9rem;
            height: 21rem;
            right: -8rem;
            width: 21rem;
          }

          .report-back {
            font-size: .57rem;
            letter-spacing: .1em;
            min-height: 44px;
            padding: 0 .9rem;
          }

          .report-meta {
            font-size: .57rem;
            letter-spacing: .13em;
            line-height: 1.45;
            margin: 1.5rem 0 1.05rem;
          }

          .report-title {
            font-size: clamp(2.55rem,12.8vw,3.85rem);
            gap: .15em;
            letter-spacing: -.065em;
            line-height: .88;
            max-width: 100%;
          }

          .report-title span {
            line-height: .88;
          }

          .report-title .title-final {
            max-width: 100%;
            white-space: normal;
            width: auto;
          }

          .report-lead {
            font-size: 1rem;
            line-height: 1.68;
            margin-top: 1.45rem;
            max-width: 35ch;
          }

          .report-byline {
            align-items: flex-start;
            font-size: .57rem;
            gap: .55rem;
            letter-spacing: .09em;
            line-height: 1.45;
            margin-top: 1.45rem;
          }

          .report-byline::before {
            flex: 0 0 auto;
            height: .38rem;
            margin-top: .23rem;
            width: .38rem;
          }

          .venue-section {
            padding-top: 2.25rem;
          }

          .venue-figure {
            border-radius: .9rem;
          }

          .venue-image {
            height: 19.5rem;
            object-position: 55% center;
          }

          .venue-figure::after {
            background:
              linear-gradient(
                0deg,
                rgba(8,8,8,.95) 0%,
                rgba(8,8,8,.66) 40%,
                rgba(8,8,8,.18) 76%,
                rgba(13,148,136,.08) 100%
              );
          }

          .venue-caption {
            bottom: .9rem;
            left: .9rem;
            max-width: calc(100% - 1.8rem);
          }

          .venue-kicker {
            font-size: .46rem;
            letter-spacing: .11em;
            margin-bottom: .32rem;
          }

          .venue-caption h2 {
            font-size: clamp(1.48rem,7vw,2rem);
            letter-spacing: -.055em;
            line-height: .95;
          }

          .venue-caption p {
            font-size: .63rem;
            line-height: 1.4;
            margin-top: .38rem;
            max-width: 31ch;
          }

          .report-content {
            gap: 2.9rem;
            padding: 3.4rem 0 3.85rem;
          }

          .interview {
            max-width: 36ch;
          }

          .interview-intro {
            margin-bottom: 2.8rem;
            padding: .2rem 0 .2rem 1rem;
          }

          .interview-intro p {
            font-size: clamp(1.12rem,5.6vw,1.45rem);
            line-height: 1.25;
          }

          .interview-block {
            margin-bottom: 3.2rem;
          }

          .interview-question-label {
            font-size: .54rem;
            letter-spacing: .14em;
            margin-bottom: .6rem;
          }

          .interview-question {
            font-size: clamp(1.5rem,7.3vw,2.05rem);
            letter-spacing: -.052em;
            line-height: 1;
            margin-bottom: 1.15rem;
            max-width: 19ch;
          }

          .interview-answer {
            max-width: 35ch;
          }

          .interview-answer p {
            font-size: 1rem;
            line-height: 1.72;
            margin-bottom: 1.18rem;
          }

          .captain-feature {
            border-radius: .9rem;
            margin: 3.15rem 0;
          }

          .captain-image-wrap,
          .captain-image {
            min-height: 25rem;
          }

          .captain-image {
            object-position: 42% center;
          }

          .captain-image-wrap::after {
            background:
              linear-gradient(
                0deg,
                rgba(8,8,8,.98) 0%,
                rgba(8,8,8,.78) 38%,
                rgba(8,8,8,.16) 74%,
                transparent 100%
              );
          }

          .captain-copy {
            bottom: .9rem;
            left: .9rem;
            right: .9rem;
            width: auto;
          }

          .captain-kicker {
            font-size: .47rem;
            letter-spacing: .11em;
            margin-bottom: .32rem;
          }

          .captain-copy h3 {
            font-size: clamp(1.9rem,9.5vw,2.6rem);
            letter-spacing: -.065em;
            line-height: .9;
          }

          .captain-copy p {
            font-size: .74rem;
            line-height: 1.45;
            margin-top: .42rem;
            max-width: 32ch;
          }

          .report-aside {
            background: rgba(247,247,244,.025);
            border: 1px solid rgba(247,247,244,.1);
            border-radius: .9rem;
            display: grid;
            gap: 0;
            grid-template-columns: 1fr;
            margin-top: 0;
            overflow: hidden;
            padding: 0;
          }

          .aside-block {
            border-bottom: 1px solid rgba(247,247,244,.09);
            margin: 0;
            padding: .9rem 1rem .85rem;
          }

          .aside-block:last-child {
            border-bottom: 0;
          }

          .aside-label {
            font-size: .53rem;
            letter-spacing: .13em;
            margin-bottom: .38rem;
          }

          .aside-value {
            font-size: .89rem;
            line-height: 1.46;
          }

          .quote-section {
            background:
              radial-gradient(
                ellipse 115% 80% at 100% 15%,
                rgba(13,148,136,.14),
                transparent 74%
              ),
              #090a0a;
            padding: 3.65rem 0;
          }

          .quote-kicker {
            font-size: .55rem;
            letter-spacing: .14em;
            margin-bottom: .8rem;
          }

          .quote-text {
            font-size: clamp(2.3rem,11.5vw,3.45rem);
            letter-spacing: -.075em;
            line-height: .88;
            max-width: 13ch;
          }

          .quote-text span {
            -webkit-text-stroke-width: 1px;
          }

          .quote-author {
            font-size: .55rem;
            letter-spacing: .1em;
            line-height: 1.45;
            margin-top: 1.15rem;
            max-width: 33ch;
          }

          .report-outro {
            padding: 3.75rem 0 calc(4rem + env(safe-area-inset-bottom));
          }

          .outro-kicker {
            font-size: .55rem;
            letter-spacing: .14em;
            margin-bottom: .7rem;
          }

          .outro-title {
            font-size: clamp(2rem,10vw,3rem);
            letter-spacing: -.065em;
            line-height: .92;
            max-width: 13ch;
          }

          .outro-copy {
            font-size: 1rem;
            line-height: 1.7;
            margin-top: 1.2rem;
            max-width: 35ch;
          }

          .outro-link {
            box-sizing: border-box;
            font-size: .63rem;
            letter-spacing: .11em;
            margin-top: 1.55rem;
            min-height: 50px;
            padding: .9rem 1rem;
            width: 100%;
          }
        }

        @media (max-width: 360px) {
          .report-shell {
            width: min(100% - 2rem,40rem);
          }

          .report-title {
            font-size: 2.38rem;
          }

          .venue-image {
            height: 18rem;
          }

          .venue-caption h2 {
            font-size: 1.38rem;
          }

          .venue-caption p {
            font-size: .58rem;
          }

          .interview-question {
            font-size: 1.4rem;
          }

          .interview-answer p,
          .outro-copy {
            font-size: .95rem;
          }

          .captain-image-wrap,
          .captain-image {
            min-height: 23rem;
          }

          .captain-copy h3 {
            font-size: 1.75rem;
          }

          .captain-copy p {
            font-size: .7rem;
          }

          .quote-text {
            font-size: 2.15rem;
          }
        }
      `}</style>

      <section className="report-hero">
        <div className="report-shell report-hero-inner">
          <Link className="report-back" href="/">
            <span aria-hidden="true">←</span>
            Zur Startseite
          </Link>

          <div className="report-meta">
            Trainingsbericht · Interview · 4 Min. Lesezeit
          </div>

          <h1 className="report-title">
            <span className="title-solid">Zwei Monate.</span>
            <span className="title-outline">Ein Team.</span>
            <span className="title-final">
              Jetzt <em>zählt&apos;s.</em>
            </span>
          </h1>

          <p className="report-lead">
            Im Gespräch blickt Daniel Rezai als Obmann und Trainer von FC Mello
            Wien auf eine Vorbereitung zwischen Hitze, Gewittern, Kilometern und
            einer Mannschaft zurück, die in kurzer Zeit zusammengewachsen ist.
          </p>

          <div className="report-byline">
            Daniel Rezai · Obmann &amp; Trainer · FC Mello Wien
          </div>
        </div>
      </section>

      <section className="venue-section">
        <div className="report-shell">
          <figure className="venue-figure">
            <Image
              className="venue-image"
              src="/Polizeisportanlage.jpg"
              alt="Die Polizeisportanlage am Dampfschiffhaufen in Wien"
              width={1600}
              height={900}
              priority
            />

            <figcaption className="venue-caption">
              <p className="venue-kicker">Unser Trainingsort</p>
              <h2>Polizeisportanlage.</h2>
              <p>
                Dampfschiffhaufen 2 · 1220 Wien · Ausgangspunkt der Vorbereitung
                auf den ersten Spieltag.
              </p>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="report-shell report-content">
        <article className="interview">
          <div className="interview-intro">
            <p>
              Zwei Monate Arbeit liegen hinter FC Mello Wien. Vor dem ersten
              Spieltag spricht Obmann und Trainer Daniel Rezai über einen
              chaotischen Start, eine schnell gewachsene Gemeinschaft und die
              Frage, ob der selbst entwickelte Laufplan auch über 90 Minuten
              funktioniert.
            </p>
          </div>

          {interview.slice(0, 4).map((item) => (
            <section className="interview-block" key={item.question}>
              <p className="interview-question-label">Frage</p>
              <h2 className="interview-question">{item.question}</h2>

              <p className="interview-question-label">Daniel Rezai</p>
              <div className="interview-answer">{item.answer}</div>
            </section>
          ))}

          <section
            className="captain-feature"
            aria-label="Marco Miuli, Mellos erster Kapitän"
          >
            <div className="captain-image-wrap">
              <Image
                className="captain-image"
                src="/Marco.PNG"
                alt="Marco Miuli, Mellos erster Kapitän"
                width={1200}
                height={1200}
              />
            </div>

            <div className="captain-copy">
              <p className="captain-kicker">Kapitän der Kampfmannschaft</p>
              <h3>
                Marco
                <br />
                Miuli.
              </h3>
              <p>
                Erfahrung, Verantwortung und der Wille, die Gruppe mitzuziehen:
                Marco Miuli trägt in der kommenden Saison als Mellos erster
                Kapitän die Binde.
              </p>
            </div>
          </section>

          {interview.slice(4).map((item) => (
            <section className="interview-block" key={item.question}>
              <p className="interview-question-label">Frage</p>
              <h2 className="interview-question">{item.question}</h2>

              <p className="interview-question-label">Daniel Rezai</p>
              <div className="interview-answer">{item.answer}</div>
            </section>
          ))}
        </article>

        <aside className="report-aside" aria-label="Berichtsdaten">
          <div className="aside-block">
            <p className="aside-label">Format</p>
            <p className="aside-value">
              Trainingsbericht
              <br />
              im Interview
            </p>
          </div>

          <div className="aside-block">
            <p className="aside-label">Mannschaft</p>
            <p className="aside-value">
              Kampfmannschaft
              <br />
              FC Mello Wien
            </p>
          </div>

          <div className="aside-block">
            <p className="aside-label">Trainingsort</p>
            <p className="aside-value">
              Polizeisportanlage
              <br />
              Dampfschiffhaufen 2
              <br />
              1220 Wien
            </p>
          </div>

          <div className="aside-block">
            <p className="aside-label">Wochenrhythmus</p>
            <p className="aside-value">
              Dienstag · Laufplan
              <br />
              Donnerstag · Platz
              <br />
              Sonntag · Laufplan
            </p>
          </div>
        </aside>
      </section>

      <section className="quote-section">
        <div className="report-shell quote-inner">
          <p className="quote-kicker">Der erste echte Test</p>

          <blockquote className="quote-text">
            „Ob unser Laufplan wirklich so gut ist, wie wir behaupten, wissen
            wir spätestens <span>nach 90 Minuten.</span>“
          </blockquote>

          <p className="quote-author">
            Daniel Rezai · Obmann &amp; Trainer · FC Mello Wien
          </p>
        </div>
      </section>

      <section className="report-outro">
        <div className="report-shell report-outro-inner">
          <p className="outro-kicker">Der Countdown läuft</p>

          <h2 className="outro-title">
            Vorbereitung vorbei. <span>Jetzt wird gespielt.</span>
          </h2>

          <p className="outro-copy">
            Die Kilometer sind gemacht, die Abläufe wurden wiederholt und aus
            vielen neuen Gesichtern ist eine Mannschaft geworden. Am Sonntag
            beginnt der erste Spieltag — und FC Mello Wien bekommt die
            Gelegenheit zu zeigen, was in den vergangenen zwei Monaten
            entstanden ist.
          </p>

          <Link className="outro-link" href="/news/auftakt">
            Zum Vorbericht <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}