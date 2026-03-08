import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FC Mello Wien",
    template: "%s | FC Mello Wien",
  },
  description: "Wir sind Mello. Ein Verein, der moderner denkt: offen, gemeinschaftlich, ambitioniert.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${bebasNeue.variable} ${dmSans.variable}`} style={{
        margin: 0, padding: 0,
        background: "#080808",
        color: "#f5f5f5",
        fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
        overflowX: "hidden",
      }}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}