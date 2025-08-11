import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Calendar, ArrowRight } from "lucide-react";
const CTASection = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/5521970092543?text=Olá! Gostaria de agendar minha avaliação gratuita para Botox. Quando temos disponibilidade?", "_blank");
  };
  const handleCallClick = () => {
    window.open("tel:+5521970092543", "_self");
  };
  return <section className="py-20 bg-gradient-to-br from-primary via-primary to-accent relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/20 blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-white/15 blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white/10 blur-lg"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
        {/* Main Content */}
        <div className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-6xl font-serif font-bold text-white leading-tight">
              Pronta para dar o
              <span className="block">próximo passo?</span>
            </h2>
            <p className="text-xl lg:text-2xl text-white/90 font-light leading-relaxed max-w-3xl mx-auto">
              Agende sua avaliação gratuita e descubra como o Botox pode realçar sua beleza natural
            </p>
          </div>

          {/* Benefits List */}
          <div className="grid md:grid-cols-3 gap-6 my-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
              <Calendar className="w-8 h-8 mx-auto mb-4" />
              <h3 className="font-serif font-semibold mb-2">Avaliação Gratuita</h3>
              <p className="text-white/80 text-sm">Consulta sem compromisso para entender suas necessidades</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
              <MessageCircle className="w-8 h-8 mx-auto mb-4" />
              <h3 className="font-serif font-semibold mb-2">Atendimento Personalizado</h3>
              <p className="text-white/80 text-sm">Plano de tratamento desenvolvido especialmente para você</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
              <ArrowRight className="w-8 h-8 mx-auto mb-4" />
              <h3 className="font-serif font-semibold mb-2">Resultados Garantidos</h3>
              <p className="text-white/80 text-sm">Satisfação e segurança em todos os procedimentos</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="outline" size="lg" className="bg-white text-primary hover:bg-white/90 border-white px-8 py-6 text-lg rounded-full font-semibold shadow-glow" onClick={handleWhatsAppClick}>
              <img src="/lovable-uploads/dcac6424-25a8-4f73-bf35-b35aef5c9bd0.png" alt="Ícone do WhatsApp" className="w-6 h-6" />
              Agendar pelo WhatsApp
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="lg" className="text-white hover:bg-white/10 border border-white/30 px-8 py-6 text-lg rounded-full" onClick={handleCallClick}>
              <Phone className="w-5 h-5" />
              Ligar Agora
            </Button>
          </div>

          {/* Contact Info */}
          

          {/* Urgency */}
          <div className="inline-flex items-center gap-2 bg-accent/20 text-white font-medium px-6 py-3 rounded-full">
            <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
            <span>Agenda limitada - Agende hoje mesmo!</span>
          </div>
        </div>
      </div>
    </section>;
};
export default CTASection;