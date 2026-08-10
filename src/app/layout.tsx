import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import { withBasePath } from "@/lib/base-path";
import "./globals.css";

/*
 * Typography swap — DESIGN.md doesn't mandate a typeface, but the spirit of
 * ALF (flat, geometric, spec-sheet) calls for something with more character
 * than Geist. Inter handles body text; Space Grotesk gives headlines a
 * distinctive technical edge that reads as "protocol, not landing page."
 * Geist Mono stays for the wordmark and inline code.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const description =
  "Settlement-agnostic causal graph consensus. BFT finality measured live across three continents. Public domain.";

export const metadata: Metadata = {
  metadataBase: new URL("https://willow7737.github.io/omnia-web"),
  title: {
    default: "Omnia Protocol",
    template: "%s — Omnia Protocol",
  },
  description,
  keywords: [
    "Omnia", "protocol", "DAG", "consensus", "ZK-rollup", "CRDTs",
    "blockchain", "causal graph", "decentralized", "cryptography",
  ],
  authors: [{ name: "Omnia Protocol Contributors" }],
  icons: {
    icon: [
      { url: withBasePath("/icon.svg"), type: "image/svg+xml" },
      { url: withBasePath("/omnia-mark.png"), type: "image/png" },
    ],
    apple: withBasePath("/apple-icon.png"),
  },
  openGraph: {
    title: "Omnia Protocol",
    description,
    type: "website",
    siteName: "Omnia Protocol",
    images: ["/omnia-mark-512.png"],
  },
  twitter: {
    card: "summary",
    title: "Omnia Protocol",
    description,
    images: ["/omnia-mark-512.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
