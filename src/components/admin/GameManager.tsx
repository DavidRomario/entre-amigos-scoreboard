import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit, Calendar, MapPin } from "lucide-react";
import { getAllMatches, addMatch, editMatch, deleteMatch } from "@/services/matchesServices";

const GameManager = () => {
  const [games, setGames] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGameId, setEditingGameId] = useState<number | null>(null);
  const [newGame, setNewGame] = useState({
    date: "",
    opponent: "",
    homeScore: "",
    awayScore: "",
    location: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const data = await getAllMatches();
      const formattedGames = data.map((game) => {
        const [year, month, day] = game.match_date.split("T")[0].split("-");
        return {
          id: game.id,
          date: `${day}/${month}/${year}`,
          opponent: game.opponent_name,
          homeScore: game.goals_entre_amigos,
          awayScore: game.goals_opponent,
          location: game.location,
          status: getGameStatus(game.goals_entre_amigos, game.goals_opponent),
        };
      });

      setGames(formattedGames);
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description: "Não foi possível buscar partidas.",
        variant: "destructive",
      });
    }
  };

  const getGameStatus = (homeScore, awayScore) => {
    if (homeScore > awayScore) return "victory";
    if (homeScore < awayScore) return "defeat";
    return "draw";
  };

  const openAddModal = () => {
    setEditingGameId(null);
    setNewGame({ date: "", opponent: "", homeScore: "", awayScore: "", location: "" });
    setIsDialogOpen(true);
  };

  const openEditModal = (game) => {
    setEditingGameId(game.id);
    setNewGame({
      date: game.date,
      opponent: game.opponent,
      homeScore: game.homeScore.toString(),
      awayScore: game.awayScore.toString(),
      location: game.location,
    });
    setIsDialogOpen(true);
  };

  const handleSaveGame = async (e) => {
    e.preventDefault();
    try {
      const homeScore = parseInt(newGame.homeScore);
      const awayScore = parseInt(newGame.awayScore);

      const payload = {
        match_date: newGame.date,
        opponent_name: newGame.opponent,
        goals_entre_amigos: homeScore,
        goals_opponent: awayScore,
        location: newGame.location,
      };

      if (editingGameId) {
        await editMatch(editingGameId, payload);
        toast({
          title: "Jogo atualizado!",
          description: `Resultado contra ${newGame.opponent} foi atualizado.`,
        });
      } else {
        await addMatch(payload);
        toast({
          title: "Jogo adicionado!",
          description: `Resultado contra ${newGame.opponent} foi registrado.`,
        });
      }

      setNewGame({ date: "", opponent: "", homeScore: "", awayScore: "", location: "" });
      setEditingGameId(null);
      setIsDialogOpen(false);
      await fetchGames();
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o jogo.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteGame = async (gameId, opponent) => {
    if (!confirm(`Tem certeza que deseja excluir o jogo contra ${opponent}?`)) return;
    try {
      await deleteMatch(gameId);
      toast({ title: "Jogo removido!", description: `Jogo contra ${opponent} foi removido.` });
      await fetchGames();
    } catch (error) {
      toast({ title: "Erro", description: "Não foi possível remover o jogo.", variant: "destructive" });
    }
  };

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

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-team-black">Histórico de Jogos</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="hero" className="flex items-center gap-2" onClick={openAddModal}>
              <Plus className="w-4 h-4" />
              Adicionar Jogo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingGameId ? "Editar Jogo" : "Registrar Novo Jogo"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSaveGame} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gameDate">Data do Jogo</Label>
                <Input
                  id="gameDate"
                  type="date"
                  value={newGame.date}
                  onChange={(e) => setNewGame({ ...newGame, date: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="opponent">Adversário</Label>
                <Input
                  id="opponent"
                  value={newGame.opponent}
                  onChange={(e) => setNewGame({ ...newGame, opponent: e.target.value })}
                  placeholder="Nome do time adversário"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="homeScore">Gols Entre Amigos</Label>
                  <Input
                    id="homeScore"
                    type="number"
                    value={newGame.homeScore}
                    onChange={(e) => setNewGame({ ...newGame, homeScore: e.target.value })}
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="awayScore">Gols Adversário</Label>
                  <Input
                    id="awayScore"
                    type="number"
                    value={newGame.awayScore}
                    onChange={(e) => setNewGame({ ...newGame, awayScore: e.target.value })}
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Local</Label>
                <Input
                  id="location"
                  value={newGame.location}
                  onChange={(e) => setNewGame({ ...newGame, location: e.target.value })}
                  placeholder="Local do jogo"
                  required
                />
              </div>

              <Button type="submit" variant="hero" className="w-full">
                {editingGameId ? "Salvar Alterações" : "Registrar Jogo"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Adversário</TableHead>
              <TableHead>Placar</TableHead>
              <TableHead>Local</TableHead>
              <TableHead>Resultado</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {games.map((game) => (
              <TableRow key={game.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    {game.date}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{game.opponent}</TableCell>
                <TableCell>
                  <span className="font-bold">{game.homeScore} - {game.awayScore}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    {game.location}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(game.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openEditModal(game)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteGame(game.id, game.opponent)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default GameManager;
