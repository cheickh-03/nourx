import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code, Palette, Smartphone, LineChart } from "lucide-react";

interface InteractiveCardProps {
  title: string;
  description: string;
  icon: "web" | "app" | "design" | "marketing";
  ctaText?: string;
  onClick?: () => void;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({
  title,
  description,
  icon,
  ctaText = "En savoir plus",
  onClick,
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [scale, setScale] = useState(1);
  const [glowOpacity, setGlowOpacity] = useState(0);
  const [glowX, setGlowX] = useState(0);
  const [glowY, setGlowY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculer la position relative de la souris dans la carte (de -0.5 à 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Définir la rotation en fonction de la position de la souris
    // Multiplier par 20 pour une rotation plus prononcée
    setRotateX(-y * 10); // Inverser l'axe Y pour un effet naturel
    setRotateY(x * 10);
    
    // Définir la position du reflet/glow
    setGlowX(e.clientX - rect.left);
    setGlowY(e.clientY - rect.top);
    setGlowOpacity(0.15);
  };

  const handleMouseLeave = () => {
    // Réinitialiser à l'état par défaut
    setRotateX(0);
    setRotateY(0);
    setScale(1);
    setGlowOpacity(0);
  };

  const handleMouseEnter = () => {
    setScale(1.03);
  };

  // Sélectionner l'icône en fonction du type
  const renderIcon = () => {
    switch (icon) {
      case "web":
        return <Code className="w-8 h-8 text-blue-400" />;
      case "app":
        return <Smartphone className="w-8 h-8 text-blue-400" />;
      case "design":
        return <Palette className="w-8 h-8 text-blue-400" />;
      case "marketing":
        return <LineChart className="w-8 h-8 text-blue-400" />;
      default:
        return <Code className="w-8 h-8 text-blue-400" />;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full h-full bg-gray-900 text-white rounded-xl overflow-hidden cursor-pointer group perspective-1000"
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
        transition: "transform 0.1s ease",
        boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.5)",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
    >
      {/* Effet de brillance/glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(59, 130, 246, 0) 60%)",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          opacity: glowOpacity,
          left: glowX - 75,
          top: glowY - 75,
          transform: "translateZ(10px)",
          filter: "blur(20px)",
          transition: "opacity 0.15s ease",
        }}
      />

      {/* Bordure brillante */}
      <div className="absolute inset-0 rounded-xl border border-blue-900/50 group-hover:border-blue-500/30 transition-colors duration-500" />

      {/* Contenu de la carte */}
      <div className="flex flex-col p-6 h-full z-10 relative">
        <div className="mb-4 p-3 bg-blue-900/20 w-fit rounded-lg">{renderIcon()}</div>
        
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-gray-300 flex-grow mb-6 text-sm">
          {description}
        </p>
        
        <div className="flex items-center justify-end mt-auto">
          <motion.div
            className="text-blue-400 font-medium text-sm flex items-center space-x-1 group-hover:space-x-2 transition-all duration-300"
            whileHover={{ x: 5 }}
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default InteractiveCard; 