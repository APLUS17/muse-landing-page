'use client';

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";

const templates = [
  {
    id: 1,
    title: 'PLUS ULTRA EP',
    subtitle: 'Single Cover + IG Snippet Templates',
    imageUrl: 'https://images.unsplash.com/photo-1633437141429-8f07aa9b0a48?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'SUMMER TAPE 2024',
    subtitle: 'Project Moodboard + Tracklist Design',
    imageUrl: 'https://images.unsplash.com/photo-1607082348811-31ec3cf26849?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'VISUAL LOOPS',
    subtitle: 'Content Calendar + Video Templates',
    imageUrl: 'https://images.unsplash.com/photo-1627919801119-f3f503f82670?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'REELS STARTER KIT',
    subtitle: 'Drag and Drop Feed Previews',
    imageUrl: 'https://images.unsplash.com/photo-1607082350094-c27f273ec4b4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    title: 'STORYTELLING PACK',
    subtitle: 'Promo Assets for Rollouts',
    imageUrl: 'https://images.unsplash.com/photo-1610271213263-38753f2c3046?auto=format&fit=crop&w=800&q=80'
  }
];

export default function FanScroll() {
  const [hasMounted, setHasMounted] = useState(false);
  const [cards, setCards] = useState(templates);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const visibleCards = [
    cards[cards.length - 1],
    cards[0],
    cards[1]
  ];

  if (!hasMounted) return null;

  return (
    <div className="grid h-[500px] w-full place-items-center bg-black">
      {visibleCards.map((card, index) => (
        <Card
          key={card.id}
          {...card}
          index={index}
          isFront={index === 2}
          cards={cards}
          setCards={setCards}
        />
      ))}
    </div>
  );
}

function Card({ id, title, subtitle, imageUrl, isFront, index, cards, setCards }) {
  const x = useMotionValue(0);
  const controls = useAnimation();
  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);

  const rotate = useTransform(rotateRaw, (latest) => {
    const offset = isFront ? 0 : id % 2 ? 6 : -6;
    return `${latest + offset}deg`;
  });

  const handleClick = async () => {
    if (!isFront) return;
    const direction = Math.random() > 0.5 ? 1 : -1;
    await controls.start({
      x: 40 * direction,
      y: 20,
      rotate: `${6 * direction}deg`,
      scale: 0.94,
      opacity: 1,
      transition: { duration: 0.4 }
    });
    setCards((prev) => {
      const rotated = [...prev];
      const card = rotated.pop();
      rotated.unshift(card);
      return rotated;
    });
  };

  return (
    <motion.div
      className="h-96 w-72 origin-bottom rounded-2xl bg-white border border-zinc-100 shadow-xl p-4 text-gray-800 grid grid-rows-[auto_1fr_auto] hover:shadow-2xl transition-shadow backdrop-blur-sm"
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        rotate,
        zIndex: index,
        scale: isFront ? 1 : 0.96 - index * 0.01,
        y: isFront ? 0 : -index * 6,
        boxShadow: isFront
          ? "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)"
          : undefined
      }}
      animate={controls}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
    >
      <div className="text-[11px] text-gray-500 mb-1 tracking-wider uppercase">MUSE PROJECT</div>
      <div className="text-xl font-semibold mb-1 truncate text-zinc-900">{title}</div>
      <div className="relative my-2 rounded-md overflow-hidden shadow-sm">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-40 object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="text-xs text-gray-600 leading-snug mb-2">{subtitle}</div>
      <button className="bg-black text-white w-full py-2 rounded-full text-sm font-medium mt-auto hover:bg-zinc-800 transition-colors">
        Open Project
      </button>
    </motion.div>
  );
} 