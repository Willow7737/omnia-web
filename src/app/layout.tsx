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
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Omnia Protocol — Settlement-Agnostic Causal Graph Consensus",
  description:
    "Sub-100µs finality. DAG + vector clocks + CRDTs. ZK-rollup settlement on any DA layer. Public domain.",
  keywords: [
    "Omnia",
    "protocol",
    "DAG",
    "consensus",
    "ZK-rollup",
    "CRDTs",
    "blockchain",
    "causal graph",
  ],
  authors: [{ name: "Omnia Protocol Contributors" }],
  openGraph: {
    title: "Omnia Protocol",
    description:
      "Settlement-agnostic causal graph consensus. Sub-100µs finality. Public domain.",
    type: "website",
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
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable} antialiased bg-[#0F0F0F] text-[#F5F0EB]`}
      >
        {children}
      </body>
    </html>
  );
}
