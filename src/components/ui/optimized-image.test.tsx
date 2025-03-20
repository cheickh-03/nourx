import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import OptimizedImage from './optimized-image'
import { ImageOptimizer } from '../../utils/imageOptimizer'

// Mock des fonctions de l'ImageOptimizer
vi.mock('../../utils/imageOptimizer', () => ({
  ImageOptimizer: {
    getOptimizedImageUrl: vi.fn((src) => `optimized-${src}`),
    createPlaceholder: vi.fn((src) => `placeholder-${src}`),
    supportsModernFormats: vi.fn(() => ({ webp: true, avif: false })),
  },
}))

describe('OptimizedImage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('devrait rendre l\'image avec le chargement progressif par défaut', () => {
    render(<OptimizedImage src="/test-image.jpg" alt="Test image" />)
    
    // Vérifier que l'optimiseur a été appelé
    expect(ImageOptimizer.getOptimizedImageUrl).toHaveBeenCalledWith('/test-image.jpg', expect.objectContaining({
      format: 'webp',
    }))
    
    expect(ImageOptimizer.createPlaceholder).toHaveBeenCalledWith('/test-image.jpg', 20)
    
    // Vérifier que l'image est rendue avec les bonnes propriétés
    const image = screen.getByAltText('Test image')
    expect(image).toBeInTheDocument()
    expect(image.tagName).toBe('IMG')
  })

  it('devrait rendre l\'image avec priorité sans chargement progressif', () => {
    render(<OptimizedImage src="/priority-image.jpg" alt="Priority image" priority />)
    
    // Vérifier que l'optimiseur a été appelé
    expect(ImageOptimizer.getOptimizedImageUrl).toHaveBeenCalledWith('/priority-image.jpg', expect.anything())
    
    // Pour les images prioritaires, on ne crée pas de placeholder
    expect(ImageOptimizer.createPlaceholder).toHaveBeenCalledWith('/priority-image.jpg', 20)
    
    // Vérifier que l'image est rendue avec les bonnes propriétés
    const image = screen.getByAltText('Priority image')
    expect(image).toBeInTheDocument()
    expect(image.tagName).toBe('IMG')
    expect(image).toHaveAttribute('loading', 'eager')
    expect(image).toHaveAttribute('fetchpriority', 'high')
  })

  it('devrait passer les props et classes supplémentaires', () => {
    render(
      <OptimizedImage 
        src="/styled-image.jpg" 
        alt="Styled image" 
        className="custom-class" 
        data-testid="test-image"
      />
    )
    
    // Vérifier que l'image a les attributs supplémentaires
    const image = screen.getByTestId('test-image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveClass('custom-class')
  })
}) 