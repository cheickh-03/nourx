import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from './button';
import { Moon, Sun, Monitor } from 'lucide-react';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="flex items-center gap-2 bg-secondary p-1 rounded-lg">
      <Button
        variant={theme === 'light' ? 'default' : 'ghost'}
        size="icon"
        onClick={() => setTheme('light')}
        title="Mode clair"
        aria-label="Activer le mode clair"
        className="relative w-8 h-8 rounded-md transition-all"
      >
        <Sun className="h-4 w-4" />
      </Button>
      
      <Button
        variant={theme === 'system' ? 'default' : 'ghost'}
        size="icon"
        onClick={() => setTheme('system')}
        title="Système"
        aria-label="Utiliser les préférences système"
        className="relative w-8 h-8 rounded-md transition-all"
      >
        <Monitor className="h-4 w-4" />
      </Button>
      
      <Button
        variant={theme === 'dark' ? 'default' : 'ghost'}
        size="icon"
        onClick={() => setTheme('dark')}
        title="Mode sombre"
        aria-label="Activer le mode sombre"
        className="relative w-8 h-8 rounded-md transition-all"
      >
        <Moon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ThemeSwitcher; 