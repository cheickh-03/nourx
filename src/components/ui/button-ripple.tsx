import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        outline: "border border-blue-500 text-blue-500 bg-transparent hover:bg-blue-100/10",
        ghost: "text-blue-500 hover:bg-blue-100/10",
        secondary: "bg-blue-100 text-blue-900 hover:bg-blue-200",
        destructive: "bg-red-600 text-white hover:bg-red-700",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3",
        lg: "h-11 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

const ButtonRipple = ({ 
  className, 
  variant, 
  size, 
  children,
  disabled,
  ...props 
}: ButtonProps) => {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const nextId = useRef(0);

  const addRipple = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (disabled) return;
    
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple = {
      x,
      y,
      id: nextId.current
    };

    nextId.current += 1;
    setRipples((prevRipples) => [...prevRipples, newRipple]);
  };

  useEffect(() => {
    const timeoutIds: NodeJS.Timeout[] = [];
    
    ripples.forEach((ripple) => {
      const timeoutId = setTimeout(() => {
        setRipples((prevRipples) => prevRipples.filter((r) => r.id !== ripple.id));
      }, 800);
      
      timeoutIds.push(timeoutId);
    });
    
    return () => {
      timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, [ripples]);

  return (
    <button
      ref={buttonRef}
      className={cn(
        buttonVariants({ variant, size, className }),
        "relative overflow-hidden"
      )}
      onMouseDown={addRipple}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-white opacity-30"
            style={{
              width: '200%',
              paddingBottom: '200%',
              top: ripple.y,
              left: ripple.x,
              translateX: '-50%',
              translateY: '-50%',
            }}
            initial={{ transform: 'scale(0)', opacity: 0.5 }}
            animate={{ transform: 'scale(1)', opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        ))}
      </AnimatePresence>
    </button>
  );
};

export default ButtonRipple; 