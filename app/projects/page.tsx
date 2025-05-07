"use client";

import { useState, useRef, useEffect } from 'react';
import { Bell, User, Search, Play, Pause, MoreHorizontal, Share2, Plus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import MobileLayout from '@/components/MobileLayout';

// CSS for 3D cube animation and styling
const cubeStyles = `
  .scene {
    perspective: 600px;
    transform-style: preserve-3d;
    position: relative;
    width: 100%;
    height: 100%;
  }

  .cube {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transform: translateZ(-50px) rotateX(10deg) rotateY(-20deg);
    animation: floating 5s ease-in-out infinite;
  }

  .cube-face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: visible;
    border: none;
    outline: none;
  }

  .cube-face-front {
    transform: rotateY(0deg) translateZ(50px);
  }

  .cube-face-back {
    transform: rotateY(180deg) translateZ(50px);
  }

  .cube-face-right {
    transform: rotateY(90deg) translateZ(50px);
  }

  .cube-face-left {
    transform: rotateY(-90deg) translateZ(50px);
  }

  .cube-face-top {
    transform: rotateX(90deg) translateZ(50px);
  }

  .cube-face-bottom {
    transform: rotateX(-90deg) translateZ(50px);
  }

  .cube:hover {
    animation-play-state: paused;
    transform: translateZ(-50px) rotateX(15deg) rotateY(-25deg);
  }

  @keyframes floating {
    0% {
      transform: translateZ(-50px) rotateX(10deg) rotateY(-20deg) translateY(0px);
    }
    50% {
      transform: translateZ(-50px) rotateX(10deg) rotateY(-10deg) translateY(-10px);
    }
    100% {
      transform: translateZ(-50px) rotateX(10deg) rotateY(-20deg) translateY(0px);
    }
  }

  /* Custom animations for each cube to make them feel more alive */
  .cube-1 { animation-delay: 0s; }
  .cube-2 { animation-delay: 0.7s; }
  .cube-3 { animation-delay: 1.4s; }
  .cube-4 { animation-delay: 0.3s; }
  .cube-5 { animation-delay: 1.1s; }
  .cube-6 { animation-delay: 1.8s; }
`;

interface CubeProps {
  className: string;
  faceContent: React.ReactNode;
  projectId: string;
  isPlaying: boolean;
  onClick: () => void;
}

const Cube: React.FC<CubeProps> = ({ className, faceContent, projectId, isPlaying, onClick }) => {
  return (
    <Link href={`/projects/${projectId}`}>
      <div className="scene mb-4">
        <div className={`cube ${className}`}>
          <div className="cube-face cube-face-front rounded-lg overflow-hidden">{faceContent}</div>
          <div className="cube-face cube-face-back rounded-lg overflow-hidden bg-transparent"></div>
          <div className="cube-face cube-face-right rounded-lg overflow-hidden bg-transparent"></div>
          <div className="cube-face cube-face-left rounded-lg overflow-hidden bg-transparent"></div>
          <div className="cube-face cube-face-top rounded-lg overflow-hidden bg-transparent"></div>
          <div className="cube-face cube-face-bottom rounded-lg overflow-hidden bg-transparent"></div>
          
          <button 
            className="absolute bottom-2 right-2 bg-gray-800/80 p-2 rounded-md z-10"
            onClick={(e) => {
              e.preventDefault();
              onClick();
            }}
            style={{ transform: "translateZ(60px)" }}
          >
            {isPlaying ? <Play size={16} /> : <Pause size={16} />}
          </button>
        </div>
      </div>
    </Link>
  );
};

interface PlayingState {
  project1: boolean;
  project2: boolean;
  project3: boolean;
  project4: boolean;
  project5: boolean;
  project6: boolean;
}

export default function ProjectsPage() {
  const [isPlaying, setIsPlaying] = useState<PlayingState>({
    'project1': false,
    'project2': true,
    'project3': false,
    'project4': false,
    'project5': false,
    'project6': false
  });
  const [projectTitles, setProjectTitles] = useState({
    'project1': 'Zarkin',
    'project2': 'untitled project',
    'project3': 'untitled project',
    'project4': '67 west st',
    'project5': 'untitled project',
    'project6': 'untitled project'
  });

  const togglePlay = (projectId: keyof PlayingState) => {
    setIsPlaying(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  // Add the cube styles to the document
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = cubeStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Load saved project titles from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTitles = localStorage.getItem('projectTitles');
      if (savedTitles) {
        const titlesMap = JSON.parse(savedTitles);
        setProjectTitles(prev => ({
          ...prev,
          ...titlesMap
        }));
      }
    }
  }, []);

  return (
    <MobileLayout>
      <div className="flex flex-col bg-black text-white">
        {/* Status Bar */}
        <div className="flex justify-between items-center pt-2 px-4 pb-6">
          <div className="text-sm">9:41</div>
          <div className="flex items-center space-x-1">
            <div className="font-bold">●●●</div>
            <div className="font-bold">●●</div>
            <div className="font-bold">●●●</div>
          </div>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center px-4 pb-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <button className="bg-gray-800 p-3 rounded-full">
                <ArrowLeft size={20} />
              </button>
            </Link>
            <h1 className="text-xl font-semibold">[untitled]</h1>
          </div>
          <div className="flex space-x-2">
            <button className="bg-gray-800 p-3 rounded-full">
              <Bell size={20} />
            </button>
            <button className="bg-gray-800 p-3 rounded-full">
              <User size={20} />
            </button>
            <button className="bg-gray-800 p-3 rounded-full">
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Projects Grid - Now with 3D Cubes */}
        <div className="px-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Project 1 */}
            <div>
              <div className="relative aspect-square mb-2">
                <Cube 
                  className="cube-1"
                  projectId="project1"
                  isPlaying={isPlaying.project1}
                  onClick={() => togglePlay('project1')}
                  faceContent={
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                      <div className="relative">
                        <div className="h-20 w-20 rounded-full bg-white/20 absolute animate-ping opacity-50"></div>
                        <div className="h-16 w-16 rounded-full bg-white/40 flex items-center justify-center">
                          <div className="h-8 w-8 rounded-full bg-white/70"></div>
                        </div>
                      </div>
                    </div>
                  }
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{projectTitles.project1}</h3>
                  <p className="text-xs text-gray-400">untitledinbra...</p>
                </div>
                <button>
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>

            {/* Project 2 */}
            <div>
              <div className="relative aspect-square mb-2">
                <Cube 
                  className="cube-2"
                  projectId="project2"
                  isPlaying={isPlaying.project2}
                  onClick={() => togglePlay('project2')}
                  faceContent={
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-purple-600 flex items-center justify-center">
                      <div className="grid grid-cols-3 grid-rows-3 gap-1 w-3/4 h-3/4">
                        {[...Array(9)].map((_, i) => (
                          <div key={i} className="bg-white/30 rounded-sm animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                        ))}
                      </div>
                    </div>
                  }
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{projectTitles.project2}</h3>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-gray-600 flex items-center justify-center mr-1">
                      <span className="text-xs">●</span>
                    </div>
                    <p className="text-xs text-gray-400">untitledin...</p>
                  </div>
                </div>
                <button>
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>

            {/* Project 3 */}
            <div>
              <div className="relative aspect-square mb-2">
                <Cube 
                  className="cube-3"
                  projectId="project3"
                  isPlaying={isPlaying.project3}
                  onClick={() => togglePlay('project3')}
                  faceContent={
                    <div className="absolute inset-0 bg-gradient-to-bl from-emerald-400 to-blue-500 flex items-center justify-center">
                      <div className="relative w-3/4 h-3/4">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-16 w-16 border-4 border-white/40 rounded-full"></div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center rotate-45">
                          <div className="h-24 w-24 border-4 border-white/20 rounded-full"></div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center rotate-90">
                          <div className="h-32 w-32 border-4 border-white/10 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  }
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{projectTitles.project3}</h3>
                  <p className="text-xs text-gray-400">untitledinbra...</p>
                </div>
                <button>
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>

            {/* Project 4 - Grid */}
            <div>
              <div className="relative aspect-square mb-2">
                <Cube 
                  className="cube-4"
                  projectId="project4"
                  isPlaying={isPlaying.project4}
                  onClick={() => togglePlay('project4')}
                  faceContent={
                    <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 via-purple-900 to-violet-600 flex items-center justify-center">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div className="w-24 h-24 bg-white/10 rounded-lg rotate-45"></div>
                        <div className="absolute w-16 h-16 bg-white/20 rounded-lg rotate-12"></div>
                        <div className="absolute w-8 h-8 bg-white/40 rounded-lg -rotate-12"></div>
                      </div>
                    </div>
                  }
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{projectTitles.project4}</h3>
                  <p className="text-xs text-gray-400">(demos)</p>
                  <p className="text-xs text-gray-400">4 items</p>
                </div>
                <button>
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>

            {/* Project 5 */}
            <div>
              <div className="relative aspect-square mb-2">
                <Cube 
                  className="cube-5"
                  projectId="project5"
                  isPlaying={isPlaying.project5}
                  onClick={() => togglePlay('project5')}
                  faceContent={
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-700 flex items-center justify-center overflow-hidden">
                      <div className="relative">
                        {[...Array(5)].map((_, i) => (
                          <div 
                            key={i} 
                            className="absolute rounded-full border-2 border-white/30"
                            style={{
                              width: `${(i+1) * 20}px`,
                              height: `${(i+1) * 20}px`,
                              animationName: 'ripple',
                              animationDuration: '3s',
                              animationDelay: `${i * 0.2}s`,
                              animationIterationCount: 'infinite',
                              animationTimingFunction: 'ease-out'
                            }}
                          ></div>
                        ))}
                        <style jsx>{`
                          @keyframes ripple {
                            0% { transform: scale(0.8); opacity: 1; }
                            100% { transform: scale(2); opacity: 0; }
                          }
                        `}</style>
                      </div>
                    </div>
                  }
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{projectTitles.project5}</h3>
                  <div className="w-4 h-4 rounded-full bg-gray-600 flex items-center justify-center mr-1">
                    <span className="text-xs">●</span>
                  </div>
                  <p className="text-xs text-gray-400">untitledin...</p>
                </div>
                <button>
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>

            {/* Project 6 */}
            <div>
              <div className="relative aspect-square mb-2">
                <Cube 
                  className="cube-6"
                  projectId="project6"
                  isPlaying={isPlaying.project6}
                  onClick={() => togglePlay('project6')}
                  faceContent={
                    <div className="absolute inset-0 bg-gradient-to-bl from-rose-400 via-fuchsia-500 to-indigo-500 flex items-center justify-center">
                      <div className="h-full w-full flex items-center justify-center">
                        <div className="relative">
                          <div className="h-20 w-4 bg-white/30 rounded-full rotate-45 absolute"></div>
                          <div className="h-20 w-4 bg-white/30 rounded-full -rotate-45 absolute"></div>
                          <div className="h-4 w-20 bg-white/30 rounded-full rotate-45 absolute"></div>
                          <div className="h-4 w-20 bg-white/30 rounded-full -rotate-45 absolute"></div>
                          <div className="h-8 w-8 bg-white/60 rounded-full absolute"></div>
                        </div>
                      </div>
                    </div>
                  }
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{projectTitles.project6}</h3>
                  <div className="w-4 h-4 rounded-full bg-gray-600 flex items-center justify-center mr-1">
                    <span className="text-xs">●</span>
                  </div>
                  <p className="text-xs text-gray-400">untitledin...</p>
                </div>
                <button>
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Now Playing Bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[390px] bg-gray-900 px-4 py-3 flex justify-between items-center rounded-t-xl">
        <div className="flex items-center">
          <button 
            className="bg-gray-700 p-3 rounded-full mr-3"
            onClick={() => setIsPlaying(prev => ({...prev, project1: !prev.project1}))}
          >
            <Pause size={16} />
          </button>
          <div>
            <p className="text-sm font-medium">zarkin mix 2</p>
            <p className="text-xs text-gray-400">{projectTitles.project1} • untitled</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <button>
            <Share2 size={20} />
          </button>
          <button>
            <Plus size={20} />
          </button>
        </div>
      </div>
    </MobileLayout>
  );
} 