import { Card } from "@/components/ui/card";
import { Heart, Shield, Target } from "lucide-react";
import heroImage from "@/assets/entre-amigos.jpg";

const AboutTeam = () => {
  const values = [
    {
      icon: Heart,
      title: "Amizade",
      description: "Nosso time é construído sobre laços de amizade verdadeira que vão além do campo."
    },
    {
      icon: Shield,
      title: "Lealdade",
      description: "Defendemos uns aos outros, dentro e fora do campo, sempre unidos como família."
    },
    {
      icon: Target,
      title: "Determinação",
      description: "Cada jogo é uma oportunidade de mostrar nossa garra e paixão pelo futebol."
    }
  ];

  return (
    <section className="py-20 bg-mustard-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-team-black mb-6">
            Sobre o <span className="text-primary">Entre Amigos</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Fundado em 2020, o Entre Amigos nasceu da paixão compartilhada por um grupo de amigos 
            que se reunia todos os fins de semana para jogar futebol. O que começou como diversão 
            se transformou em um time sério, competitivo e unido.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <Card key={index} className="p-8 text-center gradient-card shadow-card border-0 transition-smooth hover:shadow-field">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-team-black mb-4">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-team-black mb-6">Nossa História</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Tudo começou quando um grupo de amigos decidiu que queria 
                  levar o futebol mais a sério. Depois de meses jogando em campos alugados, 
                  decidimos formar oficialmente o time "Entre Amigos".
                </p>
                <p>
                  Desde então, participamos de diversos festivais locais, sempre mantendo 
                  o espírito da amizade que nos define. Nosso lema é simples: jogamos 
                  para vencer, mas nunca esquecemos que somos amigos primeiro.
                </p>
                <p>
                  Hoje, somos mais que um time - somos uma família que se apoia dentro e 
                  fora de campo, celebrando juntos cada vitória e aprendendo com cada derrota.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <img
                src={heroImage}
                alt="Entre Amigos"
                className="w-full h-full object-cover rounded-xl shadow-md col-span-2"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;