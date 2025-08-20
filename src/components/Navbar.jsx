import React from 'react'
import { Button } from './ui/button'

const Navbar = ({data, color}) => {
    
  return (
   <header className='flex justify-between items-center bg-emerald-200 py-2 px-8'>

    {/* logo and company name  */}
    <div className='flex items-center  gap-4'>
      <img src="/vite.svg" alt="logo" />
      <h1 className='text-xl font-bold'>Clove IT</h1>
    </div>

    {/* links and buttons  */}
    <div className='flex items-center gap-6'>
      <div className='flex items-center gap-6 [&>a]:hover:underline'>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </div>
      <div>
        <Button className={"cursor-pointer"}>Sign in</Button>
      </div>
    </div>

   </header>
  )
}

export default Navbar