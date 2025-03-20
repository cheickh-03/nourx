import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Définition des types pour le thème
type Theme = 'light' | 'dark' | 'system';

// Interface pour le contexte du thème
interface ThemeContextType {
  theme: Theme;
  isDarkMode: boolean;
  setTheme: (theme: Theme) => void;
}

// Création du contexte avec une valeur par défaut
const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  isDarkMode: false,
  setTheme: () => {},
});

// Hook personnalisé pour utiliser le contexte du thème
export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // État pour stocker le thème courant
  const [theme, setTheme] = useState<Theme>(() => {
    // Récupérer le thème de localStorage ou utiliser la préférence système par défaut
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'system';
  });

  // État pour déterminer si le mode sombre est actif
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Déterminer si le mode sombre est actif en fonction du thème et des préférences système
  useEffect(() => {
    const updateTheme = () => {
      const root = window.document.documentElement;
      
      // Supprimer les classes existantes
      root.classList.remove('light-mode', 'dark-mode');
      
      let isDark = false;
      
      if (theme === 'system') {
        // Utiliser la préférence système
        isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      } else {
        // Utiliser le thème explicite
        isDark = theme === 'dark';
      }
      
      // Ajouter la classe appropriée
      root.classList.add(isDark ? 'dark-mode' : 'light-mode');
      
      // Mettre à jour l'état
      setIsDarkMode(isDark);
    };

    updateTheme();

    // Sauvegarder le thème dans localStorage
    localStorage.setItem('theme', theme);

    // Écouter les changements de préférence système
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        updateTheme();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Handler pour changer le thème
  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  // Fournir le contexte aux composants enfants
  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDarkMode,
        setTheme: handleSetTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; 