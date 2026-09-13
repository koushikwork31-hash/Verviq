import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Verviq — With great communication comes great opportunities.",
  description:
    "Verviq helps Tier-2 and Tier-3 college students build communication, confidence and interview skills through real-world simulations, games and mock interviews.",
  keywords: [
    "interview preparation",
    "employability",
    "communication skills",
    "mock interviews",
    "college placement training",
    "edtech",
  ],
  openGraph: {
    title: "Verviq — With great communication comes great opportunities.",
    description:
      "Real-world interview practice for Tier-2 and Tier-3 college students. Simulations, games and mock interviews — not lectures.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
