import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { customEase } from "../animationUtils";

export const runIconSectionAnimation = () => {
  gsap.registerPlugin(ScrollTrigger);
  let backgroundChanged = false;

  const tl3 = gsap.timeline();

  gsap.fromTo(
    ".img-container",
    {
      opacity: 0,
    },
    {
      opacity: 1,
      delay: 1.4,
    },
  );

  tl3
    .fromTo(
      ".imgs",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.1,
      },
    )
    .fromTo(
      ".imgs",
      {
        y: 420,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: {
          from: "random",
          amount: 0.3,
        },
        ease: customEase,
        delay: 1,
      },
    )
    .fromTo(
      ".imgs",
      {
        y: 0,
      },
      {
        scrollTrigger: {
          trigger: ".img-container",
          start: "top top",
          toggleActions: "play pause none reverse",
          scrub: true,
          pin: true,
        },
        y: "-70%",
        stagger: 0.1,
      },
    )
    .fromTo(
      ".img-container",
      {
        scale: 1,
      },
      {
        scrollTrigger: {
          trigger: ".img-container",
          start: "center 49.9%",
          end: "center+=1500",
          toggleActions: "play pause none reverse",
          scrub: true,
          pin: true,
          onUpdate: (self) => {
            // You can calculate scale directly from progress:
            const scale = 1 - 0.5 * self.progress; // since 1 -> 0.5

            if (scale <= 0.7 && !backgroundChanged) {
              gsap.to("body", { backgroundColor: "#fff", duration: 0 });
              backgroundChanged = true;
            } else if (scale > 0.7 && backgroundChanged) {
              gsap.to("body", { backgroundColor: "#121212", duration: 0 });
              backgroundChanged = false;
            }
          },
        },
        scale: 0.25,
      },
    )
    .fromTo(
      ".strip",
      {
        x: "-700vw",
      },
      {
        scrollTrigger: {
          trigger: ".strips-container",
          start: "center center",
          end: "bottom+=800%",
          pin: true,
          scrub: true,
          onUpdate: (self) => {
            if (self.progress > 0.24) {
              gsap.to("body", {
                backgroundColor: "#0a0a0a",
                color: "white",
                duration: 0,
              });
            }
          },
        },
        x: "700vw",
        stagger: 0.01,
      },
    );
};
