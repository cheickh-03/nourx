/**
 * Utility functions for performance optimization
 */

/**
 * Throttle function to limit how often a function can be called
 * @param callback The function to throttle
 * @param delay The minimum time between function calls
 */
export function throttle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      callback(...args);
    }
  };
}

/**
 * Debounce function to delay execution until after a period of inactivity
 * @param callback The function to debounce
 * @param delay The time to wait after the last call before executing
 */
export function debounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
}

/**
 * Check if the device is likely a mobile device based on screen size
 */
export function isMobileDevice(): boolean {
  return window.matchMedia("(max-width: 768px)").matches;
}

/**
 * Reduce animation complexity based on device capability
 * @param defaultComplexity The default complexity level (higher = more complex)
 */
export function getAnimationComplexity(defaultComplexity: number = 3): number {
  // Reduce complexity on mobile
  if (isMobileDevice()) {
    return Math.max(1, defaultComplexity - 2);
  }

  // Could add more checks here for low-end devices
  return defaultComplexity;
}
