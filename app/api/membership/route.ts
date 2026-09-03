import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

type ContributionPlan = "monthly" | "annual";

function escHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizeText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";

  return value.trim().slice(0, maxLength);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getPlanDetails(plan: ContributionPlan) {
  if (plan === "monthly") {
    return {
      label: "10 € monatlich",
      amount: "10 €",
      interval: "monatlich",
    };
  }

  return {
    label: "100 € jährlich",
    amount: "100 €",
    interval: "jährlich",
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const firstName = normalizeText(body.firstName, 100);
    const lastName = normalizeText(body.lastName, 100);
    const email = normalizeText(body.email, 254).toLowerCase();
    const company = normalizeText(body.company, 150);
    const message = normalizeText(body.message, 2_000);
    const website = normalizeText(body.website, 200);

    const contributionPlan =
      body.contributionPlan === "monthly" || body.contributionPlan === "annual"
        ? (body.contributionPlan as ContributionPlan)
        : null;

    const termsAccepted = body.termsAccepted === true;
    const privacyAccepted = body.privacyAccepted === true;
    const newsletterOptIn = body.newsletterOptIn === true;

    // Honeypot: Für Bots scheinbar erfolgreich antworten,
    // aber keine Daten speichern und keine E-Mail verschicken.
    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (
      !firstName ||
      !lastName ||
      !email ||
      !contributionPlan ||
      !termsAccepted ||
      !privacyAccepted
    ) {
      return NextResponse.json(
        { error: "Bitte fülle alle Pflichtfelder aus und akzeptiere die Bedingungen." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Bitte gib eine gültige E-Mail-Adresse ein." },
        { status: 400 },
      );
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error("SUPABASE_ENV_MISSING");
      return NextResponse.json(
        { error: "Der Antrag konnte derzeit nicht gespeichert werden." },
        { status: 500 },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    const { data: application, error: dbError } = await supabase
      .from("membership_applications")
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email,
          contribution_plan: contributionPlan,
          company: company || null,
          message: message || null,
          newsletter_opt_in: newsletterOptIn,
          status: "pending",
        },
      ])
      .select("id, created_at")
      .single();

    if (dbError) {
      console.error("MEMBERSHIP_SUPABASE_INSERT_ERROR:", dbError);

      return NextResponse.json(
        { error: "Der Antrag konnte nicht gespeichert werden. Bitte versuche es später erneut." },
        { status: 500 },
      );
    }

    const plan = getPlanDetails(contributionPlan);
    const submittedAt = application?.created_at
      ? new Intl.DateTimeFormat("de-AT", {
          dateStyle: "medium",
          timeStyle: "short",
          timeZone: "Europe/Vienna",
        }).format(new Date(application.created_at))
      : "soeben";

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const mailTo = process.env.MAIL_TO;

    if (!smtpUser || !smtpPass || !mailTo) {
      console.error("SMTP_ENV_MISSING");

      return NextResponse.json({
        ok: true,
        warning:
          "Der Antrag wurde gespeichert. Die E-Mail-Benachrichtigung konnte nicht versendet werden.",
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.world4you.com",
      port: 587,
      secure: false,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      requireTLS: true,
    });

    const fullName = `${firstName} ${lastName}`;
    const safeName = escHtml(fullName);
    const safeEmail = escHtml(email);
    const safeCompany = escHtml(company);
    const safeMessage = escHtml(message).replace(/\n/g, "<br />");
    const safePlan = escHtml(plan.label);
    const safeSubmittedAt = escHtml(submittedAt);
    const safeApplicationId = escHtml(application.id);

    // Die interne Mail ist entscheidend: Sie informiert euch über neue Anträge.
    // Der Antrag ist unabhängig davon bereits in Supabase gespeichert.
    try {
      await transporter.sendMail({
        from: `"FC Mello Wien" <${smtpUser}>`,
        to: mailTo,
        replyTo: email,
        subject: `Neuer Mitgliedschaftsantrag: ${fullName}`,
        text: [
          "Neuer Mitgliedschaftsantrag bei FC Mello Wien",
          "",
          `Name: ${fullName}`,
          `E-Mail: ${email}`,
          `Beitrag: ${plan.label}`,
          `Firma / Organisation: ${company || "—"}`,
          `Newsletter: ${newsletterOptIn ? "Ja" : "Nein"}`,
          `Eingegangen: ${submittedAt}`,
          `Antrags-ID: ${application.id}`,
          "",
          "Nachricht:",
          message || "—",
        ].join("\n"),
        html: `
          <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.55;">
            <h2 style="margin: 0 0 16px;">Neuer Mitgliedschaftsantrag</h2>
            <p style="margin: 0 0 18px;">
              Ein neuer Antrag auf außerordentliche Mitgliedschaft ist eingegangen.
            </p>

            <table style="border-collapse: collapse; width: 100%; max-width: 620px;">
              <tr>
                <td style="padding: 8px 12px 8px 0; color: #666;"><strong>Name</strong></td>
                <td style="padding: 8px 0;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 12px 8px 0; color: #666;"><strong>E-Mail</strong></td>
                <td style="padding: 8px 0;">
                  <a href="mailto:${safeEmail}">${safeEmail}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 12px 8px 0; color: #666;"><strong>Beitrag</strong></td>
                <td style="padding: 8px 0;">${safePlan}</td>
              </tr>
              <tr>
                <td style="padding: 8px 12px 8px 0; color: #666;"><strong>Firma</strong></td>
                <td style="padding: 8px 0;">${safeCompany || "—"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 12px 8px 0; color: #666;"><strong>Newsletter</strong></td>
                <td style="padding: 8px 0;">${newsletterOptIn ? "Ja" : "Nein"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 12px 8px 0; color: #666;"><strong>Eingegangen</strong></td>
                <td style="padding: 8px 0;">${safeSubmittedAt}</td>
              </tr>
              <tr>
                <td style="padding: 8px 12px 8px 0; color: #666;"><strong>Antrags-ID</strong></td>
                <td style="padding: 8px 0;">${safeApplicationId}</td>
              </tr>
            </table>

            <div style="margin-top: 20px; padding: 14px; background: #f4f4f4;">
              <strong>Nachricht</strong><br />
              ${safeMessage || "—"}
            </div>
          </div>
        `,
      });
    } catch (mailErr) {
      console.error("MEMBERSHIP_INTERNAL_MAIL_ERROR:", mailErr);
    }

    // Bestätigung an die antragstellende Person.
    // Auch hier gilt: Ein Mail-Fehler macht den gespeicherten Antrag nicht ungültig.
    try {
      await transporter.sendMail({
        from: `"FC Mello Wien" <${smtpUser}>`,
        to: email,
        replyTo: mailTo,
        subject: "Dein Mitgliedschaftsantrag bei FC Mello Wien",
        text: [
          `Hallo ${firstName},`,
          "",
          "danke für deinen Antrag auf außerordentliche Mitgliedschaft bei FC Mello Wien.",
          "",
          `Gewählter Beitrag: ${plan.label}`,
          "",
          "Wir prüfen deinen Antrag persönlich und melden uns anschließend mit den nächsten Schritten sowie den Zahlungsdetails bei dir.",
          "",
          "Dein Antrag stellt noch keine automatische Aufnahme in den Verein dar. Über die Aufnahme entscheidet der Vorstand gemäß den Vereinsstatuten.",
          "",
          "Sportliche Grüße",
          "FC Mello Wien",
          "kontakt@mellowien.at",
        ].join("\n"),
        html: `
          <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.65;">
            <div style="max-width: 620px; margin: 0 auto;">
              <div style="background: #080808; padding: 28px 30px;">
                <div style="color: #0d9488; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">
                  FC Mello Wien
                </div>
                <h1 style="color: #ffffff; font-size: 28px; line-height: 1.1; margin: 10px 0 0;">
                  Antrag erhalten.
                </h1>
              </div>

              <div style="padding: 28px 30px; border: 1px solid #e6e6e6; border-top: 0;">
                <p>Hallo ${escHtml(firstName)},</p>

                <p>
                  danke für deinen Antrag auf außerordentliche Mitgliedschaft
                  bei <strong>FC Mello Wien</strong>.
                </p>

                <div style="background: #f3f8f7; border-left: 3px solid #0d9488; padding: 14px 16px; margin: 20px 0;">
                  <div style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">
                    Gewählter Beitrag
                  </div>
                  <div style="color: #111; font-size: 20px; font-weight: 700; margin-top: 3px;">
                    ${safePlan}
                  </div>
                </div>

                <p>
                  Wir prüfen deinen Antrag persönlich und melden uns anschließend
                  mit den nächsten Schritten sowie den Zahlungsdetails bei dir.
                </p>

                <p style="color: #666; font-size: 14px;">
                  Dein Antrag stellt noch keine automatische Aufnahme in den Verein
                  dar. Über die Aufnahme entscheidet der Vorstand gemäß den
                  geltenden Vereinsstatuten.
                </p>

                <p style="margin-top: 28px;">
                  Sportliche Grüße<br />
                  <strong>FC Mello Wien</strong><br />
                  <a href="mailto:kontakt@mellowien.at" style="color: #0d9488;">
                    kontakt@mellowien.at
                  </a>
                </p>
              </div>
            </div>
          </div>
        `,
      });
    } catch (mailErr) {
      console.error("MEMBERSHIP_CONFIRMATION_MAIL_ERROR:", mailErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("MEMBERSHIP_API_ERROR:", err);

    return NextResponse.json(
      { error: "Serverfehler. Bitte versuche es später erneut." },
      { status: 500 },
    );
  }
}