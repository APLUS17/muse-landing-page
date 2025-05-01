import React from 'react';

const actions = [
  { name: 'Reel', icon: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></svg>
  ) },
  { name: 'Story', icon: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l2 2"/></svg>
  ) },
  { name: 'Post', icon: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 4v16M16 4v16"/></svg>
  ) },
];

const ActionButtons = () => (
  <div className="w-full overflow-x-auto py-3 px-2 mt-20">
    <div className="flex items-center gap-3 min-w-max">
      {/* Create Button */}
      <button className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center shadow transition-all active:scale-95 font-bold text-2xl">
        +
      </button>
      {/* Action Buttons Group */}
      {actions.map((action, idx) => (
        <button
          key={idx}
          className="flex items-center gap-2 px-4 h-12 bg-neutral-800 text-white rounded-xl border border-transparent hover:border-white/30 transition-all"
        >
          <span className="text-white">{action.icon}</span>
          <span className="text-base font-medium text-white/90">{action.name}</span>
        </button>
      ))}
    </div>
  </div>
);

export default ActionButtons; 