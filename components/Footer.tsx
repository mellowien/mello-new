"use client";

import Link from "next/link";

const clubLinks = [
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/team", label: "Mannschaft" },
  { href: "/tv", label: "Mello TV" },
];

const currentLinks = [
  { href: "/spielplan", label: "Spielplan" },
  { href: "/news", label: "News & Berichte" },
];

const contactLinks = [
  {
    href: "/kontakt?anliegen=spieler",
    label: "Spieleranfrage",
    description: "Du möchtest für FC Mello Wien spielen?",
  },
  {
    href: "/kontakt?anliegen=community",
    label: "Verein mitgestalten",
    description: "Content, Organisation oder neue Ideen für Mello.",
  },
  {
    href: "/mitgliedschaft/vorteile",
    label: "Mitgliedschaft entdecken",
    description: "Alle Vorteile und Möglichkeiten auf einen Blick.",
  },
];

const legalLinks = [
  { href: "/mitgliedschaft/antrag", label: "Mitgliedschaft beantragen" },
  { href: "/kontakt", label: "Kontaktseite" },
  { href: "/impressum", label: "Impressum" },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/profile.php?id=61568867905394",
    label: "Facebook",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/fcmellowien/",
    label: "Instagram",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    href: "https://www.twitch.tv/mellowien",
    label: "Twitch",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 2H3v16l4-4h14V2z" />
        <line x1="9" y1="9" x2="9" y2="14" />
        <line x1="15" y1="9" x2="15" y2="14" />
      </svg>
    ),
  },
  {
    href: "https://www.youtube.com/channel/UCYzw8fGaVVVAhXQulyounww",
    label: "YouTube",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
  {
    href: "https://www.tiktok.com/@fcmellowien",
    label: "TikTok",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/company/mellowien",
    label: "LinkedIn",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="footer-link">
      <span>{children}</span>
      <span className="footer-link-arrow" aria-hidden="true">
        →
      </span>
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <style>{`
        .footer {
          --footer-ink: #080808;
          --footer-paper: #f7f7f4;
          --footer-teal: #0d9488;
          --footer-teal-bright: #14b8a6;
          --footer-line: rgba(247,247,244,.12);
          background:
            radial-gradient(
              ellipse 38% 46% at 100% 0%,
              rgba(13,148,136,.09),
              transparent 74%
            ),
            var(--footer-ink);
          border-top: 1px solid var(--footer-line);
          color: var(--footer-paper);
          padding: 5rem 0 2.25rem;
          position: relative;
        }

        .footer * {
          box-sizing: border-box;
        }

        .footer::before {
          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(13,148,136,.18),
              transparent
            );
          content: "";
          height: 1px;
          left: 0;
          opacity: .6;
          position: absolute;
          right: 0;
          top: 0;
        }

        .footer-content {
          margin: 0 auto;
          width: min(100% - 6rem, 1440px);
        }

        .footer-top {
          display: grid;
          gap: 4.5rem;
          grid-template-columns: 1.45fr .8fr .8fr 1.2fr;
          padding-bottom: 4.25rem;
        }

        .footer-brand {
          padding-right: 1.5rem;
        }

        .footer-brand-link {
          align-items: center;
          display: inline-flex;
          gap: .85rem;
          margin-bottom: 1.15rem;
          text-decoration: none;
        }

        .footer-brand-mark {
          align-items: center;
          border: 1px solid rgba(13,148,136,.4);
          border-radius: 50%;
          display: flex;
          height: 2.6rem;
          justify-content: center;
          overflow: hidden;
          width: 2.6rem;
        }

        .footer-brand-mark img {
          display: block;
          height: 100%;
          object-fit: contain;
          width: 100%;
        }

        .footer-brand-name {
          color: var(--footer-paper);
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 1.85rem;
          font-weight: 800;
          letter-spacing: .025em;
          line-height: 1;
          text-transform: uppercase;
        }

        .footer-brand-copy {
          color: rgba(247,247,244,.64);
          font-family: var(--font-body), Arial, sans-serif;
          font-size: .9rem;
          line-height: 1.68;
          margin: 0;
          max-width: 34ch;
        }

        .footer-column-title {
          color: var(--footer-teal);
          font-family: var(--font-body), Arial, sans-serif;
          font-size: .63rem;
          font-weight: 900;
          letter-spacing: .17em;
          margin: 0 0 1.15rem;
          text-transform: uppercase;
        }

        .footer-links-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .footer-links-list li {
          margin-bottom: .75rem;
        }

        .footer-link {
          align-items: center;
          color: rgba(247,247,244,.66);
          display: inline-flex;
          font-family: var(--font-body), Arial, sans-serif;
          font-size: .84rem;
          font-weight: 600;
          gap: .4rem;
          line-height: 1.35;
          text-decoration: none;
          transition: color .2s ease, transform .2s ease;
        }

        .footer-link-arrow {
          color: var(--footer-teal);
          font-size: .9rem;
          opacity: 0;
          transform: translateX(-4px);
          transition: opacity .2s ease, transform .2s ease;
        }

        .footer-link:hover {
          color: var(--footer-paper);
          transform: translateX(2px);
        }

        .footer-link:hover .footer-link-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .footer-requests {
          background:
            linear-gradient(
              135deg,
              rgba(13,148,136,.11),
              rgba(13,148,136,.035) 64%,
              rgba(247,247,244,.018)
            );
          border: 1px solid rgba(13,148,136,.38);
          border-radius: 1rem;
          padding: 1.3rem;
        }

        .footer-requests-title {
          color: var(--footer-paper);
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 1.18rem;
          font-weight: 800;
          letter-spacing: -.02em;
          line-height: 1;
          margin: 0 0 .45rem;
          text-transform: uppercase;
        }

        .footer-requests-copy {
          color: rgba(247,247,244,.62);
          font-family: var(--font-body), Arial, sans-serif;
          font-size: .77rem;
          line-height: 1.5;
          margin: 0 0 1rem;
        }

        .footer-request-link {
          align-items: center;
          border-top: 1px solid rgba(247,247,244,.12);
          color: var(--footer-paper);
          display: flex;
          font-family: var(--font-body), Arial, sans-serif;
          gap: .75rem;
          min-height: 3.3rem;
          padding: .72rem 0;
          text-decoration: none;
          transition: color .2s ease;
        }

        .footer-request-link:first-of-type {
          border-top: 0;
        }

        .footer-request-link:hover {
          color: var(--footer-teal-bright);
        }

        .footer-request-icon {
          align-items: center;
          background: rgba(13,148,136,.14);
          border: 1px solid rgba(13,148,136,.3);
          border-radius: 50%;
          color: var(--footer-teal);
          display: flex;
          flex: 0 0 auto;
          font-size: .9rem;
          font-weight: 800;
          height: 1.8rem;
          justify-content: center;
          width: 1.8rem;
        }

        .footer-request-content {
          flex: 1;
          min-width: 0;
        }

        .footer-request-label {
          color: currentColor;
          display: block;
          font-size: .72rem;
          font-weight: 800;
          letter-spacing: .04em;
          line-height: 1.2;
        }

        .footer-request-description {
          color: rgba(247,247,244,.5);
          display: block;
          font-size: .64rem;
          line-height: 1.35;
          margin-top: .12rem;
        }

        .footer-request-arrow {
          color: var(--footer-teal);
          flex: 0 0 auto;
          font-size: 1rem;
          font-weight: 700;
        }

        .footer-utility {
          border-top: 1px solid var(--footer-line);
          display: flex;
          gap: 1.25rem;
          justify-content: space-between;
          padding: 1.55rem 0 1.65rem;
        }

        .footer-utility-group {
          align-items: center;
          display: flex;
          flex-wrap: wrap;
          gap: .7rem 1.25rem;
        }

        .footer-utility-link {
          color: rgba(247,247,244,.5);
          font-family: var(--font-body), Arial, sans-serif;
          font-size: .7rem;
          font-weight: 600;
          text-decoration: none;
          transition: color .2s ease;
        }

        .footer-utility-link:hover {
          color: var(--footer-teal);
        }

        .footer-bottom {
          align-items: center;
          border-top: 1px solid var(--footer-line);
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          justify-content: space-between;
          padding-top: 1.8rem;
        }

        .footer-copyright {
          color: rgba(247,247,244,.42);
          font-family: var(--font-body), Arial, sans-serif;
          font-size: .72rem;
          letter-spacing: .035em;
        }

        .footer-copyright-accent {
          color: var(--footer-teal);
          margin: 0 .5rem;
        }

        .footer-socials {
          align-items: center;
          display: flex;
          gap: .65rem;
        }

        .footer-social-label {
          color: rgba(247,247,244,.42);
          font-family: Arial, Helvetica, sans-serif;
          font-size: .52rem;
          font-weight: 800;
          letter-spacing: .15em;
          margin-right: .25rem;
          text-transform: uppercase;
        }

        .footer-social-icon {
          align-items: center;
          background: rgba(247,247,244,.03);
          border: 1px solid rgba(247,247,244,.12);
          border-radius: 50%;
          color: rgba(247,247,244,.52);
          display: flex;
          height: 36px;
          justify-content: center;
          transition: all .2s ease;
          width: 36px;
        }

        .footer-social-icon:hover {
          background: var(--footer-teal);
          border-color: var(--footer-teal);
          box-shadow: 0 4px 14px rgba(13,148,136,.35);
          color: var(--footer-ink);
          transform: translateY(-2px);
        }

        @media (max-width: 1120px) {
          .footer-top {
            gap: 2.5rem;
            grid-template-columns: 1.35fr 1fr 1fr;
          }

          .footer-requests {
            grid-column: 1 / -1;
            max-width: 37rem;
          }
        }

        @media (max-width: 820px) {
          .footer {
            padding: 3.5rem 0 calc(2rem + env(safe-area-inset-bottom));
          }

          .footer-content {
            width: min(100% - 2.25rem, 40rem);
          }

          .footer-top {
            gap: 2.25rem;
            grid-template-columns: 1fr;
            padding-bottom: 2.75rem;
          }

          .footer-brand {
            border-bottom: 1px solid rgba(247,247,244,.1);
            padding: 0 0 1.8rem;
          }

          .footer-brand-name {
            font-size: 1.7rem;
          }

          .footer-brand-copy {
            font-size: .88rem;
            max-width: 36ch;
          }

          .footer-mobile-columns {
            display: grid;
            gap: 1.25rem;
            grid-template-columns: minmax(0,1fr) minmax(0,1fr);
          }

          .footer-column-title {
            font-size: .6rem;
            letter-spacing: .15em;
            margin-bottom: .7rem;
          }

          .footer-links-list li {
            margin-bottom: 0;
          }

          .footer-link {
            align-items: center;
            border-bottom: 1px solid rgba(247,247,244,.08);
            box-sizing: border-box;
            display: flex;
            font-size: .78rem;
            min-height: 44px;
            padding: .65rem 0;
          }

          .footer-link-arrow {
            opacity: 1;
            margin-left: auto;
            transform: none;
          }

          .footer-link:hover {
            transform: none;
          }

          .footer-requests {
            border-radius: .9rem;
            grid-column: auto;
            max-width: none;
            padding: 1.05rem;
          }

          .footer-requests-title {
            font-size: 1.08rem;
          }

          .footer-request-link {
            min-height: 3.55rem;
          }

          .footer-request-description {
            font-size: .62rem;
          }

          .footer-utility {
            align-items: flex-start;
            flex-direction: column;
            gap: .85rem;
            padding: 1.25rem 0 1.45rem;
          }

          .footer-utility-group {
            gap: .55rem 1rem;
          }

          .footer-utility-link {
            font-size: .68rem;
          }

          .footer-bottom {
            align-items: center;
            flex-direction: column-reverse;
            gap: 1.45rem;
            justify-content: center;
            padding-top: 1.55rem;
            text-align: center;
          }

          .footer-copyright {
            font-size: .67rem;
            line-height: 1.6;
            max-width: 30ch;
          }

          .footer-socials {
            flex-wrap: wrap;
            gap: .65rem;
            justify-content: center;
            max-width: 100%;
          }

          .footer-social-label {
            margin: 0 0 .8rem;
            text-align: center;
            width: 100%;
          }

          .footer-social-icon {
            height: 44px;
            width: 44px;
          }

          .footer-social-icon svg {
            height: 18px;
            width: 18px;
          }
        }

        @media (max-width: 360px) {
          .footer-content {
            width: min(100% - 2rem, 40rem);
          }

          .footer-mobile-columns {
            gap: .9rem;
          }

          .footer-socials {
            gap: .5rem;
          }

          .footer-social-icon {
            height: 42px;
            width: 42px;
          }

          .footer-request-label {
            font-size: .68rem;
          }
        }
      `}</style>

      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="footer-brand-link">
              <span className="footer-brand-mark" aria-hidden="true">
                <img src="/mello-wien.png" alt="" />
              </span>

              <span className="footer-brand-name">MELLO</span>
            </Link>

            <p className="footer-brand-copy">
              Sportlicher Anspruch trifft moderne Vereinskultur. Mello verbindet
              Ambition auf dem Platz mit einer echten Gemeinschaft.
            </p>
          </div>

          <div className="footer-mobile-columns">
            <div>
              <p className="footer-column-title">Verein</p>

              <ul className="footer-links-list">
                {clubLinks.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="footer-column-title">Aktuell</p>

              <ul className="footer-links-list">
                {currentLinks.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="footer-requests">
            <p className="footer-column-title">Mitmachen</p>

            <h2 className="footer-requests-title">
              Teil von Mello werden.
            </h2>

            <p className="footer-requests-copy">
              Ob am Platz, im Verein oder als Mitglied: Wir freuen uns auf
              Menschen, die Mello mitgestalten wollen.
            </p>

            {contactLinks.map((link, index) => (
              <Link
                href={link.href}
                className="footer-request-link"
                key={link.href}
              >
                <span className="footer-request-icon" aria-hidden="true">
                  {index === 0 ? "↗" : index === 1 ? "+" : "✓"}
                </span>

                <span className="footer-request-content">
                  <span className="footer-request-label">{link.label}</span>
                  <span className="footer-request-description">
                    {link.description}
                  </span>
                </span>

                <span className="footer-request-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="footer-utility">
          <div className="footer-utility-group">
            <Link href="/mitgliedschaft/antrag" className="footer-utility-link">
              Mitgliedschaft beantragen
            </Link>

            <Link href="/kontakt" className="footer-utility-link">
              Kontaktseite
            </Link>

            <Link href="/impressum" className="footer-utility-link">
              Impressum
            </Link>
          </div>

          <div className="footer-utility-group">
            <Link href="/spielplan" className="footer-utility-link">
              Zum Spielplan
            </Link>

            <Link href="/news" className="footer-utility-link">
              Zu den News
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            © 2026 FC Mello Wien
            <span className="footer-copyright-accent">·</span>
            Alle Rechte vorbehalten.
          </div>

          <div className="footer-socials">
            <div className="footer-social-label">Folge Mello</div>

            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="footer-social-icon"
              >
                {social.svg}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}