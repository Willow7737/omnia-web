import type { Metadata } from "next";
import { withBasePath } from "@/lib/base-path";
import "./globals.css";

const description =
  "Settlement-agnostic causal graph consensus. BFT finality measured live across three continents. Public domain.";

export const metadata: Metadata = {
  metadataBase: new URL("https://willow7737.github.io/omnia-web"),
  title: { default: "Omnia Protocol", template: "%s — Omnia Protocol" },
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
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
