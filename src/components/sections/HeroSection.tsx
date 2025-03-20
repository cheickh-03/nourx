import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "../../components/ui/button";
import { ArrowRight, Code, Sparkles, Zap } from "lucide-react";
import gsap from "gsap";
import { useMediaQuery } from "../../hooks/useMediaQuery";

interface HeroSectionProps {
  id?: string;
  title?: string;
  secondTitle?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const HeroSection = ({
  id = "hero-section",
  title = "Transformez Votre Vision Digitale",
  secondTitle = "en Réalité",
  subtitle = "Agence de développement web spécialisée dans la création d'expériences numériques modernes, innovantes et performantes.",
  ctaText = "Démarrer un Projet",
  onCtaClick = () => console.log("CTA clicked"),
}: HeroSectionProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const titleControls = useAnimation();
  const subtitleControls = useAnimation();
  const ctaControls = useAnimation();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    // Animate elements on mount
    const sequence = async () => {
      await titleControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8 },
      });
      await subtitleControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8 },
      });
      await ctaControls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, type: "spring" },
      });
    };
    sequence();

    // Check if we're on mobile - don't add mouse effects on mobile
    if (isMobile) return;

    // Mouse trail effect for hero section - desktop only
    let lastTime = 0;
    const throttleDelay = 50; // ms between updates

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < throttleDelay) return;
      lastTime = now;

      if (!heroRef.current || !cursorRef.current) return;

      const { clientX, clientY } = e;
      const rect = heroRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      gsap.to(cursorRef.current, {
        x: x,
        y: y,
        ease: "power2.out",
        duration: 0.3,
      });

      // Create ripple effect - limit number of ripples
      const existingRipples =
        heroRef.current.querySelectorAll(".ripple-effect").length;
      if (existingRipples < 5) {
        const ripple = document.createElement("div");
        ripple.className =
          "absolute w-4 h-4 bg-blue-500/20 rounded-full pointer-events-none ripple-effect";
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        heroRef.current.appendChild(ripple);

        gsap.to(ripple, {
          opacity: 0,
          scale: 3,
          duration: 1,
          onComplete: () => ripple.remove(),
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [titleControls, subtitleControls, ctaControls, isMobile]);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[600px] h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Custom cursor for hero section - only on desktop */}
      {!isMobile && (
        <div
          ref={cursorRef}
          className="absolute w-40 h-40 rounded-full bg-blue-500/10 blur-xl pointer-events-none z-0"
        />
      )}

      {/* Animated background elements - simplified for mobile */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-950/20 to-transparent opacity-40" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl"
          initial={{ x: 0, y: 0 }}
          animate={{
            x: [0, isMobile ? 15 : 30, 0],
            y: [0, isMobile ? -15 : -30, 0],
          }}
          transition={{
            duration: isMobile ? 30 : 20, // Slower animation for mobile
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ willChange: "transform" }} // Optimize for animations
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl"
          initial={{ x: 0, y: 0 }}
          animate={{
            x: [0, isMobile ? -20 : -40, 0],
            y: [0, isMobile ? 20 : 40, 0],
          }}
          transition={{
            duration: isMobile ? 35 : 25, // Slower animation for mobile
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ willChange: "transform" }} // Optimize for animations
        />
        {!isMobile && (
          <motion.div
            className="absolute top-1/2 right-1/3 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl"
            initial={{ x: 0, y: 0 }}
            animate={{
              x: [0, 50, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 30, 
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ willChange: "transform" }}
          />
        )}
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMxMjEyMTIiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMzBjMCAxNi41NjktMTMuNDMxIDMwLTMwIDMwQzEzLjQzMSA2MCAwIDQ2LjU2OSAwIDMwIDAgMTMuNDMxIDEzLjQzMSAwIDMwIDBjMTYuNTY5IDAgMzAgMTMuNDMxIDMwIDMweiIgc3Ryb2tlPSIjMjIyIiBzdHJva2Utd2lkdGg9Ii41Ii8+PHBhdGggZD0iTTYwIDYwTDAgME02MCAwTDAgNjAiIHN0cm9rZT0iIzIyMiIgc3Ryb2tlLXdpZHRoPSIuNSIvPjwvZz48L3N2Zz4=')] opacity-10 z-0" />

      {/* Floating tech icons - conditionally rendered based on device */}
      <div className="absolute inset-0 z-0">
        {/* Only render these on desktop for better mobile performance */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-1/4 left-1/5 text-blue-400 opacity-20"
              initial={{ y: 0, rotate: 0 }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ willChange: "transform" }}
            >
              <Code size={40} />
            </motion.div>
            <motion.div
              className="absolute bottom-1/3 right-1/4 text-cyan-400 opacity-20"
              initial={{ y: 0, rotate: 0 }}
              animate={{
                y: [0, 20, 0],
                rotate: [0, -10, 0],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ willChange: "transform" }}
            >
              <Zap size={50} />
            </motion.div>
            <motion.div
              className="absolute top-1/2 right-1/5 text-indigo-400 opacity-20"
              initial={{ y: 0, rotate: 0 }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 15, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ willChange: "transform" }}
            >
              <Sparkles size={45} />
            </motion.div>
          </>
        )}
      </div>

      {/* Content container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={titleControls}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-center font-bold leading-none tracking-tight">
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-white pb-1 sm:pb-2">
              {title}
            </span>
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-white to-blue-400 pt-1 sm:pt-2">
              {secondTitle}
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={subtitleControls}
          className="mb-8 sm:mb-12"
        >
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-3xl mx-auto px-2">
            {subtitle}
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={ctaControls}
          whileHover={{ scale: 1.05 }}
          className="flex justify-center"
        >
          <Button
            onClick={onCtaClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 rounded-md text-base sm:text-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 flex items-center gap-2 relative overflow-hidden group"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10 flex items-center gap-2">
              {ctaText}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Button>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
