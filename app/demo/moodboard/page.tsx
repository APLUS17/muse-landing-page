"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Search, Grid, LayoutGrid, ImageIcon, Upload, Download, Trash2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

// Sample moodboard images
const moodboardImages = [
  {
    id: "1",
    url: "/placeholder.svg?height=400&width=400",
    alt: "Abstract purple waves",
    tags: ["abstract", "purple", "waves"],
    liked: true,
  },
  {
    id: "2",
    url: "/placeholder.svg?height=400&width=400",
    alt: "Urban night scene",
    tags: ["urban", "night", "city"],
    liked: false,
  },
  {
    id: "3",
    url: "/placeholder.svg?height=400&width=400",
    alt: "Neon lights",
    tags: ["neon", "lights", "vibrant"],
    liked: true,
  },
  {
    id: "4",
    url: "/placeholder.svg?height=400&width=400",
    alt: "Retro synth",
    tags: ["retro", "synth", "80s"],
    liked: false,
  },
  {
    id: "5",
    url: "/placeholder.svg?height=400&width=400",
    alt: "Album cover concept",
    tags: ["album", "cover", "concept"],
    liked: false,
  },
  {
    id: "6",
    url: "/placeholder.svg?height=400&width=400",
    alt: "Concert lighting",
    tags: ["concert", "lighting", "stage"],
    liked: true,
  },
  {
    id: "7",
    url: "/placeholder.svg?height=400&width=400",
    alt: "Vinyl record",
    tags: ["vinyl", "record", "analog"],
    liked: false,
  },
  {
    id: "8",
    url: "/placeholder.svg?height=400&width=400",
    alt: "Studio setup",
    tags: ["studio", "setup", "equipment"],
    liked: false,
  },
  {
    id: "9",
    url: "/placeholder.svg?height=400&width=400",
    alt: "Geometric patterns",
    tags: ["geometric", "patterns", "design"],
    liked: true,
  },
]

export default function MoodboardPage() {
  const [view, setView] = useState<"grid" | "masonry">("grid")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  // Get all unique tags
  const allTags = Array.from(new Set(moodboardImages.flatMap((image) => image.tags))).sort()

  // Filter images based on selected tags and search query
  const filteredImages = moodboardImages.filter((image) => {
    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => image.tags.includes(tag))
    const matchesSearch =
      searchQuery === "" ||
      image.alt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesTags && matchesSearch
  })

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
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
          <h1 className="text-lg font-bold">Moodboard</h1>
          <div className="w-24 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              className="border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white"
            >
              <Plus size={16} className="mr-1" /> New
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto p-4">
        {/* Search and filters */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative w-full md:w-64">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Search images..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 pl-10 pr-4 text-sm text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={view === "grid" ? "default" : "outline"}
                size="sm"
                className={view === "grid" ? "bg-blue-600" : "border-zinc-700 text-zinc-400"}
                onClick={() => setView("grid")}
              >
                <Grid size={16} />
              </Button>
              <Button
                variant={view === "masonry" ? "default" : "outline"}
                size="sm"
                className={view === "masonry" ? "bg-blue-600" : "border-zinc-700 text-zinc-400"}
                onClick={() => setView("masonry")}
              >
                <LayoutGrid size={16} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white flex items-center gap-1"
              >
                <Upload size={16} />
                <span className="hidden sm:inline">Upload</span>
              </Button>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-xs ${
                  selectedTags.includes(tag) ? "bg-blue-600 text-white" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Image grid */}
        <div
          className={
            view === "grid"
              ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
              : "columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 space-y-4"
          }
        >
          {filteredImages.map((image) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`group relative rounded-lg overflow-hidden ${
                view === "masonry" ? "break-inside-avoid mb-4" : ""
              }`}
            >
              <img
                src={image.url || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-auto object-cover aspect-square"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                <div className="text-sm font-medium mb-1">{image.alt}</div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {image.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-black/30 px-1.5 py-0.5 rounded-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between">
                  <button className="text-zinc-300 hover:text-white">
                    <Download size={16} />
                  </button>
                  <div className="flex gap-2">
                    <button className="text-zinc-300 hover:text-white">
                      <Trash2 size={16} />
                    </button>
                    <button className={image.liked ? "text-red-500" : "text-zinc-300 hover:text-white"}>
                      <Heart size={16} fill={image.liked ? "currentColor" : "none"} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Upload placeholder */}
          <div
            className={`border-2 border-dashed border-zinc-700 rounded-lg flex flex-col items-center justify-center p-6 cursor-pointer hover:border-blue-500 transition-colors ${
              view === "masonry" ? "break-inside-avoid mb-4" : "aspect-square"
            }`}
          >
            <ImageIcon size={24} className="text-zinc-500 mb-2" />
            <p className="text-sm text-zinc-500 text-center">Drag & drop or click to upload</p>
          </div>
        </div>
      </main>
    </div>
  )
}
