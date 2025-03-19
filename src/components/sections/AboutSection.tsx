import React from "react";
import { motion } from "framer-motion";
import { Users2, Rocket, Target } from "lucide-react";
import CountUp from 'react-countup';

interface AboutSectionProps {
  stats?: {
    projects: number;
    satisfaction: number;
    experience: number;
  };
}

const AboutSection: React.FC<AboutSectionProps> = ({
  stats = {
    projects: 50,
    satisfaction: 98,
    experience: 5,
  },
}) => {
  return (
    <section className="w-full py-12 md:py-24 relative overflow-hidden animate-on-scroll" id="about">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* En-tête Impact */}
        <div className="min-h-[50vh] flex flex-col items-center justify-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-white to-blue-400">
              Transformons vos idées en réalité digitale
            </h2>
            
            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                  <CountUp end={stats.projects} suffix="+" duration={2.5} />
                </div>
                <p className="text-gray-400">Projets Réalisés</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                  <CountUp end={stats.satisfaction} suffix="%" duration={2.5} />
                </div>
                <p className="text-gray-400">Satisfaction Client</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                  <CountUp end={stats.experience} suffix="+" duration={2.5} />
                </div>
                <p className="text-gray-400">Années d'Expérience</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Notre ADN */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="group bg-gray-900/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Rocket className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">Expertise</h3>
            <p className="text-gray-400 leading-relaxed">
              Maîtrise des dernières technologies web et mobiles pour des solutions innovantes et performantes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="group bg-gray-900/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Target className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">Approche</h3>
            <p className="text-gray-400 leading-relaxed">
              Méthodologie agile centrée sur vos objectifs, avec des livrables réguliers et une communication transparente.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="group bg-gray-900/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Users2 className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">Engagement</h3>
            <p className="text-gray-400 leading-relaxed">
              Un accompagnement personnalisé et un engagement total pour la réussite de vos projets digitaux.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
