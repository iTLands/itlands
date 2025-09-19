"use client";
import React, { useRef, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { runIconSectionAnimation } from "../../utils/animations/IconsSectionAnimation";

// Carreras organizadas por posición específica (Carreras reales de ITLA)
const careersByPosition = [
  // Posición 1 - Desarrollo y Software
  [
    {
      icon: "mdi:code-braces",
      name: "Desarrollo de Software",
      color: "text-blue-400",
    },
    {
      icon: "mdi:gamepad-variant",
      name: "Simulaciones Interactivas y Videojuegos",
      color: "text-purple-400",
    },
    {
      icon: "mdi:chart-line",
      name: "Analítica y Ciencia de los Datos",
      color: "text-pink-400",
    },
  ],

  // Posición 2 - Inteligencia Artificial y Seguridad
  [
    {
      icon: "mdi:brain",
      name: "Inteligencia Artificial",
      color: "text-emerald-400",
    },
    {
      icon: "mdi:shield-lock",
      name: "Tecnólogo en Ciberseguridad",
      color: "text-red-400",
    },
    {
      icon: "mdi:fingerprint",
      name: "Informática Forense",
      color: "text-orange-400",
    },
    {
      icon: "mdi:security",
      name: "Seguridad Informática",
      color: "text-yellow-400",
    },
  ],

  // Posición 3 - Redes y Telecomunicaciones
  [
    {
      icon: "mdi:network",
      name: "Redes de Información",
      color: "text-indigo-400",
    },
    { icon: "mdi:wifi", name: "Telecomunicaciones", color: "text-teal-400" },
  ],

  // Posición 4 - Multimedia y Sonido
  [
    { icon: "mdi:palette", name: "Multimedia", color: "text-fuchsia-400" },
    { icon: "mdi:volume-high", name: "Sonido", color: "text-violet-400" },
    {
      icon: "mdi:pencil-ruler",
      name: "Diseño Industrial",
      color: "text-cyan-400",
    },
  ],

  // Posición 5 - Ingeniería y Manufactura
  [
    {
      icon: "mdi:solar-power",
      name: "Energías Renovables",
      color: "text-yellow-400",
    },
    {
      icon: "mdi:robot-industrial",
      name: "Manufactura Automatizada",
      color: "text-amber-400",
    },
    { icon: "mdi:cog", name: "Mecatrónica", color: "text-lime-400" },
    {
      icon: "mdi:medical-bag",
      name: "Manufactura de Dispositivos Médicos",
      color: "text-rose-400",
    },
  ],
];

const ImageSection = () => {
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [members, setMembers] = useState(0);

  // Índice actual para cada posición (qué carrera de su array está mostrando)
  const [currentIndices, setCurrentIndices] = useState<number[]>([
    0, 0, 0, 0, 0,
  ]);

  // Obtener las carreras actuales basadas en los índices
  const getCurrentCareers = () => {
    return careersByPosition.map(
      (careers, position) => careers[currentIndices[position]],
    );
  };

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isAnimatingRef = useRef<boolean>(false);

  useGSAP(() => {
    runIconSectionAnimation();
  });

  // Animación estilo nvg8.io compatible con GSAP ScrollTrigger
  const nvgStyleAnimation = (position: number) => {
    if (isAnimatingRef.current) return;

    const iconElement = iconRefs.current[position];
    if (!iconElement) return;

    isAnimatingRef.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });

    // Solo animar opacity y una rotación sutil para no interferir con ScrollTrigger
    tl.to(iconElement, {
      opacity: 0,
      rotation: 5,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        // Cambiar al siguiente índice en esa posición
        setCurrentIndices((prev) => {
          const newIndices = [...prev];
          const positionCareers = careersByPosition[position];
          newIndices[position] =
            (newIndices[position] + 1) % positionCareers.length;
          return newIndices;
        });
      },
    })
      // Entrada elegante
      .fromTo(
        iconElement,
        {
          opacity: 0,
          rotation: -5,
        },
        {
          opacity: 1,
          rotation: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.1,
        },
      );
  };

  const changeRandomCareers = () => {
    if (isAnimatingRef.current) return;

    // Seleccionar aleatoriamente cuántas posiciones cambiar (1-3)
    const numToChange = Math.floor(Math.random() * 3) + 1;

    // Seleccionar aleatoriamente qué posiciones cambiar
    const positionsToChange = [];
    while (positionsToChange.length < numToChange) {
      const randomPosition = Math.floor(Math.random() * 5);
      if (!positionsToChange.includes(randomPosition)) {
        positionsToChange.push(randomPosition);
      }
    }

    // Cambiar las posiciones seleccionadas
    positionsToChange.forEach((position, order) => {
      // Stagger sutil basado en el orden de cambio
      setTimeout(() => {
        nvgStyleAnimation(position);
      }, order * 200);
    });
  };

  // Hover minimalista que no interfiere con ScrollTrigger
  const handleHover = (index: number, isEntering: boolean) => {
    const iconElement = iconRefs.current[index];
    if (!iconElement || isAnimatingRef.current) return;

    if (isEntering) {
      gsap.to(iconElement, {
        scale: 1.1,
        rotation: 2,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(iconElement, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  // const fetchActiveMembers = async (): Promise<void> => {
  //   const data = await fetch("/api/members");
  //   const members = await data.json();
  //   setMembers(members.members_online);
  // };
  //
  useEffect(() => {
    // fetchActiveMembers();
    // Esperar a que las animaciones GSAP iniciales terminen antes de comenzar rotación
    const timer = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        changeRandomCareers();
      }, 6000);
    }, 4000); // Esperar 4 segundos para que terminen las animaciones GSAP

    return () => {
      clearTimeout(timer);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndices, members]);

  const toggleRotation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else {
      intervalRef.current = setInterval(() => {
        changeRandomCareers();
      }, 6000);
    }
  };

  const currentCareers = getCurrentCareers();

  return (
    <>
      <div className="flex w-full justify-center h-[100vh] items-end absolute top-0 gap-4 img-container opacity-0">
        {currentCareers.map((career, idx) => (
          <div
            key={idx}
            ref={(el) => {
              containerRefs.current[idx] = el;
            }}
            className="relative cursor-pointer group"
            onClick={() => {
              nvgStyleAnimation(idx);
            }}
            onMouseEnter={() => handleHover(idx, true)}
            onMouseLeave={() => handleHover(idx, false)}
          >
            {/* Glow sutil en hover */}
            <div
              className={`absolute inset-0 rounded-2xl ${career.color.replace("text-", "bg-").replace("-400", "-500/20")} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-150 blur-xl`}
            />

            <div
              ref={(el) => {
                iconRefs.current[idx] = el;
              }}
              className="flex items-center justify-center w-[220px] h-[220px] imgs opacity-0 transition-all duration-500 group-hover:drop-shadow-2xl"
              style={{
                transformOrigin: "center center",
              }}
            >
              <Icon
                icon={career.icon}
                className={`${career.color} text-7xl transition-all duration-300`}
                style={{
                  filter: "drop-shadow(0 0 12px currentColor) brightness(1.1)",
                }}
              />
            </div>

            {/* Tooltip elegante */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 max-w-xs">
              <div className="bg-black/80 backdrop-blur-md text-white text-sm px-4 py-2 rounded-xl whitespace-nowrap border border-white/10">
                <div className="font-medium">{career.name}</div>
                <div className="w-2 h-2 bg-black/80 transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2 border-r border-b border-white/10"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute h-[100vh] strips-container z-50">
        <div className="strip strip-1"></div>
        <div className="strip strip-2"></div>
        <div className="strip strip-3"></div>
      </div>

      {/* Contador de carreras */}
      <div className="fixed top-6 left-6 z-50 bg-black/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
        <div className="flex flex-row gap-2 items-center text-white/80 text-sm font-medium">
          0 Estudiantes
          <div className="h-1.5 w-1.5 bg-green-700 rounded-full animate-pulse"></div>
        </div>
      </div>
    </>
  );
};

export default ImageSection;
