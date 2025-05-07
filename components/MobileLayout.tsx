'use client';

import React from 'react';

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-start min-h-screen w-full bg-black text-white overflow-x-hidden">
      <div className="w-[390px] max-w-full min-h-screen bg-black flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">{children}</div>
        <div className="h-[80px]" /> {/* padding space for bottom UI or scroll */}
      </div>
    </div>
  );
};

export default MobileLayout; 