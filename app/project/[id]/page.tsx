'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const ProjectPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  // This would typically come from an API or database
  const projectData = {
    '1': {
      title: 'Endless Sunshine',
      description: 'Reels Covers',
      imageUrl: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=1000',
      details: 'Create stunning reels with a summer vibe.',
    },
    '2': {
      title: 'Summer Vibes',
      description: 'Reels Covers',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000',
      details: 'Perfect for your summer content creation.',
    },
    '3': {
      title: 'Ocean Dreams',
      description: 'Reels Covers',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000',
      details: 'Capture the essence of ocean tranquility.',
    },
    '4': {
      title: 'Mountain Escape',
      description: 'Reels Covers',
      imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000',
      details: 'Majestic mountain views for your content.',
    },
  };

  const project = projectData[params.id as keyof typeof projectData];

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Project not found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-sm z-50">
        <div className="flex items-center justify-between px-4 py-4">
          <button 
            onClick={() => router.back()}
            className="text-white p-2 rounded-full hover:bg-white/10"
          >
            ←
          </button>
          <h1 className="text-xl font-bold">{project.title}</h1>
          <button className="p-2 rounded-full hover:bg-white/10">
            ⋮
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16">
        {/* Hero Image */}
        <div className="relative h-[40vh] w-full">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-32"/>
        </div>

        {/* Project Info */}
        <div className="px-4 py-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
            <p className="text-white/70">{project.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">About this template</h3>
            <p className="text-white/70">{project.details}</p>
          </div>

          {/* Action Buttons */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/95 backdrop-blur-sm border-t border-white/10">
            <div className="flex gap-4">
              <button className="flex-1 bg-white text-black py-3 rounded-xl font-semibold">
                Use Template
              </button>
              <button className="flex-1 bg-white/10 text-white py-3 rounded-xl font-semibold">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProjectPage; 