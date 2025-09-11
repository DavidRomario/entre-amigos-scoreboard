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
      status: "Titular"
    },
    {
      id: 2,
      name: "Pedro Santos",
      position: "Goleiro",
      number: 1,
      saves: 45,
      cleanSheets: 12,
      status: "Titular"
    },
    {
      id: 3,
      name: "Carlos Mendes",
      position: "Zagueiro",
      number: 4,
      tackles: 78,
      blocks: 23,
      status: "Titular"
    },
    {
      id: 4,
      name: "Rafael Lima",
      position: "Meio-campo",
      number: 8,
      passes: 234,
      assists: 12,
      status: "Titular"
    },
    {
      id: 5,
      name: "Bruno Costa",
      position: "Lateral",
      number: 2,
      crosses: 45,
      tackles: 34,
      status: "Reserva"
    },
    {
      id: 6,
      name: "Lucas Ferreira",
      position: "Atacante",
      number: 11,
      goals: 8,
      assists: 5,
      status: "Reserva"
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
        return 'bg-secondary text-team-black';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPlayerStats = (player: any) => {
    if (player.position === 'Goleiro') {
      return [
        { label: 'Defesas', value: player.saves },
        { label: 'Jogos sem sofrer gols', value: player.cleanSheets }
      ];
    } else if (player.position === 'Atacante') {
      return [
        { label: 'Gols', value: player.goals },
        { label: 'Assistências', value: player.assists }
      ];
    } else if (player.position === 'Meio-campo') {
      return [
        { label: 'Passes', value: player.passes },
        { label: 'Assistências', value: player.assists }
      ];
    } else {
      return [
        { label: 'Desarmes', value: player.tackles },
        { label: 'Bloqueios', value: player.blocks || player.crosses }
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
                  <Badge variant={player.status === 'Titular' ? 'default' : 'secondary'} className="mt-1">
                    {player.status}
                  </Badge>
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

              <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                <Activity className="w-4 h-4" />
                <span>Ativo na temporada</span>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Card className="inline-block p-8 shadow-card bg-white">
            <Award className="w-12 h-12 text-victory mx-auto mb-4" />
            <h3 className="text-xl font-bold text-team-black mb-2">Jogador Destaque</h3>
            <p className="text-muted-foreground mb-4">João Silva - Artilheiro da temporada</p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">15</div>
                <div className="text-muted-foreground">Gols</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">8</div>
                <div className="text-muted-foreground">Assistências</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Players;