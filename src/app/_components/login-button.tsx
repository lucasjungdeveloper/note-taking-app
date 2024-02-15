"use client"

import { Session } from "next-auth"
import { signIn, signOut } from "next-auth/react"
import { useState } from "react"
import { Button } from "~/app/_components/ui/button"
import { Loader2 } from 'lucide-react'

export function LoginButton({ session }: { session: Session | null }) {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      {session ? (
        <Button
          onClick={async () => {
            setIsLoading(true)
            try {
              await signOut()
            }
            finally {
              setIsLoading(false)
            }
          }}>
          {isLoading ? <Loader2
            className="h-[1.2rem] w-[1.2rem] animate-spin"
          /> : 'Sign out'}
        </Button>
      ) : (
        <Button onClick={() => signIn()}>
          Sign in
        </Button>
      )}
    </>
  )
}
