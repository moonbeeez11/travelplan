import React from 'react'
import { Button } from '../ui/button'

const Hero = () => {
  return (
    <section className='relative flex items-center justify-center text-white'>
        <div className='absolute top-0 left-0 w-full h-full -z-20'>
            <img src="https://curlytales.com/wp-content/uploads/2023/09/cover-75.jpg" alt="background" className='w-full h-full ' />
        </div>

        <div className="absolute h-full w-full top-0 left-0 bg-black/40 -z-10">
        </div>


        <div className='flex flex-col items-center justify-center text-center gap-6 min-h-[80vh] max-w-2/3 px-4'>
            <h1 className='text-4xl md:text-6xl font-bold'>
                Explore the world with Wander Wise 
            </h1>
            <p className=' text-white'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit officiis dolorum qui libero recusandae eaque ab eligendi incidunt, error explicabo, nemo tenetur Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime, amet!
            </p>
            <Button>Get Started</Button>
        </div>

    </section>
     
  )
}

export default Hero