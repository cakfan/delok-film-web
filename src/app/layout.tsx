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
  ],
  title: {
    default: "Delok Film",
    template: "%s — Delok Film",
  },
  description: "Discover movies and dramas",
  openGraph: {
    description: "Discover asian movies and dramas",
    images: [""],
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
