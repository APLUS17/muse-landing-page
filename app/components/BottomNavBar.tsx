"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Studio', icon: '🎨', path: '/' },
  { name: 'Templates', icon: '📑', path: '/templates' },
  { name: 'Projects', icon: '📁', path: '/projects' },
  { name: 'Plan', icon: '📅', path: '/plan' },
  { name: 'Moodboard', icon: '🎭', path: '/moodboard' },
];

const BottomNavBar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-white/5 pb-2 z-50">
      <div className="flex justify-around items-center pt-2">
        {navItems.map((item, idx) => (
          <Link
            key={idx}
            href={item.path}
            className={`flex flex-col items-center min-w-[64px] py-1 transition-colors ${
              pathname === item.path 
                ? 'text-white' 
                : 'text-white/40 hover:text-white/60'
            }`}
          >
            <span className={`text-2xl mb-0.5 transition-transform ${
              pathname === item.path ? 'scale-110' : 'scale-100'
            }`}>
              {item.icon}
            </span>
            <span className="text-[10px] font-medium">{item.name}</span>
            {pathname === item.path && (
              <span className="absolute -bottom-2 w-1 h-1 rounded-full bg-white" />
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavBar; 