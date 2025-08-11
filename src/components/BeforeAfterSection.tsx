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
const defaultCases: DisplayCase[] = [
  {
    id: 1,
    title: "Antes e Depois 1",
    age: "",
    description: "",
    image: "/lovable-uploads/a012f4a9-a02b-438c-aefa-3ef1925eb633.png"
  },
  {
    id: 2,
    title: "Antes e Depois 2",
    age: "",
    description: "",
    image: "/lovable-uploads/5044ffd2-cebe-4ee4-8227-1b322cea4e67.png"
  },
  {
    id: 3,
    title: "Antes e Depois 3",
    age: "",
    description: "",
    image: "/lovable-uploads/039ffd54-d2e1-4abf-8d59-ad0a22ccf91d.png"
  }
];
const BeforeAfterSection = () => {
  const [selectedCase, setSelectedCase] = useState(0);
  const [showAfter, setShowAfter] = useState(false);
  const [beforeAfterCases, setBeforeAfterCases] = useState<DisplayCase[]>(defaultCases);

  // Supabase fetch desabilitado: usando imagens estáticas enviadas

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
                    
                  </div>
                </div>
              </div>
              
            </div>)}
        </div>

        {/* Featured Before/After Section */}
        
      </div>
    </section>;
};
export default BeforeAfterSection;