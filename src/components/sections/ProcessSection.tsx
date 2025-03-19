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
    icon: <Lightbulb className="w-8 h-8" />,
    title: "Découverte & Analyse",
    description:
      "Nous étudions vos besoins, objectifs et défis pour comprendre parfaitement votre vision.",
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: <Search className="w-8 h-8" />,
    title: "Recherche & Stratégie",
    description:
      "Développement d'une stratégie sur mesure basée sur notre analyse et les meilleures pratiques du marché.",
    color: "from-purple-400 to-purple-600",
  },
  {
    icon: <Code2 className="w-8 h-8" />,
    title: "Design & Développement",
    description:
      "Création et développement de solutions innovantes en suivant une méthodologie agile.",
    color: "from-cyan-400 to-cyan-600",
  },
  {
    icon: <Settings className="w-8 h-8" />,
    title: "Tests & Optimisation",
    description:
      "Tests rigoureux et optimisation continue pour garantir une qualité exceptionnelle.",
    color: "from-green-400 to-green-600",
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "Déploiement",
    description:
      "Lancement de votre projet avec un support continu pour assurer son succès.",
    color: "from-orange-400 to-orange-600",
  },
  {
    icon: <Zap className="w-8 h-8" />,
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
    <section className="w-full py-24 bg-black text-white relative overflow-hidden" id="process">
      {/* Fond avec effet de gradient */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Notre Processus
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-8"></div>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
            Une méthodologie éprouvée pour transformer vos idées en réalité
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {isMobile ? (
            // Version mobile : Timeline verticale améliorée
            <div className="space-y-12 relative">
              <div className="absolute left-8 top-0 w-0.5 h-full bg-gray-800"></div>
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative pl-16"
                >
                  <div
                    className={`absolute left-[30px] top-0 w-0.5 h-full bg-gradient-to-b ${step.color}`}
                  />
                  <div
                    className={`absolute left-4 top-0 w-10 h-10 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white shadow-lg shadow-blue-500/20 z-10`}
                  >
                    {step.icon}
                  </div>
                  <motion.div 
                    className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    <h3 className="text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{step.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          ) : (
            // Version desktop : Timeline horizontale améliorée
            <div className="relative pt-20">
              {/* Ligne de progression principale */}
              <div className="absolute top-8 left-0 w-full h-1 bg-gray-800">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-600"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
              </div>

              {/* Points de connexion et contenus */}
              <div className="grid grid-cols-6 gap-6">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative group"
                    onMouseEnter={() => setActiveStep(index)}
                  >
                    {/* Point de connexion */}
                    <div
                      className={`absolute top-[-48px] left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-r ${
                        step.color
                      } flex items-center justify-center cursor-pointer transition-all duration-300 group-hover:scale-110 shadow-lg shadow-blue-500/20 z-20`}
                    >
                      {step.icon}
                    </div>

                    {/* Ligne verticale de connexion */}
                    <div className={`absolute top-[-36px] left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b ${step.color}`} />

                    {/* Contenu */}
                    <motion.div
                      initial={false}
                      animate={{
                        scale: activeStep === index ? 1.05 : 1,
                        y: activeStep === index ? -5 : 0,
                      }}
                      className={`bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 border ${
                        activeStep === index
                          ? "border-blue-500/50 shadow-lg shadow-blue-500/20"
                          : "border-gray-800"
                      } hover:border-blue-500/50`}
                    >
                      <h3 className={`text-lg font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r ${step.color}`}>
                        {step.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {step.description}
                      </p>
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