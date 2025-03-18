import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ServiceCard from "../cards/ServiceCard";
import { Separator } from "../ui/separator";
import TextReveal from "../animations/TextReveal";
import { useMediaQuery } from "../../hooks/useMediaQuery";

interface ServicesProps {
  title?: string;
  subtitle?: string;
  services?: {
    title: string;
    description: string;
    icon: "web" | "app" | "design" | "marketing";
    ctaText?: string;
  }[];
}

const ServicesSection = ({
  title = "Nos Services",
  subtitle = "Transformez vos idées en réalité digitale avec des solutions de pointe adaptées à vos besoins.",
  services = [
    {
      title: "Développement Web",
      description:
        "Sites web modernes et réactifs construits avec les dernières technologies pour une performance et une expérience utilisateur optimales.",
      icon: "web",
      ctaText: "En savoir plus",
    },
    {
      title: "Conception d'Applications",
      description:
        "Applications mobiles intuitives et engageantes conçues pour les plateformes iOS et Android avec des expériences utilisateur fluides.",
      icon: "app",
      ctaText: "Découvrir",
    },
    {
      title: "Création Digitale",
      description:
        "Actifs numériques créatifs comprenant des graphiques, des animations et des éléments interactifs pour améliorer la présence de votre marque.",
      icon: "design",
      ctaText: "Explorer",
    },
    {
      title: "Marketing Digital",
      description:
        "Solutions stratégiques de marketing digital pour augmenter la visibilité, l'engagement et les taux de conversion pour votre entreprise.",
      icon: "marketing",
      ctaText: "Commencer",
    },
  ],
}: ServicesProps) => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  // Utilisez useState comme backup au cas où useMediaQuery ne fonctionne pas correctement
  const [viewportWidth, setViewportWidth] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );
  const isMobileMQ = useMediaQuery("(max-width: 768px)");
  
  // Combinez les deux approches pour plus de fiabilité
  const isMobile = isMobileMQ || viewportWidth <= 768;

  // Mise à jour de la largeur du viewport en cas de redimensionnement
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: isMobile ? 0.3 : 0.5,
      },
    },
  };

  const handleServiceClick = (serviceTitle: string) => {
    const serviceMap: Record<string, string> = {
      "Développement Web": "web",
      "Conception d'Applications": "app",
      "Création Digitale": "design",
      "Marketing Digital": "marketing",
    };
    const serviceId = serviceMap[serviceTitle];
    if (serviceId) {
      navigate(`/service/${serviceId}`);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-12 sm:py-16 md:py-20 px-4 md:px-8 lg:px-16 bg-black text-white min-h-[600px] md:min-h-[800px] relative animate-on-scroll"
    >
      {/* Fond simplifié pour tous les appareils */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-blue-600/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-indigo-500/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          {isMobile ? (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-blue-400">
              {title}
            </h2>
          ) : (
            <TextReveal className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-blue-400">
              <h2>{title}</h2>
            </TextReveal>
          )}
          <Separator className="w-24 h-1 bg-blue-600 mx-auto mb-6" />
          <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto px-2">
            {subtitle}
          </p>
        </div>

        <motion.div
          ref={cardsRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className={`grid grid-cols-1 ${isMobile ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-4'} gap-4 sm:gap-6 md:gap-8 justify-items-center perspective-1000`}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="service-card transform-gpu w-full max-w-[320px]"
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={service.icon}
                ctaText={service.ctaText}
                onClick={() => handleServiceClick(service.title)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
