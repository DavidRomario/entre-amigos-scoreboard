import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addUser, deleteUser, editUser } from "@/services/usersServices";

interface Player {
  id: number;
  name: string;
  position: string;
  jerseyNumber: number;
  age: number;
}

interface PlayerManagerProps {
  players: Player[];
  fetchPlayers?: () => void;
}

const PlayerManager: React.FC<PlayerManagerProps> = ({ players, fetchPlayers }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlayerId, setEditingPlayerId] = useState<number | null>(null);
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    position: "",
    jerseyNumber: "",
    age: "",
  });
  const { toast } = useToast();

  const positionOrder = ["Goleiro", "Zagueiro", "Lateral", "Volante", "Meio-campo", "Atacante"];

  const sortedPlayers = [...players].sort(
    (a, b) => positionOrder.indexOf(a.position) - positionOrder.indexOf(b.position)
  );

  const openAddModal = () => {
    setEditingPlayerId(null);
    setNewPlayer({ name: "", position: "", jerseyNumber: "", age: "" });
    setIsDialogOpen(true);
  };

  const openEditModal = (player: Player) => {
    setEditingPlayerId(player.id);
    setNewPlayer({
      name: player.name,
      position: player.position,
      jerseyNumber: player.jerseyNumber.toString(),
      age: player.age.toString(),
    });
    setIsDialogOpen(true);
  };

  const handleSavePlayer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPlayerId) {
        await editUser(editingPlayerId, {
          name: newPlayer.name,
          position: newPlayer.position,
          jerseyNumber: parseInt(newPlayer.jerseyNumber),
          age: parseInt(newPlayer.age),
        });
        toast({ title: "Jogador atualizado!", description: `${newPlayer.name} foi atualizado.` });
      } else {
        await addUser({
          name: newPlayer.name,
          position: newPlayer.position,
          jerseyNumber: parseInt(newPlayer.jerseyNumber),
          age: parseInt(newPlayer.age),
        });
        toast({ title: "Jogador adicionado!", description: `${newPlayer.name} foi adicionado ao time.` });
      }

      setNewPlayer({ name: "", position: "", jerseyNumber: "", age: "" });
      setEditingPlayerId(null);
      setIsDialogOpen(false);
      fetchPlayers && fetchPlayers();
    } catch {
      toast({ title: "Erro", description: "Não foi possível salvar.", variant: "destructive" });
    }
  };

  const handleDeletePlayer = async (playerId: number, playerName: string) => {
    if (!confirm(`Tem certeza que deseja excluir ${playerName}?`)) return;
    try {
      await deleteUser(playerId);
      toast({ title: "Jogador removido!", description: `${playerName} foi removido do time.` });
      fetchPlayers && fetchPlayers();
    } catch {
      toast({ title: "Erro", description: "Não foi possível remover.", variant: "destructive" });
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-team-black">Jogadores do Time</h2>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="hero" className="flex items-center gap-2" onClick={openAddModal}>
              <Plus className="w-4 h-4" />
              Adicionar Jogador
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingPlayerId ? "Editar Jogador" : "Adicionar Novo Jogador"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSavePlayer} className="space-y-4">
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
                <Select
                  value={newPlayer.position}
                  onValueChange={(value) => setNewPlayer({ ...newPlayer, position: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a posição" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Goleiro">Goleiro</SelectItem>
                    <SelectItem value="Zagueiro">Zagueiro</SelectItem>
                    <SelectItem value="Lateral">Lateral</SelectItem>
                    <SelectItem value="Volante">Volante</SelectItem>
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
                    value={newPlayer.jerseyNumber}
                    onChange={(e) => setNewPlayer({ ...newPlayer, jerseyNumber: e.target.value })}
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
                {editingPlayerId ? "Salvar Alterações" : "Adicionar Jogador"}
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
            {sortedPlayers.map((player) => (
              <TableRow key={player.id}>
                <TableCell className="font-medium">{player.jerseyNumber}</TableCell>
                <TableCell>{player.name}</TableCell>
                <TableCell>{player.position}</TableCell>
                <TableCell>{player.age} anos</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openEditModal(player)}>
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