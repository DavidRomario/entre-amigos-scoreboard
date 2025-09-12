import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Award, Activity } from "lucide-react";

const Players = () => {
  const players = [
    {
      id: 1,
      name: "João Silva",
      position: "Atacante",
      number: 10,
      goals: 15,
      assists: 8,
    },
    {
      id: 2,
      name: "Pedro Santos",
      position: "Goleiro",
      number: 1,
    },
    {
      id: 3,
      name: "Carlos Mendes",
      position: "Zagueiro",
      number: 4,
      goals: 15,
      assists: 8,
    },
    {
      id: 4,
      name: "Rafael Lima",
      position: "Meio-campo",
      number: 8,
      goals: 15,
      assists: 8,
    },
    {
      id: 5,
      name: "Bruno Costa",
      position: "Lateral",
      number: 2,
      goals: 15,
      assists: 8,
    },
    {
      id: 6,
      name: "Lucas Ferreira",
      position: "Atacante",
      number: 11,
      goals: 15,
      assists: 8,
    }
  ];

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'Goleiro':
        return 'bg-victory text-team-black';
      case 'Zagueiro':
        return 'bg-team-black text-white';
      case 'Meio-campo':
        return 'bg-primary text-white';
      case 'Atacante':
        return 'bg-destructive text-white';
      case 'Lateral':
        return 'bg-primary text-green';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPlayerStats = (player: any) => {
    if (player.position === 'Goleiro', 'Atacante', 'Meio-campo', 'Zagueiro', 'Lateral') {
      return [
        { label: 'Gols', value: player.goals },
        { label: 'Assistências', value: player.assists }
      ];
    } else if (player.position === 'Meio-campo') {
      return [
        { label: 'Passes', value: player.passes },
        { label: 'Assistências', value: player.assists }
      ];
    }
  };

  return (
    <section className="py-20 bg-mustard-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-team-black mb-6">
            Nosso <span className="text-primary">Elenco</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça os jogadores que fazem a diferença em campo e representam o espírito do Entre Amigos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {players.map((player) => (
            <Card key={player.id} className="p-6 shadow-card hover:shadow-field transition-smooth border-0 bg-white">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-team-black">{player.name}</h3>
                    <Badge className={getPositionColor(player.position)} variant="secondary">
                      {player.position}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">#{player.number}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                {getPlayerStats(player).map((stat, index) => (
                  <div key={index} className="text-center bg-mustard-light rounded-lg p-3">
                    <div className="text-xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Players;