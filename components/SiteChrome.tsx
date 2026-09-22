"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isInternalArea =
    pathname === "/login" ||
    pathname === "/passwort-aendern" ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/trainer") ||
    pathname.startsWith("/auth");

  if (isInternalArea) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}