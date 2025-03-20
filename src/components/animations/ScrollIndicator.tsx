import React, { useState, useEffect } from "react";
import { motion, useTransform, useScroll } from "framer-motion";

interface ScrollIndicatorProps {
  color?: string;
  height?: number;
  showLabels?: boolean;
  sections?: { id: string; label: string }[];
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  color = "linear-gradient(90deg, rgba(37, 99, 235, 1) 0%, rgba(59, 130, 246, 1) 50%, rgba(96, 165, 250, 1) 100%)",
  height = 5,
  showLabels = true,
  sections = [
    { id: "hero", label: "Accueil" },
    { id: "services", label: "Services" },
    { id: "process", label: "Processus" },
    { id: "about", label: "À propos" },
    { id: "contact", label: "Contact" },
  ],
}) => {
  const { scrollYProgress } = useScroll();
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<number>(0);

  // Définir la largeur de l'indicateur de progression en fonction de la position de défilement
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Observer les sections pour déterminer laquelle est active
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const index = sections.findIndex((section) => section.id === id);
          if (index !== -1) {
            setActiveSection(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sections]);

  // Naviguer vers une section lorsqu'on clique sur un point
  const navigateToSection = (index: number) => {
    const sectionId = sections[index].id;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center">
      {/* Points de navigation sur le côté */}
      <div className="flex flex-col items-center space-y-6">
        {sections.map((section, index) => (
          <div key={index} className="relative group">
            <motion.button
              className="w-3 h-3 rounded-full relative focus:outline-none"
              style={{
                backgroundColor: index === activeSection ? "#3b82f6" : "#1f2937",
                transform: 
                  index === activeSection || index === hoveredDot 
                    ? "scale(1.5)" 
                    : "scale(1)",
                transition: "transform 0.3s ease",
              }}
              whileHover={{ scale: 1.5 }}
              onClick={() => navigateToSection(index)}
              onMouseEnter={() => setHoveredDot(index)}
              onMouseLeave={() => setHoveredDot(null)}
              animate={{
                backgroundColor: index === activeSection ? "#3b82f6" : "#1f2937",
              }}
            />
            
            {/* Étiquette de section */}
            {showLabels && (
              <motion.div
                className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap"
                initial={{ opacity: 0, x: 10 }}
                animate={{ 
                  opacity: hoveredDot === index ? 1 : 0, 
                  x: hoveredDot === index ? 0 : 10 
                }}
                transition={{ duration: 0.2 }}
              >
                {section.label}
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Barre de progression en haut */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50"
        style={{ height }}
      >
        <motion.div
          className="h-full origin-left"
          style={{
            width,
            background: color,
          }}
        />
      </motion.div>
    </div>
  );
};

export default ScrollIndicator; 