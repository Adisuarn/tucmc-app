import { Link, FileText, Database, ScrollText, Clock } from "lucide-react"

export const TOOLS_DATA = [
  {
    title: "Activity Sheet",
    description: "Create activity sheets so as to absent legally",
    icon: FileText,
    href: "/activity-sheet",
    usable: true
  },
  {
    title: "Certification Generator",
    description: "Create certificates for your events",
    icon: ScrollText,
    href: "/certification-generator",
    usable: false
  },
  {
    title: "Database & Tracker",
    description: "Use to search for students and track their activities",
    icon: Database,
    href: "/database",
    usable: false
  },
  {
    title: "URL Shortener",
    description: "Shorten URLs for easy sharing",
    icon: Link,
    href: "/url-shortener",
    usable: true
  }
]
