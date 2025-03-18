import React from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const FloatingShapes: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Reduce number of shapes on mobile
  const shapes = [
    {
      type: "circle",
      size: isMobile ? 60 : 80,
      x: "10%",
      y: "20%",
      duration: isMobile ? 30 : 20,
      delay: 0,
      color: "rgba(59, 130, 246, 0.1)",
    },
    {
      type: "square",
      size: isMobile ? 40 : 60,
      x: "85%",
      y: "15%",
      duration: isMobile ? 35 : 25,
      delay: 5,
      color: "rgba(99, 102, 241, 0.1)",
    },
    // Only show these shapes on desktop
    ...(!isMobile
      ? [
          {
            type: "triangle",
            size: 70,
            x: "75%",
            y: "60%",
            duration: 18,
            delay: 2,
            color: "rgba(14, 165, 233, 0.1)",
          },
          {
            type: "circle",
            size: 100,
            x: "20%",
            y: "70%",
            duration: 22,
            delay: 8,
            color: "rgba(59, 130, 246, 0.1)",
          },
          {
            type: "square",
            size: 50,
            x: "50%",
            y: "30%",
            duration: 15,
            delay: 4,
            color: "rgba(99, 102, 241, 0.1)",
          },
        ]
      : []),
  ];

  const renderShape = (shape: any, index: number) => {
    const commonProps = {
      key: index,
      className: "absolute blur-xl",
      style: {
        width: shape.size,
        height: shape.size,
        left: shape.x,
        top: shape.y,
        backgroundColor: shape.color,
        willChange: "transform", // Optimize for animations
      },
      animate: {
        y: isMobile ? [0, -15, 0] : [0, -30, 0],
        x: isMobile ? [0, 10, 0] : [0, 20, 0],
        rotate: isMobile ? [0, 5, 0] : [0, 10, 0],
      },
      transition: {
        duration: shape.duration,
        delay: shape.delay,
        repeat: Infinity,
        ease: "easeInOut",
      },
    };

    switch (shape.type) {
      case "circle":
        return (
          <motion.div
            {...commonProps}
            className="absolute rounded-full blur-xl"
          />
        );
      case "square":
        return (
          <motion.div
            {...commonProps}
            className="absolute rounded-md blur-xl"
          />
        );
      case "triangle":
        return (
          <motion.div
            {...commonProps}
            className="absolute blur-xl"
            style={{
              ...commonProps.style,
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            }}
          />
        );
      default:
        return (
          <motion.div
            {...commonProps}
            className="absolute rounded-full blur-xl"
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {shapes.map((shape, index) => renderShape(shape, index))}
    </div>
  );
};

export default FloatingShapes;
