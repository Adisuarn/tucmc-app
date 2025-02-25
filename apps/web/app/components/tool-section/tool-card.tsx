import Link from "next/link"
import type { ReactNode } from "react"

interface ToolCardProps {
  title: string
  description: string
  icon: ReactNode
  href: string
  className?: string
}

export default function ToolCard({ title, description, icon, href, className }: ToolCardProps) {
  return (
    <Link href={href} className={`block ${className} rounded-lg shadow-md overflow-hidden group relative`}>
      <div className="p-6 h-full transition-all duration-300 group-hover:shadow-xl">
        <div className="flex items-center justify-center mb-4 text-white transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-center text-white mb-2">{title}</h2>
        <p className="text-center text-white text-opacity-90">{description}</p>
      </div>
    </Link>
  )
}
