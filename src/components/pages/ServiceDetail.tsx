import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Code, Palette, LineChart, Smartphone } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

interface ServiceContent {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  benefits: string[];
  process: { title: string; description: string }[];
}

const ServiceDetail: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();

  const handleCtaClick = () => {
    navigate("/projet");
  };

  const handleBackClick = () => {
    navigate("/");
  };

  const servicesContent: Record<string, ServiceContent> = {
    web: {
      title: "Développement Web",
      description:
        "Sites web modernes et réactifs construits avec les dernières technologies pour une performance et une expérience utilisateur optimales.",
      icon: <Code className="h-16 w-16 text-blue-400" />,
      features: [
        "Sites web responsive adaptés à tous les appareils",
        "Interfaces utilisateur modernes et intuitives",
        "Performance optimisée pour des temps de chargement rapides",
        "SEO intégré pour une meilleure visibilité",
        "Intégration avec des CMS pour une gestion de contenu facile",
      ],
      benefits: [
        "Augmentation de la visibilité en ligne",
        "Amélioration de l'expérience utilisateur",
        "Conversion accrue des visiteurs en clients",
        "Présence professionnelle sur le web",
        "Facilité de maintenance et de mise à jour",
      ],
      process: [
        {
          title: "Consultation et Planification",
          description:
            "Nous discutons de vos besoins et objectifs pour définir la portée du projet.",
        },
        {
          title: "Conception et Wireframing",
          description:
            "Création de maquettes visuelles et de la structure du site.",
        },
        {
          title: "Développement",
          description:
            "Codage du site avec les technologies les plus adaptées à vos besoins.",
        },
        {
          title: "Tests et Optimisation",
          description:
            "Vérification de la qualité, de la performance et de la compatibilité.",
        },
        {
          title: "Lancement et Maintenance",
          description: "Mise en ligne du site et support continu.",
        },
      ],
    },
    app: {
      title: "Conception d'Applications",
      description:
        "Applications mobiles intuitives et engageantes conçues pour les plateformes iOS et Android avec des expériences utilisateur fluides.",
      icon: <Smartphone className="h-16 w-16 text-blue-400" />,
      features: [
        "Applications natives pour iOS et Android",
        "Interfaces utilisateur intuitives et engageantes",
        "Fonctionnalités hors ligne et synchronisation des données",
        "Intégration avec les fonctionnalités des appareils (caméra, GPS, etc.)",
        "Notifications push et mises à jour automatiques",
      ],
      benefits: [
        "Engagement accru des utilisateurs",
        "Accès direct à votre audience sur leurs appareils",
        "Expérience utilisateur personnalisée",
        "Collecte de données précieuses sur les comportements",
        "Avantage concurrentiel sur le marché mobile",
      ],
      process: [
        {
          title: "Analyse des Besoins",
          description:
            "Identification des fonctionnalités clés et des objectifs de l'application.",
        },
        {
          title: "Design UX/UI",
          description:
            "Création d'interfaces utilisateur intuitives et attrayantes.",
        },
        {
          title: "Développement",
          description:
            "Programmation de l'application pour les plateformes cibles.",
        },
        {
          title: "Tests Rigoureux",
          description:
            "Vérification de la fonctionnalité, de la performance et de la sécurité.",
        },
        {
          title: "Déploiement et Support",
          description: "Publication sur les stores et maintenance continue.",
        },
      ],
    },
    design: {
      title: "Création Digitale",
      description:
        "Actifs numériques créatifs comprenant des graphiques, des animations et des éléments interactifs pour améliorer la présence de votre marque.",
      icon: <Palette className="h-16 w-16 text-blue-400" />,
      features: [
        "Design graphique professionnel et moderne",
        "Identité visuelle cohérente pour votre marque",
        "Animations et éléments interactifs engageants",
        "Illustrations personnalisées et infographies",
        "Contenu visuel optimisé pour différentes plateformes",
      ],
      benefits: [
        "Renforcement de l'identité de marque",
        "Communication visuelle efficace",
        "Différenciation par rapport à la concurrence",
        "Augmentation de l'engagement des utilisateurs",
        "Amélioration de la mémorabilité de votre marque",
      ],
      process: [
        {
          title: "Découverte de la Marque",
          description:
            "Compréhension de votre identité, valeurs et public cible.",
        },
        {
          title: "Recherche et Inspiration",
          description:
            "Exploration des tendances et des possibilités créatives.",
        },
        {
          title: "Conception",
          description: "Création d'éléments visuels alignés avec votre marque.",
        },
        {
          title: "Révisions et Affinage",
          description: "Perfectionnement des designs selon vos retours.",
        },
        {
          title: "Livraison et Implémentation",
          description:
            "Fourniture des fichiers finaux et assistance pour leur utilisation.",
        },
      ],
    },
    marketing: {
      title: "Marketing Digital",
      description:
        "Solutions stratégiques de marketing digital pour augmenter la visibilité, l'engagement et les taux de conversion pour votre entreprise.",
      icon: <LineChart className="h-16 w-16 text-blue-400" />,
      features: [
        "Stratégies SEO pour améliorer votre classement dans les moteurs de recherche",
        "Campagnes publicitaires ciblées sur les réseaux sociaux et Google",
        "Marketing de contenu engageant et pertinent",
        "Email marketing personnalisé et automatisé",
        "Analyse de données et rapports de performance",
      ],
      benefits: [
        "Augmentation du trafic qualifié vers votre site",
        "Amélioration de la notoriété de votre marque",
        "Génération de leads et de conversions",
        "Optimisation du retour sur investissement marketing",
        "Insights précieux sur votre audience et le marché",
      ],
      process: [
        {
          title: "Audit et Analyse",
          description:
            "Évaluation de votre présence en ligne actuelle et de la concurrence.",
        },
        {
          title: "Élaboration de Stratégie",
          description:
            "Développement d'un plan marketing adapté à vos objectifs.",
        },
        {
          title: "Mise en Œuvre",
          description: "Exécution des campagnes et des initiatives marketing.",
        },
        {
          title: "Suivi et Optimisation",
          description:
            "Analyse continue des performances et ajustements stratégiques.",
        },
        {
          title: "Reporting et Recommandations",
          description:
            "Rapports détaillés et conseils pour l'amélioration continue.",
        },
      ],
    },
  };

  const service = serviceId ? servicesContent[serviceId] : null;

  if (!service) {
    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-400 mb-4">
            Service non trouvé
          </h1>
          <p className="mb-6">Le service que vous recherchez n'existe pas.</p>
          <Button
            onClick={handleBackClick}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Retour à l'accueil
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <Navbar onCtaClick={handleCtaClick} />
      <main className="py-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto text-white">
        <Button
          onClick={handleBackClick}
          variant="ghost"
          className="mb-8 text-blue-400 hover:text-blue-300 hover:bg-blue-950/30 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Retour aux services
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-blue-950/50 rounded-lg">{service.icon}</div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-400">
              {service.title}
            </h1>
          </div>
          <Separator className="w-24 h-1 bg-blue-600 mb-6" />
          <p className="text-xl text-gray-300 max-w-3xl">
            {service.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-blue-400">
              Caractéristiques
            </h2>
            <ul className="space-y-3">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="rounded-full bg-blue-900/30 p-1 mt-1">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-blue-400">Avantages</h2>
            <ul className="space-y-3">
              {service.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="rounded-full bg-blue-900/30 p-1 mt-1">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  </div>
                  <span className="text-gray-300">{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8 text-blue-400">
            Notre Processus
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {service.process.map((step, index) => (
              <div
                key={index}
                className="bg-blue-950/20 border border-blue-900 p-6 rounded-lg hover:border-blue-400 transition-all duration-300"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-900/50 text-blue-400 font-bold mb-4">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-blue-300">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-6 text-blue-400">
            Prêt à commencer?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour discuter de votre projet et
            découvrir comment nous pouvons vous aider à atteindre vos objectifs.
          </p>
          <Button
            onClick={handleCtaClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
          >
            Démarrer un projet
          </Button>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetail;
