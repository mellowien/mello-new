import Link from "next/link";

const INFO_ITEMS = [
  {
    title: "Verantwortlicher",
    content: (
      <>
        Fußballclub Mello Wien (FC Mello Wien)
        <br />
        Nordbahnstraße 47/4080
        <br />
        1020 Wien, Österreich
        <br />
        E-Mail:{" "}
        <a href="mailto:kontakt@mellowien.at">kontakt@mellowien.at</a>
        <br />
        ZVR-Zahl: 1231202907
      </>
    ),
  },
  {
    title: "Kontakt zum Datenschutz",
    content: (
      <>
        Für Fragen zum Datenschutz oder zur Ausübung deiner Rechte erreichst du
        uns unter{" "}
        <a href="mailto:kontakt@mellowien.at">kontakt@mellowien.at</a>.
        <br />
        Ein:e Datenschutzbeauftragte:r ist derzeit nicht bestellt.
      </>
    ),
  },
  {
    title: "Stand",
    content: "3. September 2026",
  },
];

export default function DatenschutzPage() {
  return (
    <main
      style={{
        background: "var(--mello-black, #080808)",
        color: "#f7f7f4",
        fontFamily: "var(--font-body), Arial, sans-serif",
        minHeight: "100vh",
        paddingTop: "88px",
      }}
    >
      <style>{`
        .privacy-container {
          width: min(100% - 3rem, 920px);
          margin: 0 auto;
        }

        .privacy-back-link {
          display: inline-flex;
          color: rgba(247, 247, 244, .58);
          font-size: .7rem;
          font-weight: 800;
          letter-spacing: .12em;
          margin-bottom: 2rem;
          text-decoration: none;
          text-transform: uppercase;
          transition: color .2s ease;
        }

        .privacy-back-link:hover {
          color: #0d9488;
        }

        .privacy-content {
          display: grid;
          gap: 1rem;
        }

        .privacy-card {
          border: 1px solid rgba(247, 247, 244, .1);
          border-radius: 1rem;
          background: rgba(247, 247, 244, .018);
          padding: clamp(1.35rem, 3vw, 2rem);
        }

        .privacy-card h2 {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(1.15rem, 2vw, 1.45rem);
          font-weight: 900;
          letter-spacing: -.025em;
          line-height: 1.1;
          margin: 0 0 .8rem;
          text-transform: uppercase;
        }

        .privacy-card h3 {
          color: #0d9488;
          font-size: .68rem;
          font-weight: 800;
          letter-spacing: .13em;
          line-height: 1.3;
          margin: 1.4rem 0 .55rem;
          text-transform: uppercase;
        }

        .privacy-card h3:first-child {
          margin-top: 0;
        }

        .privacy-card p,
        .privacy-card li {
          color: rgba(247, 247, 244, .68);
          font-size: .94rem;
          line-height: 1.7;
        }

        .privacy-card p {
          margin: 0;
        }

        .privacy-card p + p {
          margin-top: .85rem;
        }

        .privacy-card ul {
          display: grid;
          gap: .45rem;
          margin: .85rem 0 0;
          padding-left: 1.15rem;
        }

        .privacy-card strong {
          color: #f7f7f4;
          font-weight: 800;
        }

        .privacy-card a {
          color: #0d9488;
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: .18rem;
        }

        .privacy-info-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: .85rem;
        }

        .privacy-info-item {
          border: 1px solid rgba(13, 148, 136, .24);
          border-radius: .85rem;
          background: rgba(13, 148, 136, .045);
          padding: 1rem;
        }

        .privacy-info-item h2 {
          color: #0d9488;
          font-family: var(--font-body), Arial, sans-serif;
          font-size: .64rem;
          font-weight: 800;
          letter-spacing: .12em;
          line-height: 1.35;
          margin: 0 0 .5rem;
          text-transform: uppercase;
        }

        .privacy-info-item p {
          color: rgba(247, 247, 244, .72);
          font-size: .83rem;
          line-height: 1.6;
          margin: 0;
          overflow-wrap: anywhere;
        }

        .privacy-note {
          border-left: 2px solid #0d9488;
          border-radius: 0 .7rem .7rem 0;
          background: rgba(13, 148, 136, .055);
          margin-top: 1rem;
          padding: .9rem 1rem;
        }

        .privacy-note p {
          color: rgba(247, 247, 244, .72);
          font-size: .88rem;
        }

        @media (max-width: 760px) {
          .privacy-container {
            width: min(100% - 2.5rem, 920px);
          }

          .privacy-info-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* HERO */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid var(--mello-line, #222222)",
          padding: "4.5rem 0 4rem",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 58% 72% at 86% 38%, rgba(13,148,136,.1) 0%, transparent 70%)",
          }}
        />

        <div
          className="privacy-container"
          style={{
            position: "relative",
            zIndex: 1,
          }}
        >
          <Link href="/" className="privacy-back-link">
            ← Zurück zur Startseite
          </Link>

          <div
            style={{
              color: "#0d9488",
              fontSize: ".68rem",
              fontWeight: 800,
              letterSpacing: ".18em",
              marginBottom: ".9rem",
              textTransform: "uppercase",
            }}
          >
            FC Mello Wien
          </div>

          <h1
            style={{
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              fontSize: "clamp(2.45rem, 5vw, 4.4rem)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1.02,
              margin: "0 0 1.15rem",
              textTransform: "uppercase",
            }}
          >
            Daten
            <span style={{ color: "#0d9488" }}>schutz.</span>
          </h1>

          <p
            style={{
              color: "rgba(247, 247, 244, .68)",
              fontSize: "clamp(.98rem, 1.2vw, 1.08rem)",
              lineHeight: 1.7,
              margin: 0,
              maxWidth: "66ch",
            }}
          >
            Hier erfährst du, welche personenbezogenen Daten wir verarbeiten,
            wofür wir sie verwenden und welche Rechte du hast.
          </p>
        </div>
      </section>

      {/* INHALT */}
      <section style={{ padding: "3.5rem 0 6rem" }}>
        <div className="privacy-container">
          <div className="privacy-content">
            <div className="privacy-info-grid">
              {INFO_ITEMS.map((item) => (
                <article className="privacy-info-item" key={item.title}>
                  <h2>{item.title}</h2>
                  <p>{item.content}</p>
                </article>
              ))}
            </div>

            <article className="privacy-card">
              <h2>1. Allgemeines</h2>

              <p>
                Der Schutz deiner personenbezogenen Daten ist uns wichtig. Wir
                verarbeiten personenbezogene Daten ausschließlich im Rahmen der
                gesetzlichen Bestimmungen, insbesondere der
                Datenschutz-Grundverordnung (DSGVO) und des österreichischen
                Datenschutzgesetzes.
              </p>

              <p>
                Personenbezogene Daten sind Informationen, die sich auf eine
                identifizierte oder identifizierbare natürliche Person beziehen,
                etwa Name, E-Mail-Adresse oder Angaben in einem
                Mitgliedschaftsantrag.
              </p>
            </article>

            <article className="privacy-card">
              <h2>2. Besuch unserer Website</h2>

              <p>
                Beim Aufruf unserer Website können technisch erforderliche
                Verbindungsdaten verarbeitet werden. Dazu können insbesondere
                IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite,
                Browsertyp, Betriebssystem und Referrer-URL gehören.
              </p>

              <p>
                Die Verarbeitung erfolgt zur Bereitstellung, Sicherheit und
                technischen Stabilität unserer Website. Rechtsgrundlage ist
                unser berechtigtes Interesse gemäß Art. 6 Abs. 1 lit. f DSGVO.
                Eine personenbezogene Auswertung zu Werbezwecken findet auf
                Basis dieser technischen Daten nicht statt.
              </p>

              <div className="privacy-note">
                <p>
                  <strong>Hinweis:</strong> Wenn künftig Analyse-, Marketing-
                  oder Social-Media-Tracking-Dienste eingesetzt werden, wird
                  diese Datenschutzerklärung vor deren Einsatz ergänzt.
                </p>
              </div>
            </article>

            <article className="privacy-card">
              <h2>3. Mitgliedschaftsantrag</h2>

              <p>
                Wenn du über unsere Website eine Mitgliedschaft beantragst,
                verarbeiten wir die von dir angegebenen Daten zur Bearbeitung
                deines Antrags und zur Kommunikation mit dir.
              </p>

              <h3>Verarbeitete Daten</h3>

              <ul>
                <li>Vorname und Nachname</li>
                <li>E-Mail-Adresse</li>
                <li>Gewähltes Beitragsmodell</li>
                <li>Optionale Angaben zu Firma oder Organisation</li>
                <li>Optionale Nachricht</li>
                <li>Bestätigung der Vereinsstatuten und Datenschutzerklärung</li>
                <li>Freiwillige Newsletter-Einwilligung, sofern erteilt</li>
              </ul>

              <h3>Zweck und Rechtsgrundlage</h3>

              <p>
                Die Verarbeitung erfolgt zur Bearbeitung des
                Mitgliedschaftsantrags, zur Entscheidung über die Aufnahme,
                zur Kontaktaufnahme sowie — bei Aufnahme — zur Vorbereitung und
                Durchführung des Mitgliedschaftsverhältnisses. Rechtsgrundlage
                ist Art. 6 Abs. 1 lit. b DSGVO.
              </p>

              <p>
                Soweit die Verarbeitung zur Erfüllung vereinsrechtlicher,
                steuerlicher oder sonstiger gesetzlicher Pflichten erforderlich
                ist, erfolgt sie auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO.
              </p>

              <p>
                Die Angabe von Vorname, Nachname und E-Mail-Adresse ist für die
                Bearbeitung deines Antrags erforderlich. Ohne diese Angaben
                können wir deinen Antrag nicht bearbeiten.
              </p>

              <h3>Entscheidung über die Aufnahme</h3>

              <p>
                Die Entscheidung über die Aufnahme als Mitglied erfolgt durch
                den Vorstand des Fußballclub Mello Wien gemäß den geltenden
                Vereinsstatuten. Es findet keine ausschließlich automatisierte
                Entscheidungsfindung und kein Profiling statt.
              </p>
            </article>

            <article className="privacy-card">
              <h2>4. Mitgliederverwaltung</h2>

              <p>
                Wenn du aufgenommen wirst, verarbeiten wir die erforderlichen
                Daten zur Mitgliederverwaltung, Kommunikation, Organisation des
                Vereinslebens, Vorschreibung und Verwaltung von
                Mitgliedsbeiträgen sowie zur Erfüllung gesetzlicher
                Aufbewahrungs- und Nachweispflichten.
              </p>

              <p>
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO für die
                Durchführung des Mitgliedschaftsverhältnisses sowie Art. 6 Abs.
                1 lit. c DSGVO, soweit gesetzliche Pflichten bestehen.
              </p>
            </article>

            <article className="privacy-card">
              <h2>5. Newsletter</h2>

              <p>
                Wenn du im Mitgliedschaftsantrag ausdrücklich zustimmst,
                verwenden wir deine E-Mail-Adresse, um dir gelegentlich
                Neuigkeiten und Informationen von FC Mello Wien zu senden.
                Rechtsgrundlage ist deine Einwilligung gemäß Art. 6 Abs. 1 lit.
                a DSGVO.
              </p>

              <p>
                Du kannst deine Einwilligung jederzeit mit Wirkung für die
                Zukunft widerrufen, etwa über einen Abmeldelink in einer
                E-Mail oder durch Nachricht an{" "}
                <a href="mailto:kontakt@mellowien.at">kontakt@mellowien.at</a>.
                Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung
                bleibt davon unberührt.
              </p>
            </article>

            <article className="privacy-card">
              <h2>6. Empfänger und Dienstleister</h2>

              <p>
                Innerhalb des Vereins erhalten nur jene Personen Zugriff auf
                deine Daten, die sie zur Bearbeitung von Mitgliedschaftsanträgen,
                zur Mitgliederverwaltung oder zur Kommunikation benötigen —
                insbesondere Mitglieder des Vorstands oder von diesem
                beauftragte Personen.
              </p>

              <h3>Hosting und technische Bereitstellung</h3>

              <p>
                Unsere Website wird über Vercel Inc. bereitgestellt. Dabei
                können technisch erforderliche Verbindungsdaten verarbeitet
                werden, etwa IP-Adresse, Zeitpunkte von Zugriffen, aufgerufene
                Seiten sowie Informationen zu Browser und Gerät. Vercel wird
                als technischer Dienstleister im Rahmen der Bereitstellung und
                Sicherheit der Website eingesetzt.
              </p>

              <h3>Domain und DNS</h3>

              <p>
                Die Domain und DNS-Verwaltung unserer Website erfolgen über
                World4You Internet Services GmbH. World4You verarbeitet im
                Rahmen dieser Leistung grundsätzlich technische Daten, die für
                den Betrieb der Domain und Namensauflösung erforderlich sind.
                Mitgliedschaftsanträge und Mitgliederdaten werden über
                World4You nicht geführt.
              </p>

              <h3>Datenbank und Mitgliederverwaltung</h3>

              <p>
                Für die technische Speicherung und Verwaltung von Antrags- und
                Mitgliedschaftsdaten setzen wir Supabase ein. Supabase
                verarbeitet Daten ausschließlich in unserem Auftrag und auf
                Grundlage eines Auftragsverarbeitungsvertrags, soweit
                erforderlich.
              </p>

              <p>
                Unser Supabase-Projekt wird in der AWS-Region eu-west-1
                (Irland) betrieben. Die Speicherung der von uns in Supabase
                hinterlegten Antrags- und Mitgliedschaftsdaten erfolgt damit
                innerhalb der Europäischen Union.
              </p>

              <h3>Entwicklung und Codeverwaltung</h3>

              <p>
                Für die Entwicklung und Verwaltung des Quellcodes unserer
                Website nutzen wir GitHub. GitHub erhält von uns keine
                Mitgliedschaftsanträge, Mitgliederdaten oder sonstigen Inhalte
                aus Formularen. Personenbezogene Daten werden nicht absichtlich
                in unseren Quellcode-Repositories, Tickets,
                Entwicklungsdokumentationen oder Fehlerprotokollen gespeichert.
              </p>

              <div className="privacy-note">
                <p>
                  <strong>Hinweis:</strong> Sollten wir künftig externe Dienste
                  für Newsletter, Zahlungsabwicklung, Analyse, Marketing,
                  eingebettete Social-Media-Inhalte oder Videos einsetzen,
                  ergänzen wir diese Datenschutzerklärung vor deren Einsatz.
                </p>
              </div>
            </article>

            <article className="privacy-card">
              <h2>7. Speicherdauer</h2>

              <p>
                Antragsdaten von Personen, die nicht aufgenommen werden, löschen
                wir grundsätzlich spätestens sechs Monate nach Abschluss des
                Aufnahmeverfahrens, sofern keine längere Aufbewahrung zur
                Abwehr oder Durchsetzung von Rechtsansprüchen erforderlich ist.
              </p>

              <p>
                Daten von aufgenommenen Mitgliedern speichern wir für die Dauer
                der Mitgliedschaft. Nach deren Ende bewahren wir Daten nur so
                lange auf, wie dies zur Erfüllung gesetzlicher
                Aufbewahrungspflichten oder zur Abwehr bzw. Durchsetzung von
                Rechtsansprüchen erforderlich ist.
              </p>

              <p>
                Newsletter-Daten speichern wir bis zum Widerruf deiner
                Einwilligung. Nach einem Widerruf verwenden wir deine
                E-Mail-Adresse nicht mehr für den Newsletter.
              </p>
            </article>

            <article className="privacy-card">
              <h2>8. Deine Rechte</h2>

              <p>
                Du hast — sofern die jeweiligen gesetzlichen Voraussetzungen
                erfüllt sind — das Recht auf:
              </p>

              <ul>
                <li>Auskunft über die Verarbeitung deiner Daten</li>
                <li>Berichtigung unrichtiger oder unvollständiger Daten</li>
                <li>Löschung deiner Daten</li>
                <li>Einschränkung der Verarbeitung</li>
                <li>Datenübertragbarkeit</li>
                <li>
                  Widerspruch gegen eine Verarbeitung auf Grundlage berechtigter
                  Interessen
                </li>
                <li>
                  Widerruf einer erteilten Einwilligung mit Wirkung für die
                  Zukunft
                </li>
              </ul>

              <p>
                Für die Ausübung deiner Rechte kontaktiere uns bitte unter{" "}
                <a href="mailto:kontakt@mellowien.at">kontakt@mellowien.at</a>.
              </p>

              <p>
                Du hast außerdem das Recht, Beschwerde bei der Österreichischen
                Datenschutzbehörde einzulegen:
                <br />
                Barichgasse 40–42, 1030 Wien
                <br />
                <a
                  href="https://www.dsb.gv.at/"
                  target="_blank"
                  rel="noreferrer"
                >
                  www.dsb.gv.at
                </a>
              </p>
            </article>

            <article className="privacy-card">
              <h2>9. Änderungen</h2>

              <p>
                Wir können diese Datenschutzerklärung anpassen, wenn sich unsere
                Datenverarbeitungen, eingesetzten Dienste oder rechtlichen
                Anforderungen ändern. Die jeweils aktuelle Fassung ist auf
                dieser Seite abrufbar.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}