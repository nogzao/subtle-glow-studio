import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
const faqs = [{
  question: "Quanto tempo dura o efeito do Botox?",
  answer: "O efeito do Botox dura em média de 4 a 6 meses. Este período pode variar de pessoa para pessoa, dependendo do metabolismo individual, área tratada e quantidade aplicada. Com aplicações regulares, muitas pacientes notam que o efeito pode durar um pouco mais."
}, {
  question: "O procedimento com Botox dói?",
  answer: "O desconforto é mínimo. Utilizamos agulhas ultrafinas e técnicas que reduzem significativamente qualquer sensação de dor. A maioria das pacientes relata apenas uma leve sensação de 'picada de mosquito'. Se necessário, podemos aplicar um anestésico tópico antes do procedimento."
}, {
  question: "Qual é o valor do tratamento com Botox?",
  answer: "O valor varia conforme a área a ser tratada e a quantidade de produto necessária. Durante a consulta de avaliação gratuita, fazemos um planejamento personalizado e apresentamos um orçamento detalhado. Oferecemos condições especiais de pagamento."
}, {
  question: "É necessário algum tipo de repouso após a aplicação?",
  answer: "Não é necessário repouso. Você pode retomar suas atividades normais imediatamente após o procedimento. Recomendamos apenas evitar exercícios físicos intensos e massagens na área tratada nas primeiras 4-6 horas."
}, {
  question: "O Botox é seguro? Existem efeitos colaterais?",
  answer: "O Botox é um procedimento extremamente seguro quando realizado por profissional qualificado. É aprovado pela ANVISA e usado há décadas. Efeitos colaterais são raros e geralmente leves, como pequenos hematomas no local da aplicação que desaparecem em poucos dias."
}, {
  question: "Com que idade posso começar a usar Botox?",
  answer: "O Botox pode ser usado tanto para prevenção (a partir dos 25-30 anos) quanto para tratamento de rugas já formadas. Durante a consulta, avaliamos suas necessidades individuais e recomendamos o melhor momento para iniciar o tratamento."
}, {
  question: "O resultado fica natural ou 'congelado'?",
  answer: "Quando aplicado corretamente e na dosagem adequada, o Botox proporciona resultados completamente naturais. Você manterá suas expressões faciais normais, apenas com a suavização das linhas indesejadas. Nosso foco é sempre na naturalidade."
}, {
  question: "Quando posso ver os resultados?",
  answer: "Os primeiros resultados aparecem entre 3 a 7 dias após a aplicação, com efeito máximo sendo atingido em cerca de 2 semanas. É um processo gradual e natural, permitindo que você se acostume com sua nova aparência."
}];
const FAQSection = () => {
  return <section className="py-20 bg-gradient-to-br from-muted/20 to-secondary/10">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            Dúvidas
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> frequentes</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Esclarecemos as principais questões sobre o tratamento com Botox
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-elegant p-8">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => <AccordionItem key={index} value={`item-${index}`} className="border border-primary/10 rounded-2xl px-6 data-[state=open]:bg-primary/5">
                <AccordionTrigger className="text-left font-serif font-semibold text-foreground hover:text-primary py-6 [&[data-state=open]>svg]:rotate-180">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>)}
          </Accordion>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Não encontrou sua dúvida? Estamos aqui para ajudar!
          </p>
          
        </div>
      </div>
    </section>;
};
export default FAQSection;