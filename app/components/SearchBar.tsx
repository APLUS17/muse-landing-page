import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="relative flex items-center gap-2">
      <div className="flex-1 relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search projects, templates, and more..."
          className="w-full bg-gray-800/50 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>
      <button className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors">
        <Filter className="w-5 h-5 text-gray-400" />
      </button>
    </div>
  );
};

export default SearchBar; 