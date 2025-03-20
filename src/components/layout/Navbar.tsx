import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import ThemeSwitcher from "../ui/theme-switcher";

interface NavbarProps {
  transparent?: boolean;
  onCtaClick?: () => void;
}

const Navbar = ({
  transparent = false,
  onCtaClick = () => console.log("CTA clicked"),
}: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarClasses = cn(
    "fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out",
    {
      "bg-black/90 backdrop-blur-md shadow-lg": scrolled || !transparent,
      "bg-transparent": transparent && !scrolled,
    },
  );

  const navItems = [
    { name: "Services", href: "#services" },
    { name: "À Propos", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-white">
          <span className="text-blue-400">Nour</span>X
        </div>

        {/* Menu Desktop */}
        <div className="hidden md:flex space-x-8 items-center">
          <a
            href="#services"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Services
          </a>
          <a
            href="#process"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Processus
          </a>
          <a
            href="#about"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            À propos
          </a>
          <a
            href="#contact"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Contact
          </a>
          
          {/* Ajout du sélecteur de thème */}
          <ThemeSwitcher />
          
          <Button
            onClick={onCtaClick}
            variant="outline"
            className="ml-4 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
          >
            Démarrer un projet
          </Button>
        </div>

        {/* Menu Mobile */}
        <div className="md:hidden flex items-center">
          <ThemeSwitcher />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="ml-4 text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-50 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="fixed right-0 inset-y-0 bg-black w-4/5 h-full shadow-xl p-6 flex flex-col">
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white"
            >
              <X size={24} />
            </Button>
          </div>
          <div className="flex flex-col space-y-6 mt-12">
            <a
              href="#services"
              className="text-white text-xl hover:text-blue-400 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Services
            </a>
            <a
              href="#process"
              className="text-white text-xl hover:text-blue-400 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Processus
            </a>
            <a
              href="#about"
              className="text-white text-xl hover:text-blue-400 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              À propos
            </a>
            <a
              href="#contact"
              className="text-white text-xl hover:text-blue-400 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
            <Button
              onClick={() => {
                onCtaClick();
                setIsOpen(false);
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Démarrer un projet
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
