import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ServiceCard from "../cards/ServiceCard";
import { Separator } from "../ui/separator";
import TextReveal from "../animations/TextReveal";
import ParallaxSection from "../animations/ParallaxSection";
import gsap from "gsap";

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

  useEffect(() => {
    // Floating cards effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardsRef.current) return;

      const cards = cardsRef.current.querySelectorAll(".service-card");
      const { clientX, clientY } = e;
      const sectionRect = sectionRef.current?.getBoundingClientRect();

      if (!sectionRect) return;

      const xPos = (clientX - sectionRect.left) / sectionRect.width - 0.5;
      const yPos = (clientY - sectionRect.top) / sectionRect.height - 0.5;

      cards.forEach((card, index) => {
        const factor = index % 2 === 0 ? 1 : -1;
        gsap.to(card, {
          rotateY: xPos * 5 * factor,
          rotateX: -yPos * 5 * factor,
          translateZ: "20px",
          duration: 0.5,
          ease: "power2.out",
        });
      });
    };

    const handleMouseLeave = () => {
      if (!cardsRef.current) return;

      const cards = cardsRef.current.querySelectorAll(".service-card");

      cards.forEach((card) => {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          translateZ: "0px",
          duration: 0.5,
          ease: "power2.out",
        });
      });
    };

    const sectionElement = sectionRef.current;
    if (sectionElement) {
      sectionElement.addEventListener("mousemove", handleMouseMove);
      sectionElement.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (sectionElement) {
        sectionElement.removeEventListener("mousemove", handleMouseMove);
        sectionElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
      className="w-full py-20 px-4 md:px-8 lg:px-16 bg-black text-white min-h-[800px] relative animate-on-scroll"
    >
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-40 h-40 rounded-full bg-blue-600/5 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-indigo-500/5 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <ParallaxSection speed={0.05} className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <TextReveal className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-blue-400">
            <h2>{title}</h2>
          </TextReveal>
          <Separator className="w-24 h-1 bg-blue-600 mx-auto mb-6" />
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <motion.div
          ref={cardsRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center perspective-1000"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="service-card transform-gpu"
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
      </ParallaxSection>
    </section>
  );
};

export default ServicesSection;
