"use client";

import React, { useState } from 'react';

const CosmosTabs = () => {
  const [activeTab, setActiveTab] = useState('saved');

  return (
    <div className="flex justify-center my-4">
      <div className="flex bg-gray-900 rounded-full p-1">
        <button 
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            activeTab === 'saved' 
              ? 'bg-gray-800 text-white' 
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('saved')}
        >
          Saved
        </button>
        <button 
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            activeTab === 'inspiration' 
              ? 'bg-gray-800 text-white' 
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('inspiration')}
        >
          Inspiration
        </button>
      </div>
    </div>
  );
};

export default CosmosTabs; 