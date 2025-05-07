import React from 'react';
import TopBar from '@/components/TopBar';
import ActionButtons from '@/components/ActionButtons';
import FanScroll from '@/components/FanScroll';
import ToolsGrid from '@/components/ToolsGrid';
import BottomNavBar from '@/components/BottomNavBar';
import RecentProjects from '@/components/RecentProjects';

const templates = [
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

export default function Home() {
  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <TopBar />
      <ActionButtons />
      
      {/* Main Content - Scrollable Area */}
      <div className="mt-4 pb-24 overflow-x-hidden">
        <FanScroll />
        <div className="mt-8">
          <ToolsGrid />
        </div>
        <div className="mt-8">
          <RecentProjects />
        </div>
      </div>
      
      <BottomNavBar />
    </main>
  );
}
