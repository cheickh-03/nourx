import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HeroSection from "./sections/HeroSection";
import ServicesSection from "./sections/ServicesSection";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import MouseFollower from "./animations/MouseFollower";
import ScrollProgress from "./animations/ScrollProgress";
import FloatingShapes from "./animations/FloatingShapes";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initialize persistent scroll animations
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        onEnter: () => {
          gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(section, {
            opacity: 0.5,
            y: 50,
            duration: 0.8,
            ease: "power2.in",
          });
        },
        onEnterBack: () => {
          gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          });
        },
        onLeave: () => {
          gsap.to(section, {
            opacity: 0.5,
            y: -50,
            duration: 0.8,
            ease: "power2.in",
          });
        },
      });
    });

    // Initialize section animations
    gsap.utils.toArray(".animate-on-scroll").forEach((element: any) => {
      gsap.set(element, { opacity: 0, y: 50 });

      ScrollTrigger.create({
        trigger: element,
        start: "top 80%",
        onEnter: () => {
          gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          });
        },
        once: true,
      });
    });

    return () => {
      // Clean up all scroll triggers when component unmounts
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleCtaClick = () => {
    navigate("/projet");
  };

  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
      <MouseFollower />
      <ScrollProgress />
      <FloatingShapes />
      <Navbar onCtaClick={handleCtaClick} />
      <main>
        <HeroSection onCtaClick={handleCtaClick} />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
