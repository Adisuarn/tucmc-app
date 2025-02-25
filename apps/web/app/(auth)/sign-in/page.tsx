"use client"

import { useState, useEffect } from "react"
import { Button } from "@tucc/ui/button"
import { Sparkles } from "lucide-react"
import { authClient } from '@tucc/auth/client'
import WarningModal from "@components/warning-modal"
import { isInAppBrowser } from "@/utils/browserDetection"

export default function SignInPage() {
  const [showModal, setShowModal] = useState(false)
  const [isInApp, setIsInApp] = useState(false)

  useEffect(() => {
    setIsInApp(isInAppBrowser())
  }, [])

  const handleLoginClick = async () => {
    if (isInApp) {
      setShowModal(true)
    } else {
      await proceedWithLogin()
    }
  }

  const proceedWithLogin = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
    })
    if (error) {
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
        <Button onClick={handleLoginClick} className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white">
          Sign in with Google
        </Button>
      </div>
      <WarningModal
        isOpen={showModal}
        onClose={() => { setShowModal(false) }}
        onConfirm={async () => {
          setShowModal(false)
          await proceedWithLogin()
        }}
      />
    </div>
  )
}
