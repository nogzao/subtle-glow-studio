import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const handleWhatsAppClick = () => {
    const message = "Olá! Gostaria de saber mais sobre os tratamentos de Botox.";
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-14 left-0 right-0 bg-white/98 backdrop-blur-md border-b border-rose-100 z-40 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/7978dd9a-f95e-43ff-be0f-be252c6474ef.png" 
              alt="Instituto Amaral" 
              className="h-12 w-auto"
            />
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('inicio')} 
              className="text-[#8B4513] hover:text-[#A0522D] transition-colors font-medium"
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection('beneficios')} 
              className="text-[#8B4513] hover:text-[#A0522D] transition-colors font-medium"
            >
              Benefícios
            </button>
            <button 
              onClick={() => scrollToSection('antes-depois')} 
              className="text-[#8B4513] hover:text-[#A0522D] transition-colors font-medium"
            >
              Resultados
            </button>
            <button 
              onClick={() => scrollToSection('sobre')} 
              className="text-[#8B4513] hover:text-[#A0522D] transition-colors font-medium"
            >
              Sobre
            </button>
            <button 
              onClick={() => scrollToSection('contato')} 
              className="text-[#8B4513] hover:text-[#A0522D] transition-colors font-medium"
            >
              Contato
            </button>
          </nav>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleWhatsAppClick}
              className="hidden sm:flex items-center space-x-2 border-primary text-primary hover:bg-primary hover:text-white"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </Button>
            
            <Button
              size="sm"
              onClick={handleWhatsAppClick}
              className="bg-gradient-primary text-white hover:opacity-90"
            >
              <Phone className="h-4 w-4 mr-2" />
              Agendar
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;