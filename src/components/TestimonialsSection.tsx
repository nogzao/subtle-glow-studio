import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Maria Silva",
    age: "42 anos",
    text: "Me senti cuidada, segura, e o resultado foi exatamente o que eu queria — natural e elegante. Minha autoestima aumentou muito!",
    rating: 5,
    treatment: "Botox na testa e olhos"
  },
  {
    name: "Ana Carolina",
    age: "38 anos", 
    text: "O procedimento foi muito mais tranquilo do que imaginava. Sem dor, rápido, e o resultado manteve minhas expressões naturais.",
    rating: 5,
    treatment: "Botox preventivo"
  },
  {
    name: "Juliana Santos",
    age: "45 anos",
    text: "Profissionalismo excepcional! A doutora explicou tudo, me deixou super confortável e o resultado ficou perfeito. Recomendo!",
    rating: 5,
    treatment: "Botox facial completo"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-secondary/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            O que nossas
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> pacientes dizem</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Histórias reais de transformação e confiança renovada
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-elegant transition-elegant hover:-translate-y-1 border-0 shadow-subtle bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Quote Icon */}
                  <div className="flex justify-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                      <Quote className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex justify-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-center text-foreground leading-relaxed italic">
                    "{testimonial.text}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="text-center space-y-2">
                    <div className="font-serif font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.age} • {testimonial.treatment}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-subtle">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-accent text-accent" />
              ))}
            </div>
            <div className="text-left">
              <div className="font-serif font-bold text-2xl text-foreground">4.9/5</div>
              <div className="text-sm text-muted-foreground">Avaliação média dos pacientes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;