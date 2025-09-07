'use client'
import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const Header = () => {
  const [session, setSession] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
    }
    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <header className="py-4 mb-8">
      <div className="mx-4 md:mx-16 flex justify-between items-center">
        <div>
          <a href="/">
            <img src="/internlink_logo.png" alt="InternLink Logo" width={84} height={28} />
          </a>
        </div>
        <nav className="hidden md:flex space-x-4">
          <a href="/internships">Stages</a>
          <a href="/companies">Entreprises</a>
          <a href="/about">À Propos</a>
        </nav>
        <div className='hidden md:flex space-x-2'>
          {session ? (
            <>
              <Button variant="outline" asChild>
                <a href="/admin">Admin</a>
              </Button>
              <Button onClick={handleLogout}>Déconnexion</Button>
            </>
          ) : (
            <Button variant="outline" asChild>
              <a href="/admin/login">Admin Login</a>
            </Button>
          )}
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col space-y-4 mt-8">
                <a href="/internships">Stages</a>
                <a href="/companies">Entreprises</a>
                <a href="/about">À Propos</a>
                {session ? (
                  <>
                    <a href="/admin">Admin</a>
                    <Button onClick={handleLogout}>Déconnexion</Button>
                  </>
                ) : (
                  <a href="/admin/login">Admin Login</a>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default Header
