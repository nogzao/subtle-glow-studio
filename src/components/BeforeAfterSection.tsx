import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import beforeAfterImage from "@/assets/before-after.jpg";
import { beforeAfterService, type BeforeAfterCase } from "@/lib/supabase";
interface DisplayCase {
  id: number;
  title: string;
  age: string;
  description: string;
  image: string;
  beforeImage?: string;
  afterImage?: string;
}
const defaultCases: DisplayCase[] = [{
  id: 1,
  title: "Suavização de rugas da testa",
  age: "39 anos",
  description: "Resultado natural mantendo expressões faciais",
  image: beforeAfterImage
}, {
  id: 2,
  title: "Linhas de expressão nos olhos",
  age: "44 anos",
  description: "Olhar mais descansado e jovial",
  image: beforeAfterImage
}, {
  id: 3,
  title: "Rugas entre sobrancelhas",
  age: "41 anos",
  description: "Expressão mais suave e relaxada",
  image: beforeAfterImage
}, {
  id: 4,
  title: "Harmonização completa",
  age: "36 anos",
  description: "Rejuvenescimento facial sutil e elegante",
  image: beforeAfterImage
}, {
  id: 5,
  title: "Prevenção de rugas",
  age: "32 anos",
  description: "Botox preventivo com resultado imperceptível",
  image: beforeAfterImage
}, {
  id: 6,
  title: "Lifting de sobrancelhas",
  age: "48 anos",
  description: "Olhar mais aberto e rejuvenescido",
  image: beforeAfterImage
}];
const BeforeAfterSection = () => {
  const [selectedCase, setSelectedCase] = useState(0);
  const [showAfter, setShowAfter] = useState(false);
  const [beforeAfterCases, setBeforeAfterCases] = useState<DisplayCase[]>(defaultCases);

  // Load published cases from Supabase
  useEffect(() => {
    const loadCases = async () => {
      try {
        const cases = await beforeAfterService.getCases();
        const publishedCases: DisplayCase[] = cases.filter(case_ => case_.isPublished && case_.beforeImage && case_.afterImage).map(case_ => ({
          id: case_.id,
          title: case_.title,
          age: case_.age,
          description: case_.description,
          image: case_.beforeImage,
          // Show before image initially
          beforeImage: case_.beforeImage,
          afterImage: case_.afterImage
        }));
        if (publishedCases.length > 0) {
          setBeforeAfterCases(publishedCases);
        }
      } catch (error) {
        console.error('Error loading cases:', error);
      }
    };
    loadCases();
  }, []);

  // Get current image (before or after)
  const getCurrentImage = (caseIndex: number) => {
    const currentCase = beforeAfterCases[caseIndex];
    if (!currentCase || !currentCase.beforeImage) return beforeAfterImage;
    return showAfter && currentCase.afterImage ? currentCase.afterImage : currentCase.beforeImage;
  };
  return <section id="antes-depois" className="py-20 bg-gradient-to-br from-background to-muted/30">
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
          
        </div>

        {/* Main Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {beforeAfterCases.map((case_, index) => <div key={case_.id} className="group">
              <div className="relative overflow-hidden rounded-2xl shadow-elegant bg-white p-3 hover:shadow-glow transition-elegant">
                <div className="relative cursor-pointer" onMouseEnter={() => setSelectedCase(index)}>
                  <img src={case_.beforeImage || case_.image} alt={`Resultado: ${case_.title}`} className="w-full h-64 object-cover rounded-xl transition-elegant group-hover:scale-105" />
                  
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
            </div>)}
        </div>

        {/* Featured Before/After Section */}
        
      </div>
    </section>;
};
export default BeforeAfterSection;