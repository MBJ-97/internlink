import React from 'react'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4">
      <div>
        <a href="/" className="text-2xl font-bold">InternLink</a>
      </div>
      <nav className="hidden md:flex space-x-4">
        <a href="/internships">Internships</a>
        <a href="/companies">Companies</a>
        <a href="/about">About</a>
      </nav>
      <div className='hidden md:flex space-x-2'>
        <Button variant="outline" asChild>
          <a href="/login">Login</a>
        </Button>
        <Button asChild>
          <a href="/signup">Sign Up</a>
        </Button>
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
              <a href="/internships">Internships</a>
              <a href="/companies">Companies</a>
              <a href="/about">About</a>
              <a href="/login">Login</a>
              <a href="/signup">Sign Up</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export default Header
