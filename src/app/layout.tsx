import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Omnia Protocol",
    template: "%s — Omnia Protocol",
  },
  description:
    "Settlement-agnostic causal graph consensus. Sub-100µs finality. Public domain.",
  keywords: [
    "Omnia", "protocol", "DAG", "consensus", "ZK-rollup", "CRDTs",
    "blockchain", "causal graph", "decentralized", "cryptography",
  ],
  authors: [{ name: "Omnia Protocol Contributors" }],
  openGraph: {
    title: "Omnia Protocol",
    description:
      "Settlement-agnostic causal graph consensus. Sub-100µs finality. Public domain.",
    type: "website",
    siteName: "Omnia Protocol",
  },
  twitter: {
    card: "summary_large_image",
    title: "Omnia Protocol",
    description:
      "Settlement-agnostic causal graph consensus. Sub-100µs finality. Public domain.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable} antialiased bg-black text-[#F5F5F7]`}
      >
        {children}
      </body>
    </html>
  );
}
