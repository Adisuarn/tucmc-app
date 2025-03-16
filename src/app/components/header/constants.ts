interface NavItem {
  text: string;
  href?: string;
  type: string;
  fn?: () => Promise<void>;
}

export const unAuthenticated: NavItem[] = [
  { text: 'Dashboard', href: '/', type: 'ghost' },
]

export const authenticated: NavItem[] = [
  { text: 'Dashboard', href: '/', type: 'ghost' },
]
