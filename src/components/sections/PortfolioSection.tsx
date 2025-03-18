import React, { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "../cards/ProjectCard";
import { Button } from "../ui/button";

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

interface PortfolioSectionProps {
  title?: string;
  subtitle?: string;
  projects?: Project[];
}

const PortfolioSection = ({
  title = "Our Portfolio",
  subtitle = "Discover our latest projects and creative solutions",
  projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A modern e-commerce solution with advanced filtering and payment integration",
      imageUrl:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&q=80",
      category: "Web Development",
    },
    {
      id: 2,
      title: "Mobile Banking App",
      description:
        "Secure and intuitive mobile banking application with biometric authentication",
      imageUrl:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&q=80",
      category: "App Design",
    },
    {
      id: 3,
      title: "AI Content Generator",
      description:
        "Smart content creation tool powered by advanced machine learning algorithms",
      imageUrl:
        "https://images.unsplash.com/photo-1677442135136-760c813028c4?w=500&q=80",
      category: "Digital Creation",
    },
    {
      id: 4,
      title: "Social Media Campaign",
      description:
        "Comprehensive social media strategy that increased engagement by 200%",
      imageUrl:
        "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&q=80",
      category: "Marketing",
    },
    {
      id: 5,
      title: "Healthcare Dashboard",
      description:
        "Interactive analytics platform for healthcare providers with real-time monitoring",
      imageUrl:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=80",
      category: "Web Development",
    },
    {
      id: 6,
      title: "Fitness Tracking App",
      description:
        "Personalized workout and nutrition tracking application with social features",
      imageUrl:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80",
      category: "App Design",
    },
  ],
}: PortfolioSectionProps) => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const categories = [
    "All",
    "Web Development",
    "App Design",
    "Digital Creation",
    "Marketing",
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <section className="py-20 px-4 md:px-8 bg-black text-white" id="portfolio">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            {title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeFilter === category ? "default" : "outline"}
              onClick={() => setActiveFilter(category)}
              className={`
                ${
                  activeFilter === category
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-transparent border-blue-800 text-blue-400 hover:bg-blue-900/30 hover:text-blue-300"
                }
                transition-all duration-300
              `}
            >
              {category}
            </Button>
          ))}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
                category={project.category}
                onViewDetails={() =>
                  console.log(`View details for ${project.title}`)
                }
              />
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400">No projects found in this category.</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          >
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
