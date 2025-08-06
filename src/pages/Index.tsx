import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import AboutSection from "@/components/AboutSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ImageUploadManager from "@/components/ImageUploadManager";

const Index = () => {
  // Verificar se estamos no modo de gerenciamento
  const isManagementMode = window.location.hash === '#manage-images';

  if (isManagementMode) {
    return <ImageUploadManager />;
  }

  return (
    <div className="min-h-screen">
      <Header />
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
