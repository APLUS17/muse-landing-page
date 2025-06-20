'use client';
import React from 'react';
import TopBar from './components/TopBar';
import CardClusterStack from './components/CardClusterStack';
import ToolsGrid from './components/ToolsGrid';
import BottomNavBar from './components/BottomNavBar';
import RecentProjects from './components/RecentProjects';
import SearchBar from './components/SearchBar';
import ThemeToggle from './components/ThemeToggle';

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
      <div className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-sm">
        <TopBar />
        <div className="px-4 py-2">
          <SearchBar />
        </div>
      </div>
      
      {/* Main Content - Scrollable Area */}
      <div className="mt-32 pb-24 px-4">
        <section className="mb-12">
          <CardClusterStack />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Creative Tools</h2>
          <ToolsGrid />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Projects</h2>
          <RecentProjects />
        </section>
      </div>
      
      <div className="fixed bottom-0 w-full bg-black/95 backdrop-blur-sm">
        <BottomNavBar />
      </div>

      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>
    </main>
  );
}
