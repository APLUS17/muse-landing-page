import React from 'react';
import { Users, MessageSquare, Share2 } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Summer Campaign',
    members: 4,
    comments: 12,
    lastActive: '2h ago',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: 2,
    title: 'Brand Redesign',
    members: 3,
    comments: 8,
    lastActive: '5h ago',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
];

const CollaborationHub = () => {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-gray-800/50 rounded-lg overflow-hidden hover:bg-gray-700/50 transition-colors cursor-pointer"
        >
          <div className="flex items-center">
            <div className="w-24 h-24 flex-shrink-0">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 p-4">
              <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{project.members}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{project.comments}</span>
                </div>
                <span>{project.lastActive}</span>
              </div>
            </div>
            <div className="p-4">
              <button className="p-2 rounded-full hover:bg-gray-600/50 transition-colors">
                <Share2 className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollaborationHub; 