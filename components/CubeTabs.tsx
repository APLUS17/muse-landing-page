'use client';

import React, { useState } from 'react';

const TABS = ['Images', 'Audio', 'Video'];

const CubeTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const getRotation = (tabIndex: number) => {
    return `rotateY(-${tabIndex * 90}deg)`;
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center space-y-6 px-4 py-10">
      {/* Tab Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        {TABS.map((tab, index) => (
          <button
            key={tab}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 rounded-xl transition text-sm font-medium ${
              activeTab === index ? 'text-white' : 'text-gray-400'
            }`}
          >
            {tab}
            {activeTab === index && (
              <div className="h-1 mt-1 bg-white rounded-full w-full" />
            )}
          </button>
        ))}
      </div>

      {/* 3D Cube Container */}
      <div className="relative w-[200px] h-[200px] perspective-[1000px]">
        <div
          className="absolute w-full h-full transform-style-3d transition-transform duration-700"
          style={{ transform: getRotation(activeTab) }}
        >
          {/* Front Face - Images */}
          <div
            className="absolute w-full h-full bg-blue-500 flex items-center justify-center text-xl font-bold rounded-xl"
            style={{
              transform: 'rotateY(0deg) translateZ(100px)',
              backfaceVisibility: 'hidden',
            }}
          >
            Images
          </div>

          {/* Right Face - Audio */}
          <div
            className="absolute w-full h-full bg-green-500 flex items-center justify-center text-xl font-bold rounded-xl"
            style={{
              transform: 'rotateY(90deg) translateZ(100px)',
              backfaceVisibility: 'hidden',
            }}
          >
            Audio
          </div>

          {/* Back Face - Video */}
          <div
            className="absolute w-full h-full bg-red-500 flex items-center justify-center text-xl font-bold rounded-xl"
            style={{
              transform: 'rotateY(180deg) translateZ(100px)',
              backfaceVisibility: 'hidden',
            }}
          >
            Video
          </div>

          {/* Left Face - Optional (for future use) */}
          <div
            className="absolute w-full h-full bg-gray-700 flex items-center justify-center text-xl font-bold rounded-xl"
            style={{
              transform: 'rotateY(-90deg) translateZ(100px)',
              backfaceVisibility: 'hidden',
            }}
          >
            Extra
          </div>
        </div>
      </div>
    </div>
  );
};

export default CubeTabs; 