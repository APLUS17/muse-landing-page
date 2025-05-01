import React from 'react';
import { Play } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'FuRTHER_BeYOND',
    author: 'ApLus',
    gradient: 'from-orange-600 to-red-600',
    overlay: 'bg-gradient-to-br from-orange-900/50 to-red-900/50'
  },
  {
    id: 2,
    title: 'TVPLUS +',
    author: 'ApLus',
    gradient: 'from-blue-600 to-purple-600',
    overlay: 'bg-gradient-to-br from-blue-900/50 to-purple-900/50'
  },
  {
    id: 3,
    title: '+Beats',
    author: 'ntes',
    gradient: 'from-sky-500 to-blue-600',
    overlay: 'bg-gradient-to-br from-sky-900/50 to-blue-900/50'
  }
];

const RecentProjects = () => (
  <div className="px-4 py-4">
    <h2 className="text-2xl font-semibold text-white mb-6">Your Recent Projects</h2>
    <div className="grid grid-cols-3 gap-4 mb-6">
      {projects.map((project) => (
        <div key={project.id} className="relative group">
          <div className={`aspect-square rounded-xl overflow-hidden bg-gradient-to-br ${project.gradient}`}>
            <div className={`absolute inset-0 ${project.overlay}`} />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Play className="w-5 h-5 text-white ml-1" />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
              <h3 className="text-white font-medium text-sm">{project.title}</h3>
              <p className="text-white/70 text-xs">{project.author}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="flex gap-3">
      <button className="flex-1 py-3 rounded-xl bg-zinc-800 text-white font-medium hover:bg-zinc-700 transition-colors">
        GO TO PROJECTS
      </button>
      <button className="flex-1 py-3 rounded-xl bg-white text-black font-medium hover:bg-gray-100 transition-colors">
        NEW PROJECT
      </button>
    </div>
  </div>
);

export default RecentProjects; 