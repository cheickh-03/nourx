import React from "react";
import { motion } from "framer-motion";

const FloatingShapes: React.FC = () => {
  const shapes = [
    {
      type: "circle",
      size: 80,
      x: "10%",
      y: "20%",
      duration: 20,
      delay: 0,
      color: "rgba(59, 130, 246, 0.1)",
    },
    {
      type: "square",
      size: 60,
      x: "85%",
      y: "15%",
      duration: 25,
      delay: 5,
      color: "rgba(99, 102, 241, 0.1)",
    },
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
      },
      animate: {
        y: [0, -30, 0],
        x: [0, 20, 0],
        rotate: [0, 10, 0],
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
