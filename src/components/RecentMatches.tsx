import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Trophy } from "lucide-react";
import { getAllMatches } from "@/services/matchesServices";

const RecentMatches = () => {
  const [matches, setMatches] = useState([]);

useEffect(() => {
  const fetchMatches = async () => {
    try {
      const data = await getAllMatches();
      const formattedMatches = data.map((match) => {
        // pega apenas a parte da data (YYYY-MM-DD)
        const [year, month, day] = match.match_date.split("T")[0].split("-");
        const formattedDate = `${day}/${month}/${year}`;

        return {
          id: match.id,
          date: formattedDate, // agora dd/mm/yyyy
          opponent: match.opponent_name,
          homeScore: match.goals_entre_amigos,
          awayScore: match.goals_opponent,
          location: match.location,
          status:
            match.goals_entre_amigos > match.goals_opponent
              ? "victory"
              : match.goals_entre_amigos < match.goals_opponent
              ? "defeat"
              : "draw",
        };
      });

      formattedMatches.sort(
        (a, b) => new Date(b.date.split("/").reverse().join("-")).getTime() -
                  new Date(a.date.split("/").reverse().join("-")).getTime()
      );

      setMatches(formattedMatches);
    } catch (error) {
      console.error("Erro ao buscar partidas:", error);
    }
  };

  fetchMatches();
}, []);


  const getStatusBadge = (status) => {
    switch (status) {
      case "victory":
        return <Badge className="bg-primary text-white">Vitória</Badge>;
      case "defeat":
        return <Badge variant="destructive">Derrota</Badge>;
      case "draw":
        return <Badge className="bg-victory text-team-black">Empate</Badge>;
      default:
        return <Badge variant="secondary">-</Badge>;
    }
  };

  const getScoreColor = (homeScore, awayScore) => {
    if (homeScore > awayScore) return "text-primary";
    if (homeScore < awayScore) return "text-destructive";
    return "text-victory";
  };

  const latestMatches = matches.slice(0, 3);
  const carouselMatches = matches.slice(3);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 id="recent-matches" className="text-4xl md:text-5xl font-bold text-team-black mb-6">
            Últimos <span className="text-primary">Jogos</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Acompanhe nossos resultados mais recentes e veja como o time tem se saído nos campeonatos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {latestMatches.map((match) => (
            <Card
              key={match.id}
              className="p-6 shadow-card hover:shadow-field transition-smooth border-0 gradient-card"
            >
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

                <div
                  className={`text-4xl font-bold mb-2 ${getScoreColor(
                    match.homeScore,
                    match.awayScore
                  )}`}
                >
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

        {/* Carrossel dos demais jogos */}
        {carouselMatches.length > 0 && (
          <div className="overflow-x-auto flex gap-6 pb-6">
            {carouselMatches.map((match) => (
              <Card
                key={match.id}
                className="min-w-[300px] p-6 shadow-card hover:shadow-field transition-smooth border-0 gradient-card flex-shrink-0"
              >
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

                  <div
                    className={`text-4xl font-bold mb-2 ${getScoreColor(
                      match.homeScore,
                      match.awayScore
                    )}`}
                  >
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
        )}
      </div>
    </section>
  );
};

export default RecentMatches;
