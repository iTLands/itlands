"use client";

import { useGSAP } from "@gsap/react";
import { runHeroAnimation } from "@/utils/animations/HeroSectionAnimation";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function Hero() {
  useGSAP(() => {
    runHeroAnimation();
  });

  return (
    <>
      <div className="h-[100vh] font-prompt w-full flex flex-col items-center gap-4 pt-32 hero-section">
        <div className="title text-center text-8xl font-extrabold leading-28 tracking-tight">
          <h1 className="text-blue-400 title-1 opacity-0">
            Crea lazos mientras aprendes
          </h1>
          <h1 className="text-blue-400 title-1 opacity-0">en iTLands</h1>
        </div>

        <div className="flex flex-col items-center mt-10 mb-6 gap-4">
          <div className="text-white title-2 opacity-0 text-lg">
            Aprende, colabora y destaca
          </div>
          <Button
            className="title-2 opacity-0 bg-[#5865F2] hover:bg-[#4752C4] text-white"
            asChild
          >
            <Link href="https://discord.gg/zQse2hsAmc" target="_blank">
              <Icon icon="ic:baseline-discord" width="32" height="32" />
              ¡Únete al Discord!
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
