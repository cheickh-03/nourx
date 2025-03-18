import React, { useEffect, useState } from "react";

const MouseFollower: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <div
      className={`fixed pointer-events-none z-50 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="relative">
        <div className="absolute -inset-4 rounded-full bg-blue-500 opacity-20 blur-md animate-pulse"></div>
        <div className="h-4 w-4 rounded-full bg-blue-400"></div>
      </div>
    </div>
  );
};

export default MouseFollower;
