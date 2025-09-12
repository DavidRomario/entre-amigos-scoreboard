import { useState, useEffect } from "react";
import { Heart, Users, Trophy } from "lucide-react";
import { getAllUsers } from "@/services/usersServices";
import { getAllMatches } from "@/services/matchesServices";

const Footer = () => {
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [totalGames, setTotalGames] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersRes = await getAllUsers();
        if (usersRes.success) setTotalPlayers(usersRes.total);

        const gamesRes = await getAllMatches();
        setTotalGames(gamesRes.length);
      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <footer className="gradient-hero text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Team Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-black">Entre Amigos FC</h3>
            <p className="text-white/80 mb-6">
              Mais que um time, uma família unida pela paixão do futebol. 
              Desde 2021 levando alegria e emoção para os campos.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-victory" />
                <span className="text-sm">Unidos pela amizade</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6">Nossos Números</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white/80">Jogadores Ativos</span>
                <span className="font-bold text-victory">{totalPlayers}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">Jogos na Temporada</span>
                <span className="font-bold text-victory">{totalGames}</span>
              </div>
            </div>
          </div>

          {/* Contact & Info */}
          {/* <div>
            <h4 className="text-xl font-semibold mb-6">Informações</h4>
            <div className="space-y-4 text-white/80">
              <div>
                <div className="font-medium text-white">Contato</div>
                <div className="text-sm">WhatsApp: (11) 99999-9999</div>
              </div>
            </div>
          </div> */}
        </div>

        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Trophy className="w-5 h-5 text-victory" />
              <span className="text-sm text-white/80">
                © {new Date().getFullYear()} Entre Amigos FC. Todos os direitos reservados.
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <Users className="w-4 h-4" />
              <span>Feito por David Romário.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
