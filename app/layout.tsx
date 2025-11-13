import "./globals.css";
import Header from "@/components/Header";

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
      <body className="bg-black text-white font-sans">
        <Header />
        <main className="pt-24">{children}</main>
      </body>
    </html>
  );
}
