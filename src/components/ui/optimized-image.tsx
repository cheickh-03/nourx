import React, { useState, useEffect } from 'react';
import { ImageOptimizer } from '../../utils/imageOptimizer';
import ProgressiveImage from './progressive-image';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  aspectRatio?: string;
  priority?: boolean;
  quality?: number;
  optimizerOptions?: {
    format?: 'webp' | 'avif' | 'jpg' | 'auto';
    blur?: number;
  };
}

/**
 * Composant d'image optimisée avec chargement progressif et prise en charge des formats modernes
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  sizes = '100vw',
  aspectRatio = '16/9',
  priority = false,
  quality = 80,
  optimizerOptions = {},
  className,
  ...props
}) => {
  // État pour suivre les formats supportés
  const [formatSupport, setFormatSupport] = useState<{ webp: boolean; avif: boolean }>({
    webp: false,
    avif: false,
  });

  // Détecter les formats supportés au montage
  useEffect(() => {
    setFormatSupport(ImageOptimizer.supportsModernFormats());
  }, []);

  // Générer l'URL optimisée en fonction des supports du navigateur
  const optimizedSrc = ImageOptimizer.getOptimizedImageUrl(src, {
    width,
    quality,
    format: formatSupport.avif ? 'avif' : formatSupport.webp ? 'webp' : 'auto',
    ...optimizerOptions,
  });

  // Générer le placeholder pour le chargement progressif
  const placeholderSrc = ImageOptimizer.createPlaceholder(src, 20);

  // Si l'image est prioritaire, on charge directement l'image optimisée sans placeholder
  if (priority) {
    return (
      <img
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn('w-full h-auto', className)}
        loading="eager"
        fetchPriority="high"
        sizes={sizes}
        {...props}
      />
    );
  }

  // Sinon on utilise le chargement progressif
  return (
    <ProgressiveImage
      src={optimizedSrc}
      placeholderSrc={placeholderSrc}
      alt={alt}
      width={width}
      height={height}
      aspectRatio={aspectRatio}
      className={className}
      sizes={sizes}
      {...props}
    />
  );
};

export default OptimizedImage; 