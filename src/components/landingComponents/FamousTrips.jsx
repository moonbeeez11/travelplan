import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { famousTrips, features } from '@/lib/constants'
import { Button } from '../ui/button'

const FamousTrips = () => {

    return (
        <section className="py-24 px-10 bg-gray-50" id="trips">
            <div className="container mx-auto px-4">

                {/* heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Famous Trips</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Some of the most popular trips planned with Wander Wise.
                    </p>
                </div>

                {/* feature cards  */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {
                        famousTrips.map((trip) => {
                            return (
                                <Card key={trip.place}>
                                    <CardHeader>
                                        <div className='h-60 w-full overflow-hidden'>
                                            <img src={trip.image} alt={trip.place} className='h-full w-full' />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className='text-xl font-bold mb-2'>{trip.place}</p>
                                        <CardDescription className={"flex items-center justify-between"}>
                                            <p className='text-lg text-gray-600'>
                                                {trip.days} days
                                            </p>
                                            <p className='text-lg font-semibold text-gray-900'>
                                                {trip.budget} USD
                                            </p>
                                        </CardDescription>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className={"w-full"}>
                                            View Details
                                        </Button>
                                    </CardFooter>
                                </Card>
                            )
                        })
                    }

                </div>
            </div>
        </section>
    )
}

export default FamousTrips