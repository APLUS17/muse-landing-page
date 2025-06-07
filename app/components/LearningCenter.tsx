import React from 'react';
import { Play, Book, Star } from 'lucide-react';

const tutorials = [
  {
    id: 1,
    title: 'Getting Started with Muse',
    duration: '5 min',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: 2,
    title: 'Advanced Editing Techniques',
    duration: '10 min',
    type: 'article',
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: 3,
    title: 'Pro Tips & Tricks',
    duration: '8 min',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
];

const LearningCenter = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tutorials.map((tutorial) => (
        <div
          key={tutorial.id}
          className="bg-gray-800/50 rounded-lg overflow-hidden hover:bg-gray-700/50 transition-colors cursor-pointer"
        >
          <div className="relative aspect-video">
            <img
              src={tutorial.thumbnail}
              alt={tutorial.title}
              className="w-full h-full object-cover"
            />
            {tutorial.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <Play className="w-12 h-12 text-white" />
              </div>
            )}
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              {tutorial.type === 'video' ? (
                <Play className="w-4 h-4 text-blue-500" />
              ) : (
                <Book className="w-4 h-4 text-green-500" />
              )}
              <span className="text-sm text-gray-400">{tutorial.duration}</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{tutorial.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LearningCenter; 