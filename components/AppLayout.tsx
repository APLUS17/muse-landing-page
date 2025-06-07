import React from 'react';
import BottomNavBar from './BottomNavBar';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-black">
      <main className="pb-20">
        {children}
      </main>
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNavBar />
      </div>
    </div>
  );
};

export default AppLayout; 