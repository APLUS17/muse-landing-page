"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import CosmosTabs from '@/components/CosmosTabs';
import MoodboardGrid from '@/components/MoodboardGrid';
import CosmosNavBar from '@/components/CosmosNavBar';
import ProjectHeader from '@/components/ProjectHeader';

// Define image item type
interface ImageItem {
  id: string;
  imageUrl: string;
}

// Initial moodboard data (first batch)
const initialMoodboardItems: ImageItem[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000', // Surreal mountain landscape
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000', // Tent-like installation
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=1000', // Minimalist sculpture
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?q=80&w=1000', // Magazine cover style
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1511216115569-9172a427e2ed?q=80&w=1000', // People in orange light
  },
  {
    id: '6',
    imageUrl: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=1000', // Club scene
  },
];

// Fixed list of working Unsplash image IDs
const reliableImageIds = [
  'photo-1531306728370-e2ebd9d7bb99', // Mountain landscape
  'photo-1638586536549-f0934ecde621', // Modern space
  'photo-1551913902-c92207136625', // Colorful patterns
  'photo-1604871000636-074fa5117945', // Abstract art
  'photo-1547891654-e66ed7ebb968', // Additional design
  'photo-1549490349-8643362247b5', // Additional pattern
  'photo-1561484930-998b6a7b22e8', // Architectural element
  'photo-1579546929518-9e396f3cc809', // Gradient design
  'photo-1579887829694-315f48210ce9', // Modern interior
  'photo-1574790248020-231e191a92c6', // Abstract shape
  'photo-1550684848-fac1c5b4e853', // Minimal concept
  'photo-1567359781514-3b964e2b04d6', // Design layout
  'photo-1598449428635-4e435d3f5f32', // Material texture
  'photo-1604537466608-109fa2f16c3b', // Color study
  'photo-1618005182384-a83a8bd57fbe', // Geometric form
  'photo-1581349437898-cea573747ec7', // Light pattern
  'photo-1517999349371-35c2044ebc9e', // Minimal furniture
  'photo-1622547748225-3fc4abd2cca0', // Abstract photography
  'photo-1618172193763-c511deb635ca', // Gradient abstract
  'photo-1618172193622-ae2d025f4032', // Organic form
];

// Generate infinite batches of images using reliable photo IDs
const generateImageBatch = (startId: number): ImageItem[] => {
  // Create a batch of 6 images
  const batch: ImageItem[] = [];
  
  for (let i = 0; i < 6; i++) {
    // Create a truly unique ID with timestamp and random string to avoid collisions
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const id = `${startId + i}-${timestamp}-${randomSuffix}`;
    
    // Use a reliable image ID with a modulo operation to cycle through them
    const imageIdIndex = (startId + i) % reliableImageIds.length;
    const reliableImageId = reliableImageIds[imageIdIndex];
    
    // Add some randomization parameters for variety
    const imageUrl = `https://images.unsplash.com/${reliableImageId}?q=80&w=1000&random=${id}`;
    
    batch.push({ id, imageUrl });
  }
  
  return batch;
};

export default function MoodboardPage() {
  const [moodboardItems, setMoodboardItems] = useState<ImageItem[]>(initialMoodboardItems);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false); // Use ref to avoid race conditions
  const batchCountRef = useRef(1); // Keep track of how many batches we've loaded

  // Function to load more images with proper debouncing and race condition handling
  const loadMoreImages = useCallback(() => {
    // Prevent multiple simultaneous loading requests
    if (loadingRef.current) return;
    
    loadingRef.current = true;
    setLoading(true);
    
    // Generate next batch of images
    const nextBatchStartId = moodboardItems.length + 1;
    const nextBatch = generateImageBatch(nextBatchStartId);
    
    // Simulate a delay like an API call (shorter for better UX)
    setTimeout(() => {
      setMoodboardItems(prevItems => [...prevItems, ...nextBatch]);
      setLoading(false);
      loadingRef.current = false;
      batchCountRef.current += 1;
      
      // Force a small delay then check if we need to load even more 
      // (helpful if the page is very tall and needs more content)
      setTimeout(() => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // If we still don't have enough content to fill the page plus some scrolling room
        if (documentHeight < windowHeight * 1.5) {
          loadMoreImages();
        }
      }, 100);
    }, 600); // 600ms delay to simulate loading
  }, [moodboardItems.length]);

  // Improved scroll handler with better threshold detection
  const handleScroll = useCallback(() => {
    // Check if user has scrolled near the bottom
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Load more when user is within 40% of the bottom for smoother experience
    const scrollThreshold = documentHeight - (windowHeight * 1.4);
    
    if (scrollPosition > scrollThreshold) {
      loadMoreImages();
    }
  }, [loadMoreImages]);

  // Set up scroll event listener with debounce
  useEffect(() => {
    const debouncedScroll = debounce(handleScroll, 150);
    window.addEventListener('scroll', debouncedScroll);
    
    // Add event listener for the custom event from MoodboardGrid
    const handleCustomLoadMoreEvent = () => {
      loadMoreImages();
    };
    window.addEventListener('loadMoreImages', handleCustomLoadMoreEvent);
    
    // Pre-load a second batch after initial render for better UX
    if (batchCountRef.current === 1) {
      const timer = setTimeout(() => {
        loadMoreImages();
      }, 1000);
      
      return () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', debouncedScroll);
        window.removeEventListener('loadMoreImages', handleCustomLoadMoreEvent);
      };
    }
    
    return () => {
      window.removeEventListener('scroll', debouncedScroll);
      window.removeEventListener('loadMoreImages', handleCustomLoadMoreEvent);
    };
  }, [handleScroll, loadMoreImages]);
  
  // Debounce function to limit scroll event frequency
  function debounce<F extends (...args: any[]) => any>(func: F, wait: number) {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    
    return function executedFunction(...args: Parameters<F>) {
      const later = () => {
        timeout = null;
        func(...args);
      };
      
      if (timeout) {
        clearTimeout(timeout);
      }
      
      timeout = setTimeout(later, wait);
    };
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Tabs at the top */}
      <div className="pt-4">
        <CosmosTabs />
      </div>
      
      {/* Project Header */}
      <ProjectHeader />
      
      {/* Moodboard Grid */}
      <div className="px-4">
        <MoodboardGrid items={moodboardItems} />
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="w-full flex justify-center py-8 opacity-50">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-75"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-150"></div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 w-full">
        <CosmosNavBar />
      </div>
    </main>
  );
} 