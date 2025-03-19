import React, { useState } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import {
  Code2,
  Lightbulb,
  Rocket,
  Search,
  Settings,
  Zap,
} from "lucide-react";

interface ProcessStep {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const processSteps: ProcessStep[] = [
  {
    icon: <Lightbulb size={24} />,
    title: "Découverte & Analyse",
    description:
      "Nous étudions vos besoins, objectifs et défis pour comprendre parfaitement votre vision.",
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: <Search size={24} />,
    title: "Recherche & Stratégie",
    description:
      "Développement d'une stratégie sur mesure basée sur notre analyse et les meilleures pratiques du marché.",
    color: "from-purple-400 to-purple-600",
  },
  {
    icon: <Code2 size={24} />,
    title: "Design & Développement",
    description:
      "Création et développement de solutions innovantes en suivant une méthodologie agile.",
    color: "from-cyan-400 to-cyan-600",
  },
  {
    icon: <Settings size={24} />,
    title: "Tests & Optimisation",
    description:
      "Tests rigoureux et optimisation continue pour garantir une qualité exceptionnelle.",
    color: "from-green-400 to-green-600",
  },
  {
    icon: <Rocket size={24} />,
    title: "Déploiement",
    description:
      "Lancement de votre projet avec un support continu pour assurer son succès.",
    color: "from-orange-400 to-orange-600",
  },
  {
    icon: <Zap size={24} />,
    title: "Maintenance & Évolution",
    description:
      "Support continu et évolutions régulières pour maintenir votre solution à la pointe.",
    color: "from-red-400 to-red-600",
  },
];

const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section className="w-full py-24 bg-black text-white" id="process">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Notre Processus
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
            Une méthodologie éprouvée pour transformer vos idées en réalité
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {isMobile ? (
            // Version mobile : Timeline verticale
            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative pl-8"
                >
                  <div
                    className={`absolute left-0 top-0 w-1 h-full bg-gradient-to-b ${step.color} rounded-full`}
                  />
                  <div
                    className={`absolute left-[-12px] top-0 w-6 h-6 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white`}
                  >
                    {step.icon}
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm">
                    <h3 className="text-xl font-bold mb-2 text-white">
                      {step.title}
                    </h3>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            // Version desktop : Timeline interactive horizontale
            <div className="relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-800 rounded-full">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1.5 }}
                  viewport={{ once: true }}
                />
              </div>

              <div className="grid grid-cols-6 gap-4 pt-8">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative"
                    onMouseEnter={() => setActiveStep(index)}
                  >
                    <div
                      className={`absolute top-[-28px] left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r ${
                        step.color
                      } flex items-center justify-center cursor-pointer transition-transform duration-300 ${
                        activeStep === index ? "scale-150" : "scale-100"
                      }`}
                    >
                      {step.icon}
                    </div>
                    <motion.div
                      initial={false}
                      animate={{
                        scale: activeStep === index ? 1.05 : 1,
                        y: activeStep === index ? -10 : 0,
                      }}
                      className={`bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm mt-4 transition-all duration-300 ${
                        activeStep === index
                          ? "border border-blue-500/50 shadow-lg shadow-blue-500/20"
                          : ""
                      }`}
                    >
                      <h3 className="text-lg font-bold mb-2 text-white">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-300">{step.description}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection; 