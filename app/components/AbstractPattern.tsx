import React from 'react';
import { Play } from 'lucide-react';

interface AbstractPatternProps {
  variant: 1 | 2 | 3 | 4;
  className?: string;
  isTrackList?: boolean;
  trackNumber?: number;
}

const AbstractPattern: React.FC<AbstractPatternProps> = ({ variant, className = '', isTrackList = false, trackNumber }) => {
  if (isTrackList) {
    return (
      <div className="flex items-center w-full h-full px-4 py-2">
        <div className="w-8 text-sm text-gray-400 font-medium">{trackNumber}</div>
        <div className="flex-1 flex items-center">
          <div className="flex-1">
            <div className="h-2 w-24 bg-gray-600 rounded-full mb-2"></div>
            <div className="h-2 w-16 bg-gray-700 rounded-full"></div>
          </div>
          <div className="text-sm text-gray-500">3:45</div>
        </div>
      </div>
    );
  }

  const patterns = {
    1: (
      <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#1a1a1a', stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: '#000000', stopOpacity: 0.9 }} />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill="url(#grad1)" />
        <path d="M20,20 Q50,50 80,80" stroke="#333" strokeWidth="0.5" fill="none" />
        <path d="M80,20 Q50,50 20,80" stroke="#333" strokeWidth="0.5" fill="none" />
      </svg>
    ),
    2: (
      <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="grad2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style={{ stopColor: '#2a2a2a', stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: '#000000', stopOpacity: 0.9 }} />
          </radialGradient>
        </defs>
        <rect x="10" y="10" width="80" height="80" fill="url(#grad2)" />
        {Array.from({ length: 5 }).map((_, i) => (
          <line
            key={i}
            x1="10"
            y1={20 + i * 15}
            x2="90"
            y2={20 + i * 15}
            stroke="#333"
            strokeWidth="0.5"
          />
        ))}
      </svg>
    ),
    3: (
      <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#1a1a1a', stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: '#000000', stopOpacity: 0.9 }} />
          </linearGradient>
        </defs>
        <polygon points="50,10 90,90 10,90" fill="url(#grad3)" />
        <circle cx="50" cy="50" r="20" stroke="#333" strokeWidth="0.5" fill="none" />
      </svg>
    ),
    4: (
      <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="grad4" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
            <stop offset="0%" style={{ stopColor: '#2a2a2a', stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: '#000000', stopOpacity: 0.9 }} />
          </radialGradient>
        </defs>
        <path
          d="M10,10 L90,10 L90,90 L10,90 Z"
          fill="url(#grad4)"
        />
        {Array.from({ length: 3 }).map((_, i) => (
          <circle
            key={i}
            cx="50"
            cy="50"
            r={15 + i * 10}
            stroke="#333"
            strokeWidth="0.5"
            fill="none"
          />
        ))}
      </svg>
    ),
  };

  return (
    <div className={`w-full h-full ${className}`}>
      {patterns[variant]}
    </div>
  );
};

export default AbstractPattern; 