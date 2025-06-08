"use client";

import React from 'react';

const tools = [
  {
    id: 1,
    name: 'Album',
    description: 'AI-powered album creation',
    iconUrl: '/icons/muse.svg',
    bgGradient: 'from-purple-600 to-blue-600',
    pattern: (
      <div className="absolute inset-0 opacity-20">
        <div className="absolute right-0 bottom-0 w-32 h-32 transform translate-x-8 translate-y-8">
          <div className="absolute inset-0 rounded-full bg-white/20 blur-2xl"></div>
        </div>
        <div className="absolute left-0 top-0 w-24 h-24 transform -translate-x-4 -translate-y-4">
          <div className="absolute inset-0 rounded-full bg-white/10 blur-xl"></div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    name: 'Moodboard',
    description: 'Add visual identity',
    iconUrl: '/icons/effects.svg',
    bgGradient: 'from-amber-500 to-pink-600',
    pattern: (
      <div className="absolute inset-0 opacity-20">
        <div className="absolute right-4 top-4 w-20 h-20 border-4 border-white/20 rounded-lg transform rotate-12"></div>
        <div className="absolute left-8 bottom-8 w-16 h-16 border-4 border-white/20 rounded-lg transform -rotate-6"></div>
      </div>
    )
  },
  {
    id: 3,
    name: 'Release',
    description: 'Plan your album rollout',
    iconUrl: '/icons/sound.svg',
    bgGradient: 'from-green-500 to-emerald-600',
    pattern: (
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 border-2 border-white/20 rounded-full"
                style={{
                  transform: `scale(${0.5 + i * 0.2}) rotate(${i * 15}deg)`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    )
  }
];

const ToolsSection = () => {
  return (
    <div className="tools-section w-full pb-8">
      <h2 className="text-2xl font-bold text-white mb-4 px-4">Templates</h2>
      <p className="text-zinc-400 text-sm mb-4 px-4">Everything you need to create stunning visuals</p>
      
      {/* Tools container - FIXED to allow page scrolling */}
      <div className="tools-container w-full overflow-x-auto overflow-y-visible px-4">
        <div className="flex gap-4 pb-4">
          {tools.map((tool) => (
            <div 
              key={tool.id}
              className={`tool-card flex-shrink-0 rounded-xl overflow-hidden relative bg-gradient-to-br ${tool.bgGradient}`}
              style={{
                width: '240px',
                aspectRatio: '1.2/1',
              }}
            >
              {/* Background Pattern */}
              {tool.pattern}
              
              {/* Tool icon */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center bg-black/30 backdrop-blur-sm">
                <img src={tool.iconUrl} alt="" className="w-6 h-6" />
              </div>
              
              {/* Tool content */}
              <div className="absolute bottom-0 left-0 p-4 text-white w-full">
                <h3 className="text-lg font-bold uppercase">{tool.name}</h3>
                <p className="text-sm text-white/80">{tool.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolsSection;

// Add this to your global CSS file
const styles = `
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
`; 