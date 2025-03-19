import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import {
  Code2,
  Lightbulb,
  Rocket,
  Search,
  Settings,
  Zap,
  ChevronLeft,
  ChevronRight,
  CheckCircle2
} from "lucide-react";

interface ProcessStep {
  icon: React.ReactNode;
  title: string;
  description: string;
  example: string;
  color: string;
  duration: {
    min: number;
    max: number;
    unit: string;
  };
}

const processSteps: ProcessStep[] = [
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: "Découverte & Analyse",
    description:
      "Nous étudions vos besoins, objectifs et défis pour comprendre parfaitement votre vision.",
    example: "Par exemple: Ateliers de découverte, interviews des parties prenantes, analyse de la concurrence.",
    color: "from-blue-400 to-blue-600",
    duration: {
      min: 1,
      max: 2,
      unit: "semaines"
    }
  },
  {
    icon: <Search className="w-8 h-8" />,
    title: "Recherche & Stratégie",
    description:
      "Développement d'une stratégie sur mesure basée sur notre analyse et les meilleures pratiques du marché.",
    example: "Par exemple: Analyse de données, définition des KPIs, création de personas, cartographie du parcours utilisateur.",
    color: "from-purple-400 to-purple-600",
    duration: {
      min: 1,
      max: 3,
      unit: "semaines"
    }
  },
  {
    icon: <Code2 className="w-8 h-8" />,
    title: "Design & Développement",
    description:
      "Création et développement de solutions innovantes en suivant une méthodologie agile.",
    example: "Par exemple: Wireframes, prototypes, développement itératif, revues de code, intégration continue.",
    color: "from-cyan-400 to-cyan-600",
    duration: {
      min: 3,
      max: 8,
      unit: "semaines"
    }
  },
  {
    icon: <Settings className="w-8 h-8" />,
    title: "Tests & Optimisation",
    description:
      "Tests rigoureux et optimisation continue pour garantir une qualité exceptionnelle.",
    example: "Par exemple: Tests d'utilisabilité, A/B testing, optimisation des performances, tests de sécurité.",
    color: "from-green-400 to-green-600",
    duration: {
      min: 1,
      max: 2,
      unit: "semaines"
    }
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "Déploiement",
    description:
      "Lancement de votre projet avec un support continu pour assurer son succès.",
    example: "Par exemple: Migration des données, formation des utilisateurs, support technique, suivi post-lancement.",
    color: "from-orange-400 to-orange-600",
    duration: {
      min: 1,
      max: 2,
      unit: "semaines"
    }
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Maintenance & Évolution",
    description:
      "Support continu et évolutions régulières pour maintenir votre solution à la pointe.",
    example: "Par exemple: Mises à jour, nouvelles fonctionnalités, analyse de performances, optimisation continue.",
    color: "from-red-400 to-red-600",
    duration: {
      min: 0,
      max: 0,
      unit: "continu"
    }
  },
];

const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [showExample, setShowExample] = useState<boolean>(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleNext = () => {
    setActiveStep((prev) => (prev === processSteps.length - 1 ? 0 : prev + 1));
    setShowExample(false);
  };

  const handlePrev = () => {
    setActiveStep((prev) => (prev === 0 ? processSteps.length - 1 : prev - 1));
    setShowExample(false);
  };

  const toggleExample = () => {
    setShowExample(!showExample);
  };

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
                    className={`absolute left-4 top-0 w-10 h-10 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white shadow-lg shadow-blue-500/20 z-10 ${index < activeStep ? 'ring-2 ring-white' : ''}`}
                    onClick={() => setActiveStep(index)}
                  >
                    {index < activeStep ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <motion.div 
                    className={`bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border ${index === activeStep ? `border-blue-500/50 shadow-lg shadow-blue-500/20` : 'border-gray-800'} transition-all duration-300 cursor-pointer`}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    onClick={toggleExample}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                        {step.title}
                      </h3>
                      <span className="text-xs font-mono bg-gray-800 px-2 py-1 rounded-full text-gray-400">
                        Étape {index + 1}/{processSteps.length}
                      </span>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-4">{step.description}</p>
                    
                    {/* Durée estimée */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-400">Durée estimée:</span>
                        <span className="text-xs font-semibold text-white">
                          {step.duration.min === step.duration.max ? 
                            `${step.duration.min} ${step.duration.unit}` : 
                            step.duration.min === 0 ? 
                              step.duration.unit : 
                              `${step.duration.min}-${step.duration.max} ${step.duration.unit}`}
                        </span>
                      </div>
                      {step.duration.min !== 0 && (
                        <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${step.color}`} 
                            style={{ 
                              width: `${(step.duration.min / 8) * 100}%`,
                              opacity: 0.6
                            }}
                          ></div>
                          <div 
                            className={`h-full bg-gradient-to-r ${step.color} -mt-1.5`} 
                            style={{ 
                              width: `${(step.duration.max / 8) * 100}%` 
                            }}
                          ></div>
                        </div>
                      )}
                    </div>
                    
                    <AnimatePresence>
                      {showExample && index === activeStep && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-gray-700"
                        >
                          <p className="text-sm text-blue-300 italic">{step.example}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button 
                      className={`mt-4 text-sm text-blue-400 hover:text-blue-300 flex items-center ${showExample && index === activeStep ? 'opacity-100' : 'opacity-70'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (index === activeStep) toggleExample();
                      }}
                    >
                      {showExample && index === activeStep ? 'Masquer l\'exemple' : 'Voir un exemple'} 
                    </button>
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
                  whileInView={{ width: `${(activeStep / (processSteps.length - 1)) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Indicateur de progression */}
              <div className="absolute top-0 left-0 w-full flex justify-between mb-6">
                {processSteps.map((_, index) => (
                  <div 
                    key={index} 
                    className={`relative flex items-center justify-center ${index <= activeStep ? 'text-blue-400' : 'text-gray-600'}`}
                  >
                    <span className="text-xs font-mono">{index + 1}</span>
                  </div>
                ))}
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
                    <motion.div
                      className={`absolute top-[-48px] left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-r ${
                        step.color
                      } flex items-center justify-center cursor-pointer transition-all duration-300 group-hover:scale-110 shadow-lg shadow-blue-500/20 z-20 ${index < activeStep ? 'ring-2 ring-white' : ''}`}
                      onClick={() => setActiveStep(index)}
                      animate={index === activeStep ? {
                        boxShadow: ['0 0 0 0px rgba(59, 130, 246, 0.5)', '0 0 0 8px rgba(59, 130, 246, 0)'],
                      } : {}}
                      transition={index === activeStep ? {
                        repeat: Infinity,
                        duration: 2,
                      } : {}}
                    >
                      {index < activeStep ? (
                        <CheckCircle2 className="w-8 h-8 text-white" />
                      ) : (
                        step.icon
                      )}
                    </motion.div>

                    {/* Ligne verticale de connexion */}
                    <div className={`absolute top-[-36px] left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b ${step.color}`} />

                    {/* Contenu */}
                    <motion.div
                      initial={false}
                      animate={{
                        scale: activeStep === index ? 1.05 : 1,
                        y: activeStep === index ? -5 : 0,
                      }}
                      className={`bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 border cursor-pointer ${
                        activeStep === index
                          ? "border-blue-500/50 shadow-lg shadow-blue-500/20"
                          : "border-gray-800"
                      } hover:border-blue-500/50`}
                      onClick={() => toggleExample()}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h3 className={`text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r ${step.color}`}>
                          {step.title}
                        </h3>
                        <span className="text-xs font-mono bg-gray-800 px-2 py-1 rounded-full text-gray-400">
                          {index + 1}/{processSteps.length}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed mb-3">
                        {step.description}
                      </p>

                      {/* Durée estimée */}
                      <div className="mb-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-400">Durée:</span>
                          <span className="text-xs font-semibold text-white">
                            {step.duration.min === step.duration.max ? 
                              `${step.duration.min} ${step.duration.unit}` : 
                              step.duration.min === 0 ? 
                                step.duration.unit : 
                                `${step.duration.min}-${step.duration.max} ${step.duration.unit}`}
                          </span>
                        </div>
                        {step.duration.min !== 0 && (
                          <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div 
                              className={`h-full bg-gradient-to-r ${step.color}`} 
                              initial={{ width: 0 }}
                              animate={{ 
                                width: `${(step.duration.max / 8) * 100}%`,
                              }}
                              transition={{
                                duration: 1,
                                delay: index * 0.1
                              }}
                            ></motion.div>
                          </div>
                        )}
                      </div>

                      <AnimatePresence>
                        {showExample && index === activeStep && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t border-gray-700"
                          >
                            <p className="text-sm text-blue-300 italic">{step.example}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button 
                        className={`mt-4 text-xs text-blue-400 hover:text-blue-300 flex items-center ${showExample && index === activeStep ? 'opacity-100' : 'opacity-70'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (index === activeStep) toggleExample();
                        }}
                      >
                        {showExample && index === activeStep ? 'Masquer l\'exemple' : 'Voir un exemple'} 
                      </button>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Boutons de navigation */}
              <div className="flex justify-center mt-12 gap-4">
                <button
                  onClick={handlePrev}
                  className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-full p-3 hover:border-blue-500 transition-all duration-300"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-full p-3 hover:border-blue-500 transition-all duration-300"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection; 