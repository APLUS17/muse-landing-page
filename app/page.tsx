import { ArrowRight, Palette, Calendar, CheckSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-20 container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <span className="ml-1 text-sm font-medium">muse</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm font-medium hover:opacity-80 transition-opacity">
            Features
          </a>
          <a href="#who" className="text-sm font-medium hover:opacity-80 transition-opacity">
            Who it's for
          </a>
          <a href="#cta" className="text-sm font-medium hover:opacity-80 transition-opacity">
            Get Started
          </a>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            className="text-xs bg-transparent border border-zinc-700 text-white hover:bg-zinc-800 rounded-full px-4"
          >
            Log in
          </Button>
          <Button className="text-xs bg-zinc-100 text-zinc-900 hover:bg-white rounded-full px-4">Sign up</Button>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-32">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center mb-32 pt-12">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 max-w-xl">Your album. Visualized.</h1>
            <p className="text-xl text-white/80 max-w-lg mb-8">
              Muse is a creative workspace for artists to plan visuals, design content, and build their rollouts.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-zinc-100 text-zinc-900 hover:bg-white rounded-full px-6 py-5 text-sm font-medium transition-all duration-300 flex items-center gap-2 group"
            >
              <Link href="/demo">
                Launch Muse
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              {/* 3D object placeholder - replace with actual 3D model or image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 bg-zinc-800/70 backdrop-blur-xl rounded-full flex items-center justify-center">
                  <div className="w-32 h-32 bg-zinc-700/70 rounded-full"></div>
                </div>
              </div>

              {/* Grid lines for 3D effect */}
              <div className="absolute inset-0 border-2 border-zinc-700/30 rounded-xl"></div>
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-700/30"></div>
              <div className="absolute top-1/2 left-0 right-0 h-px bg-zinc-700/30"></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="mb-32">
          <h2 className="text-3xl font-bold mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-8 border border-zinc-700 hover:bg-zinc-800 transition-all duration-300">
              <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Moodboard</h3>
              <p className="text-white/70">
                Drag, drop, and arrange visual references to shape your album's aesthetic.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-8 border border-zinc-700 hover:bg-zinc-800 transition-all duration-300">
              <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Social Planner</h3>
              <p className="text-white/70">
                Schedule and preview content across platforms to stay consistent and inspired.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-8 border border-zinc-700 hover:bg-zinc-800 transition-all duration-300">
              <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <CheckSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Creative Tasks</h3>
              <p className="text-white/70">Break your vision into actionable steps and track progress as you go.</p>
            </div>
          </div>
        </section>

        {/* Who It's For Section */}
        <section id="who" className="mb-32">
          <h2 className="text-3xl font-bold mb-12">Who it's for</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700">
              <h3 className="text-xl font-bold mb-2">Music Artists</h3>
              <p className="text-white/70">Plan your album rollout with a cohesive visual strategy</p>
            </div>
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700">
              <h3 className="text-xl font-bold mb-2">Content Creators</h3>
              <p className="text-white/70">Organize your content calendar with visual inspiration</p>
            </div>
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700">
              <h3 className="text-xl font-bold mb-2">Visual Storytellers</h3>
              <p className="text-white/70">Craft narratives that connect across multiple platforms</p>
            </div>
          </div>
        </section>

        {/* App Preview Section */}
        <section className="mb-32 relative">
          <div className="relative rounded-xl overflow-hidden border border-white/20">
            {/* 3D object grid display */}
            <div className="bg-zinc-800/30 backdrop-blur-md p-12 flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Plan your creative vision</h2>
                <p className="text-white/80 mb-6">
                  Muse helps artists ideate and build intuitive and delightful visual projects for their music.
                </p>
                <Button
                  asChild
                  className="bg-white text-blue-600 hover:bg-white/90 rounded-full px-5 py-2 text-sm font-medium"
                >
                  <Link href="/demo">Try the beta - it's free</Link>
                </Button>
              </div>

              <div className="md:w-1/2 flex justify-center">
                {/* 3D object placeholder */}
                <div className="relative w-64 h-64 border-2 border-white/20 rounded-xl flex items-center justify-center">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/30 rounded-full"></div>
                  </div>

                  {/* Grid lines */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10"></div>
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section id="cta" className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Start visualizing your next release today.</h2>
          <p className="text-xl text-white/80 mb-10">
            Join artists who are bringing their creative vision to life with Muse.
          </p>
          <Link href="/demo" className="inline-block">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-white/90 rounded-full px-8 py-5 text-sm font-medium transition-all duration-300 flex items-center gap-2 group"
            >
              Try Muse Now
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </section>
      </main>
    </div>
  )
}
