import React, { useEffect, useState, useRef } from "react";
import { throttle } from "../../utils/performance";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    // Utiliser requestAnimationFrame pour des mises à jour plus fluides
    const animate = (time: number) => {
      if (previousTimeRef.current !== null) {
        // Réduire les mises à jour sur mobile pour de meilleures performances
        const updateInterval = isMobile ? 200 : 100;
        if (time - previousTimeRef.current > updateInterval) {
          const totalHeight = document.body.scrollHeight - window.innerHeight;
          const progress = Math.max(0, Math.min(100, (window.scrollY / totalHeight) * 100));
          setScrollProgress(progress);
          previousTimeRef.current = time;
        }
      } else {
        previousTimeRef.current = time;
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    // Gestionnaire de défilement limité pour réduire la fréquence des mises à jour
    const handleScroll = throttle(() => {
      if (!requestRef.current) {
        requestRef.current = requestAnimationFrame(animate);
      }
    }, isMobile ? 200 : 100);

    window.addEventListener("scroll", handleScroll);

    // Calcul initial
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = Math.max(0, Math.min(100, (window.scrollY / totalHeight) * 100));
      setScrollProgress(progress);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isMobile]);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div
        className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600"
        style={{
          width: `${scrollProgress}%`,
          willChange: "width", // Optimiser pour les animations
          transition: isMobile ? "width 0.2s ease-out" : "width 0.1s ease-out", // Transition plus lente sur mobile
        }}
      ></div>
    </div>
  );
};

export default ScrollProgress;
