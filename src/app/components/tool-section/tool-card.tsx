import Link from "next/link"
import type { ReactNode } from "react"
import { XCircle } from "lucide-react"
import { cn } from "@/libs/utils"

interface ToolCardProps {
  title: string
  description: string
  icon: ReactNode
  href: string
  className?: string
  usable?: boolean
}

export default function ToolCard({ title, description, icon, href, className, usable = true }: ToolCardProps) {
  return (
    <Link
      href={usable ? href : "#"}
      className={cn(
        className,
        usable ? '' : 'pointer-events-none',
        'block border border-[#f687b3] bg-white text-[#f687b3] rounded-lg shadow-md overflow-hidden group relative',
        'hover:bg-[#f687b3] hover:text-white hover:border-[#f687b3]',
        'transition-colors duration-300'
      )}
    >
      <div className="p-6 h-full transition-all duration-300 group-hover:shadow-xl">
        <div className="flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-center  mb-2">{title}</h2>
        <p className="text-center  text-opacity-90">{description}</p>
      </div>

      {!usable && (
        <div className="absolute inset-0 backdrop-blur-xs bg-black/20 flex flex-col items-center justify-center">
          <XCircle className="w-12 h-12 text-red-500 mb-2" />
          <span className="text-white font-semibold">Coming Soon</span>
        </div>
      )}
    </Link>
  )
}
