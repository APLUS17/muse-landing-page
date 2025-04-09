"use client"

import { useState, useEffect } from "react"
import { Plus, Play, Calendar, Search, Bell, Home, Compass, Zap, User } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

// Project type definition
type Project = {
  id: string
  title: string
  subtitle?: string
  coverImage: string
  progress: number
  type: "music" | "visual" | "content" | "freeform"
  isDraft?: boolean
}

export default function HomePage() {
  const [showTooltip, setShowTooltip] = useState(true)
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [projects, setProjects] = useState<Project[]>([])

  // Simulate loading projects
  useEffect(() => {
    // This would normally come from an API or database
    const demoProjects: Project[] = [
      {
        id: "1",
        title: "Further Beyond EP",
        coverImage: "gradient-blue",
        progress: 75,
        type: "music",
      },
      {
        id: "2",
        title: "Untitled EP",
        coverImage: "gradient-purple",
        progress: 50,
        type: "music",
      },
      {
        id: "3",
        title: "Colours",
        coverImage: "gradient-teal",
        progress: 25,
        type: "visual",
        isDraft: true,
      },
    ]

    setProjects(demoProjects)
    setCurrentProject(demoProjects[0])

    // Show tooltip after a short delay
    const timer = setTimeout(() => {
      setShowTooltip(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const dismissTooltip = () => {
    setShowTooltip(false)
  }

  // Generate gradient background based on project type
  const getGradient = (type: string) => {
    switch (type) {
      case "music":
        return "from-blue-600 to-purple-600"
      case "visual":
        return "from-teal-500 to-emerald-500"
      case "content":
        return "from-orange-500 to-red-500"
      case "freeform":
      default:
        return "from-indigo-500 to-violet-500"
    }
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* Background with stars effect */}
      <div className="fixed inset-0 bg-[url('/stars-bg.svg')] opacity-30 z-0"></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="ml-1 text-sm font-medium">muse</span>
            <span className="text-xs bg-zinc-800 px-2 py-0.5 rounded-full ml-2">beta</span>
          </div>

          <div className="flex items-center gap-3">
            <button className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white rounded-full transition-colors">
              <Search size={18} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white rounded-full transition-colors">
              <Bell size={18} />
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="px-4 pb-20">
          {/* Current Project Section */}
          {currentProject && (
            <section className="mb-8">
              <h2 className="text-sm text-zinc-400 mb-2">Current Project</h2>
              <div className="flex items-center mb-2">
                <h1 className="text-xl font-bold">{currentProject.title}</h1>
              </div>

              <div className="relative rounded-xl overflow-hidden aspect-[3/2] max-h-48 mb-4">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${getGradient(currentProject.type)} opacity-80`}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-1">{currentProject.title}</h2>
                    <div className="text-sm text-white/80">EP</div>
                  </div>
                </div>
                <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                  <div className="flex items-center gap-1">
                    <div className="w-6 h-1 bg-white/30 rounded-full">
                      <div
                        className="h-full bg-white rounded-full"
                        style={{ width: `${currentProject.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs">{currentProject.progress}%</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Recent Work Section */}
          <section className="mb-8">
            <h2 className="text-sm text-zinc-400 mb-3">Recent Work</h2>
            <div className="grid grid-cols-3 gap-3">
              {projects.map((project) => (
                <div key={project.id} className="relative rounded-lg overflow-hidden aspect-square">
                  <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(project.type)}`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {project.isDraft && (
                      <div className="absolute top-2 right-2 bg-black/50 text-xs px-1.5 py-0.5 rounded-full">Draft</div>
                    )}
                    <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Play size={14} fill="white" className="ml-0.5" />
                    </button>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="text-xs font-medium truncate">{project.title}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-full h-1 bg-white/30 rounded-full">
                        <div className="h-full bg-white rounded-full" style={{ width: `${project.progress}%` }}></div>
                      </div>
                      <span className="text-xs whitespace-nowrap">{project.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Actions */}
          <section className="mb-8">
            <h2 className="text-sm text-zinc-400 mb-3">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/demo" className="block">
                <div className="bg-zinc-800/70 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center justify-center text-center">
                  <div className="w-10 h-10 bg-zinc-700 rounded-full flex items-center justify-center mb-2">
                    <Plus size={20} className="text-zinc-300" />
                  </div>
                  <span className="text-sm font-medium">Projects</span>
                </div>
              </Link>

              <div className="bg-zinc-800/70 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mb-2">
                  <span className="text-lg font-bold">M</span>
                </div>
                <span className="text-sm font-medium">Muse</span>
              </div>

              <div className="bg-zinc-800/70 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mb-2">
                  <Calendar size={20} className="text-zinc-100" />
                </div>
                <span className="text-sm font-medium">Content</span>
              </div>

              <div className="bg-zinc-800/70 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mb-2">
                  <User size={20} className="text-zinc-100" />
                </div>
                <span className="text-sm font-medium">Collab</span>
              </div>
            </div>
          </section>

          {/* Upcoming Schedule */}
          <section>
            <h2 className="text-sm text-zinc-400 mb-3">Upcoming Schedule</h2>
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-4 border border-zinc-700/50">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center justify-center">
                  <div className="text-red-500 text-sm font-bold">23</div>
                  <div className="text-red-500 text-xs">MAR</div>
                </div>
                <div>
                  <div className="font-medium">Further Beyond</div>
                  <div className="text-sm text-zinc-400">Live Studio Session</div>
                </div>
              </div>
            </div>
          </section>

          {/* Tooltip */}
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed bottom-20 left-4 right-4 bg-blue-900/90 backdrop-blur-md rounded-lg p-4 border border-blue-700 shadow-lg"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">Welcome to Muse Beta!</h3>
                <button onClick={dismissTooltip} className="text-zinc-400 hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <p className="text-sm text-blue-100">
                Tap on "Projects" to create your first music project or explore your existing work.
              </p>
            </motion.div>
          )}
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-zinc-900/80 backdrop-blur-md border-t border-zinc-800 flex justify-around p-3 z-20">
          <button className="flex flex-col items-center justify-center text-blue-500">
            <Home size={20} />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button className="flex flex-col items-center justify-center text-zinc-500">
            <Compass size={20} />
            <span className="text-xs mt-1">Discover</span>
          </button>
          <div className="flex items-center justify-center">
            <button className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center -mt-6 border-4 border-zinc-900">
              <Plus size={24} />
            </button>
          </div>
          <button className="flex flex-col items-center justify-center text-zinc-500">
            <Zap size={20} />
            <span className="text-xs mt-1">Activity</span>
          </button>
          <button className="flex flex-col items-center justify-center text-zinc-500">
            <User size={20} />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </nav>
      </div>
    </div>
  )
}
