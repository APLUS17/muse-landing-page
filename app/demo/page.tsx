"use client"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Plus,
  Folder,
  Settings,
  Users,
  Bell,
  ImageIcon,
  Music,
  Video,
  FileText,
  Calendar,
  Lightbulb,
  ChevronRight,
  X,
  Check,
  MoreVertical,
  Edit,
  LogOut,
  Menu,
  Rocket,
  Zap,
  Target,
  Upload,
  Clock,
  Eye,
  Sparkles,
  Palette,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

// Project creation types
type ProjectType = "music" | "visual" | "content" | "freeform" | null
type CoreElement = "track" | "artwork" | "notes" | "visual" | "release"
type CreativeGoal = "launch" | "experiment" | "capture" | "prep" | null
type CollaboratorRole = "producer" | "visual" | "writer" | "engineer" | "content" | "other"
type CollaboratorPermission = "edit" | "view"

interface Collaborator {
  email: string
  role: CollaboratorRole
  permission: CollaboratorPermission
}

interface Project {
  id: string
  name: string
  type: ProjectType
  status: "in-progress" | "draft" | "completed"
  updatedAt: string
  color: string
}

export default function DemoPage() {
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)
  const [projectCreated, setProjectCreated] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [showTooltip, setShowTooltip] = useState<string | null>(null)
  const [savingAsDraft, setSavingAsDraft] = useState(false)
  const [showCollaboratorModal, setShowCollaboratorModal] = useState(false)
  const [showActionsMenu, setShowActionsMenu] = useState(false)
  const [showRenameModal, setShowRenameModal] = useState(false)
  const [showCoverArtModal, setShowCoverArtModal] = useState(false)
  const [showAddNotesModal, setShowAddNotesModal] = useState(false)
  const [showManageCollaboratorsModal, setShowManageCollaboratorsModal] = useState(false)
  const [showLeaveProjectModal, setShowLeaveProjectModal] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Project creation state
  const [projectType, setProjectType] = useState<ProjectType>(null)
  const [projectName, setProjectName] = useState("")
  const [projectSubtitle, setProjectSubtitle] = useState("")
  const [selectedElements, setSelectedElements] = useState<CoreElement[]>([])
  const [creativeGoal, setCreativeGoal] = useState<CreativeGoal>(null)
  const [collaborators, setCollaborators] = useState<Collaborator[]>([])
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState("")
  const [newCollaboratorRole, setNewCollaboratorRole] = useState<CollaboratorRole>("producer")
  const [newCollaboratorPermission, setNewCollaboratorPermission] = useState<CollaboratorPermission>("edit")
  const [projectNotes, setProjectNotes] = useState("")

  // Sample recent projects
  const [recentProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Dreamscape",
      type: "music",
      status: "in-progress",
      updatedAt: "2 days ago",
      color: "from-purple-600 to-blue-600",
    },
    {
      id: "2",
      name: "Midnight Tapes",
      type: "music",
      status: "draft",
      updatedAt: "5 days ago",
      color: "from-teal-500 to-emerald-500",
    },
    {
      id: "3",
      name: "Summer Visuals",
      type: "visual",
      status: "completed",
      updatedAt: "1 week ago",
      color: "from-orange-500 to-red-500",
    },
    {
      id: "4",
      name: "Album Rollout",
      type: "content",
      status: "in-progress",
      updatedAt: "3 days ago",
      color: "from-indigo-500 to-violet-500",
    },
  ])

  // Generate a random project cover color
  const [projectCoverColor] = useState(() => {
    const colors = [
      "from-blue-600 to-purple-600",
      "from-teal-500 to-emerald-500",
      "from-orange-500 to-red-500",
      "from-indigo-500 to-violet-500",
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  })

  // Tips of the day
  const [tips] = useState([
    "Plan your visuals before mixing to create a cohesive aesthetic.",
    "Use reference tracks to guide your production decisions.",
    "Schedule social media posts in advance to build anticipation.",
    "Create a moodboard to visualize your project's direction.",
    "Collaborate with others to bring fresh perspectives to your work.",
  ])

  const [currentTip] = useState(() => {
    return tips[Math.floor(Math.random() * tips.length)]
  })

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleNewProject = () => {
    setShowNewProjectModal(true)
    setCurrentStep(1)
    // Reset form state
    setProjectType(null)
    setProjectName("")
    setProjectSubtitle("")
    setSelectedElements([])
    setCreativeGoal(null)
    setCollaborators([])
    setSavingAsDraft(false)
    // Close sidebar on mobile after clicking
    if (window.innerWidth < 768) {
      setSidebarOpen(false)
    }
  }

  const handleCreateProject = () => {
    setShowNewProjectModal(false)
    setProjectCreated(true)

    // Show collaborator invitation after a short delay
    setTimeout(() => {
      setShowCollaboratorModal(true)
    }, 1000)
  }

  const handleSaveAsDraft = () => {
    setSavingAsDraft(true)
    setTimeout(() => {
      setShowNewProjectModal(false)
      setProjectCreated(true)
    }, 1000)
  }

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)

      // Show tooltips based on the step
      if (currentStep === 2) {
        setTimeout(() => setShowTooltip("tracks"), 500)
      } else if (currentStep === 3) {
        setTimeout(() => setShowTooltip("moodboard"), 500)
      }
    } else {
      handleCreateProject()
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setShowTooltip(null)
    }
  }

  const toggleElement = (element: CoreElement) => {
    if (selectedElements.includes(element)) {
      setSelectedElements(selectedElements.filter((e) => e !== element))
    } else {
      setSelectedElements([...selectedElements, element])
    }
  }

  const addCollaborator = () => {
    if (newCollaboratorEmail && !collaborators.some((c) => c.email === newCollaboratorEmail)) {
      setCollaborators([
        ...collaborators,
        {
          email: newCollaboratorEmail,
          role: newCollaboratorRole,
          permission: newCollaboratorPermission,
        },
      ])
      setNewCollaboratorEmail("")
    }
  }

  const removeCollaborator = (email: string) => {
    setCollaborators(collaborators.filter((c) => c.email !== email))
  }

  // Actions menu handlers
  const toggleActionsMenu = () => {
    setShowActionsMenu(!showActionsMenu)
  }

  const handleRenameProject = () => {
    setShowActionsMenu(false)
    setShowRenameModal(true)
  }

  const handleChangeCoverArt = () => {
    setShowActionsMenu(false)
    setShowCoverArtModal(true)
  }

  const handleAddNotes = () => {
    setShowActionsMenu(false)
    setShowAddNotesModal(true)
  }

  const handleManageCollaborators = () => {
    setShowActionsMenu(false)
    setShowManageCollaboratorsModal(true)
  }

  const handleLeaveProject = () => {
    setShowActionsMenu(false)
    setShowLeaveProjectModal(true)
  }

  // Hide tooltip after a delay
  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showTooltip])

  // Close actions menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showActionsMenu && !(event.target as Element).closest(".actions-menu-container")) {
        setShowActionsMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showActionsMenu])

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarOpen &&
        window.innerWidth < 768 &&
        !(event.target as Element).closest(".sidebar") &&
        !(event.target as Element).closest(".menu-button")
      ) {
        setSidebarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [sidebarOpen])

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col">
      {/* Header with back button */}
      <header className="border-b border-zinc-800 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSidebar}
              className="menu-button text-zinc-400 hover:text-white p-1 rounded-md hover:bg-zinc-800"
            >
              <Menu size={20} />
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors ml-2"
            >
              <ArrowLeft size={16} />
              Back to home
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="font-medium">muse</span>
            <span className="text-xs bg-zinc-800 px-2 py-0.5 rounded-full ml-2">beta</span>
          </div>
          <div className="w-24 flex justify-end">
            <button className="text-zinc-400 hover:text-white p-1 rounded-md hover:bg-zinc-800">
              <Bell size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Demo interface */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar - now with animation */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              {/* Overlay for mobile */}
              <motion.div
                className="fixed inset-0 bg-black/50 z-20 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
              />

              {/* Sidebar */}
              <motion.div
                className="sidebar fixed md:relative w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col z-30 h-[calc(100vh-65px)]"
                initial={{ x: -320 }}
                animate={{ x: 0 }}
                exit={{ x: -320 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="p-4">
                  <Button
                    onClick={handleNewProject}
                    className="w-full bg-white text-zinc-900 hover:bg-zinc-100 flex items-center justify-center md:justify-start gap-2 rounded-md"
                  >
                    <Plus size={16} />
                    <span>New Project</span>
                  </Button>
                </div>

                <div className="mt-4 px-4 space-y-2">
                  {/* Sidebar items */}
                  {[
                    { icon: <Folder size={16} />, label: "Projects" },
                    { icon: <ImageIcon size={16} />, label: "Assets" },
                    { icon: <Users size={16} />, label: "Team" },
                    { icon: <Settings size={16} />, label: "Settings" },
                  ].map((item, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center justify-start gap-3 py-2 px-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
                    >
                      {item.icon}
                      <span className="text-sm">{item.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="h-12 border-b border-zinc-800 flex items-center px-4">
            <div className="flex-1 flex items-center">
              <div className="relative w-64">
                <ImageIcon size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-1.5 pl-10 pr-4 text-sm text-zinc-400"
                />
              </div>
            </div>
          </div>

          {/* Dashboard content */}
          <div className="flex-1 p-6 overflow-auto">
            {projectCreated ? (
              <div className="max-w-4xl mx-auto">
                <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-8 border border-zinc-700">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${projectCoverColor} rounded-lg flex items-center justify-center`}
                      >
                        {projectType === "music" && <Music size={20} />}
                        {projectType === "visual" && <ImageIcon size={20} />}
                        {projectType === "content" && <Calendar size={20} />}
                        {projectType === "freeform" && <Lightbulb size={20} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl font-bold">{projectName || "New Project"}</h2>
                          {savingAsDraft && (
                            <span className="text-xs bg-zinc-700 px-2 py-0.5 rounded-full text-zinc-300">Draft</span>
                          )}
                        </div>
                        {projectSubtitle && <p className="text-zinc-400 text-sm">{projectSubtitle}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-zinc-700 px-2 py-0.5 rounded-full text-zinc-300">
                        {creativeGoal === "launch" && "Launch a Single"}
                        {creativeGoal === "experiment" && "Experiment Freely"}
                        {creativeGoal === "capture" && "Capture an Idea"}
                        {creativeGoal === "prep" && "Prep for a Drop"}
                        {!creativeGoal && "New Project"}
                      </span>

                      {/* Three dots menu */}
                      <div className="relative actions-menu-container">
                        <button
                          onClick={toggleActionsMenu}
                          className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 transition-colors"
                        >
                          <MoreVertical size={16} />
                        </button>

                        {/* Actions dropdown menu */}
                        {showActionsMenu && (
                          <div className="absolute right-0 top-full mt-1 w-56 bg-zinc-800 border border-zinc-700 rounded-md shadow-lg z-50">
                            <div className="py-1">
                              <button
                                onClick={handleRenameProject}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left text-zinc-200 hover:bg-zinc-700"
                              >
                                <Edit size={14} />
                                <span>Rename Project</span>
                              </button>
                              <button
                                onClick={handleChangeCoverArt}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left text-zinc-200 hover:bg-zinc-700"
                              >
                                <ImageIcon size={14} />
                                <span>Change Cover Art</span>
                              </button>
                              <button
                                onClick={handleAddNotes}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left text-zinc-200 hover:bg-zinc-700"
                              >
                                <FileText size={14} />
                                <span>Add Notes</span>
                              </button>
                              <button
                                onClick={handleManageCollaborators}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left text-zinc-200 hover:bg-zinc-700"
                              >
                                <Users size={14} />
                                <span>Manage Collaborators</span>
                              </button>
                              <div className="border-t border-zinc-700 my-1"></div>
                              <button
                                onClick={handleLeaveProject}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left text-red-400 hover:bg-zinc-700"
                              >
                                <LogOut size={14} />
                                <span>Leave Project</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-zinc-400">Project progress</span>
                      <span className="text-sm text-zinc-400">
                        {selectedElements.length > 0
                          ? `${selectedElements.length}/5 items added`
                          : "No items added yet"}
                      </span>
                    </div>
                    <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        style={{ width: `${(selectedElements.length / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Collaborators section */}
                  {collaborators.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-zinc-400 mb-3">Collaborators</h3>
                      <div className="flex flex-wrap gap-2">
                        {collaborators.map((collab, index) => (
                          <div key={index} className="bg-zinc-800 rounded-full px-3 py-1 flex items-center gap-2">
                            <div className="w-6 h-6 bg-zinc-700 rounded-full flex items-center justify-center text-xs">
                              {collab.email.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm">{collab.email}</span>
                            <span className="text-xs bg-zinc-700 px-1.5 py-0.5 rounded-full text-zinc-400">
                              {collab.role}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {selectedElements.includes("track") && (
                      <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                        <div className="flex items-center gap-3 mb-2">
                          <Music size={16} className="text-zinc-400" />
                          <h3 className="font-medium">Tracks</h3>
                        </div>
                        <p className="text-zinc-500 text-sm">Add your audio files here</p>
                        <button className="mt-3 text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
                          <Plus size={14} />
                          Add Track
                        </button>
                      </div>
                    )}

                    {selectedElements.includes("artwork") && (
                      <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                        <div className="flex items-center gap-3 mb-2">
                          <ImageIcon size={16} className="text-zinc-400" />
                          <h3 className="font-medium">Artwork & Moodboard</h3>
                        </div>
                        <p className="text-zinc-500 text-sm">Collect visual inspiration</p>
                        <button className="mt-3 text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
                          <Plus size={14} />
                          Add Image
                        </button>
                      </div>
                    )}

                    {selectedElements.includes("notes") && (
                      <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                        <div className="flex items-center gap-3 mb-2">
                          <FileText size={16} className="text-zinc-400" />
                          <h3 className="font-medium">Notes & Lyrics</h3>
                        </div>
                        <p className="text-zinc-500 text-sm">Document your ideas</p>
                        <button className="mt-3 text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
                          <Plus size={14} />
                          Add Note
                        </button>
                      </div>
                    )}

                    {selectedElements.includes("visual") && (
                      <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                        <div className="flex items-center gap-3 mb-2">
                          <Video size={16} className="text-zinc-400" />
                          <h3 className="font-medium">Visuals</h3>
                        </div>
                        <p className="text-zinc-500 text-sm">Add videos and visualizers</p>
                        <button className="mt-3 text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
                          <Plus size={14} />
                          Add Visual
                        </button>
                      </div>
                    )}

                    {selectedElements.includes("release") && (
                      <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                        <div className="flex items-center gap-3 mb-2">
                          <Calendar size={16} className="text-zinc-400" />
                          <h3 className="font-medium">Release Plan</h3>
                        </div>
                        <p className="text-zinc-500 text-sm">Schedule your rollout</p>
                        <button className="mt-3 text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
                          <Plus size={14} />
                          Add Date
                        </button>
                      </div>
                    )}

                    {selectedElements.length === 0 && (
                      <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 col-span-2">
                        <p className="text-zinc-500 text-center py-4">
                          No elements added yet. Start by adding content to your project.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center">
                    <Button
                      onClick={() => setProjectCreated(false)}
                      className="bg-zinc-700 hover:bg-zinc-600 text-white"
                    >
                      Return to Dashboard
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto">
                {/* New Dashboard Layout */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">Hey Alex, let's create something today 🎧</h2>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={handleNewProject}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                    >
                      <Plus size={16} className="mr-1" /> New Project
                    </Button>
                    <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
                      <Palette size={16} className="mr-1" /> Explore Templates
                    </Button>
                    <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
                      <Users size={16} className="mr-1" /> Invite Team
                    </Button>
                  </div>
                </div>

                {/* Recently Active Projects */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-lg font-semibold">🔄 Recently Active Projects</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {recentProjects.map((project) => (
                      <Link href={`/demo/project/${project.id}`} key={project.id}>
                        <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl border border-zinc-700 hover:border-zinc-600 transition-colors overflow-hidden cursor-pointer">
                          <div className={`h-24 bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                            {project.type === "music" && <Music size={32} className="text-white/80" />}
                            {project.type === "visual" && <ImageIcon size={32} className="text-white/80" />}
                            {project.type === "content" && <Calendar size={32} className="text-white/80" />}
                            {project.type === "freeform" && <Lightbulb size={32} className="text-white/80" />}
                          </div>
                          <div className="p-4">
                            <h4 className="font-medium mb-1">{project.name}</h4>
                            <div className="flex items-center justify-between">
                              <span className="text-xs bg-zinc-700 px-2 py-0.5 rounded-full text-zinc-300">
                                {project.status === "in-progress" && "In Progress"}
                                {project.status === "draft" && "Draft"}
                                {project.status === "completed" && "Completed"}
                              </span>
                              <span className="text-xs text-zinc-400">Updated {project.updatedAt}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Two column layout for Rollout Tracker and Tip of the Day */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Rollout Tracker */}
                  <Link href="/demo/rollout-tracker" className="block">
                    <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700 hover:border-zinc-600 transition-colors">
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar size={18} className="text-purple-400" />
                        <h3 className="font-semibold">Rollout Tracker</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Next Post Due:</span>
                          <span className="text-sm font-medium text-purple-400">Friday</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Album Drop:</span>
                          <span className="text-sm font-medium text-purple-400">2 weeks</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Content Created:</span>
                          <span className="text-sm font-medium text-purple-400">4/12 pieces</span>
                        </div>
                        <div className="mt-4">
                          <div className="h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 w-1/3"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Tip of the Day */}
                  <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles size={18} className="text-amber-400" />
                      <h3 className="font-semibold">Tip of the Day</h3>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Lightbulb size={20} className="text-amber-400" />
                      </div>
                      <p className="text-sm text-zinc-300">{currentTip}</p>
                    </div>
                  </div>
                </div>

                {/* Two column layout for Moodboard Preview and Engagement Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Moodboard Preview */}
                  <Link href="/demo/moodboard" className="block">
                    <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700 hover:border-zinc-600 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Palette size={18} className="text-blue-400" />
                          <h3 className="font-semibold">Moodboard Preview</h3>
                        </div>
                        <Button variant="ghost" size="sm" className="text-xs">
                          View All
                        </Button>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                          <div key={item} className="aspect-square bg-zinc-700 rounded-md overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-zinc-600 to-zinc-700 flex items-center justify-center">
                              <ImageIcon size={16} className="text-zinc-500" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Link>
                  {/* Engagement Stats */}
                  <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap size={18} className="text-amber-400" />
                      <h3 className="font-semibold">Quick Actions</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Link href="/demo/upload-track">
                        <div className="bg-zinc-700/50 hover:bg-zinc-700 transition-colors rounded-lg p-3 flex flex-col items-center justify-center text-center cursor-pointer">
                          <Music size={20} className="text-purple-400 mb-2" />
                          <span className="text-xs">Upload Track</span>
                        </div>
                      </Link>
                      <Link href="/demo/add-visual">
                        <div className="bg-zinc-700/50 hover:bg-zinc-700 transition-colors rounded-lg p-3 flex flex-col items-center justify-center text-center cursor-pointer">
                          <ImageIcon size={20} className="text-blue-400 mb-2" />
                          <span className="text-xs">Add Visual</span>
                        </div>
                      </Link>
                      <Link href="/demo/schedule-post">
                        <div className="bg-zinc-700/50 hover:bg-zinc-700 transition-colors rounded-lg p-3 flex flex-col items-center justify-center text-center cursor-pointer">
                          <Calendar size={20} className="text-green-400 mb-2" />
                          <span className="text-xs">Schedule Post</span>
                        </div>
                      </Link>
                      <Link href="/demo/invite">
                        <div className="bg-zinc-700/50 hover:bg-zinc-700 transition-colors rounded-lg p-3 flex flex-col items-center justify-center text-center cursor-pointer">
                          <Users size={20} className="text-amber-400 mb-2" />
                          <span className="text-xs">Invite Team</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                  // Add Active Collaborators section
                  <div className="mt-6 bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700">
                    <div className="flex items-center gap-2 mb-4">
                      <Users size={18} className="text-blue-400" />
                      <h3 className="font-semibold">Active Collaborators</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-500/30 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">M</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Marcus Kim</div>
                            <div className="text-xs text-zinc-400">Producer • Online now</div>
                          </div>
                        </div>
                        <Link href="/demo/chat/marcus">
                          <Button variant="ghost" size="sm" className="text-xs">
                            Message
                          </Button>
                        </Link>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-500/30 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">J</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Jamie Chen</div>
                            <div className="text-xs text-zinc-400">Visual • Last active 2h ago</div>
                          </div>
                        </div>
                        <Link href="/demo/chat/jamie">
                          <Button variant="ghost" size="sm" className="text-xs">
                            Message
                          </Button>
                        </Link>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-500/30 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">T</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Taylor West</div>
                            <div className="text-xs text-zinc-400">Writer • Last active 1d ago</div>
                          </div>
                        </div>
                        <Link href="/demo/chat/taylor">
                          <Button variant="ghost" size="sm" className="text-xs">
                            Message
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Project Modal */}
      <AnimatePresence>
        {showNewProjectModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-zinc-900 border border-zinc-800 rounded-lg w-full max-w-2xl overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Modal header */}
              <div className="border-b border-zinc-800 p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">Create New Project</h3>
                  <div className="flex items-center mt-1">
                    <div className="h-1 bg-zinc-700 rounded-full w-48 flex overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
                        style={{ width: `${(currentStep / 4) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-zinc-500 ml-2">Step {currentStep} of 4</span>
                  </div>
                </div>
                <button onClick={() => setShowNewProjectModal(false)} className="text-zinc-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              {/* Modal content - Step 1: Project Type */}
              {currentStep === 1 && (
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-6 text-center">What are you creating?</h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div
                      className={`relative overflow-hidden rounded-xl border ${
                        projectType === "music" ? "border-blue-500" : "border-zinc-700"
                      } p-4 cursor-pointer group`}
                      onClick={() => setProjectType("music")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 group-hover:opacity-100 opacity-70 transition-opacity"></div>
                      <div className="relative z-10">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-3">
                          <Music size={18} className="text-white" />
                        </div>
                        <h5 className="font-bold mb-1">Music Release</h5>
                        <p className="text-sm text-zinc-400">EP, Album, Single</p>
                      </div>
                      {projectType === "music" && (
                        <div className="absolute top-2 right-2">
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <Check size={12} />
                          </div>
                        </div>
                      )}
                    </div>

                    <div
                      className={`relative overflow-hidden rounded-xl border ${
                        projectType === "visual" ? "border-blue-500" : "border-zinc-700"
                      } p-4 cursor-pointer group`}
                      onClick={() => setProjectType("visual")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-orange-500/10 group-hover:opacity-100 opacity-70 transition-opacity"></div>
                      <div className="relative z-10">
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center mb-3">
                          <Video size={18} className="text-white" />
                        </div>
                        <h5 className="font-bold mb-1">Visual Project</h5>
                        <p className="text-sm text-zinc-400">Video, Promo, Cover Art</p>
                      </div>
                      {projectType === "visual" && (
                        <div className="absolute top-2 right-2">
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <Check size={12} />
                          </div>
                        </div>
                      )}
                    </div>

                    <div
                      className={`relative overflow-hidden rounded-xl border ${
                        projectType === "content" ? "border-blue-500" : "border-zinc-700"
                      } p-4 cursor-pointer group`}
                      onClick={() => setProjectType("content")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-teal-500/10 group-hover:opacity-100 opacity-70 transition-opacity"></div>
                      <div className="relative z-10">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mb-3">
                          <Calendar size={18} className="text-white" />
                        </div>
                        <h5 className="font-bold mb-1">Content Campaign</h5>
                        <p className="text-sm text-zinc-400">Social Media, Promo Plan</p>
                      </div>
                      {projectType === "content" && (
                        <div className="absolute top-2 right-2">
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <Check size={12} />
                          </div>
                        </div>
                      )}
                    </div>

                    <div
                      className={`relative overflow-hidden rounded-xl border ${
                        projectType === "freeform" ? "border-blue-500" : "border-zinc-700"
                      } p-4 cursor-pointer group`}
                      onClick={() => setProjectType("freeform")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 group-hover:opacity-100 opacity-70 transition-opacity"></div>
                      <div className="relative z-10">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mb-3">
                          <Lightbulb size={18} className="text-white" />
                        </div>
                        <h5 className="font-bold mb-1">Freeform Idea</h5>
                        <p className="text-sm text-zinc-400">Just vibes</p>
                      </div>
                      {projectType === "freeform" && (
                        <div className="absolute top-2 right-2">
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <Check size={12} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      className="border-zinc-700 text-zinc-400 hover:bg-zinc-800"
                      onClick={() => setShowNewProjectModal(false)}
                    >
                      Cancel
                    </Button>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="border-zinc-700 text-zinc-400 hover:bg-zinc-800"
                        onClick={handleNextStep}
                      >
                        Skip for now
                      </Button>
                      <Button
                        className="bg-white text-zinc-900 hover:bg-zinc-100 flex items-center gap-1"
                        onClick={handleNextStep}
                        disabled={!projectType}
                      >
                        Next
                        <ChevronRight size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Modal content - Step 2: Project Naming */}
              {currentStep === 2 && (
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-6 text-center">Name your project</h4>

                  <div className="space-y-6 mb-8">
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1">Project Title</label>
                      <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="My New Album"
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        autoFocus
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1">
                        Subtitle or Internal Tag <span className="text-zinc-500">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={projectSubtitle}
                        onChange={(e) => setProjectSubtitle(e.target.value)}
                        placeholder="Summer Drop 2025"
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1">Cover Icon or Image</label>
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-16 h-16 bg-gradient-to-br ${projectCoverColor} rounded-lg flex items-center justify-center`}
                        >
                          {projectType === "music" && <Music size={24} className="text-white" />}
                          {projectType === "visual" && <ImageIcon size={24} className="text-white" />}
                          {projectType === "content" && <Calendar size={24} className="text-white" />}
                          {projectType === "freeform" && <Lightbulb size={24} className="text-white" />}
                          {!projectType && <Plus size={24} className="text-white" />}
                        </div>
                        <Button
                          variant="outline"
                          className="border-zinc-700 text-zinc-400 hover:bg-zinc-800 flex items-center gap-1"
                        >
                          <Upload size={14} />
                          Upload Image
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      className="border-zinc-700 text-zinc-400 hover:bg-zinc-800 flex items-center gap-1"
                      onClick={handlePrevStep}
                    >
                      Back
                    </Button>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="border-zinc-700 text-zinc-400 hover:bg-zinc-800"
                        onClick={handleSaveAsDraft}
                      >
                        Save as Draft
                      </Button>
                      <Button
                        className="bg-white text-zinc-900 hover:bg-zinc-100 flex items-center gap-1"
                        onClick={handleNextStep}
                        disabled={!projectName.trim()}
                      >
                        Next
                        <ChevronRight size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Modal content - Step 3: Add Core Elements */}
              {currentStep === 3 && (
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-6 text-center">Add what you're starting with</h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    <div
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        selectedElements.includes("track") ? "border-blue-500 bg-blue-500/10" : "border-zinc-700"
                      } cursor-pointer relative`}
                      onClick={() => toggleElement("track")}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          selectedElements.includes("track") ? "bg-blue-500" : "bg-zinc-700"
                        }`}
                      >
                        <Music size={16} />
                      </div>
                      <div>
                        <h5 className="font-medium">Add a Track</h5>
                        <p className="text-xs text-zinc-400">Upload audio files</p>
                      </div>

                      {/* Tooltip */}
                      {showTooltip === "tracks" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -top-12 left-0 right-0 bg-blue-900/90 backdrop-blur-md rounded-lg p-2 text-xs text-blue-100 shadow-lg"
                        >
                          Tracks can be uploaded later — don't feel pressured.
                          <div className="absolute bottom-0 left-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-blue-900/90"></div>
                        </motion.div>
                      )}
                    </div>

                    <div
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        selectedElements.includes("artwork") ? "border-blue-500 bg-blue-500/10" : "border-zinc-700"
                      } cursor-pointer relative`}
                      onClick={() => toggleElement("artwork")}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          selectedElements.includes("artwork") ? "bg-blue-500" : "bg-zinc-700"
                        }`}
                      >
                        <ImageIcon size={16} />
                      </div>
                      <div>
                        <h5 className="font-medium">Add Cover Art or Moodboard</h5>
                        <p className="text-xs text-zinc-400">Upload images and references</p>
                      </div>

                      {/* Tooltip */}
                      {showTooltip === "moodboard" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -top-12 left-0 right-0 bg-blue-900/90 backdrop-blur-md rounded-lg p-2 text-xs text-blue-100 shadow-lg"
                        >
                          Use the moodboard to spark visuals or lyrics.
                          <div className="absolute bottom-0 left-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-blue-900/90"></div>
                        </motion.div>
                      )}
                    </div>

                    <div
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        selectedElements.includes("notes") ? "border-blue-500 bg-blue-500/10" : "border-zinc-700"
                      } cursor-pointer`}
                      onClick={() => toggleElement("notes")}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          selectedElements.includes("notes") ? "bg-blue-500" : "bg-zinc-700"
                        }`}
                      >
                        <FileText size={16} />
                      </div>
                      <div>
                        <h5 className="font-medium">Add Notes or Lyrics</h5>
                        <p className="text-xs text-zinc-400">Document your ideas</p>
                      </div>
                    </div>

                    <div
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        selectedElements.includes("visual") ? "border-blue-500 bg-blue-500/10" : "border-zinc-700"
                      } cursor-pointer`}
                      onClick={() => toggleElement("visual")}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          selectedElements.includes("visual") ? "bg-blue-500" : "bg-zinc-700"
                        }`}
                      >
                        <Video size={16} />
                      </div>
                      <div>
                        <h5 className="font-medium">Add Visual</h5>
                        <p className="text-xs text-zinc-400">Video or visualizer</p>
                      </div>
                    </div>

                    <div
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        selectedElements.includes("release") ? "border-blue-500 bg-blue-500/10" : "border-zinc-700"
                      } cursor-pointer`}
                      onClick={() => toggleElement("release")}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          selectedElements.includes("release") ? "bg-blue-500" : "bg-zinc-700"
                        }`}
                      >
                        <Calendar size={16} />
                      </div>
                      <div>
                        <h5 className="font-medium">Plan a Release or Post</h5>
                        <p className="text-xs text-zinc-400">Schedule your content</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      className="border-zinc-700 text-zinc-400 hover:bg-zinc-800 flex items-center gap-1"
                      onClick={handlePrevStep}
                    >
                      Back
                    </Button>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="border-zinc-700 text-zinc-400 hover:bg-zinc-800"
                        onClick={handleSaveAsDraft}
                      >
                        Save as Draft
                      </Button>
                      <Button
                        className="bg-white text-zinc-900 hover:bg-zinc-100 flex items-center gap-1"
                        onClick={handleNextStep}
                      >
                        Next
                        <ChevronRight size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Modal content - Step 4: Creative Goal */}
              {currentStep === 4 && (
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-2 text-center">Set an intention for this project</h4>
                  <p className="text-zinc-400 text-center mb-6 text-sm">"Start with a spark."</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    <div
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        creativeGoal === "launch" ? "border-blue-500 bg-blue-500/10" : "border-zinc-700"
                      } cursor-pointer`}
                      onClick={() => setCreativeGoal("launch")}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          creativeGoal === "launch" ? "bg-blue-500" : "bg-zinc-700"
                        }`}
                      >
                        <Rocket size={16} />
                      </div>
                      <div>
                        <h5 className="font-medium">Launch a Single</h5>
                        <p className="text-xs text-zinc-400">Release-ready planning</p>
                      </div>
                    </div>

                    <div
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        creativeGoal === "experiment" ? "border-blue-500 bg-blue-500/10" : "border-zinc-700"
                      } cursor-pointer`}
                      onClick={() => setCreativeGoal("experiment")}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          creativeGoal === "experiment" ? "bg-blue-500" : "bg-zinc-700"
                        }`}
                      >
                        <Zap size={16} />
                      </div>
                      <div>
                        <h5 className="font-medium">Experiment Freely</h5>
                        <p className="text-xs text-zinc-400">No pressure creativity</p>
                      </div>
                    </div>

                    <div
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        creativeGoal === "capture" ? "border-blue-500 bg-blue-500/10" : "border-zinc-700"
                      } cursor-pointer`}
                      onClick={() => setCreativeGoal("capture")}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          creativeGoal === "capture" ? "bg-blue-500" : "bg-zinc-700"
                        }`}
                      >
                        <Lightbulb size={16} />
                      </div>
                      <div>
                        <h5 className="font-medium">Capture an Idea</h5>
                        <p className="text-xs text-zinc-400">Quick concept storage</p>
                      </div>
                    </div>

                    <div
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        creativeGoal === "prep" ? "border-blue-500 bg-blue-500/10" : "border-zinc-700"
                      } cursor-pointer`}
                      onClick={() => setCreativeGoal("prep")}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          creativeGoal === "prep" ? "bg-blue-500" : "bg-zinc-700"
                        }`}
                      >
                        <Target size={16} />
                      </div>
                      <div>
                        <h5 className="font-medium">Prep for a Drop</h5>
                        <p className="text-xs text-zinc-400">Strategic planning</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      className="border-zinc-700 text-zinc-400 hover:bg-zinc-800 flex items-center gap-1"
                      onClick={handlePrevStep}
                    >
                      Back
                    </Button>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="border-zinc-700 text-zinc-400 hover:bg-zinc-800"
                        onClick={handleSaveAsDraft}
                      >
                        Save as Draft
                      </Button>
                      <Button className="bg-white text-zinc-900 hover:bg-zinc-100" onClick={handleCreateProject}>
                        Create Project
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Saving as draft indicator */}
      <AnimatePresence>
        {savingAsDraft && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 flex flex-col items-center"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <Clock className="w-10 h-10 text-blue-500 mb-4 animate-pulse" />
              <h3 className="text-lg font-bold mb-1">Saving as Draft</h3>
              <p className="text-zinc-400 text-sm">Your project will be available in your drafts</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collaborator Invitation Modal */}
      <AnimatePresence>
        {showCollaboratorModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-zinc-900 border border-zinc-800 rounded-lg w-full max-w-md overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Want to bring someone in?</h3>
                <p className="text-zinc-400 text-sm mb-6">
                  Collaborate with friends, producers, or visual artists to build together.
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Email or Muse @handle</label>
                    <input
                      type="text"
                      value={newCollaboratorEmail}
                      onChange={(e) => setNewCollaboratorEmail(e.target.value)}
                      placeholder="collaborator@example.com"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Assign a role</label>
                    <select
                      value={newCollaboratorRole}
                      onChange={(e) => setNewCollaboratorRole(e.target.value as CollaboratorRole)}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="producer">Producer</option>
                      <option value="visual">Visuals</option>
                      <option value="engineer">Engineering</option>
                      <option value="content">Content</option>
                      <option value="writer">Writer</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Permissions</label>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="permission"
                          checked={newCollaboratorPermission === "edit"}
                          onChange={() => setNewCollaboratorPermission("edit")}
                          className="w-4 h-4 text-blue-500"
                        />
                        <div className="flex items-center gap-1">
                          <Edit size={14} className="text-zinc-400" />
                          <span className="text-sm">Allow editing</span>
                        </div>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="permission"
                          checked={newCollaboratorPermission === "view"}
                          onChange={() => setNewCollaboratorPermission("view")}
                          className="w-4 h-4 text-blue-500"
                        />
                        <div className="flex items-center gap-1">
                          <Eye size={14} className="text-zinc-400" />
                          <span className="text-sm">View only</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Collaborators list */}
                {collaborators.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Added Collaborators</label>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {collaborators.map((collab, index) => (
                        <div key={index} className="flex items-center justify-between bg-zinc-800 rounded-lg p-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center text-xs">
                              {collab.email.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="text-sm">{collab.email}</div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-zinc-500">{collab.role}</span>
                                <span className="text-xs text-zinc-500 flex items-center gap-1">
                                  {collab.permission === "edit" ? <Edit size={10} /> : <Eye size={10} />}
                                  {collab.permission === "edit" ? "Can edit" : "View only"}
                                </span>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => removeCollaborator(collab.email)}
                            className="text-zinc-500 hover:text-zinc-300"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    className="border-zinc-700 text-zinc-400 hover:bg-zinc-800"
                    onClick={() => setShowCollaboratorModal(false)}
                  >
                    Skip for now
                  </Button>
                  <Button
                    onClick={() => {
                      addCollaborator()
                      if (!newCollaboratorEmail) {
                        setShowCollaboratorModal(false)
                      }
                    }}
                    className="bg-blue-600 hover:bg-blue-500"
                    disabled={!newCollaboratorEmail}
                  >
                    Invite
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rename Project Modal */}
      <AnimatePresence>
        {showRenameModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-zinc-900 border border-zinc-800 rounded-lg w-full max-w-md overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6">Rename Project</h3>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Project Title</label>
                    <input
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      autoFocus
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">
                      Subtitle or Internal Tag <span className="text-zinc-500">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={projectSubtitle}
                      onChange={(e) => setProjectSubtitle(e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    className="border-zinc-700 text-zinc-400 hover:bg-zinc-800"
                    onClick={() => setShowRenameModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => setShowRenameModal(false)}
                    className="bg-blue-600 hover:bg-blue-500"
                    disabled={!projectName.trim()}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Change Cover Art Modal */}
      <AnimatePresence>
        {showCoverArtModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-zinc-900 border border-zinc-800 rounded-lg w-full max-w-md overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6">Change Cover Art</h3>

                <div className="mb-6">
                  <div className="flex justify-center mb-4">
                    <div
                      className={`w-32 h-32 bg-gradient-to-br ${projectCoverColor} rounded-lg flex items-center justify-center`}
                    >
                      {projectType === "music" && <Music size={40} className="text-white" />}
                      {projectType === "visual" && <ImageIcon size={40} className="text-white" />}
                      {projectType === "content" && <Calendar size={40} className="text-white" />}
                      {projectType === "freeform" && <Lightbulb size={40} className="text-white" />}
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      className="border-zinc-700 text-zinc-400 hover:bg-zinc-800 flex items-center gap-1"
                    >
                      <Upload size={14} />
                      Upload Image
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    className="border-zinc-700 text-zinc-400 hover:bg-zinc-800"
                    onClick={() => setShowCoverArtModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => setShowCoverArtModal(false)} className="bg-blue-600 hover:bg-blue-500">
                    Save Changes
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Notes Modal */}
      <AnimatePresence>
        {showAddNotesModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-zinc-900 border border-zinc-800 rounded-lg w-full max-w-md overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6">Add Notes</h3>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Project Notes</label>
                  <textarea
                    value={projectNotes}
                    onChange={(e) => setProjectNotes(e.target.value)}
                    placeholder="Add creative direction, concepts, or reminders..."
                    className="w-full h-32 bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoFocus
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    className="border-zinc-700 text-zinc-400 hover:bg-zinc-800"
                    onClick={() => setShowAddNotesModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => setShowAddNotesModal(false)} className="bg-blue-600 hover:bg-blue-500">
                    Save Notes
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Manage Collaborators Modal */}
      <AnimatePresence>
        {showManageCollaboratorsModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-zinc-900 border border-zinc-800 rounded-lg w-full max-w-md overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6">Manage Collaborators</h3>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Email or Muse @handle</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newCollaboratorEmail}
                        onChange={(e) => setNewCollaboratorEmail(e.target.value)}
                        placeholder="collaborator@example.com"
                        className="flex-1 bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <Button
                        onClick={addCollaborator}
                        className="bg-blue-600 hover:bg-blue-500"
                        disabled={!newCollaboratorEmail}
                      >
                        Add
                      </Button>
                    </div>
                  </div>

                  {/* Collaborators list */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Current Collaborators</label>
                    {collaborators.length > 0 ? (
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {collaborators.map((collab, index) => (
                          <div key={index} className="flex items-center justify-between bg-zinc-800 rounded-lg p-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center text-xs">
                                {collab.email.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="text-sm">{collab.email}</div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-zinc-500">{collab.role}</span>
                                  <span className="text-xs text-zinc-500 flex items-center gap-1">
                                    {collab.permission === "edit" ? <Edit size={10} /> : <Eye size={10} />}
                                    {collab.permission === "edit" ? "Can edit" : "View only"}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => removeCollaborator(collab.email)}
                              className="text-zinc-500 hover:text-zinc-300"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-zinc-800 rounded-lg p-4 text-center text-zinc-500">
                        No collaborators added yet
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => setShowManageCollaboratorsModal(false)}
                    className="bg-zinc-700 hover:bg-zinc-600"
                  >
                    Done
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Leave Project Modal */}
      <AnimatePresence>
        {showLeaveProjectModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-zinc-900 border border-zinc-800 rounded-lg w-full max-w-md overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Leave Project</h3>
                <p className="text-zinc-400 mb-6">
                  Are you sure you want to leave this project? You will lose access to all project content and
                  collaborations.
                </p>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    className="border-zinc-700 text-zinc-400 hover:bg-zinc-800"
                    onClick={() => setShowLeaveProjectModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setShowLeaveProjectModal(false)
                      setProjectCreated(false)
                    }}
                    className="bg-red-600 hover:bg-red-500"
                  >
                    Leave Project
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
