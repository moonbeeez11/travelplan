import React from 'react'
import { Button } from './ui/button'

const Navbar = ({data, color}) => {
    
  return (
    <div className='flex justify-between p-10 bg-blue-100'>
        <h1 className='hover:bg-red-500'>Company Name: {data.firstName} </h1>
        <Button className={color=="red"?"bg-red-400":"bg-blue-400"}>Login</Button>
    </div>
  )
}

export default Navbar