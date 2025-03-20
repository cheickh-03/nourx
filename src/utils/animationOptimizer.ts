import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Classe d'optimisation des animations
export class AnimationOptimizer {
  private static isLowEndDevice: boolean = false;
  private static isMobile: boolean = false;
  private static isReducedMotion: boolean = false;
  private static initialized: boolean = false;

  // Initialise l'optimiseur en détectant les capacités de l'appareil
  public static init(): void {
    if (this.initialized) return;
    
    // Détection de dispositif à faibles performances
    this.isLowEndDevice = 
      navigator.hardwareConcurrency <= 4 || 
      /Android.*(Chrome\/[0-9][0-9])/.test(navigator.userAgent);
    
    // Détection mobile
    this.isMobile = window.innerWidth <= 768;
    
    // Détection des préférences de mouvement réduit
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Registre GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // Optimisations globales pour GSAP
    gsap.config({
      autoSleep: 60,
      force3D: !this.isLowEndDevice,
      nullTargetWarn: false,
    });

    if (this.isLowEndDevice || this.isReducedMotion) {
      gsap.globalTimeline.timeScale(1.5); // Accélérer les animations pour réduire la charge
    }

    this.initialized = true;
    console.log("AnimationOptimizer initialized", {
      isLowEndDevice: this.isLowEndDevice,
      isMobile: this.isMobile,
      isReducedMotion: this.isReducedMotion
    });
  }

  // Optimise une animation basée sur le type d'appareil
  public static optimizeAnimation(timeline: gsap.core.Timeline): gsap.core.Timeline {
    if (!this.initialized) this.init();
    
    if (this.isReducedMotion) {
      // Préférence pour réduire les animations - les accélérer fortement
      timeline.timeScale(3);
    } else if (this.isLowEndDevice) {
      // Appareil à faibles performances - simplifier les animations
      timeline.timeScale(1.5);
    }
    
    return timeline;
  }

  // Crée des ScrollTriggers optimisés
  public static createScrollTrigger(options: ScrollTrigger.Vars): ScrollTrigger {
    if (!this.initialized) this.init();
    
    const optimizedOptions = { ...options };
    
    // Ajustements pour appareils à faibles performances
    if (this.isLowEndDevice || this.isMobile) {
      // Réduire la fréquence de rafraîchissement sur les appareils à faibles performances
      optimizedOptions.refreshPriority = -1;
      optimizedOptions.fastScrollEnd = true;
      
      // Simplifier la fonction de déclenchement pour limiter les coûts de performance
      if (optimizedOptions.onUpdate) {
        const originalOnUpdate = optimizedOptions.onUpdate;
        optimizedOptions.onUpdate = function(self) {
          // Limiter les mises à jour à 30fps sur les appareils à faibles performances
          if (Math.random() > 0.5) {
            originalOnUpdate(self);
          }
        };
      }
    }

    // Gestion de l'animation associée au ScrollTrigger, si présente
    if (this.isReducedMotion) {
      // Si des animations sont associées au ScrollTrigger d'une autre manière
      // (généralement via les callbacks ou des timelines externes)
      if (optimizedOptions.onEnter) {
        const originalOnEnter = optimizedOptions.onEnter;
        optimizedOptions.onEnter = function(self) {
          // On applique nos optimisations avant d'exécuter le callback
          gsap.globalTimeline.timeScale(2);
          originalOnEnter(self);
        };
      }
    }
    
    return ScrollTrigger.create(optimizedOptions);
  }

  // Crée une animation d'apparition optimisée pour les sections
  public static createFadeInAnimation(element: string | Element, delayPercent: number = 0): gsap.core.Tween {
    if (!this.initialized) this.init();
    
    const delay = this.isLowEndDevice || this.isReducedMotion ? 0 : 0.2 * delayPercent;
    const duration = this.isLowEndDevice || this.isReducedMotion ? 0.3 : 0.7;
    
    return gsap.from(element, {
      opacity: 0,
      y: this.isReducedMotion ? 5 : 20,
      duration,
      delay,
      ease: "power2.out",
    });
  }
}

export default AnimationOptimizer; 