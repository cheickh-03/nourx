import { useState, useEffect } from "react";

/**
 * Hook personnalisé pour détecter les changements de media query
 * Sécurisé pour le SSR et le rendu initial
 */
export function useMediaQuery(query: string): boolean {
  // Vérifier si window est défini pour éviter les erreurs SSR
  const isClient = typeof window === "object";
  
  // Définir une valeur par défaut basée sur une estimation grossière (pour les téléphones)
  // Cela aide à éviter le flash de contenu lors du premier rendu
  const getDefaultValue = () => {
    if (!isClient) return false;
    if (query.includes("max-width: 768px")) {
      return window.innerWidth <= 768;
    }
    return false;
  };
  
  const [matches, setMatches] = useState(getDefaultValue);

  console.log('useMediaQuery - isClient:', isClient);
  console.log('useMediaQuery - initial matches:', matches);

  useEffect(() => {
    // Ne rien faire côté serveur
    if (!isClient) return;
    
    // Fonction pour vérifier la correspondance
    const checkMedia = () => {
      const media = window.matchMedia(query);
      setMatches(media.matches);
    };
    
    // Vérifier immédiatement
    checkMedia();
    
    // Vérifier à nouveau après un court délai (pour gérer certains bugs de navigateur)
    const timeoutId = setTimeout(checkMedia, 100);
    
    // Définir l'écouteur pour les changements
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    
    // Ajouter l'écouteur
    media.addEventListener("change", listener);
    
    // Ajouter un écouteur pour le redimensionnement de la fenêtre
    window.addEventListener("resize", checkMedia);
    
    // Nettoyer
    return () => {
      media.removeEventListener("change", listener);
      window.removeEventListener("resize", checkMedia);
      clearTimeout(timeoutId);
    };
  }, [query, isClient]);

  return matches;
}
