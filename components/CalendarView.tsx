import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CalendarViewProps {
  onClose: () => void;
  posts: Array<{
    id: number;
    type: 'post' | 'story' | 'reel';
    scheduled: Date | null;
  }>;
}

interface BottomSheetProps {
  selectedDate: Date;
  onClose: () => void;
}

const BottomSheet = ({ selectedDate, onClose }: BottomSheetProps) => {
  const contentTypes = [
    { type: 'Posts', icon: Plus },
    { type: 'Stories', icon: Plus },
    { type: 'Reels', icon: Plus },
  ];

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 z-50"
    >
      <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
      
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {selectedDate.toLocaleDateString('en-US', { 
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        })}
      </h2>

      <div className="space-y-4">
        {contentTypes.map(({ type, icon: Icon }) => (
          <div key={type} className="border-b border-gray-100 pb-4">
            <h3 className="text-gray-900 font-semibold mb-3">{type}</h3>
            <button className="w-24 h-24 bg-gray-50 rounded-lg flex items-center justify-center">
              <Icon className="w-8 h-8 text-gray-400" />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const WeekView = ({ days, onDayClick }: { 
  days: Array<{ date: Date; isCurrentMonth: boolean }>;
  onDayClick: (date: Date) => void;
}) => {
  const formatWeekRange = (days: Array<{ date: Date }>) => {
    const firstDay = days[0].date;
    const lastDay = days[days.length - 1].date;
    const firstMonth = firstDay.toLocaleDateString('en-US', { month: 'long' });
    const lastMonth = lastDay.toLocaleDateString('en-US', { month: 'long' });
    
    if (firstMonth === lastMonth) {
      return `${firstMonth} ${firstDay.getDate()} - ${lastDay.getDate()}, ${lastDay.getFullYear()}`;
    }
    return `${firstMonth} ${firstDay.getDate()} - ${lastMonth} ${lastDay.getDate()}, ${lastDay.getFullYear()}`;
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="sticky top-0 bg-black z-10 pb-6">
        <h2 className="text-xl font-semibold text-white mb-6 px-4">
          {formatWeekRange(days)}
        </h2>
        
        {/* Horizontal Date Line */}
        <div className="px-4">
          <div className="flex justify-between items-center">
            {days.map(({ date }, index) => {
              const isToday = date.toDateString() === new Date().toDateString();
              const day = date.getDate();
              const hasContent = Math.random() > 0.5;

              return (
                <div key={index} className="flex flex-col items-center">
                  <span className={`text-base font-semibold mb-2 ${isToday ? 'text-blue-500' : 'text-white'}`}>
                    {day}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${hasContent ? 'bg-blue-500' : 'bg-zinc-600'}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Daily Content */}
      <div className="space-y-12 p-6">
        {days.map(({ date }, index) => {
          const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
          const formattedDate = date.toLocaleDateString('en-US', { 
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          });

          return (
            <div key={index} className="border-b border-zinc-800/50 pb-12 last:border-b-0">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-base font-semibold text-white">
                  {dayName} - {formattedDate}
                </h3>
              </div>

              <div className="space-y-8">
                {['Posts', 'Stories', 'Reels'].map((type) => (
                  <div key={type}>
                    <h4 className="text-sm font-medium mb-4 text-white">{type}</h4>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onDayClick(date)}
                      className="w-32 h-32 bg-zinc-900/50 rounded-xl flex items-center justify-center border border-zinc-800/50 hover:border-white/20 transition-colors"
                    >
                      <Plus className="w-8 h-8 text-zinc-400" />
                    </motion.button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CalendarView = ({ onClose, posts }: CalendarViewProps) => {
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const days = [];

    // Add days from previous month
    const prevMonthDays = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    const prevMonth = new Date(year, month, 0);
    for (let i = prevMonthDays - 1; i >= 0; i--) {
      days.unshift({
        date: new Date(year, month - 1, prevMonth.getDate() - i),
        isCurrentMonth: false
      });
    }

    // Add days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }

    // Add days from next month
    const remainingDays = 42 - days.length; // 6 rows * 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      });
    }

    return days;
  };

  const getWeekDays = (date: Date) => {
    const days = [];
    const currentDay = date.getDay();
    const monday = new Date(date);
    monday.setDate(date.getDate() - (currentDay === 0 ? 6 : currentDay - 1));

    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      days.push({
        date: day,
        isCurrentMonth: day.getMonth() === currentDate.getMonth()
      });
    }

    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(currentDate.getDate() - 7);
    } else {
      newDate.setDate(currentDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };

  const days = viewMode === 'month' ? getDaysInMonth(currentDate) : getWeekDays(currentDate);

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800/50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="text-base font-semibold text-white">
            {viewMode === 'month' && `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
          </div>
          
          <div className="w-6" />
        </div>

        {/* View Toggle */}
        <div className="px-4 py-3">
          <div className="flex w-fit gap-1">
            {['Month', 'Week'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode.toLowerCase() as 'month' | 'week')}
                className={`px-6 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  viewMode === mode.toLowerCase()
                    ? 'bg-blue-600 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="px-4 py-2 flex items-center justify-between">
          <button
            onClick={() => viewMode === 'month' ? navigateMonth('prev') : navigateWeek('prev')}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => viewMode === 'month' ? navigateMonth('next') : navigateWeek('next')}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {viewMode === 'month' ? (
          <div className="flex-1 p-4">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 mb-2">
              {weekDays.map((day) => (
                <div key={day} className="text-center text-sm font-medium text-zinc-400">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {days.map(({ date, isCurrentMonth }, index) => {
                const isToday = date.toDateString() === new Date().toDateString();
                const hasEvents = posts.some(
                  post => post.scheduled?.toDateString() === date.toDateString()
                );

                return (
                  <motion.div
                    key={index}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDayClick(date)}
                    className="relative aspect-square p-1 cursor-pointer"
                  >
                    <div
                      className={`w-full h-full rounded-lg p-2 ${
                        isCurrentMonth ? 'text-white' : 'text-zinc-600'
                      } ${isToday ? 'bg-blue-600/20' : ''} hover:bg-zinc-900/50 transition-colors`}
                    >
                      <span className={`text-base font-semibold ${isToday ? 'text-blue-500' : ''}`}>
                        {date.getDate()}
                      </span>
                      {hasEvents && (
                        <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-blue-500" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          <WeekView days={getWeekDays(currentDate)} onDayClick={handleDayClick} />
        )}

        {/* Bottom Sheet */}
        <AnimatePresence>
          {selectedDate && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedDate(null)}
                className="fixed inset-0 bg-black/50 z-40"
              />
              <BottomSheet
                selectedDate={selectedDate}
                onClose={() => setSelectedDate(null)}
              />
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CalendarView; 