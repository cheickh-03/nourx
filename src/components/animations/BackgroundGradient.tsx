import React from 'react';
import { motion } from 'framer-motion';

const BackgroundGradient: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Fond noir de base */}
      <div className="absolute inset-0 bg-black" />

      {/* Gradient principal animé */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-purple-500 rounded-full mix-blend-multiply filter blur-[96px]"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 w-[700px] h-[700px] bg-cyan-500 rounded-full mix-blend-multiply filter blur-[112px]"
          animate={{
            x: [0, 40, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Pattern de grille */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMxMjEyMTIiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMzBjMCAxNi41NjktMTMuNDMxIDMwLTMwIDMwQzEzLjQzMSA2MCAwIDQ2LjU2OSAwIDMwIDAgMTMuNDMxIDEzLjQzMSAwIDMwIDBjMTYuNTY5IDAgMzAgMTMuNDMxIDMwIDMweiIgc3Ryb2tlPSIjMjIyIiBzdHJva2Utd2lkdGg9Ii41Ii8+PHBhdGggZD0iTTYwIDYwTDAgME02MCAwTDAgNjAiIHN0cm9rZT0iIzIyMiIgc3Ryb2tlLXdpZHRoPSIuNSIvPjwvZz48L3N2Zz4=')] opacity-5" />
    </div>
  );
};

export default BackgroundGradient; 