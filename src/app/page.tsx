import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import Hero from "@/components/sections/Hero";
import { Particles } from "@/components/ui/particles";
import ImageSection from "@/components/sections/CarrerIcons";

export default function Home() {
  gsap.registerPlugin(ScrollTrigger, CustomEase, useGSAP);
  return (
    <div className="h-[500vh]">
      <Particles
        className="fixed inset-0 z-0 h-full w-full"
        quantity={25}
        ease={80}
        color={"#fff"}
        refresh
      />
      <Hero />
      <ImageSection />
    </div>
  );
}
