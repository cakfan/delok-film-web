import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Providers from "@/providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.HOMEPAGE_URL ?? "http://localhost:3000"),
  keywords: [
    "movies",
    "drama",
    "asian dramas",
    "asian movies",
    "japanese movies",
    "japanese dramas",
    "korean movies",
    "korean drama",
    "Asian movies",
    "Asian dramas",
    "Korean dramas",
    "Chinese films",
    "Japanese cinema",
    "Asian entertainment",
    "movie reviews",
    "drama recommendations",
  ],
  title: {
    default: "Delok Film — Explore Asian Movies and Dramas",
    template: "%s — Delok Film",
  },
  description:
    "Discover Delok Film, your ultimate source for Asian movies and dramas. Dive into a curated collection of Korean dramas, Chinese blockbusters, Japanese films, and more.",
  authors: {
    name: "Taufan Fatahillah",
    url: "https://instagram.com/withcakfan",
  },
  openGraph: {
    title: "Delok Film — Explore Asian Movies and Dramas",
    description:
      "Delok Film is your gateway to Asian cinema. Explore a diverse selection of movies and dramas from Korea, China, Japan, and beyond. Join our community of cinephiles today!",
    images: ["/img/og/default.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
