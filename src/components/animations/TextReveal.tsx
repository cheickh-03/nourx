import React, { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "../../hooks/useMediaQuery";

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = "",
  delay = 0,
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  // Sur mobile, on n'applique pas l'effet pour éviter les problèmes de performance
  if (isMobile) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  useEffect(() => {
    // S'assurer que GSAP et ScrollTrigger sont disponibles
    if (typeof gsap === 'undefined' || !gsap.registerPlugin) return;
    
    try {
      gsap.registerPlugin(ScrollTrigger);

      if (textRef.current) {
        const chars = gsap.utils.toArray(".char", textRef.current);
        if (!chars.length) return;

        gsap.fromTo(
          chars,
          {
            opacity: 0,
            y: 20,
            rotateX: -90,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.02,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 85%",
              toggleActions: "restart none none none",
            },
            delay: delay,
          },
        );
      }
    } catch (error) {
      console.error("Erreur d'animation TextReveal:", error);
    }
  }, [delay]);

  // Diviser le texte en caractères
  const splitText = (text: string) => {
    return text.split("").map((char, index) => (
      <span key={index} className="char inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  // Traitement de l'enfant avec mémorisation
  const processChildren = useMemo(() => {
    const processNode = (children: React.ReactNode): React.ReactNode => {
      if (typeof children === "string") {
        return splitText(children);
      }

      if (React.isValidElement(children)) {
        return React.cloneElement(
          children,
          {},
          processNode(children.props.children),
        );
      }

      if (Array.isArray(children)) {
        return children.map((child, index) => (
          <React.Fragment key={index}>{processNode(child)}</React.Fragment>
        ));
      }

      return children;
    };

    return processNode(children);
  }, [children]);

  return (
    <div
      ref={textRef}
      className={`perspective-500 overflow-visible ${className}`}
    >
      {processChildren}
    </div>
  );
};

export default TextReveal;
