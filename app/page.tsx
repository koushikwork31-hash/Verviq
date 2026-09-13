import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Difference from "@/components/Difference";
import Arena from "@/components/Arena";
import Playground from "@/components/Playground";
import HowItWorks from "@/components/HowItWorks";
import Session from "@/components/Session";
import Program from "@/components/Program";
import ForColleges from "@/components/ForColleges";
import Founder from "@/components/Founder";
import SocialProof from "@/components/SocialProof";
import Leaderboard from "@/components/Leaderboard";
import FinalCTA from "@/components/FinalCTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { XpProvider } from "@/components/games/XpContext";

export default function Page() {
  return (
    <XpProvider>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Difference />
        <Arena />
        <Playground />
        <HowItWorks />
        <Session />
        <Program />
        <ForColleges />
        <Founder />
        <SocialProof />
        <Leaderboard />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </XpProvider>
  );
}
