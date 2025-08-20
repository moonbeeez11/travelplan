import React from 'react'
import { Button } from './ui/button'

const Hero = () => {
  return (
    <section className='p-20 grid grid-cols-2 gap-6'>
        {/* left paragraph part  */}
        <div>
            <h1 className='text-4xl font-extrabold'>Manage Your Trip With Ease using WanderWise</h1>

            <p className='mt-8'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, aliquam ea! Facilis veritatis ea et harum assumenda mollitia, voluptatem eaque exercitationem ducimus, fugit eveniet aliquam repudiandae vel, sed quam vitae.</p>

            <Button className={"mt-8"}>Book Trip</Button>
        </div>

        {/* right image part  */}
        <div className='flex justify-center items-center'>
            <img src="/vite.svg" alt="hero image" className='w-60 h-60' />
        </div>
    </section>
  )
}

export default Hero