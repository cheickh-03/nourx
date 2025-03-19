import React from 'react';
import { motion } from 'framer-motion';

interface SectionBackgroundProps {
  variant?: 'default' | 'gradient' | 'grid';
  className?: string;
}

const SectionBackground: React.FC<SectionBackgroundProps> = ({
  variant = 'default',
  className = '',
}) => {
  const renderBackground = () => {
    switch (variant) {
      case 'gradient':
        return (
          <div className={`absolute inset-0 opacity-20 ${className}`}>
            <motion.div
              className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"
              animate={{
                x: [0, 30, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ willChange: "transform" }}
            />
            <motion.div
              className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"
              animate={{
                x: [0, -30, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              style={{ willChange: "transform" }}
            />
            <motion.div
              className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl"
              animate={{
                x: [0, 20, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              style={{ willChange: "transform" }}
            />
          </div>
        );

      case 'grid':
        return (
          <div className={`absolute inset-0 ${className}`}>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMxMjEyMTIiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMzBjMCAxNi41NjktMTMuNDMxIDMwLTMwIDMwQzEzLjQzMSA2MCAwIDQ2LjU2OSAwIDMwIDAgMTMuNDMxIDEzLjQzMSAwIDMwIDBjMTYuNTY5IDAgMzAgMTMuNDMxIDMwIDMweiIgc3Ryb2tlPSIjMjIyIiBzdHJva2Utd2lkdGg9Ii41Ii8+PHBhdGggZD0iTTYwIDYwTDAgME02MCAwTDAgNjAiIHN0cm9rZT0iIzIyMiIgc3Ryb2tlLXdpZHRoPSIuNSIvPjwvZz48L3N2Zz4=')] opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/5 to-black" />
          </div>
        );

      default:
        return (
          <div className={`absolute inset-0 ${className}`}>
            <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 to-transparent opacity-40" />
            <motion.div
              className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl"
              animate={{
                x: [0, 30, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ willChange: "transform" }}
            />
            <motion.div
              className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl"
              animate={{
                x: [0, -40, 0],
                y: [0, 40, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ willChange: "transform" }}
            />
          </div>
        );
    }
  };

  return renderBackground();
};

export default SectionBackground; 