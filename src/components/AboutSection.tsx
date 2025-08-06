import { Button } from "@/components/ui/button";
import { Award, Users, Clock, Heart, MessageCircle } from "lucide-react";
import doctorImage from "@/assets/doctor-portrait.jpg";

const AboutSection = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/5511999999999?text=Olá! Gostaria de conhecer mais sobre os tratamentos e agendar uma consulta.", "_blank");
  };

  return (
    <section id="sobre" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Doctor Image */}
          <div className="relative">
            <div className="relative">
              <img 
                src={doctorImage}
                alt="Dra. Especialista em Harmonização Facial"
                className="w-full h-auto rounded-3xl shadow-elegant"
              />
              
              {/* Floating Credentials */}
              <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-6 shadow-glow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-serif font-bold text-foreground">CRM Ativo</div>
                    <div className="text-sm text-muted-foreground">Especialista certificada</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
                Conheça nossa
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> especialista</span>
              </h2>
              <h3 className="text-2xl font-serif text-primary mb-4">
                Dra. Alessandra Amaral
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Profissional com mais de 25 anos de atuação na área da Saúde e 9 anos de experiência especializada na área da Estética.
              </p>
            </div>

            {/* Academic Formation */}
            <div className="space-y-4">
              <h4 className="text-xl font-serif font-semibold text-foreground">
                Formação Acadêmica
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-muted-foreground">Graduação em Enfermagem - UNISUAM</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-muted-foreground">Graduação em Biomedicina - Universidade Estácio de Sá</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-muted-foreground">Pós-Graduação em Cosmetologia Estética - FABA</span>
                </li>
              </ul>
            </div>

            {/* Professional Experience */}
            <div className="space-y-4">
              <h4 className="text-xl font-serif font-semibold text-foreground">
                Experiência Profissional
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">8 anos de atuação como Enfermeira no Exército Brasileiro</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Mais de 12 cursos extracurriculares especializados</span>
                </li>
              </ul>
            </div>

            {/* Specializations */}
            <div className="space-y-4">
              <h4 className="text-xl font-serif font-semibold text-foreground">
                Especializações
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Harmonização Facial</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Gluteoplastia Não Cirúrgica</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Intradermoterapia</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Ozonioterapia</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Microagulhamento</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Jato de Plasma</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6">
                <div className="flex justify-center mb-3">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-serif font-bold text-foreground">5.000+</div>
                <div className="text-sm text-muted-foreground">Atendimentos realizados</div>
              </div>
              <div className="text-center bg-gradient-to-br from-accent/5 to-secondary/5 rounded-2xl p-6">
                <div className="flex justify-center mb-3">
                  <Clock className="w-8 h-8 text-accent" />
                </div>
                <div className="text-3xl font-serif font-bold text-foreground">25+</div>
                <div className="text-sm text-muted-foreground">Anos na área da Saúde</div>
              </div>
            </div>

            {/* Philosophy */}
            <div className="bg-secondary/10 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h5 className="font-serif font-semibold text-foreground mb-2">Nossa Filosofia</h5>
                  <p className="text-muted-foreground leading-relaxed">
                    "Acredito que a beleza está na naturalidade. Meu objetivo é realçar o que você já tem de melhor, 
                    respeitando sua individualidade e proporcionando resultados harmoniosos que aumentem sua autoestima."
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Button 
                variant="elegant" 
                size="lg" 
                className="w-full sm:w-auto px-8 py-6 text-lg rounded-full"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle className="w-5 h-5" />
                Conversar com a Dra. Alessandra
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;