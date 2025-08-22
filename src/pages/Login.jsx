import { Button } from '@/components/ui/button'
import React from 'react'

const Login = () => {
  return (
    <section className='flex justify-center items-center h-screen'>
        <div className='border-1 border-gray-800 w-80 rounded-md p-4'>
            <form>
                <h1 className='text-2xl font-bold mb-4 text-center'>
                    Login to Your Account
                </h1>

                <div className='flex gap-4'>
                    <label className='w-1/4' htmlFor="email">Email:</label>
                    <input className='border-1 border-gray-500 shadow-md' type="email" id="email" name="email" required />
                    <p></p>
                </div>
                <div className='flex gap-4 my-4'>
                    <label className='w-1/4' htmlFor="password">Password:</label>
                    <input  className='border-1 border-gray-500 shadow-md' type="password" id="password" name="password" required />
                </div>
                <div>
                    <Button className={"w-full"} type="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    </section>
  )
}

export default Login