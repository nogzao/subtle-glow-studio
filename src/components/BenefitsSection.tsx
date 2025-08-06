import { Sparkles, Shield, Clock, Heart, Zap, RefreshCw } from "lucide-react";

const benefits = [
  {
    icon: Sparkles,
    title: "Suaviza linhas de expressão",
    description: "Reduz visivelmente rugas na testa, entre as sobrancelhas e ao redor dos olhos"
  },
  {
    icon: Shield,
    title: "Previne rugas futuras",
    description: "Atua de forma preventiva, retardando o surgimento de novas linhas de expressão"
  },
  {
    icon: Zap,
    title: "Efeito lifting sem cirurgia",
    description: "Proporciona um efeito de rejuvenescimento natural sem procedimentos invasivos"
  },
  {
    icon: Clock,
    title: "Procedimento rápido e sem dor",
    description: "Aplicação em apenas 15 minutos com mínimo desconforto e sem tempo de recuperação"
  },
  {
    icon: Heart,
    title: "Resultados naturais",
    description: "Mantém suas expressões naturais enquanto suaviza as marcas do tempo"
  },
  {
    icon: RefreshCw,
    title: "Efeito reversível",
    description: "Tratamento totalmente reversível que se adapta às suas necessidades"
  }
];

const BenefitsSection = () => {
  return (
    <section id="beneficios" className="py-20 bg-gradient-elegant">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            Por que escolher o
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Botox?</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Descubra os benefícios de um tratamento que prioriza a naturalidade e sua bem-estar
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-subtle hover:shadow-elegant transition-elegant hover:-translate-y-2"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center group-hover:scale-110 transition-elegant shadow-glow">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent font-medium px-6 py-3 rounded-full">
            <Sparkles className="w-5 h-5" />
            <span>Resultados visíveis em até 7 dias</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;