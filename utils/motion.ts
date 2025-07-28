import { Transition, Variants } from "framer-motion";

type MotionType = "tween" | "spring" | "inertia" | "keyframes";

const DEFAULT_DELAY = 0;
const DEFAULT_DURATION = 0.5;
const DEFAULT_EASE = "easeOut";

const defaultTransition: Transition = {
  duration: DEFAULT_DURATION,
  ease: DEFAULT_EASE,
};

// Fade in from a direction
export const fadeIn = (
  direction: "up" | "down" | "left" | "right",
  type: MotionType = "tween",
  delay = DEFAULT_DELAY,
  duration = DEFAULT_DURATION
): Variants => {
  const x = direction === "left" ? 100 : direction === "right" ? -100 : 0;
  const y = direction === "up" ? 100 : direction === "down" ? -100 : 0;

  return {
    hidden: { x, y, opacity: 0 },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: { type, delay, duration, ease: DEFAULT_EASE },
    },
  };
};

// Slide in from a direction
export const slideIn = (
  direction: "left" | "right" | "up" | "down",
  type: MotionType = "tween",
  delay = DEFAULT_DELAY,
  duration = DEFAULT_DURATION
): Variants => {
  const x = direction === "left" ? 100 : direction === "right" ? -100 : 0;
  const y = direction === "up" ? 100 : direction === "down" ? -100 : 0;

  return {
    hidden: { opacity: 0, x, y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { type, delay, duration, ease: DEFAULT_EASE },
    },
  };
};


export const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

export const delayedItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

// Stagger container for multiple children
export const staggerContainer = (
  staggerChildren = 0.1,
  delayChildren = 0
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});
