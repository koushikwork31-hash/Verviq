import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Playground from "@/components/Playground";
import { XpProvider } from "@/components/games/XpContext";

export const metadata: Metadata = {
  title: "Playground — Verviq",
  description:
    "Three playable interview challenges with real XP: HR Hot Seat, 60-Second Challenge and STAR Builder. Practice here, perform in the arena.",
};

export default function PlayPage() {
  return (
    <XpProvider>
      <Navbar />
      <main className="pt-16">
        <Playground />
      </main>
      <Footer />
    </XpProvider>
  );
}
