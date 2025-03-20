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
import ScrollIndicator from "./animations/ScrollIndicator";
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

  useEffect(() => {
    // N'initialiser qu'une seule fois
    if (isInitialized) return;
    
    // Marquer comme initialisé immédiatement
    setIsInitialized(true);
    
    try {
      // Enregistrer les plugins GSAP
      if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
        gsap.registerPlugin(ScrollTrigger);
      } else {
        return; // Ne pas continuer si GSAP n'est pas disponible
      }
      
      // Utiliser un délai pour s'assurer que le DOM est chargé
      const timer = setTimeout(() => {
        try {
          // Initialiser des animations très basiques
          const sections = document.querySelectorAll("section");
          
          sections.forEach((section) => {
            gsap.set(section, { opacity: 0, y: 20 });
            
            ScrollTrigger.create({
              trigger: section,
              start: "top 85%",
              onEnter: () => {
                gsap.to(section, {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease: "power2.out",
                });
              },
              once: true
            });
          });
          
          // Animation simplifiée pour les éléments marqués
          const elementsToAnimate = document.querySelectorAll(".animate-on-scroll, .animate-on-scroll-important");
          
          elementsToAnimate.forEach((element) => {
            gsap.set(element, { opacity: 0, y: 20 });
            
            ScrollTrigger.create({
              trigger: element,
              start: "top 85%",
              onEnter: () => {
                gsap.to(element, {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease: "power2.out",
                });
              },
              once: true
            });
          });
        } catch (error) {
          console.error("Erreur lors de l'animation:", error);
        }
      }, 300); // Délai uniforme pour tous les appareils
      
      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Erreur lors de l'initialisation de GSAP:", error);
    }
  }, [isInitialized]);

  // Nettoyer les animations lors du démontage
  useEffect(() => {
    return () => {
      try {
        if (typeof ScrollTrigger !== 'undefined' && ScrollTrigger.getAll) {
          ScrollTrigger.getAll().forEach((trigger) => {
            if (trigger && trigger.kill) trigger.kill();
          });
        }
      } catch (error) {
        console.error("Erreur lors du nettoyage des animations:", error);
      }
    };
  }, []);

  const handleCtaClick = () => {
    navigate("/projet");
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
    <div className="bg-black min-h-screen overflow-x-hidden">
      {!isMobile && <MouseFollower />}
      <ScrollProgress />
      <ScrollIndicator />
      {!isMobile && <FloatingShapes />}
      <Navbar onCtaClick={handleCtaClick} />
      <main>
        <HeroSection id="hero" onCtaClick={handleCtaClick} />
        <ServicesSection id="services" />
        <ProcessSection id="process" />
        <AboutSection id="about" />
        <ContactSection id="contact" />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
