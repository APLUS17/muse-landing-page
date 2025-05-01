'use client';

import React, { useRef, useEffect, useState } from 'react';

const baseCards = [
  {
    id: '1',
    title: 'Endless Sunshine',
    description: 'Reels Covers',
    imageUrl: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=1000',
  },
  {
    id: '2',
    title: 'Summer Vibes',
    description: 'Reels Covers',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000',
  },
  {
    id: '3',
    title: 'Ocean Dreams',
    description: 'Reels Covers',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000',
  },
  {
    id: '4',
    title: 'Mountain Escape',
    description: 'Reels Covers',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000',
  }
];

const FanScroll = () => {
  const cards = [...baseCards, ...baseCards, ...baseCards];
  const [activeIndex, setActiveIndex] = useState(baseCards.length);
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.scrollLeft = (baseCards.length * 220); // Adjusted for new card spacing

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const itemWidth = 220; // Adjusted card width including spacing
      const index = Math.round(scrollLeft / itemWidth);
      
      if (scrollLeft < itemWidth * baseCards.length) {
        container.style.scrollBehavior = 'auto';
        container.scrollLeft = scrollLeft + (baseCards.length * itemWidth);
        container.style.scrollBehavior = 'smooth';
      } else if (scrollLeft > itemWidth * baseCards.length * 2) {
        container.style.scrollBehavior = 'auto';
        container.scrollLeft = scrollLeft - (baseCards.length * itemWidth);
        container.style.scrollBehavior = 'smooth';
      }

      setActiveIndex(index);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={scrollRef}
      className="w-full overflow-x-scroll hide-scrollbar px-4"
      style={{
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
        perspective: '1500px',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      <div 
        className="flex items-center py-4"
        style={{
          transformStyle: 'preserve-3d',
          width: `${cards.length * 220}px`, // Adjusted for new card spacing
          paddingLeft: 'calc(50% - 110px)', // Center the active card
          paddingRight: 'calc(50% - 110px)',
        }}
      >
        {cards.map((card, idx) => {
          const offset = idx - activeIndex;
          const scale = Math.abs(offset) > 0 ? 0.85 : 1;
          const rotateY = offset * -15; // Increased rotation angle
          const translateZ = Math.abs(offset) > 0 ? -100 : 0; // Increased depth
          const translateX = offset * 20; // Reduced X translation to keep cards closer
          const opacity = Math.abs(offset) > 2 ? 0 : 1;

          return (
            <div
              key={`${card.id}-${idx}`}
              className="flex-none w-[200px] h-[320px] mx-[10px] rounded-2xl overflow-hidden relative"
              style={{
                scrollSnapAlign: 'center',
                transform: `
                  translateX(${translateX}px)
                  scale(${scale})
                  rotateY(${rotateY}deg)
                  translateZ(${translateZ}px)
                `,
                opacity,
                transition: 'all 0.3s ease-out',
                transformOrigin: 'center center',
                zIndex: 100 - Math.abs(offset),
              }}
            >
              <img
                src={card.imageUrl}
                alt={card.title}
                className="w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-0 w-full flex flex-col items-center px-4">
                <h3 className="text-lg font-bold text-center text-white drop-shadow-md mb-2 truncate w-full" style={{fontFamily: 'serif'}}>{card.title}</h3>
                <button className="bg-black/60 text-white text-xs font-medium rounded-full px-4 py-2 mb-1 shadow border border-white/10">
                  {card.description}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FanScroll; 