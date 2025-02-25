import { QrCode, FileText, Database, HardDrive, Clock } from "lucide-react"

export const TOOLS_DATA = [
  {
    title: "QR Code Generator",
    description: "Create custom QR codes for your business needs",
    icon: QrCode,
    href: "/qr-generator",
    gradient: "from-[#f687b3] to-[#ffa69e]"
  },
  {
    title: "PDF Generator",
    description: "Convert and create professional PDFs",
    icon: FileText,
    href: "/pdf-generator",
    gradient: "from-[#a18cd1] to-[#fbc2eb]"
  },
  {
    title: "Database Management",
    description: "Efficiently manage your organizational data",
    icon: Database,
    href: "/database",
    gradient: "from-[#84fab0] to-[#8fd3f4]"
  },
  {
    title: "File Storage",
    description: "Secure cloud storage for your important files",
    icon: HardDrive,
    href: "/storage",
    gradient: "from-[#a6c0fe] to-[#f68084]"
  },
  {
    title: "Task Management",
    description: "Organize and track your team's tasks",
    icon: Clock,
    href: "/tasks",
    gradient: "from-[#5ee7df] to-[#b490ca]"
  },
]
