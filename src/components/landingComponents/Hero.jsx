import React from 'react'
import { Button } from '../ui/button'

const Hero = () => {
    return (
        <section className='relative flex items-center justify-center text-white'>
            <div className='absolute top-0 left-0 w-full h-full -z-20'>
                <img src="https://res.cloudinary.com/ybmedia/image/upload/c_crop,h_1125,w_2000,x_0,y_40/c_fill,f_auto,h_900,q_auto,w_1600/v1/m/6/8/68dbbf89e8e397f36bc350ce3846206b37712d77/20-dream-worthy-vacation-destinations.jpg" alt="background" className='w-full h-full ' />
            </div>

            <div className="absolute h-full w-full top-0 left-0 bg-black/60 -z-10">
            </div>


            <div className='flex flex-col items-center justify-center text-center gap-10 min-h-[90vh] max-w-2/3 px-4'>
                <h1 className='text-4xl md:text-6xl font-bold'>
                    Explore the world with Wander Wise
                </h1>
                <p className='px-20 text-lg text-white'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit officiis dolorum qui libero recusandae eaque ab eligendi incidunt, error explicabo, nemo tenetur Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime, amet!
                </p>
                <div className='flex items-center gap-4'>
                    <a href="/trips"><Button size={"lg"}>Explore Trips</Button></a>
                    <a href="/signup"><Button size="lg" variant={"outline"} className="bg-transparent">Register</Button></a>
                </div>
            </div>

        </section>

    )
}

export default Hero