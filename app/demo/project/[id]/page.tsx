"use client"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Music,
  ImageIcon,
  Video,
  FileText,
  Calendar,
  Lightbulb,
  MoreVertical,
  Edit,
  Users,
  X,
  Plus,
  Upload,
  Download,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useParams } from "next/navigation"

// Project types
type ProjectType = "music" | "visual" | "content" | "freeform"
type ProjectStatus = "in-progress" | "draft" | "completed"

// Project interface
interface Project {
  id: string
  name: string
  type: ProjectType
  status: ProjectStatus
  description?: string
  coverColor: string
  progress: number
  tracks?: Track[]
  visuals?: Visual[]
  notes?: Note[]
  collaborators?: Collaborator[]
}

// Track interface
interface Track {
  id: string
  title: string
  duration: string
  status: "draft" | "final" | "mastered"
  waveform: number[] // Simplified waveform data
}

// Visual interface
interface Visual {
  id: string
  title: string
  type: "image" | "video"
  url: string
  thumbnail?: string
}

// Note interface
interface Note {
  id: string
  title: string
  content: string
  updatedAt: string
}

// Collaborator interface
interface Collaborator {
  id: string
  name: string
  role: string
  avatar?: string
  status: "online" | "offline" | "away"
}

// Sample projects data
const projectsData: Project[] = [
  {
    id: "1",
    name: "Dreamscape",
    type: "music",
    status: "in-progress",
    description: "A dreamy EP exploring ambient soundscapes and electronic textures.",
    coverColor: "from-purple-600 to-blue-600",
    progress: 75,
    tracks: [
      {
        id: "t1",
        title: "Ethereal Dawn",
        duration: "3:45",
        status: "mastered",
        waveform: [0.2, 0.5, 0.3, 0.8, 0.6, 0.4, 0.7, 0.9, 0.5, 0.3, 0.6, 0.8, 0.4, 0.2, 0.5],
      },
      {
        id: "t2",
        title: "Midnight Pulse",
        duration: "4:12",
        status: "final",
        waveform: [0.1, 0.3, 0.7, 0.5, 0.9, 0.6, 0.2, 0.8, 0.4, 0.7, 0.3, 0.5, 0.8, 0.6, 0.4],
      },
      {
        id: "t3",
        title: "Lucid State",
        duration: "5:20",
        status: "draft",
        waveform: [0.4, 0.2, 0.6, 0.8, 0.3, 0.7, 0.5, 0.9, 0.4, 0.6, 0.2, 0.5, 0.7, 0.3, 0.8],
      },
    ],
    visuals: [
      {
        id: "v1",
        title: "Album Cover Concept",
        type: "image",
        url: "/placeholder.svg?height=400&width=400",
      },
      {
        id: "v2",
        title: "Music Video Storyboard",
        type: "image",
        url: "/placeholder.svg?height=400&width=400",
      },
    ],
    notes: [
      {
        id: "n1",
        title: "Production Notes",
        content:
          "Need to add more reverb to the synth pads in Ethereal Dawn. Consider adding a subtle delay effect to the background vocals.",
        updatedAt: "2 days ago",
      },
      {
        id: "n2",
        title: "Lyrics - Midnight Pulse",
        content:
          "First verse: In the silence of the night\nI hear the rhythm of your heart\nPulsing through the darkness\nGuiding me through the stars",
        updatedAt: "1 week ago",
      },
    ],
    collaborators: [
      {
        id: "c1",
        name: "Marcus Kim",
        role: "Producer",
        status: "online",
      },
      {
        id: "c2",
        name: "Jamie Chen",
        role: "Visual Artist",
        status: "away",
      },
      {
        id: "c3",
        name: "Taylor West",
        role: "Writer",
        status: "offline",
      },
    ],
  },
  {
    id: "2",
    name: "Midnight Tapes",
    type: "music",
    status: "draft",
    coverColor: "from-teal-500 to-emerald-500",
    progress: 30,
    tracks: [
      {
        id: "t1",
        title: "Neon Streets",
        duration: "3:22",
        status: "draft",
        waveform: [0.3, 0.6, 0.4, 0.7, 0.2, 0.5, 0.8, 0.4, 0.6, 0.3, 0.7, 0.5, 0.2, 0.6, 0.4],
      },
    ],
    notes: [
      {
        id: "n1",
        title: "Project Ideas",
        content: "Going for a lo-fi, nostalgic vibe with this one. Think 80s cassette tapes and VHS aesthetics.",
        updatedAt: "3 days ago",
      },
    ],
    collaborators: [
      {
        id: "c1",
        name: "Marcus Kim",
        role: "Producer",
        status: "online",
      },
    ],
  },
  {
    id: "3",
    name: "Summer Visuals",
    type: "visual",
    status: "completed",
    coverColor: "from-orange-500 to-red-500",
    progress: 100,
    visuals: [
      {
        id: "v1",
        title: "Beach Sunset",
        type: "image",
        url: "/placeholder.svg?height=400&width=400",
      },
      {
        id: "v2",
        title: "Ocean Waves",
        type: "video",
        url: "/placeholder.svg?height=400&width=400",
        thumbnail: "/placeholder.svg?height=400&width=400",
      },
      {
        id: "v3",
        title: "Palm Trees",
        type: "image",
        url: "/placeholder.svg?height=400&width=400",
      },
    ],
    collaborators: [
      {
        id: "c2",
        name: "Jamie Chen",
        role: "Visual Artist",
        status: "away",
      },
    ],
  },
  {
    id: "4",
    name: "Album Rollout",
    type: "content",
    status: "in-progress",
    coverColor: "from-indigo-500 to-violet-500",
    progress: 50,
    notes: [
      {
        id: "n1",
        title: "Social Media Schedule",
        content: "Week 1: Teaser posts\nWeek 2: Single release\nWeek 3: Behind the scenes\nWeek 4: Album release",
        updatedAt: "1 day ago",
      },
    ],
    collaborators: [
      {
        id: "c3",
        name: "Taylor West",
        role: "Writer",
        status: "offline",
      },
    ],
  },
]

export default function ProjectDetailPage() {
  const params = useParams()
  const projectId = params.id as string
  const [project, setProject] = useState<Project | null>(null)
  const [activeTab, setActiveTab] = useState<"overview" | "tracks" | "visuals" | "notes" | "team">("overview")
  const [showActionsMenu, setShowActionsMenu] = useState(false)

  // Fetch project data
  useEffect(() => {
    const foundProject = projectsData.find((p) => p.id === projectId)
    if (foundProject) {
      setProject(foundProject)
    }
  }, [projectId])

  if (!project) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading project...</p>
        </div>
      </div>
    )
  }

  // Get project icon based on type
  const getProjectIcon = () => {
    switch (project.type) {
      case "music":
        return <Music size={24} />
      case "visual":
        return <ImageIcon size={24} />
      case "content":
        return <Calendar size={24} />
      case "freeform":
        return <Lightbulb size={24} />
      default:
        return null
    }
  }

  // Toggle actions menu
  const toggleActionsMenu = () => {
    setShowActionsMenu(!showActionsMenu)
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
          <h1 className="text-lg font-bold">{project.name}</h1>
          <div className="w-24 flex justify-end">
            <div className="relative">
              <button
                onClick={toggleActionsMenu}
                className="text-zinc-400 hover:text-white p-1 rounded-md hover:bg-zinc-800"
              >
                <MoreVertical size={18} />
              </button>
              {showActionsMenu && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-zinc-800 border border-zinc-700 rounded-md shadow-lg z-50">
                  <div className="py-1">
                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left text-zinc-200 hover:bg-zinc-700">
                      <Edit size={14} />
                      <span>Edit Project</span>
                    </button>
                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left text-zinc-200 hover:bg-zinc-700">
                      <Users size={14} />
                      <span>Manage Team</span>
                    </button>
                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left text-zinc-200 hover:bg-zinc-700">
                      <Download size={14} />
                      <span>Export Project</span>
                    </button>
                    <div className="border-t border-zinc-700 my-1"></div>
                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left text-red-400 hover:bg-zinc-700">
                      <X size={14} />
                      <span>Delete Project</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Project header */}
      <div className={`bg-gradient-to-r ${project.coverColor} py-12 px-4 relative overflow-hidden`}>
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                {getProjectIcon()}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{project.name}</h1>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                  </span>
                  <span className="text-sm bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    {project.status === "in-progress"
                      ? "In Progress"
                      : project.status === "draft"
                        ? "Draft"
                        : "Completed"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm">Progress</span>
                <span className="text-sm font-medium">{project.progress}%</span>
              </div>
              <div className="w-48 h-2 bg-black/30 backdrop-blur-sm rounded-full overflow-hidden">
                <div className="h-full bg-white" style={{ width: `${project.progress}%` }}></div>
              </div>
            </div>
          </div>
          {project.description && (
            <p className="mt-6 max-w-2xl text-white/90 bg-black/20 backdrop-blur-sm p-4 rounded-lg">
              {project.description}
            </p>
          )}
        </div>
        {/* Abstract shapes in background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>
      </div>

      {/* Tabs */}
      <div className="border-b border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide">
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === "overview"
                  ? "border-blue-500 text-blue-500"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            {project.tracks && project.tracks.length > 0 && (
              <button
                className={`px-4 py-3 text-sm font-medium border-b-2 ${
                  activeTab === "tracks"
                    ? "border-blue-500 text-blue-500"
                    : "border-transparent text-zinc-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("tracks")}
              >
                Tracks
              </button>
            )}
            {project.visuals && project.visuals.length > 0 && (
              <button
                className={`px-4 py-3 text-sm font-medium border-b-2 ${
                  activeTab === "visuals"
                    ? "border-blue-500 text-blue-500"
                    : "border-transparent text-zinc-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("visuals")}
              >
                Visuals
              </button>
            )}
            {project.notes && project.notes.length > 0 && (
              <button
                className={`px-4 py-3 text-sm font-medium border-b-2 ${
                  activeTab === "notes"
                    ? "border-blue-500 text-blue-500"
                    : "border-transparent text-zinc-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("notes")}
              >
                Notes
              </button>
            )}
            {project.collaborators && project.collaborators.length > 0 && (
              <button
                className={`px-4 py-3 text-sm font-medium border-b-2 ${
                  activeTab === "team"
                    ? "border-blue-500 text-blue-500"
                    : "border-transparent text-zinc-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("team")}
              >
                Team
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="container mx-auto p-4">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tracks Section */}
            {project.tracks && project.tracks.length > 0 && (
              <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Music size={18} className="text-purple-400" />
                    Tracks
                  </h3>
                  <Button variant="ghost" size="sm" className="text-xs" onClick={() => setActiveTab("tracks")}>
                    View All
                  </Button>
                </div>
                <div className="space-y-3">
                  {project.tracks.slice(0, 3).map((track) => (
                    <div key={track.id} className="bg-zinc-700/50 rounded-lg p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-500/30 rounded-full flex items-center justify-center">
                          <Music size={16} />
                        </div>
                        <div>
                          <div className="text-sm font-medium">{track.title}</div>
                          <div className="text-xs text-zinc-400">{track.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`px-2 py-0.5 rounded-full text-xs ${
                            track.status === "mastered"
                              ? "bg-green-500/20 text-green-400"
                              : track.status === "final"
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-zinc-500/20 text-zinc-400"
                          }`}
                        >
                          {track.status.charAt(0).toUpperCase() + track.status.slice(1)}
                        </div>
                      </div>
                    </div>
                  ))}
                  {project.tracks.length > 3 && (
                    <div className="text-center text-sm text-zinc-500 mt-2">
                      +{project.tracks.length - 3} more tracks
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Visuals Section */}
            {project.visuals && project.visuals.length > 0 && (
              <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <ImageIcon size={18} className="text-blue-400" />
                    Visuals
                  </h3>
                  <Button variant="ghost" size="sm" className="text-xs" onClick={() => setActiveTab("visuals")}>
                    View All
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {project.visuals.slice(0, 4).map((visual) => (
                    <div key={visual.id} className="aspect-square rounded-lg overflow-hidden relative group">
                      <img
                        src={visual.thumbnail || visual.url}
                        alt={visual.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                        <span className="text-xs font-medium truncate">{visual.title}</span>
                      </div>
                      {visual.type === "video" && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center">
                          <Video size={12} />
                        </div>
                      )}
                    </div>
                  ))}
                  {project.visuals.length > 4 && (
                    <div className="aspect-square rounded-lg bg-zinc-700/50 flex items-center justify-center">
                      <span className="text-sm text-zinc-400">+{project.visuals.length - 4} more</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Notes Section */}
            {project.notes && project.notes.length > 0 && (
              <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <FileText size={18} className="text-amber-400" />
                    Notes
                  </h3>
                  <Button variant="ghost" size="sm" className="text-xs" onClick={() => setActiveTab("notes")}>
                    View All
                  </Button>
                </div>
                <div className="space-y-3">
                  {project.notes.slice(0, 2).map((note) => (
                    <div key={note.id} className="bg-zinc-700/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{note.title}</h4>
                        <span className="text-xs text-zinc-500">{note.updatedAt}</span>
                      </div>
                      <p className="text-sm text-zinc-300 line-clamp-3">{note.content}</p>
                    </div>
                  ))}
                  {project.notes.length > 2 && (
                    <div className="text-center text-sm text-zinc-500 mt-2">+{project.notes.length - 2} more notes</div>
                  )}
                </div>
              </div>
            )}

            {/* Team Section */}
            {project.collaborators && project.collaborators.length > 0 && (
              <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Users size={18} className="text-green-400" />
                    Team
                  </h3>
                  <Button variant="ghost" size="sm" className="text-xs" onClick={() => setActiveTab("team")}>
                    View All
                  </Button>
                </div>
                <div className="space-y-3">
                  {project.collaborators.map((collaborator) => (
                    <div
                      key={collaborator.id}
                      className="flex items-center justify-between bg-zinc-700/50 rounded-lg p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-8 h-8 bg-blue-500/30 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">{collaborator.name.charAt(0)}</span>
                          </div>
                          <div
                            className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-zinc-800 ${
                              collaborator.status === "online"
                                ? "bg-green-500"
                                : collaborator.status === "away"
                                  ? "bg-amber-500"
                                  : "bg-zinc-500"
                            }`}
                          ></div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">{collaborator.name}</div>
                          <div className="text-xs text-zinc-400">{collaborator.role}</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs">
                        <MessageSquare size={14} className="mr-1" />
                        Chat
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add Content Section */}
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700 border-dashed">
              <div className="flex flex-col items-center justify-center text-center h-full">
                <Plus size={24} className="text-zinc-500 mb-2" />
                <h3 className="font-medium mb-1">Add Content</h3>
                <p className="text-sm text-zinc-500 mb-4">Upload tracks, visuals, or add notes</p>
                <div className="grid grid-cols-2 gap-2 w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                  >
                    <Upload size={14} className="mr-1" /> Upload
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                  >
                    <FileText size={14} className="mr-1" /> New Note
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tracks Tab */}
        {activeTab === "tracks" && project.tracks && (
          <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Music size={20} className="text-purple-400" />
                Tracks
              </h3>
              <Button className="bg-blue-600 hover:bg-blue-500 flex items-center gap-1">
                <Plus size={16} />
                Add Track
              </Button>
            </div>
            <div className="space-y-4">
              {project.tracks.map((track) => (
                <div
                  key={track.id}
                  className="bg-zinc-700/50 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-500/30 rounded-full flex items-center justify-center">
                      <Music size={18} />
                    </div>
                    <div>
                      <div className="font-medium">{track.title}</div>
                      <div className="text-sm text-zinc-400">{track.duration}</div>
                    </div>
                  </div>
                  <div className="flex-1 px-4">
                    <div className="h-8 flex items-center">
                      {track.waveform.map((value, index) => (
                        <div
                          key={index}
                          className="w-1 mx-0.5 bg-purple-400/70"
                          style={{ height: `${value * 100}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        track.status === "mastered"
                          ? "bg-green-500/20 text-green-400"
                          : track.status === "final"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-zinc-500/20 text-zinc-400"
                      }`}
                    >
                      {track.status.charAt(0).toUpperCase() + track.status.slice(1)}
                    </div>
                    <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                      <MoreVertical size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Visuals Tab */}
        {activeTab === "visuals" && project.visuals && (
          <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <ImageIcon size={20} className="text-blue-400" />
                Visuals
              </h3>
              <Button className="bg-blue-600 hover:bg-blue-500 flex items-center gap-1">
                <Plus size={16} />
                Add Visual
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {project.visuals.map((visual) => (
                <div key={visual.id} className="group relative">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img
                      src={visual.thumbnail || visual.url}
                      alt={visual.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 rounded-lg">
                    <div className="font-medium text-sm mb-1">{visual.title}</div>
                    <div className="flex justify-between items-center">
                      <div
                        className={`px-2 py-0.5 rounded-full text-xs ${
                          visual.type === "video" ? "bg-blue-500/20 text-blue-400" : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {visual.type.charAt(0).toUpperCase() + visual.type.slice(1)}
                      </div>
                      <Button variant="ghost" size="sm" className="p-1 h-7 w-7 -mr-1">
                        <MoreVertical size={14} />
                      </Button>
                    </div>
                  </div>
                  {visual.type === "video" && (
                    <div className="absolute top-2 right-2 w-7 h-7 bg-black/50 rounded-full flex items-center justify-center">
                      <Video size={14} />
                    </div>
                  )}
                </div>
              ))}
              <div className="aspect-square rounded-lg border-2 border-dashed border-zinc-700 flex flex-col items-center justify-center p-4 hover:border-blue-500 transition-colors cursor-pointer">
                <ImageIcon size={24} className="text-zinc-500 mb-2" />
                <p className="text-sm text-zinc-500 text-center">Upload image or video</p>
              </div>
            </div>
          </div>
        )}

        {/* Notes Tab */}
        {activeTab === "notes" && project.notes && (
          <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <FileText size={20} className="text-amber-400" />
                Notes
              </h3>
              <Button className="bg-blue-600 hover:bg-blue-500 flex items-center gap-1">
                <Plus size={16} />
                Add Note
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.notes.map((note) => (
                <div key={note.id} className="bg-zinc-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{note.title}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-zinc-500">{note.updatedAt}</span>
                      <Button variant="ghost" size="sm" className="p-1 h-7 w-7 -mr-1">
                        <MoreVertical size={14} />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-300 whitespace-pre-line">{note.content}</p>
                </div>
              ))}
              <div className="bg-zinc-700/50 rounded-lg border-2 border-dashed border-zinc-600 flex flex-col items-center justify-center p-6 hover:border-blue-500 transition-colors cursor-pointer">
                <FileText size={24} className="text-zinc-500 mb-2" />
                <p className="text-sm text-zinc-500 text-center">Create a new note</p>
              </div>
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === "team" && project.collaborators && (
          <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Users size={20} className="text-green-400" />
                Team
              </h3>
              <Button className="bg-blue-600 hover:bg-blue-500 flex items-center gap-1">
                <Plus size={16} />
                Invite
              </Button>
            </div>
            <div className="space-y-4">
              {project.collaborators.map((collaborator) => (
                <div key={collaborator.id} className="bg-zinc-700/50 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-blue-500/30 rounded-full flex items-center justify-center">
                        <span className="text-lg font-medium">{collaborator.name.charAt(0)}</span>
                      </div>
                      <div
                        className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-zinc-700 ${
                          collaborator.status === "online"
                            ? "bg-green-500"
                            : collaborator.status === "away"
                              ? "bg-amber-500"
                              : "bg-zinc-500"
                        }`}
                      ></div>
                    </div>
                    <div>
                      <div className="font-medium">{collaborator.name}</div>
                      <div className="text-sm text-zinc-400 flex items-center gap-2">
                        <span>{collaborator.role}</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-500"></span>
                        <span>
                          {collaborator.status === "online"
                            ? "Online now"
                            : collaborator.status === "away"
                              ? "Away"
                              : "Offline"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                    >
                      <MessageSquare size={14} className="mr-1" />
                      Message
                    </Button>
                    <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                      <MoreVertical size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
