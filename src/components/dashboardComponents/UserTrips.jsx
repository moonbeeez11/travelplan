import useApi from '@/hooks/useApi'
import React from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '../ui/button'
import Loading from '../shared/Loading'

const UserTrips = () => {
    // const {data, loading, error} = useApi("/trips");

    // if(loading) return <Loading text='Getting your trips' />
    // if(error) return <div>Error: {error.message}</div>
    // console.log(data);
    
    const data = [
        { _id: 1, title: "Paris, France Trip", budget: 2000, startDate: "2023-10-01", endDate: "2023-10-01" },
        { _id: 2, title: "London, UK Trip", budget: 2000, startDate: "2023-10-01", endDate: "2023-10-01" },
        { _id: 3, title: "New York, USA Trip", budget: 2000, startDate: "2023-10-01", endDate: "2023-10-01" },
    ]

    return (
        <section>
            <h2 className="text-2xl font-bold mb-4">Your Trips</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {
                    data.map((trip) => {
                        return (
                            <Card key={trip._id} className="border hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle>{trip.title}</CardTitle>
                                    <CardDescription>{trip.startDate} to {trip.endDate}</CardDescription>
                                </CardHeader>
                                {/* <CardContent>
                                    <p>
                                        Start Date: {trip.startDate} <br />
                                        End Date: {trip.endDate} <br />
                                    </p>
                                </CardContent> */}
                                <CardFooter className={"flex justify-between items-baseline"}>
                                    <p className='font-medium'>$ {trip.budget}</p>
                                    <a href={`/trips/${trip._id}`}>
                                    <Button size="sm">View Details</Button>
                                    </a>
                                </CardFooter>
                            </Card>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default UserTrips