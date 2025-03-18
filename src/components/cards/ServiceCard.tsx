import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { ArrowRight, Code, Palette, LineChart, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: "web" | "app" | "design" | "marketing";
  ctaText?: string;
  onClick?: () => void;
}

const ServiceCard = ({
  title = "Développement Web",
  description = "Sites web modernes et réactifs construits avec les dernières technologies pour une performance et une expérience utilisateur optimales.",
  icon = "web",
  ctaText = "En savoir plus",
  onClick = () => {},
}: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = () => {
    switch (icon) {
      case "web":
        return <Code className="h-10 w-10 text-blue-400" />;
      case "app":
        return <Smartphone className="h-10 w-10 text-blue-400" />;
      case "design":
        return <Palette className="h-10 w-10 text-blue-400" />;
      case "marketing":
        return <LineChart className="h-10 w-10 text-blue-400" />;
      default:
        return <Code className="h-10 w-10 text-blue-400" />;
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="w-full max-w-[320px] h-[350px] sm:h-[400px] bg-black border border-blue-900 hover:border-blue-400 transition-all duration-300 flex flex-col overflow-hidden group relative">
        {/* Animated background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isHovered ? "animate-gradient" : ""}`}
        />

        <CardHeader className="pb-2 relative z-10">
          <motion.div
            className="mb-4 p-3 bg-blue-950/50 rounded-lg w-fit"
            animate={isHovered ? { y: [0, -5, 0], rotate: [0, 5, 0] } : {}}
            transition={{
              duration: 2,
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut",
            }}
          >
            {getIcon()}
          </motion.div>
          <CardTitle className="text-xl text-white group-hover:text-blue-400 transition-colors">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow relative z-10">
          <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors">
            {description}
          </CardDescription>
        </CardContent>
        <CardFooter className="relative z-10">
          <Button
            variant="ghost"
            className="text-blue-400 hover:text-blue-300 hover:bg-blue-950/30 p-0 flex items-center gap-2 overflow-hidden group/btn"
            onClick={onClick}
          >
            <span className="relative z-10">{ctaText} </span>
            <motion.div
              animate={isHovered ? { x: [0, 5, 0] } : {}}
              transition={{
                duration: 1,
                repeat: isHovered ? Infinity : 0,
                ease: "easeInOut",
              }}
            >
              <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
            </motion.div>
          </Button>
        </CardFooter>

        {/* Animated corner accent */}
        <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden">
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500/20 rotate-45 translate-x-1/2 translate-y-1/2 group-hover:bg-blue-500/40 transition-colors duration-300"></div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
