import React from 'react'
import ToolCard from "@components/tool-section/tool-card"
import { Bell } from "lucide-react"
import { Button } from '@components/ui/button'
import { TOOLS_DATA } from './constant'

const ToolMain = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
      {TOOLS_DATA.map((tool) => (
        <ToolCard
          key={tool.href}
          title={tool.title}
          description={tool.description}
          icon={<tool.icon className="h-8 w-8" />}
          href={tool.href}
          usable={tool.usable}
        />
      ))}
    </section>
  )
}

export default ToolMain
