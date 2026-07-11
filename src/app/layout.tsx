import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Providers } from "@/components/layout/providers";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "LELLA — L'élégance de la tradition, la magie de votre célébration",
  description:
    "La première marketplace premium qui connecte les familles aux meilleurs prestataires d'événements en Algérie. Mariages, fiançailles, circoncisions, baptêmes.",
  keywords: [
    "mariage algérie", "prestataire mariage", "salle des fêtes alger",
    "traiteur mariage", "photographe mariage", "neggafa", "organisation mariage",
    "LELLA", "mariage traditionnel algérien",
  ],
  openGraph: {
    title: "LELLA — Marketplace premium des événements en Algérie",
    description: "Trouvez les meilleurs prestataires pour votre célébration.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-ivory text-navy antialiased">
        <Providers>
          <Navbar />
          <main className="flex-1 pb-16 lg:pb-0">{children}</main>
          <MobileBottomNav />
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
