import RecentActivities from "@components/recent-activities"
import { BarChart } from "lucide-react"
import QuickAccess from "@components/quick-access"
import ToolMain from "@components/tool-section/tool-main"
import { api } from "@/libs/api"

export default async function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">TUCC APPLICATION</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="md:col-span-3 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Test</h2>
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <BarChart className="h-24 w-24 text-gray-400" />
            </div>
          </div>
          <QuickAccess />
        </div>

        <ToolMain />

        <RecentActivities />
        
      </main>
    </div>
  )
}

