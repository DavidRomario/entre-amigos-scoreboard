import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Users, Trophy, Plus, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PlayerManager from "@/components/admin/PlayerManager";
import GameManager from "@/components/admin/GameManager";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mustard-light via-white to-team-black/10">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-team-black">
              Painel Administrativo
            </h1>
            <p className="text-muted-foreground">Entre Amigos FC</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary rounded-full p-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total de Jogadores</p>
                <p className="text-2xl font-bold text-team-black">23</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-victory rounded-full p-3">
                <Trophy className="w-6 h-6 text-team-black" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Jogos Disputados</p>
                <p className="text-2xl font-bold text-team-black">15</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary rounded-full p-3">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Vitórias</p>
                <p className="text-2xl font-bold text-team-black">8</p>
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="players" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="players" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Gerenciar Jogadores
            </TabsTrigger>
            <TabsTrigger value="games" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Gerenciar Jogos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="players">
            <PlayerManager />
          </TabsContent>

          <TabsContent value="games">
            <GameManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;