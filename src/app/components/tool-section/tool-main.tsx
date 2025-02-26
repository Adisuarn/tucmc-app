import React from 'react'
import ToolCard from "@components/tool-section/tool-card"
import { Bell } from "lucide-react"
import { Button } from '@components/ui/button'
import { TOOLS_DATA } from './constant'

const NewsletterCard = () => (
  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-center items-center text-center">
    <Bell className="h-12 w-12 text-primary mb-4" />
    <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
    <p className="text-muted-foreground mb-4">Get notified about new features and updates</p>
    <input
      type="email"
      placeholder="Enter your email"
      className="w-full p-2 border border-input rounded mb-2"
    />
    <Button className="w-full">Subscribe</Button>
  </div>
)

const ToolMain = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {TOOLS_DATA.map((tool) => (
        <ToolCard
          key={tool.href}
          title={tool.title}
          description={tool.description}
          icon={<tool.icon className="h-8 w-8" />}
          href={tool.href}
          className={`bg-linear-to-br ${tool.gradient}`}
          usable={tool.usable}
        />
      ))}
      <NewsletterCard />
    </section>
  )
}

export default ToolMain
