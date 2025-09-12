import Hero from "@/components/Hero";
import AboutTeam from "@/components/AboutTeam";
import RecentMatches from "@/components/RecentMatches";
import Players from "@/components/Players";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Botão de Login Admin - Posição fixa */}
      <Link to="/login">
        <Button
          variant="hero"
          size="icon"
          className="fixed top-6 right-6 z-50 shadow-hero hover:shadow-field transition-smooth"
          title="Acesso Administrativo"
        >
          <Shield className="w-5 h-5" />
        </Button>
      </Link>
      
      <Hero />
      <AboutTeam />
      <RecentMatches />
      <Players />
      <Footer />
    </div>
  );
};

export default Index;
