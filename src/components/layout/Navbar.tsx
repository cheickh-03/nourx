import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

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
      <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="#" className="text-xl sm:text-2xl font-bold text-blue-500">
            NourX
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-gray-300 hover:text-blue-500 transition-colors duration-300 text-sm font-medium"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            onClick={onCtaClick}
          >
            Démarrer un Projet
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-blue-500"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "md:hidden bg-black/95 overflow-hidden transition-all duration-300",
          isOpen ? "max-h-[400px] py-4" : "max-h-0",
        )}
      >
        <div className="container mx-auto px-4">
          <ul className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-gray-300 hover:text-blue-500 transition-colors duration-300 block py-2 text-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                onClick={() => {
                  setIsOpen(false);
                  onCtaClick();
                }}
              >
                Démarrer un Projet
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
