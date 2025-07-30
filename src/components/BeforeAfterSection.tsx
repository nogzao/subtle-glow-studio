import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import beforeAfterImage from "@/assets/before-after.jpg";

const beforeAfterCases = [
  {
    id: 1,
    title: "Suavização de rugas da testa",
    age: "39 anos",
    description: "Resultado natural mantendo expressões faciais"
  },
  {
    id: 2, 
    title: "Linhas de expressão nos olhos",
    age: "44 anos",
    description: "Olhar mais descansado e jovial"
  },
  {
    id: 3,
    title: "Rugas entre sobrancelhas",
    age: "41 anos", 
    description: "Expressão mais suave e relaxada"
  }
];

const BeforeAfterSection = () => {
  const [selectedCase, setSelectedCase] = useState(0);
  const [showAfter, setShowAfter] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            Resultados que
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> falam por si</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Cada rosto é único. Por isso, os resultados também são.
          </p>
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent font-medium px-6 py-3 rounded-full">
            <Eye className="w-5 h-5" />
            <span>Passe o mouse sobre as imagens para ver o resultado</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-elegant bg-white p-2">
              <div 
                className="relative cursor-pointer group"
                onMouseEnter={() => setShowAfter(true)}
                onMouseLeave={() => setShowAfter(false)}
              >
                <img 
                  src={beforeAfterImage}
                  alt="Resultado do tratamento com Botox"
                  className="w-full h-auto rounded-2xl transition-elegant"
                />
                
                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-elegant ${showAfter ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2">
                    <span className="text-sm font-medium text-foreground">
                      {showAfter ? 'Depois' : 'Antes'}
                    </span>
                  </div>
                </div>

                {/* Toggle Button */}
                <div className="absolute bottom-4 right-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-white/90 backdrop-blur-sm border-white/20"
                  >
                    {showAfter ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {showAfter ? 'Ocultar' : 'Ver resultado'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-subtle">
                <div className="text-2xl font-serif font-bold text-primary">3-7</div>
                <div className="text-sm text-muted-foreground">dias para resultado</div>
              </div>
              <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-subtle">
                <div className="text-2xl font-serif font-bold text-primary">4-6</div>
                <div className="text-sm text-muted-foreground">meses de duração</div>
              </div>
              <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-subtle">
                <div className="text-2xl font-serif font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">resultados naturais</div>
              </div>
            </div>
          </div>

          {/* Cases List */}
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold text-foreground mb-8">
              Casos de sucesso
            </h3>
            
            {beforeAfterCases.map((case_, index) => (
              <div 
                key={case_.id}
                className={`p-6 rounded-2xl cursor-pointer transition-elegant ${
                  selectedCase === index 
                    ? 'bg-primary/5 border-2 border-primary/20 shadow-glow' 
                    : 'bg-white/60 border-2 border-transparent hover:border-primary/10 hover:bg-white/80'
                }`}
                onClick={() => setSelectedCase(index)}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-serif font-bold text-white ${
                    selectedCase === index ? 'gradient-primary' : 'bg-muted'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif font-semibold text-foreground mb-2">
                      {case_.title}
                    </h4>
                    <p className="text-sm text-accent mb-2">{case_.age}</p>
                    <p className="text-muted-foreground">
                      {case_.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Professional Note */}
            <div className="bg-accent/10 rounded-2xl p-6 mt-8">
              <p className="text-accent text-sm leading-relaxed italic">
                "Cada tratamento é personalizado considerando a anatomia facial única de cada paciente, 
                garantindo resultados harmoniosos e naturais."
              </p>
              <div className="mt-4 text-sm font-medium text-foreground">
                — Dra. Especialista em Harmonização Facial
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;