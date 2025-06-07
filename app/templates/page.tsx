import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Templates",
  description: "Browse and use our collection of templates",
}

export default function TemplatesPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Templates</h2>
        <div className="flex items-center space-x-2">
          <Button>Create Template</Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Template Cards */}
        <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
          <h3 className="text-lg font-semibold mb-2">Basic Project Template</h3>
          <p className="text-sm text-gray-500">A simple starting point for your new project</p>
        </Card>
        
        <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
          <h3 className="text-lg font-semibold mb-2">Marketing Campaign</h3>
          <p className="text-sm text-gray-500">Perfect for planning marketing initiatives</p>
        </Card>
        
        <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
          <h3 className="text-lg font-semibold mb-2">Design System</h3>
          <p className="text-sm text-gray-500">Organize your design assets and guidelines</p>
        </Card>
      </div>
    </div>
  )
} 