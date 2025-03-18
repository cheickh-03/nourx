import React, { useEffect, useState, useRef } from "react";
import { throttle } from "../../utils/performance";

const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Use requestAnimationFrame for smoother updates
    const animate = (time: number) => {
      if (previousTimeRef.current !== null) {
        // Only update every 100ms for better performance
        if (time - previousTimeRef.current > 100) {
          const totalHeight = document.body.scrollHeight - window.innerHeight;
          const progress = (window.scrollY / totalHeight) * 100;
          setScrollProgress(progress);
          previousTimeRef.current = time;
        }
      } else {
        previousTimeRef.current = time;
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    // Throttled scroll handler to reduce frequency of updates
    const handleScroll = throttle(() => {
      if (!requestRef.current) {
        requestRef.current = requestAnimationFrame(animate);
      }
    }, 100);

    window.addEventListener("scroll", handleScroll);

    // Initial calculation
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    setScrollProgress(progress);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div
        className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600"
        style={{
          width: `${scrollProgress}%`,
          willChange: "width", // Optimize for animations
          transition: "width 0.1s ease-out", // Smoother transition
        }}
      ></div>
    </div>
  );
};

export default ScrollProgress;
