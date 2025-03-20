import React, { useState, useEffect } from "react";
import { Button } from "./button";
import { 
  Eye, 
  Accessibility, 
  Type, 
  MousePointer, 
  X,
  MoveDiagonal,
  ZoomIn
} from "lucide-react";

/**
 * Menu d'accessibilité offrant des options pour améliorer l'expérience utilisateur
 * pour les personnes ayant des besoins spécifiques.
 */
const AccessibilityMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState({
    highContrast: false,
    largeText: false,
    cursorHighlight: false,
    reducedMotion: false,
    dyslexicFont: false,
  });

  // Appliquer les préférences stockées au chargement
  useEffect(() => {
    const savedOptions = localStorage.getItem("accessibility-options");
    if (savedOptions) {
      setOptions(JSON.parse(savedOptions));
    }
  }, []);

  // Mettre à jour les classes CSS et sauvegarder les préférences
  useEffect(() => {
    const root = document.documentElement;
    
    // Contraste élevé
    if (options.highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }
    
    // Grand texte
    if (options.largeText) {
      root.classList.add("large-text");
    } else {
      root.classList.remove("large-text");
    }
    
    // Curseur mis en évidence
    if (options.cursorHighlight) {
      root.classList.add("highlight-cursor");
    } else {
      root.classList.remove("highlight-cursor");
    }
    
    // Réduction du mouvement
    if (options.reducedMotion) {
      root.classList.add("reduced-motion");
    } else {
      root.classList.remove("reduced-motion");
    }
    
    // Police pour dyslexie
    if (options.dyslexicFont) {
      root.classList.add("dyslexic-font");
    } else {
      root.classList.remove("dyslexic-font");
    }
    
    // Sauvegarder les préférences
    localStorage.setItem("accessibility-options", JSON.stringify(options));
  }, [options]);

  const toggleOption = (option: keyof typeof options) => {
    setOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  return (
    <>
      {/* Bouton d'accessibilité */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-6 right-6 z-50 rounded-full bg-blue-500 text-white hover:bg-blue-600 h-12 w-12 shadow-lg"
        onClick={() => setIsOpen(true)}
        aria-label="Options d'accessibilité"
      >
        <Accessibility size={24} />
      </Button>

      {/* Panel d'accessibilité */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div
            className="bg-card text-card-foreground rounded-lg shadow-xl w-full max-w-md p-6 relative"
            role="dialog"
            aria-modal="true"
            aria-labelledby="accessibility-title"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => setIsOpen(false)}
              aria-label="Fermer le menu d'accessibilité"
            >
              <X size={20} />
            </Button>

            <h2 id="accessibility-title" className="text-xl font-bold mb-4">
              Options d'accessibilité
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye size={20} />
                  <span>Contraste élevé</span>
                </div>
                <Button
                  variant={options.highContrast ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleOption("highContrast")}
                  aria-pressed={options.highContrast}
                >
                  {options.highContrast ? "Activé" : "Désactivé"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Type size={20} />
                  <span>Texte agrandi</span>
                </div>
                <Button
                  variant={options.largeText ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleOption("largeText")}
                  aria-pressed={options.largeText}
                >
                  {options.largeText ? "Activé" : "Désactivé"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MousePointer size={20} />
                  <span>Surlignage du curseur</span>
                </div>
                <Button
                  variant={options.cursorHighlight ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleOption("cursorHighlight")}
                  aria-pressed={options.cursorHighlight}
                >
                  {options.cursorHighlight ? "Activé" : "Désactivé"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MoveDiagonal size={20} />
                  <span>Réduire les animations</span>
                </div>
                <Button
                  variant={options.reducedMotion ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleOption("reducedMotion")}
                  aria-pressed={options.reducedMotion}
                >
                  {options.reducedMotion ? "Activé" : "Désactivé"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ZoomIn size={20} />
                  <span>Police pour dyslexie</span>
                </div>
                <Button
                  variant={options.dyslexicFont ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleOption("dyslexicFont")}
                  aria-pressed={options.dyslexicFont}
                >
                  {options.dyslexicFont ? "Activé" : "Désactivé"}
                </Button>
              </div>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              Ces options d'accessibilité sont sauvegardées pour vos prochaines visites.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AccessibilityMenu; 