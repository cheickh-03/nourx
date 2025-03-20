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
  CheckCircle2,
  FileText,
  Layout,
  Database,
  TestTube2,
  Server,
  BarChart,
  Grid2x2,
  Maximize2,
  Minimize2
} from "lucide-react";

interface Deliverable {
  icon: React.ReactNode;
  name: string;
}

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
  deliverables: Deliverable[];
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
    },
    deliverables: [
      { icon: <FileText className="w-4 h-4" />, name: "Cahier des charges" },
      { icon: <Database className="w-4 h-4" />, name: "Analyse des besoins" },
      { icon: <BarChart className="w-4 h-4" />, name: "Étude de marché" }
    ]
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
    },
    deliverables: [
      { icon: <Layout className="w-4 h-4" />, name: "Maquettes" },
      { icon: <FileText className="w-4 h-4" />, name: "Plan stratégique" },
      { icon: <BarChart className="w-4 h-4" />, name: "KPIs" }
    ]
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
    },
    deliverables: []
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
    },
    deliverables: []
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
    },
    deliverables: []
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
    },
    deliverables: []
  },
];

const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [showExample, setShowExample] = useState<boolean>(false);
  const [isCondensed, setIsCondensed] = useState<boolean>(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Variants pour les animations de transition
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };

  const deliverablesVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

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
    <section className="w-full py-12 md:py-24 relative overflow-hidden animate-on-scroll" id="process">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-16 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center flex-1"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-white">
              Notre Processus
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-4 md:mb-8"></div>
            <p className="text-base md:text-xl max-w-3xl mx-auto text-gray-200">
              Une méthodologie éprouvée pour transformer vos idées en réalité
            </p>
          </motion.div>
          
          <button
            onClick={() => setIsCondensed(!isCondensed)}
            className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gray-900/80 backdrop-blur-sm hover:bg-gray-800/80 transition-all duration-300 border border-gray-700"
          >
            {isCondensed ? (
              <>
                <Maximize2 className="w-3 h-3 md:w-4 md:h-4" />
                <span className="text-xs md:text-sm text-white">Vue détaillée</span>
              </>
            ) : (
              <>
                <Minimize2 className="w-3 h-3 md:w-4 md:h-4" />
                <span className="text-xs md:text-sm text-white">Vue condensée</span>
              </>
            )}
          </button>
        </div>

        <div className="max-w-7xl mx-auto">
          {isCondensed ? (
            // Vue condensée
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-gray-900/95 backdrop-blur-md rounded-xl p-3 md:p-4 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
                  onClick={() => {
                    setActiveStep(index);
                    setIsCondensed(false);
                  }}
                >
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mb-2 md:mb-3`}>
                    {React.cloneElement(step.icon as React.ReactElement, {
                      className: "w-5 h-5 md:w-6 md:h-6 text-white"
                    })}
                  </div>
                  <h3 className="text-xs md:text-sm font-bold text-white mb-2">{step.title}</h3>
                  <div className="flex flex-wrap gap-1">
                    {step.deliverables.map((deliverable, idx) => (
                      <div key={idx} className="text-gray-300 hover:text-white transition-colors">
                        {React.cloneElement(deliverable.icon as React.ReactElement, {
                          className: "w-3 h-3 md:w-4 md:h-4"
                        })}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            // Vue détaillée
            <div className="relative pt-16 md:pt-20">
              {/* Ligne de progression principale */}
              <div className="absolute top-6 md:top-8 left-0 w-full h-0.5 md:h-1 bg-gray-800">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-600"
                  initial={{ width: "0%" }}
                  whileInView={{ width: `${(activeStep / (processSteps.length - 1)) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Indicateur de progression */}
              <div className="absolute top-0 left-0 w-full flex justify-between mb-4 md:mb-6">
                {processSteps.map((_, index) => (
                  <div 
                    key={index} 
                    className={`relative flex items-center justify-center ${index <= activeStep ? 'text-blue-400' : 'text-gray-600'}`}
                  >
                    <span className="text-[10px] md:text-xs font-mono">{index + 1}</span>
                  </div>
                ))}
              </div>

              {/* Points de connexion et contenus */}
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`relative group ${activeStep === index ? 'block' : 'hidden md:block'}`}
                    onMouseEnter={() => setActiveStep(index)}
                  >
                    {/* Point de connexion */}
                    <motion.div
                      className={`absolute top-[-36px] md:top-[-48px] left-1/2 transform -translate-x-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-r ${
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
                        <CheckCircle2 className="w-5 h-5 md:w-8 md:h-8 text-white" />
                      ) : (
                        React.cloneElement(step.icon as React.ReactElement, {
                          className: "w-5 h-5 md:w-8 md:h-8 text-white"
                        })
                      )}
                    </motion.div>

                    {/* Ligne verticale de connexion */}
                    <div className={`absolute top-[-28px] md:top-[-36px] left-1/2 transform -translate-x-1/2 w-0.5 h-6 md:h-8 bg-gradient-to-b ${step.color}`} />

                    {/* Contenu */}
                    <motion.div
                      initial={false}
                      animate={{
                        scale: activeStep === index ? 1.02 : 1,
                        y: activeStep === index ? -2 : 0,
                      }}
                      className={`bg-gray-900/95 backdrop-blur-md rounded-xl p-4 md:p-6 transition-all duration-300 border cursor-pointer ${
                        activeStep === index
                          ? "border-blue-500/50 shadow-lg shadow-blue-500/20"
                          : "border-gray-800"
                      } hover:border-blue-500/50`}
                      onClick={() => toggleExample()}
                    >
                      <div className="flex justify-between items-center mb-2 md:mb-3">
                        <h3 className={`text-base md:text-lg font-bold text-white`}>
                          {step.title}
                        </h3>
                        <span className="text-[10px] md:text-xs font-mono bg-gray-800/80 px-2 py-0.5 md:py-1 rounded-full text-gray-300">
                          {index + 1}/{processSteps.length}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-gray-200 leading-relaxed mb-3">
                        {step.description}
                      </p>

                      {/* Durée estimée */}
                      <div className="mb-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] md:text-xs text-gray-300">Durée:</span>
                          <span className="text-[10px] md:text-xs font-semibold text-white">
                            {step.duration.min === step.duration.max ? 
                              `${step.duration.min} ${step.duration.unit}` : 
                              step.duration.min === 0 ? 
                                step.duration.unit : 
                                `${step.duration.min}-${step.duration.max} ${step.duration.unit}`}
                          </span>
                        </div>
                        {step.duration.min !== 0 && (
                          <div className="w-full h-1 md:h-1.5 bg-gray-800/80 rounded-full overflow-hidden">
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
                            className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-700"
                          >
                            <p className="text-xs md:text-sm text-blue-300 italic">{step.example}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button 
                        className={`mt-3 md:mt-4 text-[10px] md:text-xs text-blue-400 hover:text-blue-300 flex items-center ${showExample && index === activeStep ? 'opacity-100' : 'opacity-70'}`}
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
              <div className="flex justify-center mt-8 md:mt-12 gap-3 md:gap-4">
                <button
                  onClick={handlePrev}
                  className="bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-full p-2 md:p-3 hover:border-blue-500 transition-all duration-300"
                >
                  <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </button>
                <button
                  onClick={handleNext}
                  className="bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-full p-2 md:p-3 hover:border-blue-500 transition-all duration-300"
                >
                  <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </button>
              </div>

              {/* Livrables */}
              <motion.div
                variants={deliverablesVariants}
                initial="hidden"
                animate="visible"
                className="mt-4 pt-4 border-t border-gray-700"
              >
                <h4 className="text-xs md:text-sm font-semibold mb-2 md:mb-3 text-white">Livrables:</h4>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {processSteps[activeStep].deliverables.map((deliverable, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 md:gap-2 bg-gray-800/80 backdrop-blur-sm px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs md:text-sm"
                    >
                      {React.cloneElement(deliverable.icon as React.ReactElement, {
                        className: "w-3 h-3 md:w-4 md:h-4 text-blue-400"
                      })}
                      <span className="text-gray-200">{deliverable.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection; 