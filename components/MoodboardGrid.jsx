"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { debounce } from 'lodash';

const MoodboardGrid = ({ items }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showActions, setShowActions] = useState(null);
  const [relatedImages, setRelatedImages] = useState([]);
  const [showFullRelated, setShowFullRelated] = useState(false);
  const fullscreenRef = useRef(null);
  const [mainImageLoading, setMainImageLoading] = useState(false);
  const [scrollLoading, setScrollLoading] = useState(false);
  
  // Add state to track if we're close to the bottom of the gallery
  const [loadingMoreMain, setLoadingMoreMain] = useState(false);
  
  // Add state to track image viewing history
  const [imageHistory, setImageHistory] = useState([]);
  
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

  // Generate related photos based on the selected image
  const generateRelatedPhotos = (baseUrl) => {
    // We'll use a set of reliable Unsplash image IDs
    const reliableImageIds = [
      'photo-1531306728370-e2ebd9d7bb99', // Mountain landscape
      'photo-1638586536549-f0934ecde621', // Modern space
      'photo-1551913902-c92207136625', // Colorful patterns
      'photo-1604871000636-074fa5117945', // Abstract art
      'photo-1547891654-e66ed7ebb968', // Design
      'photo-1549490349-8643362247b5', // Pattern
      'photo-1561484930-998b6a7b22e8', // Architecture
      'photo-1579546929518-9e396f3cc809', // Gradient
      'photo-1579887829694-315f48210ce9', // Interior
      'photo-1574790248020-231e191a92c6', // Shape
      'photo-1550684848-fac1c5b4e853', // Minimal
      'photo-1567359781514-3b964e2b04d6', // Layout
      'photo-1598449428635-4e435d3f5f32', // Texture
      'photo-1604537466608-109fa2f16c3b', // Colors
      'photo-1618005182384-a83a8bd57fbe', // Geometric
      'photo-1581349437898-cea573747ec7', // Pattern
      'photo-1517999349371-35c2044ebc9e', // Furniture
      'photo-1622547748225-3fc4abd2cca0', // Abstract
      'photo-1618172193763-c511deb635ca', // Gradient
      'photo-1618172193622-ae2d025f4032', // Form
    ];
    
    // Create a batch with some randomization to ensure visual variety
    const createBatch = (startIndex, batchSize = 6) => {
      const batch = [];
      for (let i = 0; i < batchSize; i++) {
        // Calculate a semi-random index for variety while still using the image ID list
        const randomOffset = (startIndex + i) % reliableImageIds.length;
        const imageId = reliableImageIds[randomOffset];
        
        // Create a truly unique ID by combining multiple factors
        const timestamp = Date.now();
        const uniqueId = `related-${startIndex}-${i}-${timestamp}-${Math.random().toString(36).substr(2, 5)}`;
        
        // Add randomization parameter to ensure unique image variants
        const random = Math.floor(Math.random() * 1000);
        const imageUrl = `https://images.unsplash.com/${imageId}?w=800&q=80&random=${random}`;
        
        batch.push({ id: uniqueId, imageUrl, author: '@tomasfreres' });
      }
      return batch;
    };
    
    // Generate multiple batches of related images
    const batches = [];
    for (let batchIndex = 0; batchIndex < 10; batchIndex++) {
      batches.push(createBatch(batchIndex * 6));
    }
    
    return batches;
  };

  // Group items into columns of different heights
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
    const allRelatedBatches = generateRelatedPhotos(item.imageUrl);
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

  // Add a function to request more images from the parent component
  const handleNearBottom = useCallback(() => {
    if (!loadingMoreMain && typeof window !== 'undefined') {
      setLoadingMoreMain(true);
      // Emit a custom event that can be caught by the parent component 
      // This is needed since we can't directly modify the items prop
      const event = new CustomEvent('loadMoreImages');
      window.dispatchEvent(event);
      
      // Reset the loading state after a timeout
      setTimeout(() => {
        setLoadingMoreMain(false);
      }, 1000);
    }
  }, [loadingMoreMain]);

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

  // Handle scroll in fullscreen view to load more related images
  const handleFullscreenScroll = (e) => {
    if (!selectedImage) return;
    
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    
    // No need to check for showFullRelated since we always show it now
    
    // If scrolled near the bottom, load more related images
    if (scrollTop + clientHeight >= scrollHeight - 300) {
      // Don't attempt to load more if we're already loading
      if (scrollLoading) return;
      
      setScrollLoading(true);
      
      // Generate more related images using our reliable URL generator
      const moreBatches = generateRelatedPhotos(selectedImage.imageUrl);
      
      // Use a different batch each time based on current size
      const batchIndex = Math.floor(relatedImages.length / 6) % moreBatches.length;
      const newBatch = moreBatches[batchIndex];
      
      // Don't add if we already have a lot to avoid performance issues in the demo
      if (relatedImages.length < 120) {
        // Add a small delay to simulate loading for better UX
        setTimeout(() => {
          // Use a functional update to ensure we're working with latest state
          setRelatedImages(prevImages => {
            // Only add images we don't already have by checking IDs
            const existingIds = new Set(prevImages.map(img => img.id));
            const uniqueNewImages = newBatch.filter(img => !existingIds.has(img.id));
            
            if (uniqueNewImages.length === 0) {
              // If we didn't get any unique images, try another batch with new IDs
              const altBatch = moreBatches[(batchIndex + 1) % moreBatches.length].map(img => ({
                ...img,
                id: `${img.id}-alt-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`
              }));
              setScrollLoading(false);
              return [...prevImages, ...altBatch];
            }
            
            setScrollLoading(false);
            return [...prevImages, ...uniqueNewImages];
          });
        }, 600);
      } else {
        setScrollLoading(false);
      }
    }
  };

  // Close action menu
  const closeActions = (e) => {
    e.stopPropagation();
    setShowActions(null);
  };

  const ImageActions = ({ itemId }) => (
    <div 
      className="absolute top-2 right-2 z-10 bg-black/70 backdrop-blur-sm rounded-full p-2"
      onClick={(e) => handleShowActions(itemId, e)}
    >
      <span className="text-white text-xl">⋯</span>
    </div>
  );

  const ActionMenu = ({ itemId }) => (
    <div 
      className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center gap-4 z-20"
      onClick={(e) => closeActions(e)}
    >
      <button className="flex items-center gap-2 text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full transition-colors">
        <span>🔍</span>
        <span>View Fullscreen</span>
      </button>
      <button className="flex items-center gap-2 text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full transition-colors">
        <span>✏️</span>
        <span>Add Note/Tag</span>
      </button>
      <button className="flex items-center gap-2 text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full transition-colors">
        <span>❤️</span>
        <span>Save to Project</span>
      </button>
      <button className="flex items-center gap-2 text-white bg-red-800 hover:bg-red-700 px-4 py-2 rounded-full transition-colors">
        <span>🗑️</span>
        <span>Delete</span>
      </button>
    </div>
  );

  // Add a function to handle clicking on a related image
  const handleRelatedImageClick = (relatedImage) => {
    // Add the current image to history before changing to the new one
    if (selectedImage) {
      setImageHistory(prev => [...prev, selectedImage]);
    }
    
    // Set the related image as the new selected image
    setSelectedImage(relatedImage);
    setMainImageLoading(true);
    setShowFullRelated(true); // Always show related images
    
    // Reset the scroll position
    if (fullscreenRef.current) {
      fullscreenRef.current.scrollTop = 0;
    }
    
    // Generate new related photos for this image
    const allRelatedBatches = generateRelatedPhotos(relatedImage.imageUrl);
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
    const allRelatedBatches = generateRelatedPhotos(lastImage.imageUrl);
    setRelatedImages(allRelatedBatches[0]);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-3 pb-24">
        {/* Left Column */}
        <div className="flex flex-col gap-3">
          {leftColumnItems.map((item, index) => (
            <div 
              key={`left-${item.id}`}
              className={`relative overflow-hidden rounded-lg ${getAspectRatio(index * 2)}`}
              style={{ marginBottom: index < leftColumnItems.length - 1 ? '12px' : '0' }}
              onClick={() => handleImageClick(item)}
            >
              <img
                src={item.imageUrl}
                alt="Moodboard item"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Replace broken images with fallback
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
              className={`relative overflow-hidden rounded-lg ${getAspectRatio(index * 2 + 1)}`}
              style={{ marginBottom: index < rightColumnItems.length - 1 ? '12px' : '0' }}
              onClick={() => handleImageClick(item)}
            >
              <img
                src={item.imageUrl}
                alt="Moodboard item"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Replace broken images with fallback
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
                <div className="text-center text-gray-400 mt-2">@tomasfreres</div>
              </div>
            </div>

            {/* Action bar positioned above the related images */}
            <div className="w-full px-6 py-3 bg-black/80 backdrop-blur-sm z-10 border-b border-white/10 mb-4">
              <div className="flex items-center w-full max-w-md mx-auto px-6 justify-between">
                <button className="w-14 h-14 rounded-full bg-zinc-800 flex items-center justify-center active:scale-95 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1"></path>
                    <line x1="9" y1="10" x2="9" y2="16"></line>
                    <line x1="15" y1="10" x2="15" y2="16"></line>
                    <path d="M12 2v8"></path>
                  </svg>
                </button>
                
                <button className="w-36 h-14 rounded-full bg-white flex items-center justify-center active:scale-95 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
                
                <button className="w-14 h-14 rounded-full bg-zinc-800 flex items-center justify-center active:scale-95 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
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
    </>
  );
};

export default MoodboardGrid; 