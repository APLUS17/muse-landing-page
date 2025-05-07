'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, LinkIcon, Search, MoreHorizontal, Play, Music, Video, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import MobileLayout from '@/components/MobileLayout';
import { motion, AnimatePresence } from 'framer-motion';

// Sample data structure
interface Track {
  id: string;
  title: string;
  duration: string;
  artist: string;
}

interface Image {
  id: string;
  url: string;
  aspectRatio: string;
}

interface VideoItem {
  id: string;
  thumbnail: string;
  gifPreview?: string;
  duration: string;
  title: string;
}

const sampleData = {
  tracks: [
    { id: '1', title: 'Track 1', duration: '3:45', artist: 'Artist 1' },
    { id: '2', title: 'Track 2', duration: '2:55', artist: 'Artist 2' },
    { id: '3', title: 'Track 3', duration: '4:20', artist: 'Artist 3' },
  ],
  images: [
    { id: '1', url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop', aspectRatio: '1:1' },
    { id: '2', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&h=500&fit=crop', aspectRatio: '1:1' },
    { id: '3', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=500&fit=crop', aspectRatio: '1:1' },
    { id: '4', url: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=500&h=500&fit=crop', aspectRatio: '1:1' },
    { id: '5', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&h=500&fit=crop', aspectRatio: '1:1' },
    { id: '6', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=500&fit=crop', aspectRatio: '1:1' },
    { id: '7', url: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=500&h=500&fit=crop', aspectRatio: '1:1' },
    { id: '8', url: 'https://images.unsplash.com/photo-1498550744921-75f79806b8a7?w=500&h=500&fit=crop', aspectRatio: '1:1' },
    { id: '9', url: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=500&h=500&fit=crop', aspectRatio: '1:1' },
  ],
  videos: [
    { id: '1', thumbnail: 'https://picsum.photos/id/1019/500/280', gifPreview: undefined, duration: '2:30', title: 'Video 1' },
    { id: '2', thumbnail: 'https://picsum.photos/id/1020/500/280', gifPreview: undefined, duration: '1:45', title: 'Video 2' },
    { id: '3', thumbnail: 'https://picsum.photos/id/1022/500/280', gifPreview: undefined, duration: '3:15', title: 'Video 3' },
    { id: '4', thumbnail: 'https://picsum.photos/id/1024/500/280', gifPreview: undefined, duration: '4:00', title: 'Video 4' },
  ]
};

const TABS = ['Images', 'Audio', 'Video'] as const;
type Tab = typeof TABS[number];

export default function ProjectDetailPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Images');
  const [swipeX, setSwipeX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const projectId = params?.id as string || 'default';
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [projectTitle, setProjectTitle] = useState("untitled project");
  const [tempTitle, setTempTitle] = useState("");
  const [titleJustSaved, setTitleJustSaved] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  // Load saved project title from localStorage
  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      const savedTitles = localStorage.getItem('projectTitles');
      if (savedTitles) {
        const titlesMap = JSON.parse(savedTitles);
        if (titlesMap[projectId]) {
          setProjectTitle(titlesMap[projectId]);
        }
      }
    }
  }, [projectId]);

  const imageList = [
    "https://picsum.photos/id/1015/400",
    "https://picsum.photos/id/1016/400",
    "https://picsum.photos/id/1018/400",
    "https://picsum.photos/id/1021/400"
  ];

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    setSwipeX(diff);

    // Add real-time movement to content
    if (contentRef.current) {
      const maxSwipe = window.innerWidth * 0.3; // 30% of screen width
      const normalizedSwipe = Math.max(Math.min(diff, maxSwipe), -maxSwipe);
      const currentIndex = TABS.indexOf(activeTab);
      contentRef.current.style.transform = `translateX(${-currentIndex * 100 - (normalizedSwipe / maxSwipe) * 100}%)`;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const threshold = 50; // minimum distance for swipe
    
    if (Math.abs(swipeX) > threshold) {
      const currentIndex = TABS.indexOf(activeTab);
      if (swipeX > 0 && currentIndex < TABS.length - 1) {
        // Swipe left
        setActiveTab(TABS[currentIndex + 1]);
      } else if (swipeX < 0 && currentIndex > 0) {
        // Swipe right
        setActiveTab(TABS[currentIndex - 1]);
      }
    }

    // Reset position with animation
    if (contentRef.current) {
      const currentIndex = TABS.indexOf(activeTab);
      contentRef.current.style.transition = 'transform 0.3s ease-out';
      contentRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.style.transition = '';
        }
      }, 300);
    }
    
    setSwipeX(0);
  };

  // Reset transition when changing tabs directly
  useEffect(() => {
    if (contentRef.current) {
      const currentIndex = TABS.indexOf(activeTab);
      contentRef.current.style.transition = 'transform 0.3s ease-out';
      contentRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.style.transition = '';
        }
      }, 300);
    }
  }, [activeTab]);

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      setTempTitle(projectTitle);
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditingTitle, projectTitle]);

  const handleTitleSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    // Don't update if the title is empty
    if (tempTitle.trim() === "") {
      handleTitleCancel();
      return;
    }
    
    const oldTitle = projectTitle;
    setProjectTitle(tempTitle);
    setIsEditingTitle(false);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      const savedTitles = localStorage.getItem('projectTitles');
      const titlesMap = savedTitles ? JSON.parse(savedTitles) : {};
      titlesMap[projectId] = tempTitle;
      localStorage.setItem('projectTitles', JSON.stringify(titlesMap));
    }
    
    // Show saved animation if the title changed
    if (oldTitle !== tempTitle) {
      setTitleJustSaved(true);
      setTimeout(() => setTitleJustSaved(false), 1500);
    }
  };

  const handleTitleCancel = () => {
    setTempTitle(projectTitle);
    setIsEditingTitle(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleTitleCancel();
    }
  };

  // Define cover art components for each project type
  const renderCoverArt = () => {
    switch(projectId) {
      case 'project1':
        return (
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
            <div className="relative">
              <div className="h-40 w-40 rounded-full bg-white/20 absolute animate-ping opacity-50"></div>
              <div className="h-32 w-32 rounded-full bg-white/40 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-white/70"></div>
              </div>
            </div>
          </div>
        );
      case 'project2':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-purple-600 flex items-center justify-center">
            <div className="grid grid-cols-3 grid-rows-3 gap-2 w-3/4 h-3/4">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="bg-white/30 rounded-sm animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
              ))}
            </div>
          </div>
        );
      case 'project3':
        return (
          <div className="absolute inset-0 bg-gradient-to-bl from-emerald-400 to-blue-500 flex items-center justify-center">
            <div className="relative w-3/4 h-3/4">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-32 w-32 border-8 border-white/40 rounded-full"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center rotate-45">
                <div className="h-48 w-48 border-8 border-white/20 rounded-full"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center rotate-90">
                <div className="h-64 w-64 border-8 border-white/10 rounded-full"></div>
              </div>
            </div>
          </div>
        );
      case 'project4':
        return (
          <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 via-purple-900 to-violet-600 flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="w-48 h-48 bg-white/10 rounded-lg rotate-45"></div>
              <div className="absolute w-32 h-32 bg-white/20 rounded-lg rotate-12"></div>
              <div className="absolute w-16 h-16 bg-white/40 rounded-lg -rotate-12"></div>
            </div>
          </div>
        );
      case 'project5':
        return (
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-700 flex items-center justify-center overflow-hidden">
            <div className="relative">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute rounded-full border-4 border-white/30"
                  style={{
                    width: `${(i+1) * 40}px`,
                    height: `${(i+1) * 40}px`,
                    animationName: 'ripple',
                    animationDuration: '3s',
                    animationDelay: `${i * 0.2}s`,
                    animationIterationCount: 'infinite',
                    animationTimingFunction: 'ease-out'
                  }}
                ></div>
              ))}
              <style jsx>{`
                @keyframes ripple {
                  0% { transform: scale(0.8); opacity: 1; }
                  100% { transform: scale(2); opacity: 0; }
                }
              `}</style>
            </div>
          </div>
        );
      case 'project6':
        return (
          <div className="absolute inset-0 bg-gradient-to-bl from-rose-400 via-fuchsia-500 to-indigo-500 flex items-center justify-center">
            <div className="h-full w-full flex items-center justify-center">
              <div className="relative">
                <div className="h-40 w-8 bg-white/30 rounded-full rotate-45 absolute"></div>
                <div className="h-40 w-8 bg-white/30 rounded-full -rotate-45 absolute"></div>
                <div className="h-8 w-40 bg-white/30 rounded-full rotate-45 absolute"></div>
                <div className="h-8 w-40 bg-white/30 rounded-full -rotate-45 absolute"></div>
                <div className="h-16 w-16 bg-white/60 rounded-full absolute"></div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 to-black/50" />
        );
    }
  };

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen bg-black text-white">
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
          {isEditingTitle ? (
            <form onSubmit={handleTitleSubmit} className="mb-1">
              <input
                ref={titleInputRef}
                type="text"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                onBlur={handleTitleSubmit}
                onKeyDown={handleKeyDown}
                className="text-3xl font-bold bg-transparent border-b border-white/30 focus:border-white outline-none w-full py-1"
                autoComplete="off"
                placeholder="Enter project title"
              />
              <p className="text-xs text-gray-400 mt-1">Press Enter to save, Esc to cancel</p>
            </form>
          ) : (
            <div className="relative">
              <h1 
                className="text-3xl font-bold mb-1 cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-2" 
                onClick={() => setIsEditingTitle(true)}
              >
                {projectTitle}
                <span className="text-gray-400 text-sm opacity-60 hover:opacity-100">(edit)</span>
              </h1>
              {titleJustSaved && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute right-0 -bottom-6 text-green-400 text-xs"
                >
                  Title saved
                </motion.div>
              )}
            </div>
          )}
          <p className="text-gray-400">ApLus · 9 tracks · 31 min</p>
        </div>

        {/* Cover Art */}
        <div className="px-4 mt-6 mb-8">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-zinc-900">
            {renderCoverArt()}
            <button className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-full z-10">
              <Play size={20} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-zinc-800 relative">
          <div className="flex justify-around">
            {TABS.map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 relative ${
                  activeTab === tab ? 'text-white' : 'text-gray-400'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div 
          className="flex-1 relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            ref={contentRef}
            className="absolute inset-0 flex w-[300%]"
            style={{
              transform: `translateX(-${TABS.indexOf(activeTab) * 100}%)`
            }}
          >
            {/* Images Tab */}
            <div className="w-full min-w-full h-full overflow-y-auto">
              <div className="px-4 py-4">
                <div className="grid grid-cols-3 gap-1 w-full max-w-xs">
                  {sampleData.images.map((image) => (
                    <div
                      key={image.id}
                      className="aspect-square overflow-hidden rounded-md"
                    >
                      <img
                        src={image.url}
                        alt={`Image ${image.id}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Audio Tab */}
            <div className="w-full min-w-full px-4 py-6">
              <div className="space-y-4">
                {sampleData.tracks.map((track, index) => (
                  <motion.div
                    key={track.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <button className="p-2 rounded-full bg-zinc-800">
                        <Play size={16} />
                      </button>
                      <div>
                        <h3 className="font-medium">{track.title}</h3>
                        <p className="text-sm text-gray-400">{track.artist}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">{track.duration}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Video Tab */}
            <div className="w-full min-w-full">
              <div className="w-full h-full overflow-y-auto">
                <div className="py-4 px-4">
                  <div className="grid grid-cols-2 gap-3">
                    {sampleData.videos.map((video) => (
                      <div
                        key={video.id}
                        className="relative rounded-md overflow-hidden shadow-md transition-transform hover:scale-[1.02] aspect-[4/3]"
                      >
                        <img
                          src={video.gifPreview || video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end p-2 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                          <div className="text-white text-sm font-medium truncate">{video.title}</div>
                          <div className="text-gray-300 text-xs">{video.duration}</div>
                        </div>
                        <div className="absolute top-2 right-2 bg-black/60 text-white text-xs rounded-full px-2 py-1">
                          ▶
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
} 