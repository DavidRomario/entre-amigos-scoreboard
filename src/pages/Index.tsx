import Hero from "@/components/Hero";
import AboutTeam from "@/components/AboutTeam";
import RecentMatches from "@/components/RecentMatches";
import Players from "@/components/Players";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <AboutTeam />
      <RecentMatches />
      <Players />
      <Footer />
    </div>
  );
};

export default Index;
