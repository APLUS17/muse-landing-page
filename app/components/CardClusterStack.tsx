'use client';

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useAnimation, animate } from "framer-motion";

const templates = [
  {
    id: 1,
    title: 'PLUS ULTRA EP',
    subtitle: 'Single Cover + IG Snippet Templates',
    imageUrl: 'https://images.unsplash.com/photo-1602524816807-315c04d2389e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'SUMMER TAPE 2024',
    subtitle: 'Project Moodboard + Tracklist Design',
    imageUrl: 'https://images.unsplash.com/photo-1602524817096-9d6b0b1c2ad2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'VISUAL LOOPS',
    subtitle: 'Content Calendar + Video Templates',
    imageUrl: 'https://images.unsplash.com/photo-1602524816463-bcb0e90c84aa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'REELS STARTER KIT',
    subtitle: 'Drag and Drop Feed Previews',
    imageUrl: 'https://images.unsplash.com/photo-1602524816781-88c88e6c6e67?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    title: 'STORYTELLING PACK',
    subtitle: 'Promo Assets for Rollouts',
    imageUrl: 'https://images.unsplash.com/photo-1602524816616-bc960d1b98cc?auto=format&fit=crop&w=800&q=80'
  }
];

const SCROLL_DURATION = 1200; // Increased duration for smoother feel
const VELOCITY_MULTIPLIER = 0.3; // How much to factor in user's scroll velocity
const MIN_VELOCITY_THRESHOLD = 0.1; // Minimum velocity to consider

const clusterTitles = [
  'Recently Added',
  'This Week\'s Activity',
  'Muses',
  'You'
];

export default function CardClusterStack() {
  const scrollRef = useRef(null);
  const [activeCluster, setActiveCluster] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
  const clusters = Array.from({ length: 20 }, (_, i) => i);
  const observersRef = useRef(new Map());
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);
  const rafRef = useRef(null);
  const lastScrollTimeRef = useRef(performance.now());
  const lastScrollPosRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Bezier easing function for super smooth animation
  const bezierEasing = (t) => {
    // Custom bezier curve for extra smooth feel
    const p0 = 0;
    const p1 = 0.34;
    const p2 = 0.04;
    const p3 = 1;
    
    const term1 = 3 * (1 - t) * (1 - t) * t * p1;
    const term2 = 3 * (1 - t) * t * t * p2;
    const term3 = t * t * t * p3;
    
    return term1 + term2 + term3;
  };

  const smoothScrollTo = (targetScroll, initialVelocity = 0) => {
    const container = scrollRef.current;
    if (!container || isScrollingRef.current || !hasMounted) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    const start = container.scrollLeft;
    const startTime = performance.now();
    const distance = targetScroll - start;
    
    // Adjust duration based on distance and velocity
    const duration = Math.min(
      SCROLL_DURATION,
      Math.max(800, Math.abs(distance) * 2 + Math.abs(initialVelocity) * 100)
    );

    isScrollingRef.current = true;

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      let progress = Math.min(elapsed / duration, 1);
      
      // Apply custom easing
      const ease = bezierEasing(progress);
      
      // Apply velocity influence at the start of the animation
      if (progress < 0.2) {
        const velocityInfluence = initialVelocity * VELOCITY_MULTIPLIER * (0.2 - progress) / 0.2;
        container.scrollLeft = start + (distance * ease) + velocityInfluence;
      } else {
        container.scrollLeft = start + (distance * ease);
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animateScroll);
      } else {
        isScrollingRef.current = false;
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(animateScroll);
  };

  useEffect(() => {
    if (!hasMounted) return;

    const container = scrollRef.current;
    if (!container) return;

    const updateVelocity = (currentScrollPos) => {
      const now = performance.now();
      const dt = now - lastScrollTimeRef.current;
      
      if (dt > 0) {
        velocityRef.current = (currentScrollPos - lastScrollPosRef.current) / dt;
      }
      
      lastScrollTimeRef.current = now;
      lastScrollPosRef.current = currentScrollPos;
    };

    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      const currentScrollPos = container.scrollLeft;
      updateVelocity(currentScrollPos);

      scrollTimeoutRef.current = setTimeout(() => {
        if (!isScrollingRef.current && container) {
          const itemWidth = 336;
          const index = Math.round(currentScrollPos / itemWidth);
          const targetScroll = index * itemWidth;

          if (Math.abs(currentScrollPos - targetScroll) > 2) {
            smoothScrollTo(targetScroll, velocityRef.current);
          }
        }
      }, 50); // Reduced timeout for more responsive feel
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && container) {
            const index = parseInt(entry.target.dataset.index);
            setActiveCluster(index);

            if (!isScrollingRef.current) {
              const targetScroll = entry.target.offsetLeft - 
                (container.offsetWidth - entry.target.offsetWidth) / 2;
              smoothScrollTo(targetScroll, velocityRef.current);
            }
          }
        });
      },
      {
        root: container,
        threshold: 0.5,
        rootMargin: '0px'
      }
    );

    const clusterElements = container.querySelectorAll('.cluster-item');
    clusterElements.forEach((element) => {
      observer.observe(element);
      observersRef.current.set(element, observer);
    });

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      observersRef.current.forEach((obs) => obs.disconnect());
      observersRef.current.clear();
      container.removeEventListener('scroll', handleScroll);
    };
  }, [hasMounted]);

  if (!hasMounted) {
    return (
      <div className="flex overflow-x-auto w-full h-[400px] bg-black text-white space-x-24 px-8 md:px-12 py-6">
        <div className="flex-none w-[240px] grid place-items-center">
          <div className="animate-pulse bg-gray-800 h-[320px] w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute top-2 left-0 right-0 z-10 flex justify-center">
        <motion.span
          key={activeCluster}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-sm text-zinc-400 font-medium"
        >
          {clusterTitles[activeCluster % clusterTitles.length]}
        </motion.span>
      </div>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth w-full h-[400px] bg-black text-white space-x-24 px-8 md:px-12 py-6 scrollbar-hide"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'auto'
        }}
      >
        {clusters.map((_, i) => (
          <div
            key={i}
            data-index={i}
            className="cluster-item flex-none w-[240px] snap-center grid place-items-center"
          >
            <CardCluster isActive={i === activeCluster} />
          </div>
        ))}
      </div>
    </div>
  );
}

function CardCluster({ isActive }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleTemplates = [
    templates[(activeIndex - 1 + templates.length) % templates.length],
    templates[activeIndex % templates.length],
    templates[(activeIndex + 1) % templates.length]
  ];

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % templates.length);

  return (
    <div className="relative h-[320px] w-full grid place-items-center perspective-[1000px]">
      {visibleTemplates.map((card, i) => (
        <Card
          key={`${card.id}-${i}`}
          {...card}
          offset={i - 1}
          isActive={isActive && i === 1}
          onNext={handleNext}
        />
      ))}
    </div>
  );
}

function Card({ id, title, subtitle, imageUrl, offset, isActive, onNext }) {
  const x = useMotionValue(0);
  const controls = useAnimation();

  const rotate = offset * 5;
  const translateX = offset * 16;
  const translateY = Math.abs(offset) * 5;
  const translateZ = -Math.abs(offset) * 18;
  const scale = 1 - Math.abs(offset) * 0.12;
  const zIndex = 10 - Math.abs(offset);
  const opacity = Math.abs(offset) > 1 ? 0.7 : 1;

  const handleClick = async () => {
    if (!isActive) return;
    await controls.start({
      x: 20 * (Math.random() > 0.5 ? 1 : -1),
      y: 10,
      rotate: 3 * (Math.random() > 0.5 ? 1 : -1),
      scale: 0.96,
      transition: { duration: 0.4 }
    });
    onNext();
  };

  return (
    <motion.div
      className={`absolute h-[280px] w-[200px] origin-bottom rounded-2xl border border-zinc-100/10 shadow-xl p-3 text-gray-800 grid grid-rows-[auto_1fr_auto] hover:shadow-2xl transition-all duration-300 backdrop-blur-sm ${
        isActive ? 'ring-2 ring-white/20' : ''
      }`}
      style={{
        backgroundColor: "#f5f5f5",
        zIndex,
        transform: `perspective(1000px) translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotate(${rotate}deg) scale(${scale})`,
        opacity,
        boxShadow: isActive
          ? "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)"
          : "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)"
      }}
      animate={controls}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
    >
      <div className="text-[10px] text-gray-500 mb-1 tracking-wider uppercase">MUSE PROJECT</div>
      <div className="text-lg font-semibold mb-1 truncate text-zinc-900">{title}</div>
      <div className="relative my-2 rounded-md overflow-hidden shadow-sm">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-32 object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="text-[11px] text-gray-600 leading-snug mb-2">{subtitle}</div>
      <button className="bg-black text-white w-full py-1.5 rounded-full text-xs font-medium mt-auto hover:bg-zinc-800 transition-colors">
        Open Project
      </button>
    </motion.div>
  );
} 