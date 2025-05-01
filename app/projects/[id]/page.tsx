'use client';

import React, { useState, useEffect } from 'react';
import { Play, ArrowLeft, Link as LinkIcon, Search, MoreHorizontal, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const TABS = ['Images', 'Audio', 'Video'] as const;
type Tab = typeof TABS[number];

// CSS for 3D cube
const cubeStyles = `
  .cube-container {
    perspective: 1000px;
    perspective-origin: 50% 50%;
    width: 100%;
    height: 100%;
  }

  .cube {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.5s ease;
  }

  .cube-face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }

  .cube-face-front {
    transform: translateZ(50vh);
  }

  .cube-face-right {
    transform: rotateY(90deg) translateZ(50vw);
  }

  .cube-face-left {
    transform: rotateY(-90deg) translateZ(50vw);
  }
`;

const ProjectScreen = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Audio');
  const [cubeRotation, setCubeRotation] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    // Add cube styles to document
    const style = document.createElement('style');
    style.innerHTML = cubeStyles;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    const sensitivity = 0.5;
    
    // Update rotation based on swipe
    setCubeRotation(prev => {
      const newRotation = prev + (diff * sensitivity);
      // Clamp rotation to valid ranges
      return Math.max(-90, Math.min(90, newRotation));
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    // Snap to nearest face
    const nearestRotation = Math.round(cubeRotation / 90) * 90;
    setCubeRotation(nearestRotation);
    
    // Update active tab based on rotation
    if (nearestRotation === 0) setActiveTab('Audio');
    else if (nearestRotation === -90) setActiveTab('Images');
    else if (nearestRotation === 90) setActiveTab('Video');
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    // Set rotation based on selected tab
    if (tab === 'Audio') setCubeRotation(0);
    else if (tab === 'Images') setCubeRotation(-90);
    else if (tab === 'Video') setCubeRotation(90);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <Link href="/projects">
          <button className="bg-zinc-900/50 p-3 rounded-full">
            <ArrowLeft size={20} />
          </button>
        </Link>
        <div className="flex space-x-2">
          <button className="bg-zinc-900/50 p-3 rounded-full">
            <LinkIcon size={20} />
          </button>
          <button className="bg-zinc-900/50 p-3 rounded-full">
            <Search size={20} />
          </button>
          <button className="bg-zinc-900/50 p-3 rounded-full">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Project Info */}
      <div className="px-4">
        <h1 className="text-3xl font-bold mb-1">untitled project</h1>
        <p className="text-gray-400">ApLus · 9 tracks · 31 min</p>
      </div>

      {/* Cover Art */}
      <div className="px-4 mt-6 mb-8">
        <div className="relative aspect-square w-full max-w-sm mx-auto rounded-2xl overflow-hidden bg-zinc-800/50">
          <Image
            src="/placeholder-cover.jpg"
            alt="Project Cover Art"
            fill
            className="object-cover"
            priority
          />
          <button className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-full shadow-lg">
            <Play className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="relative">
        <div className="flex justify-around">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-2 transition-colors ${
                activeTab === tab ? 'text-white' : 'text-gray-400'
              }`}
            >
              <span className="text-base font-medium">{tab}</span>
            </button>
          ))}
        </div>
        {/* Animated underline */}
        <motion.div
          className="absolute bottom-0 h-0.5 bg-white"
          initial={false}
          animate={{
            left: `${(TABS.indexOf(activeTab) * 100) / 3}%`,
            width: '33.333%',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </div>

      {/* 3D Cube Content */}
      <div 
        className="cube-container mt-8 px-4"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="cube"
          style={{ 
            transform: `rotateY(${cubeRotation}deg)`,
          }}
        >
          {/* Images Face (Left) */}
          <div className="cube-face cube-face-left">
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-zinc-800/50 rounded-xl" />
              ))}
            </div>
          </div>

          {/* Audio Face (Front) */}
          <div className="cube-face cube-face-front">
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-zinc-800/50 rounded-xl" />
              ))}
            </div>
          </div>

          {/* Video Face (Right) */}
          <div className="cube-face cube-face-right">
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-zinc-800/50 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="fixed bottom-8 inset-x-4 flex justify-between items-center">
        <button className="bg-zinc-900/50 p-3 rounded-full">
          <Navigation size={20} />
        </button>
        <button className="bg-white text-black p-4 rounded-full shadow-lg">
          <Play className="w-6 h-6" />
        </button>
      </div>
    </main>
  );
};

export default ProjectScreen; 