'use client';

import React, { useRef, useEffect, useState } from 'react';

const cards = [
  { image: 'https://source.unsplash.com/800x600/?ocean', title: 'Ocean Dreams' },
  { image: 'https://source.unsplash.com/800x600/?mountain', title: 'Mountain Escape' },
  { image: 'https://source.unsplash.com/800x600/?forest', title: 'Forest Calm' },
  { image: 'https://source.unsplash.com/800x600/?desert', title: 'Desert Mirage' },
];

const FanScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onScroll = () => {
      const scrollLeft = container.scrollLeft;
      const childWidth = container.scrollWidth / cards.length;
      const index = Math.round(scrollLeft / childWidth);
      setActiveIndex(index);
    };

    container.addEventListener('scroll', onScroll);
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="w-full overflow-x-auto snap-x snap-mandatory hide-scrollbar px-6 pb-6 perspective-[1500px]"
    >
      <div
        className="flex justify-start items-center gap-[-40px] h-[340px]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {cards.map((card, index) => {
          const offset = index - activeIndex;
          const isActive = offset === 0;

          return (
            <div
              key={index}
              className="flex-shrink-0 snap-center w-[70vw] h-full rounded-2xl overflow-hidden relative transition-transform duration-300 ease-in-out"
              style={{
                transform: `
                  scale(${isActive ? 1 : 0.9})
                  rotateY(${offset * -5}deg)
                  translateZ(${offset * -10}px)
                `,
                zIndex: 10 - Math.abs(offset),
              }}
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 text-white text-sm font-semibold drop-shadow-lg">
                {card.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FanScroll; 