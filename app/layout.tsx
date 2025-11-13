import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "FC Mello Wien",
  description: "Wiens jüngster Verein",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        {/* FontAwesome für Social Icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>

      <body className="bg-black text-white font-sans flex flex-col min-h-screen">

        {/* Header (immer oben sichtbar) */}
        <Header />

        {/* Hauptinhalt der Seite */}
        <main className="flex-grow pt-24">
          {children}
        </main>

        {/* Footer (global auf jeder Seite) */}
        <Footer />

      </body>
    </html>
  );
}
