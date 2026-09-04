"use client";

import Link from "next/link";

const clubLinks = [
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/team", label: "Team" },
  { href: "/spielplan", label: "Spielplan" },
];

const participateLinks = [
  { href: "/kontakt?anliegen=spieler", label: "Spieleranfrage" },
  { href: "/kontakt?anliegen=community", label: "Verein mitgestalten" },
  { href: "/mitgliedschaft/vorteile", label: "Mitgliedschaft entdecken" },
];

const mediaLinks = [
  { href: "/news", label: "News & Berichte" },
  { href: "/tv", label: "Mello TV" },
];

const contactLinks = [
  { href: "/kontakt", label: "Kontaktseite" },
  { href: "/anfahrt", label: "Anfahrt & Platz" },
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

function FooterColumn({
  title,
  links,
  className = "",
}: {
  title: string;
  links: { href: string; label: string }[];
  className?: string;
}) {
  return (
    <div className={`footer-column ${className}`}>
      <p className="footer-column-title">{title}</p>

      <ul className="footer-links-list">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="footer-link">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
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
          --footer-line: rgba(247,247,244,.12);
          background: var(--footer-ink);
          border-top: 1px solid var(--footer-line);
          color: var(--footer-paper);
          padding: 5rem 0 3.2rem;
          position: relative;
        }

        .footer * {
          box-sizing: border-box;
        }

        .footer-content {
          margin: 0 auto;
          width: min(100% - 6rem, 1440px);
        }

        .footer-grid {
          align-items: start;
          display: grid;
          gap: 4.35rem;
          grid-template-columns: 1.65fr .82fr 1.1fr .9fr;
          margin-bottom: 4.15rem;
        }

        .footer-brand {
          padding-right: 1rem;
        }

        .footer-brand-link {
          align-items: center;
          display: inline-flex;
          gap: .9rem;
          margin-bottom: 1.2rem;
          text-decoration: none;
        }

        .footer-brand-mark {
          align-items: center;
          border: 1px solid rgba(13,148,136,.4);
          border-radius: 50%;
          display: flex;
          height: 2.7rem;
          justify-content: center;
          overflow: hidden;
          width: 2.7rem;
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
          font-weight: 700;
          letter-spacing: .02em;
          line-height: 1;
          text-transform: uppercase;
        }

        .footer-brand-copy {
          color: rgba(247,247,244,.65);
          font-family: var(--font-body), Arial, sans-serif;
          font-size: .88rem;
          line-height: 1.65;
          margin: 0;
          max-width: 34ch;
        }

        .footer-column-title {
          color: var(--footer-teal);
          font-family: var(--font-body), Arial, sans-serif;
          font-size: .67rem;
          font-weight: 800;
          letter-spacing: .16em;
          margin: 0 0 1.25rem;
          text-transform: uppercase;
        }

        .footer-links-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .footer-links-list li {
          margin-bottom: .78rem;
        }

        .footer-link {
          color: rgba(247,247,244,.65);
          display: inline-block;
          font-family: var(--font-body), Arial, sans-serif;
          font-size: .84rem;
          font-weight: 600;
          line-height: 1.4;
          text-decoration: none;
          transition: color .2s ease, transform .2s ease;
        }

        .footer-link:hover {
          color: var(--footer-paper);
          transform: translateX(2px);
        }

        .footer-right-stack {
          display: flex;
          flex-direction: column;
          gap: 3.2rem;
        }

        .footer-column-contact {
          padding-top: .2rem;
        }

        .footer-bottom {
          align-items: center;
          border-top: 1px solid var(--footer-line);
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          justify-content: space-between;
          padding-top: 2rem;
        }

        .footer-copyright {
          color: rgba(247,247,244,.45);
          font-family: var(--font-body), Arial, sans-serif;
          font-size: .74rem;
          letter-spacing: .04em;
        }

        .footer-copyright-accent {
          color: var(--footer-teal);
          margin: 0 .5rem;
        }

        .footer-socials {
          align-items: center;
          display: flex;
          gap: .75rem;
        }

        .footer-social-label {
          color: rgba(247,247,244,.42);
          font-family: Arial, Helvetica, sans-serif;
          font-size: .52rem;
          font-weight: 800;
          letter-spacing: .15em;
          margin-right: .1rem;
          text-transform: uppercase;
        }

        .footer-social-icon {
          align-items: center;
          background: rgba(247,247,244,.03);
          border: 1px solid rgba(247,247,244,.12);
          border-radius: 50%;
          color: rgba(247,247,244,.45);
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
          .footer-grid {
            gap: 2.7rem;
            grid-template-columns: 1.5fr 1fr 1.15fr;
          }

          .footer-right-stack {
            grid-column: 3;
          }
        }

        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1.5fr 1fr;
          }

          .footer-right-stack {
            grid-column: auto;
          }

          .footer-column-media {
            grid-column: 2;
          }
        }

        @media (max-width: 820px) {
          .footer {
            padding: 3.5rem 0 calc(2rem + env(safe-area-inset-bottom));
          }

          .footer-content {
            width: min(100% - 2.25rem, 40rem);
          }

          .footer-grid {
            display: grid;
            gap: 2.3rem;
            grid-template-columns: 1fr;
            margin-bottom: 2.6rem;
          }

          .footer-brand {
            border-bottom: 1px solid rgba(247,247,244,.1);
            padding: 0 0 1.9rem;
          }

          .footer-brand-name {
            font-size: 1.7rem;
          }

          .footer-brand-copy {
            font-size: .88rem;
            max-width: 36ch;
          }

          .footer-mobile-main-columns {
            display: grid;
            gap: 1.25rem;
            grid-template-columns: minmax(0,1fr) minmax(0,1fr);
          }

          .footer-right-stack {
            display: grid;
            gap: 2.15rem;
          }

          .footer-column-title {
            font-size: .61rem;
            letter-spacing: .15em;
            margin-bottom: .65rem;
          }

          .footer-links-list li {
            margin-bottom: 0;
          }

          .footer-link {
            align-items: center;
            border-bottom: 1px solid rgba(247,247,244,.08);
            box-sizing: border-box;
            display: flex;
            font-size: .79rem;
            min-height: 44px;
            padding: .65rem 0;
          }

          .footer-link::after {
            color: var(--footer-teal);
            content: "→";
            font-size: .95rem;
            font-weight: 700;
            margin-left: auto;
          }

          .footer-link:hover {
            transform: none;
          }

          .footer-column-contact {
            border-top: 1px solid rgba(247,247,244,.1);
            padding-top: 2rem;
          }

          .footer-bottom {
            align-items: center;
            flex-direction: column-reverse;
            gap: 1.55rem;
            justify-content: center;
            padding-top: 1.65rem;
            text-align: center;
          }

          .footer-copyright {
            font-size: .68rem;
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

          .footer-mobile-main-columns {
            gap: .9rem;
          }

          .footer-socials {
            gap: .5rem;
          }

          .footer-social-icon {
            height: 42px;
            width: 42px;
          }
        }
      `}</style>

      <div className="footer-content">
        <div className="footer-grid">
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

          <div className="footer-mobile-main-columns">
            <FooterColumn title="Verein" links={clubLinks} />
            <FooterColumn title="Mitmachen" links={participateLinks} />
          </div>

          <FooterColumn
            title="Medien"
            links={mediaLinks}
            className="footer-column-media"
          />

          <div className="footer-right-stack">
            <FooterColumn
              title="Kontakt"
              links={contactLinks}
              className="footer-column-contact"
            />
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