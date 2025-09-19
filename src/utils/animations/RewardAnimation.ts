import React from "react";
import gsap from "gsap";
import { customEase } from "../animationUtils";
import ScrollTrigger from "gsap/ScrollTrigger";

export const RewardsAnimation = () => {
  gsap.registerPlugin(ScrollTrigger);
  // const tl = gsap.timeline({

  // });

  gsap.fromTo(
    ".rewards-title",
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".rewards-section",
        start: "top 90%",
        end: "center 30%",
        scrub: true,
      },
    },
  );

  gsap.fromTo(
    ".points-box",
    {
      y: 170,
    },
    {
      y: 0,
      scrollTrigger: {
        trigger: ".rewards-section",
        start: "top center",
        end: "top top",
        scrub: 0.7,
      },
      ease: "power4.inOut",
    },
  );

  gsap.fromTo(
    ".number",
    {
      innerHTML: 0,
    },
    {
      scrollTrigger: {
        trigger: ".rewards-section",
        start: "top center",
        end: "bottom 40%",
        scrub: true,
      },
      innerHTML: 100,
      duration: 3, // Duration of the animation (this becomes irrelevant when using `scrub`)
      snap: { innerHTML: 1 }, // Snap to whole numbers for smooth transition
      ease: "power1.out",
    },
  );

  gsap.fromTo(
    ".connect-profile",
    {
      width: 0,
      height: 0,
    },
    {
      width: "4rem",
      height: "4rem",
      scrollTrigger: {
        trigger: ".rewards-section",
        start: "center center",
        end: "center 20%",
        scrub: 0.5,
      },
      ease: customEase,
    },
  );
};
