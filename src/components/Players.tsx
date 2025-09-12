import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";
import { getAllUsers } from "@/services/usersServices";
import { useToast } from "@/hooks/use-toast";

interface Player {
  id: number;
  name: string;
  position: string;
  jerseyNumber: number;
  age: number;
  goals?: number;
  assists?: number;
}

const Players = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await getAllUsers();
        if (res.success) {
          setPlayers(res.users);
        }
      } catch (error) {
        toast({
          title: "Erro",
          description: "Não foi possível carregar os jogadores.",
          variant: "destructive",
        });
        console.error(error);
      }
    };

    fetchPlayers();
  }, [toast]);

  const getPositionColor = (position: string) => {
    switch (position) {
      case "Goleiro":
        return "bg-victory text-team-black";
      case "Zagueiro":
        return "bg-team-black text-white";
      case "Meio-campo":
        return "bg-primary text-white";
      case "Volante":
        return "bg-victory text-white";
      case "Atacante":
        return "bg-destructive text-white";
      case "Lateral":
        return "bg-primary text-green";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <section className="py-20 bg-mustard-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2  id="team-section" className="text-4xl md:text-5xl font-bold text-team-black mb-6">
            Nosso <span className="text-primary">Elenco</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça os jogadores que fazem a diferença em campo e representam o espírito do Entre Amigos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {players.map((player) => (
            <Card
              key={player.id}
              className="p-6 shadow-card hover:shadow-field transition-smooth border-0 bg-white"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-team-black">{player.name}</h3>
                    <Badge
                      className={getPositionColor(player.position)}
                      variant="secondary"
                    >
                      {player.position}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    #{player.jerseyNumber}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Players;
