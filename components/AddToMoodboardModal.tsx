import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';

interface MoodboardProject {
  id: string;
  name: string;
  imageCount: number;
  isPrivate: boolean;
}

interface AddToMoodboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToMoodboard: (moodboardId: string) => void;
  onCreateNewMoodboard: (name: string, isPrivate: boolean) => void;
}

const AddToMoodboardModal: React.FC<AddToMoodboardModalProps> = ({
  isOpen,
  onClose,
  onAddToMoodboard,
  onCreateNewMoodboard,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewMoodboardForm, setShowNewMoodboardForm] = useState(false);
  const [newMoodboardName, setNewMoodboardName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  // Example moodboard projects (replace with real data)
  const moodboardProjects: MoodboardProject[] = [
    { id: '1', name: 'All Elements', imageCount: 24, isPrivate: true },
    { id: '2', name: 'Minef', imageCount: 5, isPrivate: false },
    { id: '3', name: 'ORNG', imageCount: 2, isPrivate: false },
    { id: '4', name: 'Jr', imageCount: 1, isPrivate: false },
    { id: '5', name: 'Minet', imageCount: 1, isPrivate: false },
  ];

  const filteredProjects = moodboardProjects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateNewMoodboard = () => {
    if (newMoodboardName.trim()) {
      onCreateNewMoodboard(newMoodboardName, isPrivate);
      setNewMoodboardName('');
      setIsPrivate(false);
      setShowNewMoodboardForm(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800">
          <h2 className="text-xl font-semibold text-white">Add to Moodboard</h2>
        </div>

        {showNewMoodboardForm ? (
          // New Moodboard Form
          <div className="p-4">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Moodboard name"
                value={newMoodboardName}
                onChange={(e) => setNewMoodboardName(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex items-center mb-6">
              <label className="flex items-center space-x-2 text-zinc-400">
                <input
                  type="checkbox"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="form-checkbox rounded bg-zinc-800 border-zinc-700 text-blue-500"
                />
                <span>Make private</span>
              </label>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleCreateNewMoodboard}
                className="flex-1 bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition-colors"
              >
                Create
              </button>
              <button
                onClick={() => setShowNewMoodboardForm(false)}
                className="flex-1 bg-zinc-800 text-white rounded-lg py-2 hover:bg-zinc-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Search */}
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search moodboards..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Moodboard List */}
            <div className="px-4 pb-4">
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {filteredProjects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => onAddToMoodboard(project.id)}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-zinc-700 rounded-lg flex items-center justify-center">
                        <span className="text-zinc-400">
                          {project.name.charAt(0)}
                        </span>
                      </div>
                      <div className="text-left">
                        <div className="text-white font-medium">{project.name}</div>
                        <div className="text-sm text-zinc-400">
                          {project.imageCount} elements
                          {project.isPrivate && ' • Private'}
                        </div>
                      </div>
                    </div>
                    <Plus className="w-5 h-5 text-zinc-400" />
                  </button>
                ))}
              </div>

              {/* Create New Moodboard Button */}
              <button
                onClick={() => setShowNewMoodboardForm(true)}
                className="w-full mt-4 flex items-center justify-center space-x-2 p-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors text-white"
              >
                <Plus className="w-5 h-5" />
                <span>Create New Moodboard</span>
              </button>
            </div>
          </>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AddToMoodboardModal; 