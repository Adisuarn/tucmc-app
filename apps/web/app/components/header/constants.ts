import { authClient } from "@tucc/auth/client"
import { redirect } from "next/navigation";

interface NavItem {
  text: string;
  href?: string;
  type: string;
  fn?: () => Promise<void>;
}

const SignOut = async () => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        redirect('/sign-in')
      }
    }
  })
}

export const unAuthenticated: NavItem[] = [
  { text: 'Dashboard', href: '/', type: 'ghost' },
  { text: 'Login', href: '/sign-in', type: 'outline' }
]

export const authenticated: NavItem[] = [
  { text: 'Dashboard', href: '/', type: 'ghost' },
  { text: 'Account', href: '/account', type: 'ghost' },
  { text: 'Logout', type: 'outline', fn: SignOut },
]
