import React from 'react'

const RecentActivities = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Recent Activities</h2>
      <ul className="space-y-2">
        {[1, 2, 3, 4, 5].map((item) => (
          <li key={item} className="flex items-center justify-between py-2 border-b last:border-b-0">
            <span className="text-gray-600">Activity {item}</span>
            <span className="text-sm text-gray-400">2 hours ago</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecentActivities
