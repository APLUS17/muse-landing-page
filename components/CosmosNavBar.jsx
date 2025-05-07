import React from 'react';
import Link from 'next/link';

const navItems = [
  { name: 'Home', icon: '🏠', path: '/moodboard' },
  { name: 'Search', icon: '🔍', path: '/search' },
  { name: 'Add', icon: '➕', path: '/create' },
  { name: 'Activity', icon: '⚡', path: '/activity' },
  { name: 'Profile', icon: '👤', path: '/profile' },
];

const CosmosNavBar = () => {
  const pathname = '/moodboard'; // Hardcoded for this demo

  return (
    <nav className="w-full bg-black/95 backdrop-blur-sm border-t border-white/10 py-2 z-50">
      <div className="flex justify-around items-center">
        {navItems.map((item, idx) => (
          <Link
            key={idx}
            href={item.path}
            className={`flex flex-col items-center py-1 transition-colors ${
              pathname === item.path 
                ? 'text-white' 
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <span className="text-xl mb-1">{item.icon}</span>
            {/* No text labels to match Cosmos design */}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default CosmosNavBar; 