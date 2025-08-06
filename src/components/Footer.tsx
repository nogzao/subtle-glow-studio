import { Heart, MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contato" className="bg-foreground text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-2">Belezza Estética</h3>
              <p className="text-white/80 leading-relaxed">
                Especialistas em Botox com resultados naturais. Realçando sua beleza com segurança e profissionalismo.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-elegant"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-elegant"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Serviços */}
          <div className="space-y-4">
            <h4 className="text-lg font-serif font-semibold">Nossos Serviços</h4>
            <ul className="space-y-3 text-white/80">
              <li>• Botox preventivo</li>
              <li>• Botox para rugas de expressão</li>
              <li>• Harmonização facial</li>
              <li>• Consulta personalizada</li>
              <li>• Acompanhamento pós-procedimento</li>
            </ul>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h4 className="text-lg font-serif font-semibold">Contato</h4>
            <div className="space-y-3 text-white/80">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span>contato@belezzaestetica.com.br</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <span>Rua das Flores, 123<br />Jardins - São Paulo/SP</span>
              </div>
            </div>
          </div>

          {/* Horários */}
          <div className="space-y-4">
            <h4 className="text-lg font-serif font-semibold">Horário de Funcionamento</h4>
            <div className="space-y-3 text-white/80">
              <div>
                <div className="font-medium">Segunda a Sexta</div>
                <div>9:00 - 18:00</div>
              </div>
              <div>
                <div className="font-medium">Sábados</div>
                <div>9:00 - 14:00</div>
              </div>
              <div>
                <div className="font-medium">Domingos</div>
                <div>Fechado</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/60 text-sm">
              © 2024 Belezza Estética. Todos os direitos reservados.
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <span>Feito com</span>
              <Heart className="w-4 h-4 text-red-400" />
              <span>para realçar sua beleza natural</span>
            </div>
          </div>
          <div className="text-center mt-6 text-white/40 text-xs">
            COREN/SP 123.456 - Dra. Alessandra Amaral | CNPJ: 12.345.678/0001-90
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;