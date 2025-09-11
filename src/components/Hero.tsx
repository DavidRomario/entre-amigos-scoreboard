import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-mustard-field.jpg";
import { Trophy, Users, Calendar } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 gradient-hero opacity-75"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Entre <span className="text-victory">Amigos</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Mais que um time, uma família unida pela paixão do futebol
          </p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-card">
            <Trophy className="w-8 h-8 text-victory mx-auto mb-3" />
            <div className="text-2xl font-bold">5</div>
            <div className="text-sm text-white/80">Torneios Vencidos</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-card">
            <Users className="w-8 h-8 text-victory mx-auto mb-3" />
            <div className="text-2xl font-bold">20</div>
            <div className="text-sm text-white/80">Jogadores Ativos</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-card">
            <Calendar className="w-8 h-8 text-victory mx-auto mb-3" />
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm text-white/80">Anos de História</div>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="victory" size="lg" className="text-lg px-8 py-3">
            Ver Últimos Jogos
          </Button>
          <Button variant="hero" size="lg" className="text-lg px-8 py-3">
            Conhecer o Time
          </Button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;