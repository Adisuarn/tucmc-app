import React from 'react'
import { Button } from '@components/ui/button'
import { FileText } from "lucide-react"

const QuickAccess = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Quick Access</h2>
      <div className="space-y-2">
        <Button variant="outline" className="w-full justify-start">
          <FileText className="mr-2 h-4 w-4" /> Recent Files
        </Button>
      </div>
    </div>
  )
}

export default QuickAccess
