import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (textRef.current) {
      const chars = gsap.utils.toArray(".char", textRef.current);

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
            start: "top 80%",
            toggleActions: "restart none none none",
          },
          delay: delay,
        },
      );
    }
  }, [delay]);

  // Split text into characters
  const splitText = (text: string) => {
    return text.split("").map((char, index) => (
      <span key={index} className="char inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  // Process children to split text
  const processChildren = (children: React.ReactNode): React.ReactNode => {
    if (typeof children === "string") {
      return splitText(children);
    }

    if (React.isValidElement(children)) {
      return React.cloneElement(
        children,
        {},
        processChildren(children.props.children),
      );
    }

    if (Array.isArray(children)) {
      return children.map((child, index) => (
        <React.Fragment key={index}>{processChildren(child)}</React.Fragment>
      ));
    }

    return children;
  };

  return (
    <div
      ref={textRef}
      className={`perspective-500 overflow-visible ${className}`}
    >
      {processChildren(children)}
    </div>
  );
};

export default TextReveal;
