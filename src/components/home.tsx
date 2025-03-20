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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    const debouncedResize = debounce(checkMobile, 250);
    window.addEventListener('resize', debouncedResize);
    
    return () => window.removeEventListener('resize', debouncedResize);
  }, []);

  // Debounce helper
  function debounce(fn: Function, ms: number) {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  useEffect(() => {
    if (!isInitialized) {
      try {
        gsap.registerPlugin(ScrollTrigger);
        
        const initAnimations = () => {
          const sections = document.querySelectorAll('.animate-on-scroll');
          
          sections.forEach((section) => {
            gsap.fromTo(
              section,
              {
                opacity: 0,
                y: 20,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                scrollTrigger: {
                  trigger: section,
                  start: 'top 85%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          });
        };

        // Délai réduit pour l'initialisation
        const timer = setTimeout(initAnimations, 500);
        
        setIsInitialized(true);
        return () => clearTimeout(timer);
      } catch (error) {
        console.error('Error initializing animations:', error);
        setIsInitialized(true);
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
      {!isMobile && <MouseFollower />}
      <ScrollProgress />
      {!isMobile && <FloatingShapes />}
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
