import RecentActivities from "@components/recent-activities"
import ToolMain from "@components/tool-section/tool-main"
import { getSession } from "@/libs/auth"

export default async function Home() {
  const session = await getSession()
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-12">
        <div>
          <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Welcome {session?.user.name}!</h1>
          <div>
            <ToolMain />
          </div>
          <div>
            <RecentActivities />
          </div>
        </div>
      </main>
    </div>
  )
}

