"use client";

import React from 'react';

const RelatedPhotosGrid = ({ imageUrl, onClose }) => {
  // Generating related photos based on the selected image
  // In a real app, this would come from API, but we'll simulate with similar photos
  const generateRelatedPhotos = (baseUrl) => {
    // Create a set of modified URLs to simulate related photos
    // In production, this would be replaced with actual API data
    const relatedPhotos = [
      { id: 'r1', imageUrl: baseUrl + '?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYyMDIyNjc3Mg' },
      { id: 'r2', imageUrl: baseUrl + '?crop=faces&cs=tinysrgb&fit=crop&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYyMDIyNjg0MA' },
      { id: 'r3', imageUrl: baseUrl + '?crop=top&cs=tinysrgb&fit=crop&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYyMDIyNjg5MA' },
      { id: 'r4', imageUrl: baseUrl + '?crop=bottom&cs=tinysrgb&fit=crop&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYyMDIyNjkzMA' },
      { id: 'r5', imageUrl: baseUrl + '?blur=200&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYyMDIyNjk3MA' },
      { id: 'r6', imageUrl: baseUrl + '?bri=-20&con=10&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYyMDIyNzAyMA' },
    ];
    
    return relatedPhotos;
  };

  const relatedPhotos = generateRelatedPhotos(imageUrl);

  return (
    <div className="bg-black text-white p-4 w-full h-full overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Visual Search</h2>
        <p className="text-gray-400 text-sm mt-1">Discover related designs</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {relatedPhotos.map((photo) => (
          <div 
            key={photo.id}
            className="relative overflow-hidden rounded-lg aspect-square"
          >
            <img
              src={photo.imageUrl}
              alt="Related photo"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 opacity-0 hover:opacity-100 transition-opacity">
              <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                  Similar
                </div>
                <button className="bg-black/50 backdrop-blur-sm p-1.5 rounded-full">
                  <span className="text-white text-xs">+</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          <span className="bg-white/10 px-3 py-1.5 rounded-full text-sm">Abstract</span>
          <span className="bg-white/10 px-3 py-1.5 rounded-full text-sm">Landscape</span>
          <span className="bg-white/10 px-3 py-1.5 rounded-full text-sm">Modern</span>
          <span className="bg-white/10 px-3 py-1.5 rounded-full text-sm">Photography</span>
          <span className="bg-white/10 px-3 py-1.5 rounded-full text-sm">Digital Art</span>
        </div>
      </div>
    </div>
  );
};

export default RelatedPhotosGrid; 