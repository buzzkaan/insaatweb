import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import MachineStorySection from "@/components/MachineStorySection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        İçeriğe geç
      </a>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <StatsSection />
        <MachineStorySection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
