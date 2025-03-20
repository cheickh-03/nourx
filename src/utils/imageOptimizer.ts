/**
 * Utilitaire pour optimiser les images avec des paramètres adaptés
 * Cette classe permet de gérer les formats d'image modernes et les paramètres
 * d'optimisation pour différents contextes.
 */
export class ImageOptimizer {
  /**
   * Génère une URL optimisée pour une image selon différents contextes
   */
  static getOptimizedImageUrl(
    src: string,
    options: {
      width?: number;
      quality?: number;
      format?: 'webp' | 'avif' | 'jpg' | 'auto';
      blur?: number;
    } = {}
  ): string {
    const {
      width = 0,
      quality = 80,
      format = 'auto',
      blur = 0,
    } = options;

    // Pour les cas où l'URL est déjà un data URI ou une image de placeholder
    if (src.startsWith('data:') || !src) {
      return src;
    }

    // Pour les images externes (par exemple, les CDNs ou services tiers)
    if (src.startsWith('http')) {
      // Détecter Cloudinary
      if (src.includes('cloudinary.com')) {
        return this.optimizeCloudinaryUrl(src, { width, quality, format, blur });
      }
      
      // Détecter Imgix
      if (src.includes('imgix.net')) {
        return this.optimizeImgixUrl(src, { width, quality, format, blur });
      }
      
      // Pour les images externes génériques, on ne peut pas les optimiser directement
      return src;
    }
    
    // Pour les images locales (ViteJS en développement ou statiques en production)
    if (import.meta.env.DEV) {
      // En développement, on ne fait pas d'optimisation complexe
      return src;
    } else {
      // En production, on suppose que les images sont déjà optimisées ou seront servies
      // par un CDN configuré via des en-têtes ou des paramètres de requête
      
      // Exemple simple pour des images locales pré-optimisées
      if (format === 'auto' || format === 'webp') {
        // Pour les images WebP générées lors du build
        const parts = src.split('.');
        const ext = parts.pop();
        if (ext && ['jpg', 'jpeg', 'png'].includes(ext.toLowerCase())) {
          // Essayer d'utiliser une version WebP pré-générée
          return `${parts.join('.')}.webp`;
        }
      }
      
      return src;
    }
  }

  /**
   * Optimise une URL Cloudinary
   */
  private static optimizeCloudinaryUrl(
    src: string,
    options: { width?: number; quality?: number; format?: string; blur?: number }
  ): string {
    const { width, quality, format, blur } = options;
    
    // Déterminer si l'URL contient déjà des transformations
    const hasTransformations = src.includes('/upload/');
    
    // Préfixe de transformation
    let transformPrefix = hasTransformations 
      ? src.replace(/\/upload\//, '/upload/') 
      : src.replace(/\/upload\//, '/upload/');
    
    // Construire les paramètres
    const transformations = [];
    
    if (width) {
      transformations.push(`w_${width}`);
    }
    
    if (quality) {
      transformations.push(`q_${quality}`);
    }
    
    if (format && format !== 'auto') {
      transformations.push(`f_${format}`);
    }
    
    if (blur && blur > 0) {
      transformations.push(`e_blur:${blur}`);
    }
    
    // Auto-format et compression
    transformations.push('f_auto,c_limit');
    
    // Construire l'URL finale
    if (transformations.length > 0) {
      transformPrefix = src.replace(/\/upload\//, `/upload/${transformations.join(',')}/`);
    }
    
    return transformPrefix;
  }

  /**
   * Optimise une URL Imgix
   */
  private static optimizeImgixUrl(
    src: string,
    options: { width?: number; quality?: number; format?: string; blur?: number }
  ): string {
    const { width, quality, format, blur } = options;
    
    // Construire les paramètres de requête
    const params = new URLSearchParams();
    
    if (width) {
      params.append('w', width.toString());
    }
    
    if (quality) {
      params.append('q', quality.toString());
    }
    
    if (format && format !== 'auto') {
      params.append('fm', format);
    } else {
      params.append('auto', 'format');
    }
    
    if (blur && blur > 0) {
      params.append('blur', blur.toString());
    }
    
    // Construire l'URL finale
    const separator = src.includes('?') ? '&' : '?';
    return `${src}${separator}${params.toString()}`;
  }

  /**
   * Crée un placeholder de faible qualité pour précharger une image
   */
  static createPlaceholder(
    src: string,
    size: number = 10
  ): string {
    if (!src || src.startsWith('data:')) return src;
    
    // Pour les images externes
    if (src.startsWith('http')) {
      // Créer un placeholder Cloudinary
      if (src.includes('cloudinary.com')) {
        return src.replace(/\/upload\//, `/upload/w_${size},h_${size},c_fill,e_blur:500,q_auto:low/`);
      }
      
      // Créer un placeholder Imgix
      if (src.includes('imgix.net')) {
        const separator = src.includes('?') ? '&' : '?';
        return `${src}${separator}w=${size}&h=${size}&fit=crop&blur=500&q=10`;
      }
      
      // Pour les autres images, retourner un data URI de basse qualité
      return `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${size} ${size}'%3E%3C/svg%3E`;
    }
    
    // Pour les images locales
    const parts = src.split('.');
    const ext = parts.pop();
    
    // Création d'un chemin vers une version thumbnail pré-générée
    if (ext) {
      return `${parts.join('.')}-thumb.${ext}`;
    }
    
    return src;
  }

  /**
   * Détecte si le navigateur supporte les formats d'image modernes
   */
  static supportsModernFormats(): { webp: boolean; avif: boolean } {
    if (typeof window === 'undefined') {
      return { webp: false, avif: false };
    }
    
    const result = {
      webp: false,
      avif: false
    };
    
    // Détection WebP
    const webpCanvas = document.createElement('canvas');
    if (webpCanvas.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
      result.webp = true;
    }
    
    // La détection d'AVIF est plus complexe et nécessite un test de chargement
    // Nous allons simplifier et utiliser une détection par user-agent pour l'instant
    const userAgent = navigator.userAgent.toLowerCase();
    if (
      (userAgent.includes('chrome') && parseInt(userAgent.match(/chrome\/(\d+)/)?.[1] || '0') >= 85) ||
      (userAgent.includes('firefox') && parseInt(userAgent.match(/firefox\/(\d+)/)?.[1] || '0') >= 86)
    ) {
      result.avif = true;
    }
    
    return result;
  }
} 