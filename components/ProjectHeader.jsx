"use client";

import React, { useState } from 'react';

// Sample project data
const sampleProjects = [
  { id: '1', name: 'PLUS ULTRA' },
  { id: '2', name: 'Neon Dreams' },
  { id: '3', name: 'Retro Wave' },
  { id: '4', name: 'Minimal Vibes' },
];

const ProjectHeader = () => {
  const [activeProject, setActiveProject] = useState(sampleProjects[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectProject = (project) => {
    setActiveProject(project);
    setIsDropdownOpen(false);
  };

  return (
    <div className="px-4 py-3 mx-4 mb-4">
      <div className="flex items-center justify-center">
        <button 
          onClick={toggleDropdown}
          className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
        >
          <h2 className="text-xl font-medium">{activeProject.name}</h2>
          <span className="text-sm mt-1">
            {isDropdownOpen ? '▲' : '▼'}
          </span>
        </button>
      </div>

      {/* Project Dropdown */}
      {isDropdownOpen && (
        <div className="mt-2 bg-gray-800 rounded-lg overflow-hidden absolute left-1/2 transform -translate-x-1/2 z-50 w-64 shadow-lg">
          <div className="py-1">
            {sampleProjects.map((project) => (
              <button
                key={project.id}
                className={`w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors ${
                  project.id === activeProject.id ? 'bg-gray-700 text-white' : 'text-gray-300'
                }`}
                onClick={() => selectProject(project)}
              >
                {project.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectHeader; 