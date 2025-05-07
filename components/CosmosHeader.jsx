import React from 'react';

const CosmosHeader = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-800">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-700 rounded-md flex items-center justify-center mr-3">
          <span className="text-xl">⬢</span>
        </div>
        <div>
          <h1 className="font-medium text-white">Cosmos: Curated Inspiration</h1>
          <p className="text-sm text-gray-400">Open in the Cosmos app</p>
        </div>
      </div>
      <button className="bg-blue-500 hover:bg-blue-600 transition-colors text-white px-6 py-2 rounded-full font-medium">
        OPEN
      </button>
    </div>
  );
};

export default CosmosHeader; 