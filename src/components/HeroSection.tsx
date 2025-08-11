import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-woman.jpg";
const HeroSection = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/5521970092543?text=Olá! Gostaria de agendar uma avaliação gratuita para Botox.", "_blank");
  };
  return <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted to-secondary/10 pt-28">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Mulher elegante representando os resultados naturais do Botox" className="w-full h-full object-cover object-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        <div className="space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-foreground leading-tight">
              Realce sua <span className="gradient-hero bg-clip-text text-transparent">beleza</span> sem perder sua essência
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed mx-auto max-w-3xl">
              Botox com precisão cirúrgica e resultados sutis — como deve ser.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="elegant" size="lg" className="text-lg px-8 py-6 rounded-full" onClick={handleWhatsAppClick}>
              <img src="/lovable-uploads/dcac6424-25a8-4f73-bf35-b35aef5c9bd0.png" alt="Ícone do WhatsApp" className="w-5 h-5" />
              Fale no WhatsApp
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full border-primary/20 hover:border-primary/40">
              Saiba Mais
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-6 justify-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>+500 procedimentos realizados</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Profissional especialista certificada</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Resultados 100% naturais</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button variant="whatsapp" size="lg" className="rounded-full shadow-lg animate-pulse" onClick={handleWhatsAppClick}>
          <img src="/lovable-uploads/dcac6424-25a8-4f73-bf35-b35aef5c9bd0.png" alt="Ícone do WhatsApp" className="w-5 h-5" />
          WhatsApp
        </Button>
      </div>
    </section>;
};
export default HeroSection;