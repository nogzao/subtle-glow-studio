import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import AboutSection from "@/components/AboutSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ImageUploadDashboard from "@/components/dashboard/ImageUploadDashboard";

const Index = () => {
  // Verificar se estamos no modo de gerenciamento
  const isManagementMode = window.location.hash === '#manage-images' || window.location.hash === '#dashboard';

  if (isManagementMode) {
    return <ImageUploadDashboard />;
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
