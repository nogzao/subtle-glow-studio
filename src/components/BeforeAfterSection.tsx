import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import beforeAfterImage from "@/assets/before-after.jpg";
import type { BeforeAfterCase } from "./dashboard/ImageUploadDashboard";

interface DisplayCase {
  id: number;
  title: string;
  age: string;
  description: string;
  image: string;
  beforeImage?: string;
  afterImage?: string;
}

const defaultCases: DisplayCase[] = [
  {
    id: 1,
    title: "Suavização de rugas da testa",
    age: "39 anos",
    description: "Resultado natural mantendo expressões faciais",
    image: beforeAfterImage
  },
  {
    id: 2, 
    title: "Linhas de expressão nos olhos",
    age: "44 anos",
    description: "Olhar mais descansado e jovial",
    image: beforeAfterImage
  },
  {
    id: 3,
    title: "Rugas entre sobrancelhas",
    age: "41 anos", 
    description: "Expressão mais suave e relaxada",
    image: beforeAfterImage
  },
  {
    id: 4,
    title: "Harmonização completa",
    age: "36 anos",
    description: "Rejuvenescimento facial sutil e elegante",
    image: beforeAfterImage
  },
  {
    id: 5,
    title: "Prevenção de rugas",
    age: "32 anos",
    description: "Botox preventivo com resultado imperceptível",
    image: beforeAfterImage
  },
  {
    id: 6,
    title: "Lifting de sobrancelhas",
    age: "48 anos",
    description: "Olhar mais aberto e rejuvenescido",
    image: beforeAfterImage
  }
];

const BeforeAfterSection = () => {
  const [selectedCase, setSelectedCase] = useState(0);
  const [showAfter, setShowAfter] = useState(false);
  const [beforeAfterCases, setBeforeAfterCases] = useState<DisplayCase[]>(defaultCases);

  // Load published cases from localStorage
  useEffect(() => {
    const savedCases = localStorage.getItem('beforeAfterCases');
    if (savedCases) {
      try {
        const parsedCases: BeforeAfterCase[] = JSON.parse(savedCases);
        const publishedCases: DisplayCase[] = parsedCases
          .filter(case_ => case_.isPublished && case_.beforeImage && case_.afterImage)
          .map(case_ => ({
            id: case_.id,
            title: case_.title,
            age: case_.age,
            description: case_.description,
            image: case_.beforeImage, // Show before image initially
            beforeImage: case_.beforeImage,
            afterImage: case_.afterImage
          }));
        
        if (publishedCases.length > 0) {
          setBeforeAfterCases(publishedCases);
        }
      } catch (error) {
        console.error('Error loading cases:', error);
      }
    }
  }, []);

  // Get current image (before or after)
  const getCurrentImage = (caseIndex: number) => {
    const currentCase = beforeAfterCases[caseIndex];
    if (!currentCase || !currentCase.beforeImage) return beforeAfterImage;
    return showAfter && currentCase.afterImage ? currentCase.afterImage : currentCase.beforeImage;
  };

  return (
    <section id="antes-depois" className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-5xl lg:text-7xl font-display font-bold text-foreground mb-6">
            Resultados que
            <span className="gradient-hero bg-clip-text text-transparent"> falam por si</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Cada rosto é único. Por isso, os resultados também são.
          </p>
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent font-medium px-6 py-3 rounded-full">
            <Eye className="w-5 h-5" />
            <span>Passe o mouse sobre as imagens para ver o resultado</span>
          </div>
        </div>

        {/* Main Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {beforeAfterCases.map((case_, index) => (
            <div key={case_.id} className="group">
              <div className="relative overflow-hidden rounded-2xl shadow-elegant bg-white p-3 hover:shadow-glow transition-elegant">
                <div 
                  className="relative cursor-pointer"
                  onMouseEnter={() => setSelectedCase(index)}
                >
                  <img 
                    src={case_.image}
                    alt={`Resultado: ${case_.title}`}
                    className="w-full h-64 object-cover rounded-xl transition-elegant group-hover:scale-105"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-luxury opacity-0 group-hover:opacity-80 transition-elegant rounded-xl">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Eye className="w-8 h-8 mx-auto mb-2" />
                        <span className="font-semibold">Ver resultado</span>
                      </div>
                    </div>
                  </div>

                  {/* Case Info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-xl">
                    <h4 className="font-serif font-semibold text-white text-sm mb-1">
                      {case_.title}
                    </h4>
                    <p className="text-accent text-xs">{case_.age}</p>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <div className="mt-4 text-center">
                <p className="text-muted-foreground text-sm">
                  {case_.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Before/After Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 lg:p-12">
          {/* Large Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-elegant bg-white p-2">
              <div 
                className="relative cursor-pointer group"
                onMouseEnter={() => setShowAfter(true)}
                onMouseLeave={() => setShowAfter(false)}
              >
                <img 
                  src={getCurrentImage(selectedCase)}
                  alt="Resultado detalhado do tratamento"
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
                    className="bg-white/90 backdrop-blur-sm border-white/20 hover:bg-primary hover:text-white hover:border-primary"
                  >
                    {showAfter ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {showAfter ? 'Ocultar' : 'Ver resultado'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-subtle border border-primary/10">
                <div className="text-2xl font-display font-bold gradient-primary bg-clip-text text-transparent">3-7</div>
                <div className="text-sm text-muted-foreground font-medium">dias para resultado</div>
              </div>
              <div className="text-center bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-subtle border border-primary/10">
                <div className="text-2xl font-display font-bold gradient-primary bg-clip-text text-transparent">4-6</div>
                <div className="text-sm text-muted-foreground font-medium">meses de duração</div>
              </div>
              <div className="text-center bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-subtle border border-primary/10">
                <div className="text-2xl font-display font-bold gradient-primary bg-clip-text text-transparent">100%</div>
                <div className="text-sm text-muted-foreground font-medium">resultados naturais</div>
              </div>
            </div>
          </div>

          {/* Featured Case Details */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-display font-bold text-foreground mb-4">
                Caso em destaque
              </h3>
              <div className="bg-white/80 rounded-2xl p-6 shadow-elegant">
                <h4 className="text-xl font-serif font-semibold text-foreground mb-3">
                  {beforeAfterCases[selectedCase]?.title}
                </h4>
                <p className="text-lg text-primary font-medium mb-4">
                  {beforeAfterCases[selectedCase]?.age}
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {beforeAfterCases[selectedCase]?.description}
                </p>
                
                {/* Treatment Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary/5 rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-1">Técnica</div>
                    <div className="font-semibold text-foreground">Botox Premium</div>
                  </div>
                  <div className="bg-accent/5 rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-1">Duração</div>
                    <div className="font-semibold text-foreground">20 minutos</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mini Gallery */}
            <div>
              <h4 className="text-lg font-serif font-semibold text-foreground mb-4">
                Outros casos de sucesso
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {beforeAfterCases.map((case_, index) => (
                  <div 
                    key={case_.id}
                    className={`relative cursor-pointer rounded-lg overflow-hidden transition-elegant ${
                      selectedCase === index 
                        ? 'ring-2 ring-primary shadow-glow' 
                        : 'hover:ring-1 hover:ring-primary/50'
                    }`}
                    onClick={() => setSelectedCase(index)}
                  >
                    <img 
                      src={case_.image}
                      alt={case_.title}
                      className="w-full h-16 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Note */}
            <div className="gradient-primary rounded-2xl p-6 text-white">
              <p className="text-sm leading-relaxed italic mb-4">
                "Cada tratamento é personalizado considerando a anatomia facial única de cada paciente, 
                garantindo resultados harmoniosos e naturais."
              </p>
              <div className="text-sm font-medium">
                — Dra. Alessandra Amaral, Enfermeira Especialista
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;