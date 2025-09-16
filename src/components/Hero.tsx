import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/entre-amigos.jpg";
import { Users, Calendar } from "lucide-react";
import { getAllUsers } from "@/services/usersServices";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [yearsOfHistory, setYearsOfHistory] = useState(0);
  const foundationDate = new Date("2020-02-02");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await getAllUsers();
        if (res.success) {
          setTotalPlayers(res.total);
        }
      } catch (error) {
        console.error("Erro ao buscar jogadores:", error);
      }
    };

    fetchPlayers();

    const today = new Date();
    let years = today.getFullYear() - foundationDate.getFullYear();

    if (
      today.getMonth() < foundationDate.getMonth() ||
      (today.getMonth() === foundationDate.getMonth() &&
        today.getDate() < foundationDate.getDate())
    ) {
      years--;
    }
    setYearsOfHistory(years);
  }, []);

  const handleViewMatches = () => {
    const section = document.getElementById("recent-matches");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const handleViewTeam = () => {
    const section = document.getElementById("team-section");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 gradient-hero opacity-75"></div>
      </div>
      
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Entre <span className="text-victory">Amigos</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Mais que um time, uma família unida pela paixão do futebol
          </p>
        </div>

        <div className="grid grid-flow-col flex flex gap-6 mb-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-card">
            <Users className="w-8 h-8 text-black mx-auto mb-3" />
            <div className="text-2xl font-bold text-black">{totalPlayers}</div>
            <div className="text-sm text-white/80 text-black">Jogadores Ativos</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-card">
            <Calendar className="w-8 h-8 text-black mx-auto mb-3" />
            <div className="text-2xl font-bold text-black">{yearsOfHistory}</div>
            <div className="text-sm text-white/80 text-black">Anos de História</div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="victory"
            size="lg"
            className="text-lg px-8 py-3"
            onClick={handleViewMatches}
          >
            Ver Últimos Jogos
          </Button>
          <Button
            variant="hero"
            size="lg"
            className="text-lg px-8 py-3"
            onClick={handleViewTeam}
          >
            Conhecer o Time
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
