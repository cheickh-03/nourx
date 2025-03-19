import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from "framer-motion";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const smoothProgress = useSpring(progressScale, { damping: 20, stiffness: 100 });

  // Animation variants pour les cartes
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.95,
      filter: "blur(10px)"
    },
    visible: (i: number) => ({ 
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: i * 0.1
      }
    }),
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
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
    <section className="w-full py-12 md:py-24 bg-black text-white relative overflow-hidden" id="process" ref={containerRef}>
      {/* Fond avec effet de gradient amélioré */}
      <div className="absolute inset-0 opacity-20">
        <motion.div 
          className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"
          style={{
            x: useTransform(scrollYProgress, [0, 1], [0, 100]),
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1])
          }}
        />
        <motion.div 
          className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"
          style={{
            x: useTransform(scrollYProgress, [0, 1], [0, -100]),
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.3, 1])
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, 100]),
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.4, 1])
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Titre avec animation au scroll */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-16 gap-4"
        >
          <div className="text-center flex-1">
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600"
              style={{
                backgroundPositionX: useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
              }}
            >
              Notre Processus
            </motion.h2>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-4 md:mb-8"
              style={{
                scaleX: useTransform(scrollYProgress, [0, 0.2], [0, 1])
              }}
            />
            <motion.p 
              className="text-base md:text-xl max-w-3xl mx-auto text-gray-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Une méthodologie éprouvée pour transformer vos idées en réalité
            </motion.p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCondensed(!isCondensed)}
            className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300"
          >
            {isCondensed ? (
              <>
                <Maximize2 className="w-3 h-3 md:w-4 md:h-4" />
                <span className="text-xs md:text-sm">Vue détaillée</span>
              </>
            ) : (
              <>
                <Minimize2 className="w-3 h-3 md:w-4 md:h-4" />
                <span className="text-xs md:text-sm">Vue condensée</span>
              </>
            )}
          </motion.button>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {isCondensed ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, margin: "-50px" }}
                  className={`bg-gray-900/80 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 cursor-pointer group`}
                  onClick={() => {
                    setActiveStep(index);
                    setIsCondensed(false);
                  }}
                >
                  <motion.div 
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mb-2 md:mb-3 group-hover:shadow-lg group-hover:shadow-blue-500/20`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {React.cloneElement(step.icon as React.ReactElement, {
                      className: "w-5 h-5 md:w-6 md:h-6"
                    })}
                  </motion.div>
                  <h3 className="text-xs md:text-sm font-bold mb-2 group-hover:text-blue-400 transition-colors">{step.title}</h3>
                  <div className="flex flex-wrap gap-1">
                    {step.deliverables.map((deliverable, idx) => (
                      <motion.div 
                        key={idx} 
                        className="text-gray-400 hover:text-white transition-colors"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                      >
                        {React.cloneElement(deliverable.icon as React.ReactElement, {
                          className: "w-3 h-3 md:w-4 md:h-4"
                        })}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="relative pt-16 md:pt-20">
              {/* Ligne de progression principale avec animation au scroll */}
              <div className="absolute top-6 md:top-8 left-0 w-full h-0.5 md:h-1 bg-gray-800">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-600"
                  style={{ width: smoothProgress }}
                />
              </div>

              {/* Points de progression améliorés */}
              <div className="absolute top-0 left-0 w-full flex justify-between mb-4 md:mb-6">
                {processSteps.map((_, index) => (
                  <motion.div 
                    key={index} 
                    className={`relative flex items-center justify-center ${index <= activeStep ? 'text-blue-400' : 'text-gray-600'}`}
                    whileHover={{ scale: 1.2 }}
                  >
                    <motion.span 
                      className="text-[10px] md:text-xs font-mono"
                      animate={{
                        scale: index === activeStep ? [1, 1.2, 1] : 1
                      }}
                      transition={{
                        duration: 1,
                        repeat: index === activeStep ? Infinity : 0,
                        repeatType: "reverse"
                      }}
                    >
                      {index + 1}
                    </motion.span>
                  </motion.div>
                ))}
              </div>

              {/* Contenu des étapes avec animations améliorées */}
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className={`relative group ${activeStep === index ? 'block' : 'hidden md:block'}`}
                  >
                    {/* Point de connexion avec animation */}
                    <motion.div
                      className={`absolute top-[-36px] md:top-[-48px] left-1/2 transform -translate-x-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-r ${
                        step.color
                      } flex items-center justify-center cursor-pointer group-hover:scale-110 shadow-lg shadow-blue-500/20 z-20 ${index < activeStep ? 'ring-2 ring-white' : ''}`}
                      whileHover={{ scale: 1.1 }}
                      animate={index === activeStep ? {
                        boxShadow: ['0 0 0 0px rgba(59, 130, 246, 0.5)', '0 0 0 8px rgba(59, 130, 246, 0)'],
                      } : {}}
                      transition={index === activeStep ? {
                        repeat: Infinity,
                        duration: 2,
                      } : {}}
                    >
                      {index < activeStep ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          <CheckCircle2 className="w-5 h-5 md:w-8 md:h-8 text-white" />
                        </motion.div>
                      ) : (
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          {React.cloneElement(step.icon as React.ReactElement, {
                            className: "w-5 h-5 md:w-8 md:h-8"
                          })}
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Ligne de connexion animée */}
                    <motion.div 
                      className={`absolute top-[-28px] md:top-[-36px] left-1/2 transform -translate-x-1/2 w-0.5 h-6 md:h-8 bg-gradient-to-b ${step.color}`}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.5 }}
                    />

                    {/* Carte de contenu avec animations */}
                    <motion.div
                      initial={false}
                      animate={{
                        scale: activeStep === index ? 1.02 : 1,
                        y: activeStep === index ? -2 : 0,
                      }}
                      whileHover={{ y: -5 }}
                      className={`bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 md:p-6 transition-all duration-300 border cursor-pointer ${
                        activeStep === index
                          ? "border-blue-500/50 shadow-lg shadow-blue-500/20"
                          : "border-gray-800"
                      } hover:border-blue-500/50`}
                      onClick={() => toggleExample()}
                    >
                      <div className="flex justify-between items-center mb-2 md:mb-3">
                        <h3 className={`text-base md:text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r ${step.color}`}>
                          {step.title}
                        </h3>
                        <span className="text-[10px] md:text-xs font-mono bg-gray-800 px-2 py-0.5 md:py-1 rounded-full text-gray-400">
                          {index + 1}/{processSteps.length}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-gray-300 leading-relaxed mb-3">
                        {step.description}
                      </p>

                      {/* Durée estimée */}
                      <div className="mb-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] md:text-xs text-gray-400">Durée:</span>
                          <span className="text-[10px] md:text-xs font-semibold text-white">
                            {step.duration.min === step.duration.max ? 
                              `${step.duration.min} ${step.duration.unit}` : 
                              step.duration.min === 0 ? 
                                step.duration.unit : 
                                `${step.duration.min}-${step.duration.max} ${step.duration.unit}`}
                          </span>
                        </div>
                        {step.duration.min !== 0 && (
                          <div className="w-full h-1 md:h-1.5 bg-gray-800 rounded-full overflow-hidden">
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

              {/* Boutons de navigation améliorés */}
              <div className="flex justify-center mt-8 md:mt-12 gap-3 md:gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePrev}
                  className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-full p-2 md:p-3 hover:border-blue-500 transition-all duration-300"
                >
                  <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNext}
                  className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-full p-2 md:p-3 hover:border-blue-500 transition-all duration-300"
                >
                  <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
                </motion.button>
              </div>

              {/* Section des livrables améliorée */}
              <motion.div
                variants={deliverablesVariants}
                initial="hidden"
                animate="visible"
                className="mt-4 pt-4 border-t border-gray-700"
              >
                <motion.h4 
                  className="text-xs md:text-sm font-semibold mb-2 md:mb-3 text-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  Livrables:
                </motion.h4>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {processSteps[activeStep].deliverables.map((deliverable, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="flex items-center gap-1.5 md:gap-2 bg-gray-800/50 px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs md:text-sm hover:bg-gray-700/50 transition-colors"
                    >
                      <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                        {React.cloneElement(deliverable.icon as React.ReactElement, {
                          className: "w-3 h-3 md:w-4 md:h-4"
                        })}
                      </motion.div>
                      <span className="text-gray-300">{deliverable.name}</span>
                    </motion.div>
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