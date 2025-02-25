export function isInAppBrowser(): boolean {
  if (typeof window === "undefined") {
    return false // Return false if running on the server
  }

  const ua = navigator.userAgent || navigator.vendor || (window as any).opera

  // Check for Facebook in-app browser
  if (ua.indexOf("FBAN") > -1 || ua.indexOf("FBAV") > -1) return true

  // Check for Instagram in-app browser
  if (ua.indexOf("Instagram") > -1) return true

  // Check for LinkedIn in-app browser
  if (ua.indexOf("LinkedIn") > -1) return true

  // Add more checks for other in-app browsers as needed

  return false
}
