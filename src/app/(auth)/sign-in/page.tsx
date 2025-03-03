"use client"

import { Button } from "@components/ui/button"
import { Sparkles } from "lucide-react"
import { authClient } from '@/libs/auth/auth-client'
import { toast } from "sonner"

export default function SignInPage() {
  const handleLoginClick = async () => {
      await proceedWithLogin()
  }

  const proceedWithLogin = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
    })
    if (error) {
      toast.error("Failed to Sign in. Please contact support.")
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Sparkles className="h-8 w-8 text-[#f687b3] mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Sign In To Continue</h1>
        </div>
        <Button onClick={handleLoginClick} className="w-full">
          Sign in with Google
        </Button>
      </div>
    </div>
  )
}
