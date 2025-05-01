"use client";

import React from 'react';

const tools = [
  {
    id: 1,
    name: 'MUSE',
    description: 'AI-powered video creation',
    iconUrl: '/icons/muse.svg'
  },
  {
    id: 2,
    name: 'EFFECTS',
    description: 'Add style to your videos',
    iconUrl: '/icons/effects.svg'
  },
  {
    id: 3,
    name: 'SOUND',
    description: 'Perfect audio for content',
    iconUrl: '/icons/sound.svg'
  },
  {
    id: 4,
    name: 'PLAN',
    description: 'Organize your content',
    iconUrl: '/icons/plan.svg'
  }
];

const ToolsSection = () => {
  return (
    <div className="tools-section w-full pb-8">
      <h2 className="text-2xl font-bold text-white mb-4 px-4">Tools</h2>
      
      {/* Tools container - FIXED to allow page scrolling */}
      <div className="tools-container w-full overflow-x-auto overflow-y-visible px-4">
        <div className="flex gap-4 pb-4">
          {tools.map((tool) => (
            <div 
              key={tool.id}
              className="tool-card flex-shrink-0 rounded-xl overflow-hidden bg-gray-800 relative"
              style={{
                width: '240px',  // Adjust width as needed
                aspectRatio: '1.2/1',  // Maintain aspect ratio instead of fixed height
              }}
            >
              {/* Tool icon */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center bg-black/50">
                <img src={tool.iconUrl} alt="" className="w-6 h-6" />
              </div>
              
              {/* Tool content */}
              <div className="absolute bottom-0 left-0 p-4 text-white w-full">
                <h3 className="text-lg font-bold uppercase">{tool.name}</h3>
                <p className="text-sm text-gray-300">{tool.description}</p>
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