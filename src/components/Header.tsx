import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const handleWhatsAppClick = () => {
    const message = "Olá! Gostaria de saber mais sobre os tratamentos de Botox.";
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-rose-100 z-50">
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
            <a href="#inicio" className="text-primary hover:text-primary-dark transition-colors font-medium">
              Início
            </a>
            <a href="#beneficios" className="text-primary hover:text-primary-dark transition-colors font-medium">
              Benefícios
            </a>
            <a href="#antes-depois" className="text-primary hover:text-primary-dark transition-colors font-medium">
              Resultados
            </a>
            <a href="#sobre" className="text-primary hover:text-primary-dark transition-colors font-medium">
              Sobre
            </a>
            <a href="#contato" className="text-primary hover:text-primary-dark transition-colors font-medium">
              Contato
            </a>
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