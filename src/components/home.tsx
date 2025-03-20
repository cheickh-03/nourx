import React, { useEffect, useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "./sections/HeroSection";
// Lazy loading des sections moins critiques
const ServicesSection = lazy(() => import("./sections/ServicesSection"));
const AboutSection = lazy(() => import("./sections/AboutSection"));
const ContactSection = lazy(() => import("./sections/ContactSection"));
const ProcessSection = lazy(() => import("./sections/ProcessSection"));

import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import MouseFollower from "./animations/MouseFollower";
import ScrollProgress from "./animations/ScrollProgress";
import FloatingShapes from "./animations/FloatingShapes";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimationOptimizer from "../utils/animationOptimizer";

// Composant de chargement pour les sections
const SectionLoader = () => (
  <div className="min-h-[40vh] flex items-center justify-center">
    <div className="w-10 h-10 border-2 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin"></div>
  </div>
);

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
      // Initialisation de l'optimiseur d'animations
      AnimationOptimizer.init();
      
      // Utiliser un délai pour s'assurer que le DOM est chargé
      const timer = setTimeout(() => {
        try {
          // Initialiser des animations très basiques
          const sections = document.querySelectorAll("section");
          console.log('Sections trouvées pour animation:', sections.length);
          
          sections.forEach((section, index) => {
            gsap.set(section, { opacity: 0, y: 20 });
            
            // Utilisation de l'optimiseur d'animations pour les ScrollTriggers
            AnimationOptimizer.createScrollTrigger({
              trigger: section,
              start: "top 85%",
              onEnter: () => {
                // Utilisation de l'animation optimisée
                AnimationOptimizer.createFadeInAnimation(section, index * 0.2);
              },
              once: true
            });
          });
          
          // Animation simplifiée pour les éléments marqués
          const elementsToAnimate = document.querySelectorAll(".animate-on-scroll, .animate-on-scroll-important");
          console.log('Éléments à animer trouvés:', elementsToAnimate.length);
          
          elementsToAnimate.forEach((element, index) => {
            gsap.set(element, { opacity: 0, y: 20 });
            
            // Utilisation de l'optimiseur pour les éléments individuels
            AnimationOptimizer.createScrollTrigger({
              trigger: element,
              start: "top 85%",
              onEnter: () => {
                AnimationOptimizer.createFadeInAnimation(element, 0);
              },
              once: true
            });
          });
        } catch (error) {
          console.error("Erreur lors de l'animation:", error);
        }
      }, 300);
      
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
      <MouseFollower />
      <ScrollProgress />
      <FloatingShapes />
      <Navbar onCtaClick={handleCtaClick} />
      <main>
        <HeroSection onCtaClick={handleCtaClick} />
        <Suspense fallback={<SectionLoader />}>
          <ServicesSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ProcessSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
