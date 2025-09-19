import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { customEase } from "../animationUtils";

export const runHeroAnimation = () => {
  gsap.registerPlugin(ScrollTrigger);

  // const tl1 = gsap.timeline();
  gsap.fromTo(
    ".title-1",
    {
      opacity: 0,
      y: 60,
    },
    {
      opacity: 1,
      duration: 1,
      y: 0,
      stagger: 0.08,
      ease: customEase,
      delay: 0.6,
    },
  );

  const tl2 = gsap.timeline();

  tl2.fromTo(
    ".title-2",
    {
      opacity: 0,
      y: 60,
    },
    {
      opacity: 1,
      duration: 1,
      y: 0,
      stagger: 0.08,
      ease: customEase,
      delay: 0.76,
    },
  );

  gsap.to(".hero-section", {
    scrollTrigger: {
      trigger: ".hero-section",
      start: "center 49.9%",
      end: "center 30%",
      scrub: true,
      pin: true,
    },

    y: -20,
    opacity: 0,
  });
};
