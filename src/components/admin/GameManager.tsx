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

interface Game {
  id: number;
  date: string;
  opponent: string;
  homeScore: number;
  awayScore: number;
  location: string;
  status: 'victory' | 'defeat' | 'draw';
}

const GameManager = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
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
      // Aqui você integrará com sua API
      const response = await fetch('/api/games', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setGames(data);
      }
    } catch (error) {
      // Para demonstração, usando dados mockados
      setGames([
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
      ]);
    }
  };

  const getGameStatus = (homeScore: number, awayScore: number): 'victory' | 'defeat' | 'draw' => {
    if (homeScore > awayScore) return 'victory';
    if (homeScore < awayScore) return 'defeat';
    return 'draw';
  };

  const handleAddGame = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const homeScore = parseInt(newGame.homeScore);
    const awayScore = parseInt(newGame.awayScore);
    const status = getGameStatus(homeScore, awayScore);

    try {
      const response = await fetch('/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify({
          date: newGame.date,
          opponent: newGame.opponent,
          homeScore,
          awayScore,
          location: newGame.location,
          status,
        }),
      });

      if (response.ok) {
        toast({
          title: "Jogo adicionado!",
          description: `Resultado contra ${newGame.opponent} foi registrado.`,
        });
        setNewGame({ date: "", opponent: "", homeScore: "", awayScore: "", location: "" });
        setIsAddDialogOpen(false);
        fetchGames();
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o jogo.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteGame = async (gameId: number, opponent: string) => {
    if (!confirm(`Tem certeza que deseja excluir o jogo contra ${opponent}?`)) return;

    try {
      const response = await fetch(`/api/games/${gameId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });

      if (response.ok) {
        toast({
          title: "Jogo removido!",
          description: `Jogo contra ${opponent} foi removido.`,
        });
        fetchGames();
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível remover o jogo.",
        variant: "destructive",
      });
    }
  };

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

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-team-black">Histórico de Jogos</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="hero" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Adicionar Jogo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Registrar Novo Jogo</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddGame} className="space-y-4">
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
                Registrar Jogo
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
                  <span className="font-bold">
                    {game.homeScore} - {game.awayScore}
                  </span>
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
                    <Button variant="ghost" size="icon">
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