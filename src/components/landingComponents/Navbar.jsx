import React from 'react'
import { Button } from '../ui/button'

const Navbar = () => {
  return (
    <header className='flex items-center justify-between py-4 px-8 border-b'>
        <div className='flex items-center gap-4'>
            <img src="/logo.png" alt="logo" className='h-10 w-10' />
            <h1 className='text-2xl font-bold'>Wander Wise</h1>
        </div>

        <div className='flex gap-10'>
            <nav className='flex items-center gap-8 [&>a]:hover:underline font-medium text-gray-800'>
                <a href="#features">Features</a>
                <a href="#trips">Trips</a>
                <a href="#testimonials">Testimonials</a>
                <a href="#about">About</a>
            </nav>
            <div>
               <a href="/login"><Button>Login</Button></a> 
            </div>
        </div>
    </header>
  )
}

export default Navbar