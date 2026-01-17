import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

function esc(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export async function POST(req: Request) {
  try {
    const { name, email, message, website } = await req.json();

    // Honeypot gegen Bots
    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 1️⃣ Supabase (serverseitig)
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabase
      .from("messages")
      .insert([{ name, email, message }]);

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }

    // 2️⃣ Mail senden (World4You SMTP)
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
      replyTo: email,
      subject: `Neue Kontaktanfrage von ${name}`,
      text: `Name: ${name}\nE-Mail: ${email}\n\n${message}`,
      html: `
        <h2>Neue Kontaktanfrage</h2>
        <p><b>Name:</b> ${esc(name)}</p>
        <p><b>E-Mail:</b> ${esc(email)}</p>
        <p><b>Nachricht:</b><br/>${esc(message).replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
