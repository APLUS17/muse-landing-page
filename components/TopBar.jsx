import React from 'react';

const TopBar = () => (
  <div className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm">
    {/* Status Bar - Minimal padding */}
    <div className="flex items-center justify-between px-4 py-1 text-xs">
      <span className="font-medium">3:25</span>
      <div className="flex items-center gap-1.5">
        <span>5G+</span>
        <span className="w-4 text-center">•</span>
        <span>55%</span>
      </div>
    </div>
    
    {/* App Bar - More breathing room */}
    <div className="flex items-center justify-between px-5 py-4">
      <span className="text-2xl font-semibold tracking-tight">MUSE</span>
      <div className="flex items-center">
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-transform active:scale-95">
          <span className="text-white">☰</span>
        </button>
      </div>
    </div>
  </div>
);

export default TopBar; 