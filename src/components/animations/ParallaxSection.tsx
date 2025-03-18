import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "../../hooks/useMediaQuery";

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  speed = 0.1,
  className = "",
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Ne pas appliquer d'effet parallaxe sur mobile pour de meilleures performances
    if (isMobile) return;
    
    const section = sectionRef.current;
    if (!section) return;

    // Réduire la complexité de l'effet sur les écrans plus petits
    const adjustedSpeed = speed * 0.7;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // Animation plus efficace basée sur le progrès du défilement
        // plutôt que de recalculer constamment la position
        gsap.set(section, {
          y: self.progress * window.innerHeight * adjustedSpeed * -1,
        });
      }
    });

    return () => {
      trigger.kill();
    };
  }, [speed, isMobile]);

  return (
    <div ref={sectionRef} className={`relative ${className}`}>
      {children}
    </div>
  );
};

export default ParallaxSection;
