import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <>
    <div className="h-10 w-full bg-blue-100 p-6">
        <h1 className="text-lg font-bold">Wander Wise</h1>
    </div>
        <Outlet />
        <div className="h-10 w-full bg-green-400 p-6">
        <h1 className="text-lg font-bold">Wander Wise</h1>
    </div>

    </>
  )
}

export default AppLayout