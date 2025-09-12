import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit } from "lucide-react";

interface Player {
  id: number;
  name: string;
  position: string;
  number: number;
  age: number;
}

const PlayerManager = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    position: "",
    number: "",
    age: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      // Aqui você integrará com sua API
      const response = await fetch('/api/players', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setPlayers(data);
      }
    } catch (error) {
      // Para demonstração, usando dados mockados
      setPlayers([
        { id: 1, name: "João Silva", position: "Goleiro", number: 1, age: 28 },
        { id: 2, name: "Pedro Santos", position: "Zagueiro", number: 4, age: 25 },
        { id: 3, name: "Carlos Lima", position: "Meio-campo", number: 10, age: 30 },
        { id: 4, name: "Rafael Costa", position: "Atacante", number: 9, age: 24 },
      ]);
    }
  };

  const handleAddPlayer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify({
          name: newPlayer.name,
          position: newPlayer.position,
          number: parseInt(newPlayer.number),
          age: parseInt(newPlayer.age),
        }),
      });

      if (response.ok) {
        toast({
          title: "Jogador adicionado!",
          description: `${newPlayer.name} foi adicionado ao time.`,
        });
        setNewPlayer({ name: "", position: "", number: "", age: "" });
        setIsAddDialogOpen(false);
        fetchPlayers();
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o jogador.",
        variant: "destructive",
      });
    }
  };

  const handleDeletePlayer = async (playerId: number, playerName: string) => {
    if (!confirm(`Tem certeza que deseja excluir ${playerName}?`)) return;

    try {
      const response = await fetch(`/api/players/${playerId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });

      if (response.ok) {
        toast({
          title: "Jogador removido!",
          description: `${playerName} foi removido do time.`,
        });
        fetchPlayers();
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível remover o jogador.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-team-black">Jogadores do Time</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="hero" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Adicionar Jogador
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Jogador</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddPlayer} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="playerName">Nome</Label>
                <Input
                  id="playerName"
                  value={newPlayer.name}
                  onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                  placeholder="Nome do jogador"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="playerPosition">Posição</Label>
                <Select value={newPlayer.position} onValueChange={(value) => setNewPlayer({ ...newPlayer, position: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a posição" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Goleiro">Goleiro</SelectItem>
                    <SelectItem value="Zagueiro">Zagueiro</SelectItem>
                    <SelectItem value="Lateral">Lateral</SelectItem>
                    <SelectItem value="Meio-campo">Meio-campo</SelectItem>
                    <SelectItem value="Atacante">Atacante</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="playerNumber">Número</Label>
                  <Input
                    id="playerNumber"
                    type="number"
                    value={newPlayer.number}
                    onChange={(e) => setNewPlayer({ ...newPlayer, number: e.target.value })}
                    placeholder="Número da camisa"
                    min="1"
                    max="99"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="playerAge">Idade</Label>
                  <Input
                    id="playerAge"
                    type="number"
                    value={newPlayer.age}
                    onChange={(e) => setNewPlayer({ ...newPlayer, age: e.target.value })}
                    placeholder="Idade"
                    min="16"
                    max="50"
                    required
                  />
                </div>
              </div>

              <Button type="submit" variant="hero" className="w-full">
                Adicionar Jogador
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Número</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Posição</TableHead>
              <TableHead>Idade</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players.map((player) => (
              <TableRow key={player.id}>
                <TableCell className="font-medium">{player.number}</TableCell>
                <TableCell>{player.name}</TableCell>
                <TableCell>{player.position}</TableCell>
                <TableCell>{player.age} anos</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeletePlayer(player.id, player.name)}
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

export default PlayerManager;