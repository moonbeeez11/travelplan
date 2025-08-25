import FamousTrips from '@/components/landingComponents/FamousTrips'
import Features from '@/components/landingComponents/Features'
import Hero from '@/components/landingComponents/Hero'
import Navbar from '@/components/landingComponents/Navbar'
import React from 'react'

const LandingPage = () => {
  return (
    <>
        <Navbar />
        <Hero />
        <Features />
        <FamousTrips />
    </>
  )
}

export default LandingPage