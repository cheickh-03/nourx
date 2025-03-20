import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

interface AboutSectionProps {
  title?: string;
  description?: string;
  mission?: string;
  values?: Array<{ title: string; description: string }>;
  teamMembers?: Array<{ name: string; role: string; image: string }>;
}

const AboutSection: React.FC<AboutSectionProps> = ({
  title = "À Propos de NourX",
  description = "NourX est une agence digitale de pointe spécialisée dans le développement web, la conception d'applications et les solutions de marketing digital. Nous combinons expertise technique et innovation créative pour offrir des expériences digitales exceptionnelles.",
  mission = "Notre mission est de transformer les idées en solutions digitales puissantes qui stimulent la croissance des entreprises et l'engagement des utilisateurs grâce à une technologie et un design innovants.",
  values = [
    {
      title: "Innovation",
      description: "Repousser les limites avec des solutions avant-gardistes",
    },
    {
      title: "Excellence",
      description: "Offrir une qualité exceptionnelle dans chaque projet",
    },
    {
      title: "Collaboration",
      description:
        "Travailler en étroite collaboration avec les clients comme de véritables partenaires",
    },
  ],
  teamMembers = [
    {
      name: "Cheickh Keita",
      role: "Fondateur & PDG",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=cheickh",
    },
    {
      name: "Moise Tchetche",
      role: "Développeur Principal",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=moise",
    },
    {
      name: "Vera",
      role: "Directrice Créative",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=vera",
    },
  ],
}) => {
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.log('Performance Entry:', {
          name: entry.name,
          duration: entry.duration,
          startTime: entry.startTime,
          entryType: entry.entryType
        });
      });
    });

    observer.observe({ entryTypes: ['longtask', 'paint', 'layout-shift'] });

    return () => observer.disconnect();
  }, []);

  const logAnimationStart = (component: string) => {
    console.log(`Animation start: ${component}`, performance.now());
  };

  const logAnimationComplete = (component: string) => {
    console.log(`Animation complete: ${component}`, performance.now());
  };

  return (
    <section className="w-full py-24 bg-black text-white" id="about">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          onAnimationStart={() => logAnimationStart('header')}
          onAnimationComplete={() => logAnimationComplete('header')}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-blue-400">
            {title}
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            onAnimationStart={() => logAnimationStart('mission')}
            onAnimationComplete={() => logAnimationComplete('mission')}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-blue-400 opacity-20 blur-xl rounded-xl"></div>
            <div className="relative bg-gray-900 p-8 rounded-xl border border-blue-800">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">
                Notre Mission
              </h3>
              <p className="text-gray-300">{mission}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            onAnimationStart={() => logAnimationStart('values')}
            onAnimationComplete={() => logAnimationComplete('values')}
          >
            <h3 className="text-2xl font-bold mb-6 text-blue-400">
              Nos Valeurs
            </h3>
            <div className="space-y-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 * index }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white">
                      {value.title}
                    </h4>
                    <p className="text-gray-400">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold mb-4 text-white">
            Notre Équipe
          </h3>
          <div className="w-16 h-0.5 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12">
            Les talents qui font de NourX une agence d'exception
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg aspect-square mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-semibold text-white mb-1">
                  {member.name}
                </h4>
                <p className="text-blue-400 text-sm">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
