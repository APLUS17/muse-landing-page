"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Plus,
  CalendarIcon,
  Clock,
  Music,
  ImageIcon,
  Video,
  FileText,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

// Content types
type ContentType = "track" | "visual" | "post" | "note"

// Content item interface
interface ContentItem {
  id: string
  title: string
  type: ContentType
  date: string
  time?: string
  status: "scheduled" | "published" | "draft"
  platform?: string
}

// Sample content items
const initialContentItems: ContentItem[] = [
  {
    id: "1",
    title: "Single Announcement",
    type: "post",
    date: "2025-03-15",
    time: "12:00",
    status: "published",
    platform: "Instagram",
  },
  {
    id: "2",
    title: "Teaser Video",
    type: "visual",
    date: "2025-03-18",
    time: "15:00",
    status: "published",
    platform: "TikTok",
  },
  {
    id: "3",
    title: "Behind the Scenes",
    type: "post",
    date: "2025-03-20",
    time: "18:00",
    status: "scheduled",
    platform: "Instagram",
  },
  {
    id: "4",
    title: "Single Release",
    type: "track",
    date: "2025-03-22",
    time: "00:00",
    status: "scheduled",
    platform: "All Platforms",
  },
  {
    id: "5",
    title: "Music Video",
    type: "visual",
    date: "2025-03-22",
    time: "12:00",
    status: "scheduled",
    platform: "YouTube",
  },
  {
    id: "6",
    title: "Lyrics Post",
    type: "post",
    date: "2025-03-24",
    time: "15:00",
    status: "draft",
    platform: "Instagram",
  },
  {
    id: "7",
    title: "Fan Q&A",
    type: "post",
    date: "2025-03-26",
    time: "19:00",
    status: "draft",
    platform: "Instagram",
  },
  {
    id: "8",
    title: "Acoustic Version",
    type: "track",
    date: "2025-03-29",
    time: "00:00",
    status: "draft",
    platform: "All Platforms",
  },
]

export default function RolloutTrackerPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [contentItems, setContentItems] = useState<ContentItem[]>(initialContentItems)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  // Format date as YYYY-MM-DD
  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  // Get content items for a specific date
  const getContentForDate = (date: string) => {
    return contentItems.filter((item) => item.date === date)
  }

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1))
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1))
  }

  // Get month name
  const monthName = currentMonth.toLocaleString("default", { month: "long" })

  // Check if a date has content
  const hasContent = (date: string) => {
    return contentItems.some((item) => item.date === date)
  }

  // Get content icon based on type
  const getContentIcon = (type: ContentType) => {
    switch (type) {
      case "track":
        return <Music size={16} />
      case "visual":
        return <Video size={16} />
      case "post":
        return <ImageIcon size={16} />
      case "note":
        return <FileText size={16} />
      default:
        return null
    }
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500"
      case "scheduled":
        return "bg-blue-500"
      case "draft":
        return "bg-zinc-500"
      default:
        return "bg-zinc-500"
    }
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href="/demo"
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>
          </div>
          <h1 className="text-lg font-bold">Rollout Tracker</h1>
          <div className="w-24 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              className="border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white"
            >
              <Plus size={16} className="mr-1" /> Add
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2 bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700">
            {/* Calendar header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <CalendarIcon size={18} className="text-purple-400" />
                <h2 className="text-xl font-bold">
                  {monthName} {year}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white p-1 h-8 w-8"
                  onClick={prevMonth}
                >
                  <ChevronLeft size={16} />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  onClick={() => setCurrentMonth(new Date())}
                >
                  Today
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white p-1 h-8 w-8"
                  onClick={nextMonth}
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Day names */}
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-xs text-zinc-400 font-medium py-2">
                  {day}
                </div>
              ))}

              {/* Empty cells for days before the first day of the month */}
              {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                <div key={`empty-${index}`} className="aspect-square p-1">
                  <div className="h-full rounded-md bg-zinc-800/50"></div>
                </div>
              ))}

              {/* Days of the month */}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1
                const dateString = formatDate(year, month, day)
                const isToday =
                  day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()
                const isSelected = dateString === selectedDate
                const dayHasContent = hasContent(dateString)

                return (
                  <div key={`day-${day}`} className="aspect-square p-1">
                    <button
                      className={`h-full w-full rounded-md flex flex-col items-center justify-start p-1 relative ${
                        isSelected
                          ? "bg-blue-600"
                          : isToday
                            ? "bg-purple-600/30 border border-purple-500"
                            : dayHasContent
                              ? "bg-zinc-700 hover:bg-zinc-600"
                              : "bg-zinc-800 hover:bg-zinc-700"
                      }`}
                      onClick={() => setSelectedDate(dateString)}
                    >
                      <span className={`text-sm ${isSelected || isToday ? "font-medium" : ""}`}>{day}</span>
                      {dayHasContent && (
                        <div className="absolute bottom-1 flex gap-0.5">
                          {getContentForDate(dateString)
                            .slice(0, 3)
                            .map((item, i) => (
                              <div key={i} className={`w-1.5 h-1.5 rounded-full ${getStatusColor(item.status)}`}></div>
                            ))}
                          {getContentForDate(dateString).length > 3 && (
                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-500"></div>
                          )}
                        </div>
                      )}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Content list */}
          <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Clock size={18} className="text-blue-400" />
                {selectedDate ? (
                  <span>
                    Content for{" "}
                    {new Date(selectedDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                ) : (
                  <span>Upcoming Content</span>
                )}
              </h3>
              {selectedDate && (
                <Button variant="ghost" size="sm" className="text-xs" onClick={() => setSelectedDate(null)}>
                  View All
                </Button>
              )}
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {(selectedDate
                ? getContentForDate(selectedDate)
                : contentItems.filter((item) => item.status !== "published").slice(0, 5)
              ).map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-zinc-700/50 rounded-lg p-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        item.type === "track"
                          ? "bg-purple-500/30"
                          : item.type === "visual"
                            ? "bg-blue-500/30"
                            : item.type === "post"
                              ? "bg-green-500/30"
                              : "bg-amber-500/30"
                      }`}
                    >
                      {getContentIcon(item.type)}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{item.title}</div>
                      <div className="text-xs text-zinc-400 flex items-center gap-2">
                        <span>
                          {new Date(item.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                          {item.time && ` • ${item.time}`}
                        </span>
                        {item.platform && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-zinc-500"></span>
                            <span>{item.platform}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        item.status === "published"
                          ? "bg-green-500/20 text-green-400"
                          : item.status === "scheduled"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-zinc-500/20 text-zinc-400"
                      }`}
                    >
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </div>
                    <button className="text-zinc-400 hover:text-white">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}

              {/* Empty state */}
              {selectedDate && getContentForDate(selectedDate).length === 0 && (
                <div className="text-center py-8">
                  <CalendarIcon size={32} className="mx-auto text-zinc-600 mb-2" />
                  <p className="text-zinc-500">No content scheduled for this date</p>
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-500">
                    <Plus size={16} className="mr-1" /> Add Content
                  </Button>
                </div>
              )}
            </div>

            {/* Quick actions */}
            <div className="mt-6 pt-4 border-t border-zinc-700">
              <h4 className="text-sm font-medium text-zinc-400 mb-3">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-white justify-start"
                >
                  <Music size={14} className="mr-1" /> Add Track
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-white justify-start"
                >
                  <ImageIcon size={14} className="mr-1" /> Add Post
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-white justify-start"
                >
                  <Video size={14} className="mr-1" /> Add Visual
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-white justify-start"
                >
                  <FileText size={14} className="mr-1" /> Add Note
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
