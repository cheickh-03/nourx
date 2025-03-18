import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";

interface ProjectCardProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  onViewDetails?: () => void;
}

const ProjectCard = ({
  title = "Digital Marketing Dashboard",
  description = "A comprehensive analytics platform with real-time data visualization",
  imageUrl = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80",
  category = "Web Development",
  onViewDetails = () => console.log("View details clicked"),
}: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full bg-black border-blue-900/50 hover:border-blue-600/80 transition-all duration-300">
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span className="text-xs font-medium text-blue-400 bg-blue-950/50 px-2 py-1 rounded-full">
              {category}
            </span>
          </div>
        </div>
        <CardContent className="p-5">
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
            {title}
          </h3>
          <p className="text-sm text-gray-400 mb-4 line-clamp-2">
            {description}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={onViewDetails}
            className="w-full bg-transparent border-blue-800 text-blue-400 hover:bg-blue-900/30 hover:text-blue-300 group"
          >
            <Eye className="mr-2 h-4 w-4 group-hover:animate-pulse" />
            View Details
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
