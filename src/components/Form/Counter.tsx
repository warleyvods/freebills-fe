import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
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
  const isGoingUp = direction === "up";
  const motionValue = useMotionValue(isGoingUp ? 0 : targetValue);

  const springValue = useSpring(motionValue, {
    damping: 80,
    stiffness: 1000,
  });

  const isInView = useInView(ref, { margin: "0px", once: true });

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const timer = setTimeout(() => {
      motionValue.set(isGoingUp ? targetValue : 0);
    }, delay);

    return () => clearTimeout(timer);
  }, [isInView, delay, isGoingUp, targetValue, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.onChange((value) => {
      if (ref.current) {
        // @ts-ignore
        ref.current.textContent = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
      }
    });

    return () => unsubscribe();
  }, [springValue]);

  return (
    <Text ref={ref} {...rest} />
  );
}
