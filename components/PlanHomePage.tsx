'use client';

import React, { useState } from 'react';
import { Clock, Plus, FileText, Video, Grid, Camera, Calendar, ArrowLeft, Image, Upload, Instagram, Music2 } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import CalendarView from './CalendarView';

interface Post {
  id: number;
  type: 'post' | 'story' | 'reel';
  content: string;
  status: 'scheduled' | 'draft';
  scheduled: Date | null;
  platform?: 'instagram' | 'tiktok';
}

interface SchedulerModalProps {
  onClose: () => void;
  onSchedule: (date: Date) => void;
}

interface PostDetailsModalProps {
  post: Post;
  scheduled: Date;
  onClose: () => void;
}

interface FABProps {
  onUpload: () => void;
  onSchedule: () => void;
  onImport: () => void;
}

interface PlatformSelectorProps {
  selectedPlatform: string;
  onSelectPlatform: (platform: string) => void;
}

const FAB = ({ onUpload, onSchedule, onImport }: FABProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const fabOptions = [
    { icon: Upload, label: 'Upload Post', onClick: onUpload },
    { icon: Clock, label: 'Create Schedule', onClick: onSchedule },
    { icon: Image, label: 'Import from Gallery', onClick: onImport },
  ];

  return (
    <div className="fixed bottom-24 right-4 flex flex-col-reverse items-end gap-2">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex flex-col gap-2"
          >
            {fabOptions.map(({ icon: Icon, label, onClick }) => (
              <motion.button
                key={label}
                onClick={() => {
                  setIsOpen(false);
                  onClick();
                }}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={18} />
                <span className="text-sm">{label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus size={24} className={`transform transition-transform ${isOpen ? 'rotate-45' : ''}`} />
      </motion.button>
    </div>
  );
};

const PlatformSelector = ({ selectedPlatform, onSelectPlatform }: PlatformSelectorProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const platforms = [
    { id: 'all', label: 'All', icon: Grid },
    { id: 'instagram', label: 'Instagram', icon: Instagram },
    { id: 'tiktok', label: 'TikTok', icon: Grid }, // Replace with TikTok icon when available
  ];

  return (
    <div className="relative">
      <motion.div 
        className="flex gap-2"
        layout
      >
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full ${
            selectedPlatform === 'all' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Grid className="w-4 h-4" />
          <span>All</span>
        </motion.button>

        <AnimatePresence>
          {isExpanded && (
            <>
              {platforms.slice(1).map((platform) => (
                <motion.button
                  key={platform.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  onClick={() => {
                    onSelectPlatform(platform.id);
                    setIsExpanded(false);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                    selectedPlatform === platform.id ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <platform.icon className="w-4 h-4" />
                  <span>{platform.label}</span>
                </motion.button>
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const SchedulerModal = ({ onClose, onSchedule }: SchedulerModalProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('12:00');

  const handleAdd = () => {
    const [hours, minutes] = selectedTime.split(':');
    const finalDate = new Date(selectedDate);
    finalDate.setHours(parseInt(hours));
    finalDate.setMinutes(parseInt(minutes));
    onSchedule(finalDate);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-6 rounded-2xl w-[320px] shadow-xl border border-zinc-800">
        <div className="flex justify-between items-center mb-4">
          <button onClick={onClose} className="text-zinc-400 hover:text-white font-medium text-sm transition-colors">Cancel</button>
          <h3 className="font-semibold text-sm text-white">Schedule</h3>
          <button onClick={handleAdd} className="text-blue-500 font-semibold text-sm hover:text-blue-400 transition-colors">Add</button>
        </div>
        <div className="text-left text-sm text-zinc-400 mb-2">Date</div>
        <input
          type="date"
          value={selectedDate.toISOString().split('T')[0]}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          className="w-full bg-zinc-800 border-zinc-700 text-white px-3 py-2 rounded-md text-sm mb-4"
        />
        <div className="text-left text-sm text-zinc-400 mb-2">Time</div>
        <input
          type="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="w-full bg-zinc-800 border-zinc-700 text-white px-3 py-2 rounded-md text-sm"
        />
      </div>
    </div>
  );
};

const PostDetailsModal = ({ post, scheduled, onClose }: PostDetailsModalProps) => {
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState('');
  const maxCaptionLength = 2200;

  const handleSave = () => {
    showToast('Post scheduled successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-zinc-900 p-6 rounded-2xl w-[340px] shadow-xl border border-zinc-800"
      >
        <div className="flex justify-between items-center mb-4">
          <button onClick={onClose} className="text-zinc-400 hover:text-white text-sm transition-colors">Cancel</button>
          <h3 className="font-semibold text-white text-sm">Post Details</h3>
          <button onClick={handleSave} className="text-blue-500 text-sm font-semibold hover:text-blue-400 transition-colors">Save</button>
        </div>
        <div className="relative group">
          <img src={post.content} alt="Preview" className="w-full h-48 object-cover rounded mb-4" />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity rounded" />
        </div>
        <p className="text-xs text-zinc-400 mb-1">Scheduled for {scheduled.toLocaleString()}</p>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm text-zinc-300">Caption</label>
            <span className="text-xs text-zinc-400">{caption.length}/{maxCaptionLength}</span>
          </div>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value.slice(0, maxCaptionLength))}
            className="w-full bg-zinc-800 border-zinc-700 text-white px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="Write a caption..."
          />
        </div>
        <div>
          <label className="block text-sm text-zinc-300 mb-1">Tags / Hashtags</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full bg-zinc-800 border-zinc-700 text-white px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="#muse #content"
          />
        </div>
      </motion.div>
    </div>
  );
};

const showToast = (message: string) => {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-zinc-800 text-white px-4 py-2 rounded-full shadow-lg z-50 border border-zinc-700';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
};

const PlanHomePage = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activePlatform, setActivePlatform] = useState('all');
  const [showScheduler, setShowScheduler] = useState(false);
  const [showPostDetails, setShowPostDetails] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showCalendarView, setShowCalendarView] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  const posts: Post[] = [
    { id: 1, type: 'post', content: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop', status: 'scheduled', scheduled: new Date('2025-06-01 14:00') },
    { id: 2, type: 'story', content: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop', status: 'scheduled', scheduled: new Date('2025-06-02 16:30') },
    { id: 3, type: 'reel', content: 'https://images.unsplash.com/photo-1418065460487-3956c3ac7f12?w=300&h=300&fit=crop', status: 'draft', scheduled: null },
    { id: 4, type: 'post', content: 'https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?w=300&h=300&fit=crop', status: 'scheduled', scheduled: new Date('2025-06-03 12:00') },
    { id: 5, type: 'story', content: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=300&h=300&fit=crop', status: 'draft', scheduled: null },
    { id: 6, type: 'reel', content: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop', status: 'scheduled', scheduled: new Date('2025-06-04 18:00') },
  ];

  const tabs = [
    { id: 'posts', label: 'POSTS', icon: Grid },
    { id: 'stories', label: 'STORIES', icon: Camera },
    { id: 'reels', label: 'REELS', icon: Video },
  ];

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'scheduled', label: 'Scheduled' },
    { id: 'draft', label: 'Drafts' },
  ];

  const filteredPosts = posts.filter(
    (post) =>
      post.type === activeTab.slice(0, -1) &&
      (activeFilter === 'all' || post.status === activeFilter)
  );

  const handleScheduleClick = (post: Post) => {
    setSelectedPost(post);
    setShowScheduler(true);
  };

  const handleDateScheduled = (date: Date) => {
    setScheduledDate(date);
    setShowScheduler(false);
    setShowPostDetails(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="sticky top-0 bg-black/80 backdrop-blur-md z-10 border-b border-zinc-800/50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="mr-4">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-zinc-900 rounded-full text-zinc-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </motion.button>
              </Link>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <h1 className="font-bold text-xl text-white">@yourusername</h1>
            </div>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowCalendarView(true)} 
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <Calendar className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        <PlatformSelector
          selectedPlatform={selectedPlatform}
          onSelectPlatform={setSelectedPlatform}
        />

        <div className="px-4 pt-4 flex space-x-4 text-sm border-b border-zinc-800/50 pb-2">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`${
                activeFilter === filter.id 
                  ? 'text-blue-500 font-semibold border-b-2 border-blue-500 pb-1' 
                  : 'text-zinc-400 hover:text-white'
              } transition-colors`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="px-4 py-3 flex space-x-6 border-b border-zinc-800/50">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-1 text-sm ${
                activeTab === id 
                  ? 'text-blue-500 font-semibold border-b-2 border-blue-500 pb-1' 
                  : 'text-zinc-400 hover:text-white'
              } transition-colors`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="pb-24">
        <div className="p-4 grid grid-cols-3 gap-3">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ scale: 1.02 }}
              className="relative aspect-square group rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50"
            >
              <img src={post.content} alt="Post" className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 flex gap-1">
                {post.status === 'scheduled' && (
                  <div className="bg-blue-500/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Scheduled</span>
                  </div>
                )}
                {post.status === 'draft' && (
                  <div className="bg-zinc-600/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    <span>Draft</span>
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleScheduleClick(post)}
                  className="opacity-0 group-hover:opacity-100 bg-blue-500 text-white rounded-full p-3 shadow-lg"
                >
                  <Clock className="w-5 h-5" />
                </motion.button>
              </div>
              {post.scheduled && (
                <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                  {post.scheduled.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}{' '}
                  {post.scheduled.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <FAB
        onUpload={() => {/* Handle upload */}}
        onSchedule={() => setShowScheduler(true)}
        onImport={() => {/* Handle import */}}
      />

      <AnimatePresence>
        {showScheduler && selectedPost && (
          <SchedulerModal
            onClose={() => setShowScheduler(false)}
            onSchedule={handleDateScheduled}
          />
        )}

        {showPostDetails && selectedPost && scheduledDate && (
          <PostDetailsModal
            post={selectedPost}
            scheduled={scheduledDate}
            onClose={() => setShowPostDetails(false)}
          />
        )}

        {showCalendarView && (
          <CalendarView
            onClose={() => setShowCalendarView(false)}
            posts={posts.filter(post => post.scheduled !== null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlanHomePage; 