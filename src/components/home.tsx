import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "./sections/HeroSection";
import ServicesSection from "./sections/ServicesSection";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import ProcessSection from "./sections/ProcessSection";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import MouseFollower from "./animations/MouseFollower";
import ScrollProgress from "./animations/ScrollProgress";
import FloatingShapes from "./animations/FloatingShapes";
import BackgroundGradient from "./animations/BackgroundGradient";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Détection directe du mobile pour éviter les problèmes avec le hook
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialisation de GSAP
  useEffect(() => {
    if (!isInitialized) {
      try {
        gsap.registerPlugin(ScrollTrigger);
        
        // Délai pour s'assurer que le DOM est prêt
        const timer = setTimeout(() => {
          const sections = document.querySelectorAll('.animate-on-scroll');
          
          sections.forEach((section) => {
            gsap.fromTo(
              section,
              {
                opacity: 0,
                y: 50,
              },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                  trigger: section,
                  start: 'top 80%',
                  end: 'bottom 20%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          });
          
          setIsInitialized(true);
        }, 1000);
        
        return () => clearTimeout(timer);
      } catch (error) {
        console.error('Error initializing animations:', error);
        setIsInitialized(true); // Mark as initialized even if there's an error
      }
    }
  }, [isInitialized]);

  const handleCtaClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  console.log('Home - isMobile:', isMobile);
  console.log('Home - isInitialized:', isInitialized);
  console.log('Rendu de MouseFollower');
  console.log('Rendu de ScrollProgress');
  console.log('Rendu de FloatingShapes');
  console.log('Rendu de Navbar');
  console.log('Rendu de HeroSection');
  console.log('Rendu de ServicesSection');
  console.log('Rendu de ProcessSection');
  console.log('Rendu de AboutSection');
  console.log('Rendu de ContactSection');
  console.log('Rendu de Footer');

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BackgroundGradient />
      <MouseFollower />
      <ScrollProgress />
      <FloatingShapes />
      <Navbar onCtaClick={handleCtaClick} />
      <main className="relative">
        <HeroSection onCtaClick={handleCtaClick} />
        <ServicesSection />
        <ProcessSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
