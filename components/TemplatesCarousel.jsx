'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const TemplatesCarousel = ({ templates }) => {
  const router = useRouter();
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const handleScroll = () => {
    if (containerRef.current) {
      const scrollLeft = containerRef.current.scrollLeft;
      const newIndex = Math.round(scrollLeft / 200); // 200px is the card width
      setCurrentIndex(newIndex);
    }
  };

  const handleTemplateClick = (templateId) => {
    router.push(`/project/${templateId}`);
  };

  // Auto-scroll functionality
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (containerRef.current && templates.length > 0) {
        const nextIndex = (currentIndex + 1) % templates.length;
        containerRef.current.scrollTo({
          left: nextIndex * 200,
          behavior: 'smooth'
        });
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentIndex, templates.length]);

  return (
    <div className="pb-4">
      <div
        id="scroll-container"
        ref={containerRef}
        className="w-full overflow-x-auto snap-x snap-mandatory hide-scrollbar px-4 perspective-[1500px]"
        onScroll={handleScroll}
      >
        <div className="flex gap-[-60px] h-[340px]" style={{ transformStyle: 'preserve-3d' }}>
          {templates.map((template, index) => (
            <div
              key={template.id}
              onClick={() => handleTemplateClick(template.id)}
              className="flex-shrink-0 w-[200px] h-full snap-center rounded-2xl overflow-hidden bg-neutral-900 relative transition-transform duration-300 ease-in-out cursor-pointer hover:scale-105"
              style={{
                transform: `rotateY(${index * -5}deg) scale(0.9)`,
              }}
            >
              <img
                src={template.imageUrl}
                className="w-full h-full object-cover"
                alt={template.title}
              />
              <div className="absolute bottom-4 left-4 text-white font-medium">
                <h3 className="font-bold">{template.title}</h3>
                <p className="text-sm opacity-80">{template.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Optional: Dots indicator */}
      <div className="flex justify-center gap-2 mt-2">
        {templates.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white/30'
            }`}
            onClick={() => {
              containerRef.current?.scrollTo({
                left: index * 200,
                behavior: 'smooth'
              });
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplatesCarousel; 