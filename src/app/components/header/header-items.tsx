'use client'

import type { Session } from "@/libs/auth/auth-types"
import { Button } from "@components/ui/button"
import Link from "next/link"
import { unAuthenticated, authenticated } from "./constants"

const NavButton = ({
  text,
  href,
  type,
  fn
}: {
  text: string;
  href?: string;
  type: 'outline' | 'ghost';
  fn?: () => Promise<void>;
}) => {
  const ButtonComponent = (
    <Button
      variant={type}
      onClick={fn}
    >
      {text}
    </Button>
  )

  return href ? (
    <Link href={href}>
      {ButtonComponent}
    </Link>
  ) : ButtonComponent
}

const HeaderItems = ({ session }: { session: Session | null }) => {
  return (
    <div className="flex items-center space-x-4">
      {(session ? authenticated : unAuthenticated).map((button, index) => (
        <NavButton
          key={index}
          text={button.text}
          href={button.href}
          type={button.type as "outline" | "ghost"}
          fn={button.fn}
        />
      ))}
    </div>
  )
}

export default HeaderItems
