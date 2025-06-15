import { useEffect, useRef, useState } from "react";
import { Text, TextProps } from "@chakra-ui/react";

interface CounterProps extends TextProps {
  targetValue: number;
  direction?: "up" | "down";
  delay?: number;
}

export default function Counter({
  targetValue,
  direction = "up",
  delay = 0,
  ...rest
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [currentValue, setCurrentValue] = useState(direction === "up" ? 0 : targetValue);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer para detectar quando o elemento está visível
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animação do contador
  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      const isGoingUp = direction === "up";
      const startValue = isGoingUp ? 0 : targetValue;
      const endValue = isGoingUp ? targetValue : 0;
      const duration = 2000; // 2 segundos
      const steps = 60; // 60 FPS
      const stepValue = (endValue - startValue) / steps;
      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        const newValue = startValue + (stepValue * currentStep);
        
        if (currentStep >= steps) {
          setCurrentValue(endValue);
          clearInterval(interval);
        } else {
          setCurrentValue(newValue);
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, delay, direction, targetValue]);

  const formattedValue = new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL' 
  }).format(currentValue);

  return (
    <Text ref={ref} {...rest}>
      {formattedValue}
    </Text>
  );
}
