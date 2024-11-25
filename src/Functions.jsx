import zIndex from "@mui/material/styles/zIndex";
import { motion } from "framer-motion";
import styled from "styled-components";

export const fixedHeight = (height) => {
  return (height / 100) * window.innerHeight;
};
export const fixedWidth = (width) => {
  return (width / 100) * window.innerWidth;
};

export const inMobileView = () => {
  return (window.innerWidth < 768 )
}

export const getFirstWords = (text, wordCount) => {
  return text.split(" ").slice(0, wordCount).join(" ");
};

export const motionContainer = {
  hidden: { opacity: 0, y: "-10%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      delayChildren: 0.6,
      ease: "easeInOut", // Added ease
      duration: 0.5, // Added duration
      staggerChildren: 0.1,
    },
  },
};
export const motionContainerL = {
  hidden: { opacity: 1, y: "0%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      delayChildren: 0.3,
      ease: "easeInOut", // Added ease
      duration: 0.15, // Added duration
      staggerChildren: 0,
    },
  },
};

export const motIt1 = {
  hidden: { x: "100%", zIndex: 1, scale: 1, rotate: "0deg", opacity:1 },
  visible: {
    x: 0,
    zIndex: 1,
    scale: 1,
    rotate: "0deg",
    opacity: 1,
  },
  transition: { duration: 0.1, type: "tween" },
};
export const motIt2 = {
  hidden: { x: "0%", zIndex: 3 },
  visible: {
    x: 0,
    zIndex: 3,
  },
  transition: { duration: 0.1, type: "tween" },
};
export const motIt3 = {
  hidden: { x: "-100%", zIndex: 2, scale: 1, rotate: "0deg", opacity:1 },
  visible: {
    x: 0,
    zIndex: 2,
    scale: 1,
    rotate: "0deg",
    opacity: 1,
  },
  transition: { duration: 0.1, type: "tween" },
};

export const motionItem = {
  hidden: { y: "-100", opacity: 1 },
  visible: {
    y: 0,
    opacity: 1,
  },
  transition: { duration: 0.75, type: "tween" },
};
export const motionImgContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      // type: "tween",
      stiffness: 300,
      damping: 20,
      delayChildren: 0,
      // ease: "easeInOut", // Added ease
      duration: 0.5, // Added duration
      staggerChildren: 0.1,
    },
  },
};
export const motionImgItem = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: "0%",
    opacity: 1,
  },
  transition: {
    duration: 0.1, // Time in seconds for the transition
    // type: "tween", // Tween will create a smooth, linear animation
    stiffness: 300,
    damping: 20,
    // ease: "easeInOut", // Easing function to control acceleration and deceleration
  },
};
export const motionImgItem2 = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
  transition: {
    duration: 1, // Time in seconds for the transition
    // type: "tween", // Tween will create a smooth, linear animation
    stiffness: 300,
    damping: 20,
    // ease: "easeInOut", // Easing function to control acceleration and deceleration
  },
};
export const motionImgItem3 = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: "0%",
  },
};



