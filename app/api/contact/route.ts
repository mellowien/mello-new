import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

function escHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(req: Request) {
  try {
    const { name, email, message, website } = await req.json();

    // Honeypot gegen Bots
    if (website) return NextResponse.json({ ok: true });

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 1) Supabase (serverseitig)
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error: dbError } = await supabase
      .from("messages")
      .insert([{ name, email, message }]);

    if (dbError) {
      console.error("SUPABASE_INSERT_ERROR:", dbError);
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }

    // 2) Mail senden (World4You SMTP) – best effort
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.world4you.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER!,
          pass: process.env.SMTP_PASS!,
        },
        requireTLS: true,
      });

      await transporter.sendMail({
        from: `"FC Mello Wien" <${process.env.SMTP_USER!}>`,
        to: process.env.MAIL_TO!,
        replyTo: email, // Antworten gehen an den Absender
        subject: `Neue Kontaktanfrage von ${name}`,
        text: `Name: ${name}\nE-Mail: ${email}\n\n${message}`,
        html: `
          <h2>Neue Kontaktanfrage</h2>
          <p><b>Name:</b> ${escHtml(name)}</p>
          <p><b>E-Mail:</b> ${escHtml(email)}</p>
          <p><b>Nachricht:</b><br/>${escHtml(message).replace(/\n/g, "<br/>")}</p>
        `,
      });
    } catch (mailErr) {
      // DB ist schon gespeichert – Mail-Fehler nur loggen
      console.error("MAIL_SEND_ERROR:", mailErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("CONTACT_API_ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
