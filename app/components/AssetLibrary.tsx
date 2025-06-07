import React from 'react';
import { Music, Image, Film, Download } from 'lucide-react';

const assets = [
  {
    id: 1,
    title: 'Summer Vibes',
    type: 'audio',
    category: 'Music',
    downloads: '1.2k',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: 2,
    title: 'Cinematic Pack',
    type: 'video',
    category: 'Effects',
    downloads: '850',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: 3,
    title: 'Abstract Shapes',
    type: 'image',
    category: 'Graphics',
    downloads: '2.1k',
    thumbnail: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
];

const AssetLibrary = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {assets.map((asset) => (
        <div
          key={asset.id}
          className="bg-gray-800/50 rounded-lg overflow-hidden hover:bg-gray-700/50 transition-colors cursor-pointer group"
        >
          <div className="relative aspect-video">
            <img
              src={asset.thumbnail}
              alt={asset.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button className="p-3 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors">
                <Download className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              {asset.type === 'audio' && <Music className="w-4 h-4 text-blue-500" />}
              {asset.type === 'video' && <Film className="w-4 h-4 text-green-500" />}
              {asset.type === 'image' && <Image className="w-4 h-4 text-purple-500" />}
              <span className="text-sm text-gray-400">{asset.category}</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{asset.title}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <Download className="w-4 h-4" />
              <span>{asset.downloads}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AssetLibrary; 