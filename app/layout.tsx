import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Poppins } from "next/font/google";

export const metadata = {
  title: "FC Mello Wien",
  description: "Wiens jüngster Verein",
};

// Poppins Schriftart laden
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        {/* FontAwesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>

      <body
        className={`${poppins.className} bg-black text-white flex flex-col min-h-screen`}
      >
        <Header />

        <main className="flex-grow pt-24">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
