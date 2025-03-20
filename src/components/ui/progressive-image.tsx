import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ProgressiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  placeholderSrc?: string;
  alt: string;
  aspectRatio?: string;
  blurEffect?: boolean;
}

/**
 * Composant d'image avec chargement progressif
 * Affiche une image de faible qualité pendant le chargement de l'image principale
 */
const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  placeholderSrc,
  alt,
  aspectRatio = '16/9',
  blurEffect = true,
  className,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholderSrc || '');
  const imgRef = useRef<HTMLImageElement>(null);

  // Utiliser IntersectionObserver pour charger l'image uniquement lorsqu'elle est visible
  useEffect(() => {
    let observer: IntersectionObserver;
    let img: HTMLImageElement | null = imgRef.current;

    if (img && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Lorsque l'image entre dans le viewport
            if (entry.isIntersecting) {
              // Charger l'image principale
              const fullSizeImg = new Image();
              fullSizeImg.src = src;
              fullSizeImg.onload = () => {
                if (img) {
                  setCurrentSrc(src);
                  setIsLoaded(true);
                }
              };
              
              // Arrêter d'observer cette image
              observer.unobserve(img);
            }
          });
        },
        {
          root: null, // viewport
          rootMargin: '200px 0px', // charger 200px avant que l'image soit visible
          threshold: 0.01, // déclencher dès que 1% de l'image est visible
        }
      );

      observer.observe(img);
    } else {
      // Fallback pour les navigateurs qui ne supportent pas IntersectionObserver
      setCurrentSrc(src);
      const fullSizeImg = new Image();
      fullSizeImg.src = src;
      fullSizeImg.onload = () => {
        setIsLoaded(true);
      };
    }

    return () => {
      if (observer && img) {
        observer.unobserve(img);
      }
    };
  }, [src]);

  // Gestion de l'aspect ratio et des styles
  return (
    <div
      className="overflow-hidden relative"
      style={{ aspectRatio: aspectRatio }}
    >
      <img
        ref={imgRef}
        src={currentSrc || placeholderSrc}
        alt={alt}
        className={cn(
          'w-full h-full object-cover transition-all duration-500',
          blurEffect && !isLoaded && 'blur-md scale-105',
          isLoaded && 'blur-0 scale-100',
          className
        )}
        loading="lazy"
        {...props}
      />
    </div>
  );
};

export default ProgressiveImage;

/**
 * Wrapper pour créer facilement des placeholders flous basés sur l'image originale
 */
export function createBlurPlaceholder(src: string, size: number = 20): string {
  if (typeof window === 'undefined') return ''; // SSR safety
  
  // Vérifier si l'URL est externe
  if (src.startsWith('http') || src.startsWith('https')) {
    // Pour les images externes, retourner un data URI de basse qualité
    return `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${size} ${size}'%3E%3C/svg%3E`;
  }
  
  // Pour les images locales, construire une version miniature
  const parts = src.split('.');
  const ext = parts.pop();
  
  // Créer un chemin pour une version miniature potentielle
  // Exemple: /images/photo.jpg -> /images/photo-thumb.jpg
  return parts.join('.') + '-thumb.' + ext;
} 