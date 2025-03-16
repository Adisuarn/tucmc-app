import RecentActivities from "@components/recent-activities"
import ToolMain from "@components/tool-section/tool-main"
import { getSession } from "@/libs/auth"
import SplitText from "@components/split-text"

export default async function Home() {
  const session = await getSession()
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-12">
        <div>
          <div className="text-center mb-12">
            <SplitText
              text={`Welcome, ${session?.user?.name}`}
              className="text-3xl font-bold text-gray-800"
              highlights={[
                { text: `${session?.user?.name}`, color: '#f687b3' }
              ]}
            />
          </div>
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

