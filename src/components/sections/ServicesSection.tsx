import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ServiceCard from "../cards/ServiceCard";
import { Separator } from "../ui/separator";
import TextReveal from "../animations/TextReveal";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import SectionBackground from "../layout/SectionBackground";

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
  subtitle = "Des solutions sur mesure pour répondre à vos besoins digitaux",
  services = [
    {
      title: "Développement Web",
      description:
        "Sites web modernes et applications web performantes avec les dernières technologies.",
      icon: "web",
      ctaText: "En savoir plus",
    },
    {
      title: "Applications Mobiles",
      description:
        "Applications natives et cross-platform pour iOS et Android.",
      icon: "app",
      ctaText: "En savoir plus",
    },
    {
      title: "Design UI/UX",
      description:
        "Interfaces utilisateur intuitives et expériences utilisateur optimisées.",
      icon: "design",
      ctaText: "En savoir plus",
    },
    {
      title: "Marketing Digital",
      description:
        "Stratégies marketing digitales pour augmenter votre visibilité en ligne.",
      icon: "marketing",
      ctaText: "En savoir plus",
    },
  ],
}: ServicesProps) => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleServiceClick = (service: string) => {
    console.log(`Service clicked: ${service}`);
    // Implement navigation or modal opening here
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-12 sm:py-16 md:py-20 px-4 md:px-8 lg:px-16 bg-black text-white min-h-[600px] md:min-h-[800px] relative animate-on-scroll"
    >
      {/* Fond simplifié pour tous les appareils */}
      <SectionBackground variant="default" />

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
