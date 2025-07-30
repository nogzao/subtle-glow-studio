import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import AboutSection from "@/components/AboutSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <BenefitsSection />
      <TestimonialsSection />
      <BeforeAfterSection />
      <AboutSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
