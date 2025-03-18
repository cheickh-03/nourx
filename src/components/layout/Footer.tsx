import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

interface FooterProps {
  logo?: string;
  contactInfo?: {
    email: string;
    phone: string;
    address: string;
  };
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

const Footer = ({
  logo = "NourX",
  contactInfo = {
    email: "contact@nourx.dev",
    phone: "+2250703079410",
    address: "Riviera Golf Abidjan CI",
  },
  socialLinks = {
    facebook: "https://facebook.com/nourx",
    twitter: "https://twitter.com/nourx",
    instagram: "https://instagram.com/nourx",
    linkedin: "https://linkedin.com/company/nourx",
  },
}: FooterProps) => {
  return (
    <footer className="bg-black text-white py-16 border-t border-blue-900/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and About */}
          <div className="space-y-6">
            <div className="flex items-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
                {logo}
              </h2>
            </div>
            <p className="text-gray-400 max-w-md">
              Agence de développement web spécialisée dans la création de
              solutions digitales modernes, innovantes et performantes.
            </p>
            <div className="flex space-x-4">
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Facebook size={20} />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Twitter size={20} />
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Instagram size={20} />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Linkedin size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-blue-400">
              Liens Rapides
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  À Propos
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Mentions Légales
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-blue-400">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-blue-500" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-blue-500" />
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-blue-500 mt-1" />
                <span className="text-gray-400">{contactInfo.address}</span>
              </li>
            </ul>
            <Button
              variant="outline"
              className="mt-4 border-blue-500 text-blue-400 hover:bg-blue-900/20"
            >
              Contactez-nous
            </Button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-blue-900/30 text-center text-gray-500 text-sm">
          <p>© 2025 NourX. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
