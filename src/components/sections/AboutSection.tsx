import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Target, 
  Award, 
  Clock, 
  CheckCircle, 
  Star, 
  TrendingUp,
  Github,
  Linkedin,
  ChevronRight,
  MessageCircle
} from 'lucide-react';

// Types
interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  image: string;
  links: {
    linkedin?: string;
    github?: string;
  };
}

interface CompanyValue {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface HistoryEvent {
  year: string;
  title: string;
  description: string;
}

interface Statistic {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

// Données
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Cheickh Keita",
    role: "Fondateur & Développeur Full Stack",
    bio: "Passionné par l'innovation et le développement web moderne",
    expertise: ["React", "Node.js", "TypeScript", "UI/UX"],
    image: "/team/cheickh.jpg",
    links: {
      linkedin: "https://linkedin.com/in/cheickhkeita",
      github: "https://github.com/cheickhkeita"
    }
  },
  // Ajoutez d'autres membres ici
];

const companyValues: CompanyValue[] = [
  {
    icon: <Target className="w-8 h-8" />,
    title: "Innovation",
    description: "Nous repoussons constamment les limites de la technologie pour créer des solutions uniques."
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Collaboration",
    description: "Nous travaillons en étroite collaboration avec nos clients pour garantir leur satisfaction."
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Excellence",
    description: "Nous visons l'excellence dans chaque ligne de code et chaque pixel de design."
  }
];

const historyEvents: HistoryEvent[] = [
  {
    year: "2023",
    title: "Lancement de NourX",
    description: "Début de l'aventure avec une vision claire : créer des expériences web exceptionnelles."
  },
  {
    year: "2024",
    title: "Expansion & Innovation",
    description: "Développement de solutions sur mesure et croissance de l'équipe."
  }
];

const statistics: Statistic[] = [
  { value: 50, label: "Projets Réalisés", prefix: "+" },
  { value: 100, label: "Clients Satisfaits", suffix: "%" },
  { value: 5, label: "Années d'Expérience", suffix: "+" }
];

// Composant principal
const AboutSection: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <section className="w-full py-12 md:py-24 bg-black text-white relative overflow-hidden" id="about">
      {/* Fond avec effet de gradient */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 animate-gradient-xy"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            À Propos de NourX
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-4 md:mb-8"></div>
          <p className="text-base md:text-xl max-w-3xl mx-auto text-gray-300">
            Nous créons des expériences web exceptionnelles qui transforment votre vision en réalité
          </p>
        </motion.div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-blue-400">Notre Vision</h3>
            <p className="text-gray-300 mb-6">
              Devenir le partenaire de référence pour la création d'expériences web innovantes et performantes.
            </p>
            <ul className="space-y-3">
              {['Innovation continue', 'Excellence technique', 'Satisfaction client'].map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-400">
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-blue-400">Notre Mission</h3>
            <p className="text-gray-300 mb-6">
              Transformer vos idées en solutions web performantes et évolutives qui dépassent vos attentes.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {statistics.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">
                    {stat.prefix}{stat.value}{stat.suffix}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Notre Histoire */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Notre Histoire</h3>
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-blue-500/20 transform -translate-x-1/2"></div>
            {historyEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex items-center gap-8 mb-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                    <div className="text-blue-400 font-bold mb-2">{event.year}</div>
                    <h4 className="text-xl font-semibold mb-2">{event.title}</h4>
                    <p className="text-gray-400">{event.description}</p>
                  </div>
                </div>
                <div className="relative flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-blue-500 relative z-10"></div>
                </div>
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Nos Valeurs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Nos Valeurs</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {companyValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold mb-3">{value.title}</h4>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Notre Équipe */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Notre Équipe</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                className="relative group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                onHoverStart={() => setSelectedMember(member.id)}
                onHoverEnd={() => setSelectedMember(null)}
              >
                <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 group-hover:border-blue-500/50 transition-all duration-300">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold mb-2">{member.name}</h4>
                    <p className="text-blue-400 mb-3">{member.role}</p>
                    <p className="text-gray-400 text-sm mb-4">{member.bio}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.expertise.map((skill, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      {member.links.linkedin && (
                        <a
                          href={member.links.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-400 transition-colors"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {member.links.github && (
                        <a
                          href={member.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-400 transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pourquoi Nous Choisir */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-8 border border-gray-800 mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Pourquoi Nous Choisir</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <Star className="w-6 h-6" />,
                title: "Expertise Technique",
                description: "Une maîtrise approfondie des dernières technologies web"
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: "Solutions Évolutives",
                description: "Des applications conçues pour croître avec votre entreprise"
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Délais Respectés",
                description: "Une gestion de projet efficace pour livrer dans les temps"
              },
              {
                icon: <MessageCircle className="w-6 h-6" />,
                title: "Support Réactif",
                description: "Une équipe à l'écoute et réactive à vos besoins"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-semibold transition-colors duration-300"
          >
            Démarrer Votre Projet
            <ChevronRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
