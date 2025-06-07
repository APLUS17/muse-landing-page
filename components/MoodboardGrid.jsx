"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { debounce } from 'lodash';
import AddToMoodboardModal from './AddToMoodboardModal';

// Initial static images for server-side rendering
const initialImages = [
  {
    id: 'initial-1',
    imageUrl: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99',
    author: '@unsplash'
  },
  {
    id: 'initial-2',
    imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
    author: '@unsplash'
  },
  {
    id: 'initial-3',
    imageUrl: 'https://images.unsplash.com/photo-1551913902-c92207136625',
    author: '@unsplash'
  },
  {
    id: 'initial-4',
    imageUrl: 'https://images.unsplash.com/photo-1604871000636-074fa5117945',
    author: '@unsplash'
  }
];

const MoodboardGrid = ({ initialItems = initialImages }) => {
  const [items, setItems] = useState(initialItems);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showActions, setShowActions] = useState(null);
  const [relatedImages, setRelatedImages] = useState([]);
  const [showFullRelated, setShowFullRelated] = useState(false);
  const [showAddToMoodboardModal, setShowAddToMoodboardModal] = useState(false);
  const [selectedImageForMoodboard, setSelectedImageForMoodboard] = useState(null);
  const fullscreenRef = useRef(null);
  const [mainImageLoading, setMainImageLoading] = useState(false);
  const [scrollLoading, setScrollLoading] = useState(false);
  const [loadingMoreMain, setLoadingMoreMain] = useState(false);
  const [imageHistory, setImageHistory] = useState([]);
  const [mounted, setMounted] = useState(false);
  
  // Track all used images globally to prevent repeats
  const [usedImageIds, setUsedImageIds] = useState(new Set());
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  
  // Expanded collection of curated Unsplash collections for different themes
  const unsplashCollections = {
    editorial: [
      'random', // Random high-quality photos
      '317099',  // Editorial collection
      '3349676', // Creative collection
      '3657445', // Magazine style
      '1301659', // Modern minimal
    ],
    architecture: [
      '3348849', // Modern architecture
      '3356584', // Urban spaces
      '4316748', // Interior design
      '3330448', // Brutalist
      '9046579', // Minimalist spaces
    ],
    nature: [
      '3330445', // Landscapes
      '3330452', // Abstract nature
      '3330454', // Textures in nature
      '4345725', // Organic forms
      '8677814', // Natural patterns
    ],
    art: [
      '3330444', // Contemporary art
      '3356579', // Digital art
      '3356591', // Mixed media
      '4316754', // Abstract art
      '8615944', // Experimental
    ],
    design: [
      '3330453', // Graphic design
      '3356587', // Typography
      '4316751', // Branding
      '8677815', // Posters
      '9424477', // Digital design
    ]
  };

  const imageMetadata = {
    'photo-1531306728370-e2ebd9d7bb99': {
      categories: ['architecture', 'urban'],
      tags: ['modern', 'building', 'minimal', 'structure'],
      colors: ['gray', 'white'],
      mood: ['cool', 'minimal']
    },
    // Add metadata for each image ID...
  };

  // Function to calculate similarity score between two images
  const calculateSimilarity = (currentImage, candidateImage) => {
    let score = 0;
    
    // Category match
    const currentMeta = imageMetadata[currentImage.id.split('-')[0]] || {};
    const candidateMeta = imageMetadata[candidateImage.split('-')[0]] || {};
    
    // Category overlap
    const commonCategories = (currentMeta.categories || []).filter(
      cat => (candidateMeta.categories || []).includes(cat)
    );
    score += commonCategories.length * 2;
    
    // Tag overlap
    const commonTags = (currentMeta.tags || []).filter(
      tag => (candidateMeta.tags || []).includes(tag)
    );
    score += commonTags.length;
    
    // Mood match
    const commonMoods = (currentMeta.mood || []).filter(
      mood => (candidateMeta.mood || []).includes(mood)
    );
    score += commonMoods.length * 1.5;
    
    // Color palette similarity
    const commonColors = (currentMeta.colors || []).filter(
      color => (candidateMeta.colors || []).includes(color)
    );
    score += commonColors.length;
    
    return score;
  };

  // Function to get recommended images based on current viewing history
  const getRecommendedImages = (currentImage, viewingHistory, allImageIds) => {
    const recommendations = allImageIds.map(imageId => {
      // Skip if the image is in viewing history
      if (viewingHistory.some(hist => hist.id.startsWith(imageId))) {
        return { imageId, score: -1 };
      }
      
      // Calculate base similarity with current image
      let score = calculateSimilarity(currentImage, imageId);
      
      // Add weighted scores from viewing history
      viewingHistory.forEach((historyItem, index) => {
        const historyWeight = 1 / (index + 2); // Decay weight for older items
        score += calculateSimilarity(historyItem, imageId) * historyWeight;
      });
      
      return { imageId, score };
    });
    
    // Sort by score and filter out negative scores
    return recommendations
      .filter(rec => rec.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(rec => rec.imageId);
  };

  // Create a layout pattern that mirrors the Cosmos screenshot
  // This will have varying aspect ratios for a more dynamic look
  const getAspectRatio = (index) => {
    const patterns = [
      'aspect-[3/4]',   // Standard portrait
      'aspect-square',  // Square
      'aspect-[4/5]',   // Slightly taller portrait
      'aspect-[3/5]',   // Tall portrait
      'aspect-[2/3]',   // Medium portrait
    ];
    
    // Create a semi-random pattern based on index
    // This gives a natural look while ensuring variety
    const patternIndex = (index + (index % 3)) % patterns.length;
    return patterns[patternIndex];
  };

  // Use useEffect to mark when initial render is complete
  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);

  // Mark component as mounted after initial render
  useEffect(() => {
    setMounted(true);
    // Load initial dynamic content
    loadMoreImages();
  }, []);

  const getRandomCollection = () => {
    if (!mounted) return '317099';
    const categories = Object.keys(unsplashCollections);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const collections = unsplashCollections[randomCategory];
    return collections[Math.floor(Math.random() * collections.length)];
  };

  const generateUniqueImageUrl = () => {
    if (!mounted) return initialImages[0].imageUrl;
    
    const collection = getRandomCollection();
    const width = 800;
    const height = 800;
    return `https://source.unsplash.com/collection/${collection}/${width}x${height}?sig=${mounted ? Date.now() : ''}`;
  };

  // Generate related photos based on current image and viewing history
  const generateRelatedPhotos = useCallback(() => {
    if (!mounted) return [initialImages];

    const batches = [];
    const batchSize = 6;
    const numBatches = 10;

    for (let i = 0; i < numBatches; i++) {
      const batch = Array(batchSize).fill(null).map(() => ({
        id: `related-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        imageUrl: generateUniqueImageUrl(),
        author: '@unsplash'
      }));
      batches.push(batch);
    }

    return batches;
  }, [mounted]);

  const loadMoreImages = useCallback(() => {
    if (!mounted) return;

    const newImages = Array(4).fill(null).map(() => ({
      id: `image-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      imageUrl: generateUniqueImageUrl(),
      author: '@unsplash'
    }));

    setItems(prev => [...prev, ...newImages]);
  }, [mounted]);

  // Group items into columns
  const leftColumnItems = items.filter((_, i) => i % 2 === 0);
  const rightColumnItems = items.filter((_, i) => i % 2 === 1);

  // Handle image click for fullscreen view
  const handleImageClick = (item) => {
    // Start a new history trail with this image
    setImageHistory([]);
    setSelectedImage(item);
    setShowFullRelated(true); // Always show related images immediately
    setMainImageLoading(true);
    
    // Generate related photos for this image
    const allRelatedBatches = generateRelatedPhotos();
    // Initially show just the first batch
    setRelatedImages(allRelatedBatches[0]);
    
    // Reset scroll position
    setTimeout(() => {
      if (fullscreenRef.current) {
        fullscreenRef.current.scrollTop = 0;
      }
    }, 100);
  };

  // Handle image load complete
  const handleImageLoaded = () => {
    setMainImageLoading(false);
  };

  // Handle long press or action button to show actions
  const handleShowActions = (itemId, e) => {
    e.stopPropagation();
    setShowActions(itemId);
  };

  // Close fullscreen view
  const closeFullscreen = () => {
    setSelectedImage(null);
    setRelatedImages([]);
    setShowFullRelated(false);
  };

  // Update the handleNearBottom function to load truly new images
  const handleNearBottom = useCallback(() => {
    if (!loadingMoreMain && mounted) {
      setLoadingMoreMain(true);
      loadMoreImages();
      setTimeout(() => setLoadingMoreMain(false), 1000);
    }
  }, [loadingMoreMain, mounted, loadMoreImages]);

  // Set up scroll event listener for the main page
  useEffect(() => {
    const handleMainScroll = () => {
      if (typeof window === 'undefined' || selectedImage) return;
      
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // If we're 75% of the way down, trigger loading more images
      if (scrollPosition + windowHeight > documentHeight * 0.75) {
        handleNearBottom();
      }
    };
    
    // Debounce the scroll event
    const debouncedScroll = debounce(handleMainScroll, 150);
    window.addEventListener('scroll', debouncedScroll);
    
    return () => {
      window.removeEventListener('scroll', debouncedScroll);
    };
  }, [handleNearBottom, selectedImage]);
  
  // Debounce function to limit event frequency
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Update handleRelatedImageClick to always get fresh images
  const handleRelatedImageClick = (relatedImage) => {
    if (selectedImage) {
      setImageHistory(prev => [...prev, selectedImage]);
    }
    
    setSelectedImage(relatedImage);
    setMainImageLoading(true);
    setShowFullRelated(true);
    
    if (fullscreenRef.current) {
      fullscreenRef.current.scrollTop = 0;
    }
    
    // Generate completely new related photos
    const allRelatedBatches = generateRelatedPhotos();
    setRelatedImages(allRelatedBatches[0]);
  };
  
  // Handle going back in image history
  const handleBackInHistory = () => {
    if (imageHistory.length === 0) {
      // If no history, just close the fullscreen view
      closeFullscreen();
      return;
    }
    
    // Get the last image from history
    const lastImage = imageHistory[imageHistory.length - 1];
    
    // Remove it from history
    setImageHistory(prev => prev.slice(0, prev.length - 1));
    
    // Set it as the selected image
    setSelectedImage(lastImage);
    setMainImageLoading(true);
    
    // Reset scroll position
    if (fullscreenRef.current) {
      fullscreenRef.current.scrollTop = 0;
    }
    
    // Reset the related images state
    setShowFullRelated(false);
    
    // Generate related photos for this image
    const allRelatedBatches = generateRelatedPhotos();
    setRelatedImages(allRelatedBatches[0]);
  };

  // Update handleFullscreenScroll for continuous new content
  const handleFullscreenScroll = (e) => {
    if (!selectedImage) return;
    
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    
    if (scrollTop + clientHeight >= scrollHeight - 300) {
      if (scrollLoading) return;
      
      setScrollLoading(true);
      
      // Generate completely new batch of images
      const newBatch = generateRelatedPhotos()[0];
      
      setTimeout(() => {
        setRelatedImages(prevImages => {
          const newImages = [...prevImages, ...newBatch];
          // Keep only the last 120 images to maintain performance
          if (newImages.length > 120) {
            return newImages.slice(-120);
          }
          return newImages;
        });
        setScrollLoading(false);
      }, 600);
    }
  };

  // Close action menu
  const closeActions = (e) => {
    e.stopPropagation();
    setShowActions(null);
  };

  const handleAddToMoodboard = (moodboardId) => {
    // Here you would implement the logic to add the image to the selected moodboard
    console.log(`Adding image ${selectedImageForMoodboard?.id} to moodboard ${moodboardId}`);
    setShowAddToMoodboardModal(false);
    setSelectedImageForMoodboard(null);
  };

  const handleCreateNewMoodboard = (name, isPrivate) => {
    // Here you would implement the logic to create a new moodboard and add the image to it
    console.log(`Creating new moodboard "${name}" (${isPrivate ? 'private' : 'public'}) and adding image ${selectedImageForMoodboard?.id}`);
    setShowAddToMoodboardModal(false);
    setSelectedImageForMoodboard(null);
  };

  const ImageActions = ({ itemId }) => (
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
      <button
        className="text-white bg-black/40 hover:bg-black/60 p-2 rounded-full backdrop-blur-sm transition-colors"
        onClick={(e) => handleShowActions(itemId, e)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="19" cy="12" r="1"></circle>
          <circle cx="5" cy="12" r="1"></circle>
        </svg>
      </button>
      <button
        className="text-white bg-black/40 hover:bg-black/60 p-2 rounded-full backdrop-blur-sm transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          const image = items.find(item => item.id === itemId);
          setSelectedImageForMoodboard(image);
          setShowAddToMoodboardModal(true);
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
    </div>
  );

  const ActionMenu = ({ itemId }) => (
    <div 
      className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center gap-3 z-20"
      onClick={(e) => closeActions(e)}
    >
      <button className="group flex items-center gap-3 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl transition-all duration-200">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="font-medium">View Details</span>
      </button>

      <button className="group flex items-center gap-3 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl transition-all duration-200">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.53 16.122a3.995 3.995 0 00-1.19-1.192L4 12.8v6.232L9.53 16.122zm7.065-6.921a4 4 0 00-1.19 1.192L20 12.8V6.568l-3.405 2.633z" fill="currentColor" fillOpacity="0.5"/>
          <path d="M12.751 15.952l3.478 2.692a.5.5 0 00.771-.421v-2.99l-4.249.719zM7.24 15.952L3.762 18.644a.5.5 0 01-.771-.421v-2.99l4.249.719z" fill="currentColor"/>
          <path d="M12 3c4.97 0 9 2.686 9 6s-4.03 6-9 6-9-2.686-9-6 4.03-6 9-6zm0 8c1.105 0 2-.672 2-1.5S13.105 8 12 8s-2 .672-2 1.5.895 1.5 2 1.5z" fill="currentColor" fillOpacity="0.25"/>
        </svg>
        <span className="font-medium">Add Note</span>
      </button>

      <button className="group flex items-center gap-3 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl transition-all duration-200">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span className="font-medium">Save</span>
      </button>

      <button className="group flex items-center gap-3 text-red-300 hover:text-red-200 bg-red-500/20 hover:bg-red-500/30 px-6 py-3 rounded-xl transition-all duration-200">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="font-medium">Remove</span>
      </button>
    </div>
  );

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-3 px-4">
        {/* Left Column */}
        <div className="flex flex-col gap-3">
          {leftColumnItems.map((item, index) => (
            <div 
              key={`left-${item.id}`}
              className={`relative overflow-hidden rounded-lg ${getAspectRatio(index * 2)} group`}
              style={{ marginBottom: index < leftColumnItems.length - 1 ? '12px' : '0' }}
              onClick={() => handleImageClick(item)}
            >
              <img
                src={item.imageUrl}
                alt="Moodboard item"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?w=800&q=80";
                }}
              />
              <ImageActions itemId={item.id} />
              {showActions === item.id && <ActionMenu itemId={item.id} />}
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-3">
          {rightColumnItems.map((item, index) => (
            <div 
              key={`right-${item.id}`}
              className={`relative overflow-hidden rounded-lg ${getAspectRatio(index * 2 + 1)} group`}
              style={{ marginBottom: index < rightColumnItems.length - 1 ? '12px' : '0' }}
              onClick={() => handleImageClick(item)}
            >
              <img
                src={item.imageUrl}
                alt="Moodboard item"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?w=800&q=80";
                }}
              />
              <ImageActions itemId={item.id} />
              {showActions === item.id && <ActionMenu itemId={item.id} />}
            </div>
          ))}
        </div>
      </div>
      
      {/* Loading indicator for the main grid */}
      {loadingMoreMain && (
        <div className="w-full flex justify-center py-8 mt-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-75"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-150"></div>
          </div>
        </div>
      )}

      {/* Fullscreen Modal with Slide-in Animation */}
      {selectedImage && (
        <div 
          ref={fullscreenRef}
          className="fixed inset-0 bg-black z-50 overflow-y-auto animate-slide-in"
          onClick={(e) => {
            // Only close if clicking the background, not the content
            if (e.target === fullscreenRef.current) {
              closeFullscreen();
            }
          }}
          onScroll={handleFullscreenScroll}
        >
          {/* Header Controls */}
          <div className="fixed top-0 left-0 right-0 flex justify-between items-center px-4 py-3 bg-black/50 backdrop-blur-sm z-10">
            <button 
              className="text-white text-xl p-2"
              onClick={imageHistory.length > 0 ? handleBackInHistory : closeFullscreen}
            >
              ←
            </button>
            <div className="flex items-center">
              {/* Breadcrumb trail showing exploration depth */}
              {imageHistory.length > 0 && (
                <div className="flex items-center mr-2">
                  <span className="text-xs text-white/50">{imageHistory.length + 1} images deep</span>
                </div>
              )}
              <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-400">
                {/* Profile picture placeholder */}
              </div>
            </div>
            <button 
              className="text-white text-xl p-2"
              onClick={closeFullscreen}
            >
              ×
            </button>
          </div>

          {/* Main Content */}
          <div className="flex flex-col min-h-screen pb-24">
            {/* Main Image */}
            <div className="flex flex-col justify-center items-center mt-16 mb-4 px-4 flex-1">
              <div className="w-full max-w-md">
                {/* Use a placeholder bg while image loads */}
                <div className="relative w-full min-h-[300px] bg-gray-900 rounded-lg overflow-hidden">
                  {mainImageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-75"></div>
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-150"></div>
                      </div>
                    </div>
                  )}
                  <img 
                    key={selectedImage.id}
                    src={selectedImage.imageUrl} 
                    alt="Fullscreen view" 
                    className="w-full h-auto object-contain rounded-lg animate-fade-in" 
                    onError={(e) => {
                      // Replace broken images with known good fallback
                      e.target.src = "https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?w=800&q=80";
                      setMainImageLoading(false);
                    }}
                    onLoad={handleImageLoaded}
                  />
                </div>
              </div>
            </div>

            {/* Action bar positioned above the related images */}
            <div className="w-full px-6 py-3 bg-black/80 backdrop-blur-sm z-10 border-b border-white/10 mb-4">
              <div className="flex items-center w-full max-w-md mx-auto justify-center">
                <button 
                  className="w-36 h-14 rounded-full bg-white flex items-center justify-center space-x-2 active:scale-95 transition-transform"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageForMoodboard(selectedImage);
                    setShowAddToMoodboardModal(true);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  <span className="text-black font-medium">Add</span>
                </button>
              </div>
            </div>

            {/* Related images peeking up from underneath */}
            <div className="px-4 pb-24">
              <div className="max-w-md mx-auto">
                <div className="grid grid-cols-2 gap-3">
                  {relatedImages.map((image, index) => (
                    <div 
                      key={`related-grid-${image.id}-${index}`}
                      className="relative aspect-square overflow-hidden rounded-lg cursor-pointer transform transition-transform hover:scale-[0.98] active:scale-95 group"
                      onClick={() => handleRelatedImageClick(image)}
                    >
                      {/* Background color while loading */}
                      <div className="absolute inset-0 bg-gray-800"></div>
                      <img
                        src={image.imageUrl}
                        alt="Related image"
                        className="w-full h-full object-cover relative z-10 animate-fade-in"
                        loading="lazy"
                        onError={(e) => {
                          // Replace broken images with fallback
                          e.target.src = "https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?w=800&q=80";
                        }}
                      />
                      {/* View indicator overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity z-20">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                          <span className="text-white text-sm">View</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Loading indicator for related images */}
                {scrollLoading && (
                  <div className="w-full flex justify-center py-6 mt-4">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-75"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-150"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add to Moodboard Modal */}
      {mounted && (
        <AddToMoodboardModal
          isOpen={showAddToMoodboardModal}
          onClose={() => {
            setShowAddToMoodboardModal(false);
            setSelectedImageForMoodboard(null);
          }}
          onAddToMoodboard={handleAddToMoodboard}
          onCreateNewMoodboard={handleCreateNewMoodboard}
        />
      )}
    </div>
  );
};

export default MoodboardGrid; 