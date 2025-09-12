import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Trophy, Target } from "lucide-react";

const RecentMatches = () => {
  const matches = [
    {
      id: 1,
      date: "15/12/2024",
      opponent: "Vila Nova FC",
      homeScore: 3,
      awayScore: 1,
      location: "Campo do Parque",
      status: "victory",
    },
    {
      id: 2,
      date: "08/12/2024",
      opponent: "Atlético Amigos",
      homeScore: 2,
      awayScore: 2,
      location: "Centro Esportivo",
      status: "draw",
    },
    {
      id: 3,
      date: "01/12/2024",
      opponent: "Real Friends",
      homeScore: 1,
      awayScore: 2,
      location: "Campo da Escola",
      status: "defeat",
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'victory':
        return <Badge className="bg-primary text-white">Vitória</Badge>;
      case 'defeat':
        return <Badge variant="destructive">Derrota</Badge>;
      case 'draw':
        return <Badge className="bg-victory text-team-black">Empate</Badge>;
      default:
        return <Badge variant="secondary">-</Badge>;
    }
  };

  const getScoreColor = (homeScore: number, awayScore: number) => {
    if (homeScore > awayScore) return "text-primary";
    if (homeScore < awayScore) return "text-destructive";
    return "text-victory";
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-team-black mb-6">
            Últimos <span className="text-primary">Jogos</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Acompanhe nossos resultados mais recentes e veja como o time tem se saído nos campeonatos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {matches.map((match) => (
            <Card key={match.id} className="p-6 shadow-card hover:shadow-field transition-smooth border-0 gradient-card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {match.date}
                </div>
                {getStatusBadge(match.status)}
              </div>

              <div className="text-center mb-6">
                <h3 className="font-bold text-team-black mb-2">Entre Amigos</h3>
                <div className="text-sm text-muted-foreground mb-3">vs</div>
                <h3 className="font-bold text-team-black mb-4">{match.opponent}</h3>
                
                <div className={`text-4xl font-bold mb-2 ${getScoreColor(match.homeScore, match.awayScore)}`}>
                  {match.homeScore} - {match.awayScore}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <MapPin className="w-4 h-4" />
                {match.location}
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 bg-mustard-light rounded-xl p-6">
            <Trophy className="w-8 h-8 text-primary" />
            <div>
              <div className="text-2xl font-bold text-team-black">Próximo Jogo</div>
              <div className="text-muted-foreground">22/12/2024 - vs Sparta FC</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentMatches;