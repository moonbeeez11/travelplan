import React from 'react'
import api from '@/api/axios';
import Loading from '@/components/shared/Loading';
import { Button } from '@/components/ui/button'
import useApi from '@/hooks/useApi';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
    MapPin,
    Calendar,
    DollarSign,
    Users,
    FileText,
    Edit,
    Trash2,
    Download,
    Clock,
    Target,
} from "lucide-react"


const TripInfo = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: trip, error, loading } = useApi(`/trips/${id}`);

    if (loading) return <Loading text='Loading trip details...' />
    console.log(trip);

    const deleteTrip = async () => {
        try {
            const response = await api.delete(`/trips/${id}`);
            toast.success("Trip deleted successfully!");
            navigate('/trips');
        } catch (err) {
            console.error(err);
            toast.error("Some error occured");
        }
    }


    const calculateDaysUntilTrip = () => {
        if (!trip) return 0
        const today = new Date()
        const startDate = new Date(trip.startDate)
        const diffTime = startDate.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays
    }

    const calculateTripDuration = () => {
        if (!trip) return 0
        const startDate = new Date(trip.startDate)
        const endDate = new Date(trip.endDate)
        const diffTime = endDate.getTime() - startDate.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays
    }

    const getBudgetProgress = () => {
        if (!trip) return 0
        return (trip.budget.spent / trip.budget.total) * 100
    }

    const getRemainingBudget = () => {
        if (!trip) return 0
        return trip.budget.total - trip.budget.spent
    }


    if (error || !trip) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Trip Not Found</h2>
                    <p className="text-gray-600 mb-4">{error || "The requested trip could not be found."}</p>
                    <a href="/dashboard">
                        <Button>Back to Dashboard</Button>
                    </a>
                </div>
            </div>
        )
    }

    const daysUntilTrip = calculateDaysUntilTrip()
    const tripDuration = calculateTripDuration()
    const budgetProgress = getBudgetProgress()
    const remainingBudget = getRemainingBudget()

    return (
        <div className="min-h-screen bg-gray-50">

            <div className="container mx-auto px-20 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Trip Information - 2/3 width */}
                    <div className="lg:w-2/3">
                        <Card className="mb-6">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-3xl font-bold text-gray-900 mb-2">{trip.title}</CardTitle>
                                        <CardDescription className="text-lg">{trip.description}</CardDescription>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <a href={`/trips/edit/${trip._id}`}>
                                            <Button variant="outline" size="sm">
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit Trip
                                            </Button>
                                        </a>
                                        <Button variant="outline" size="sm" onClick={deleteTrip}>
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Trip Status */}
                                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <Clock className="h-6 w-6 text-blue-600" />
                                        <div>
                                            <p className="font-semibold text-blue-900">
                                                {daysUntilTrip > 0
                                                    ? `${daysUntilTrip} days until departure`
                                                    : daysUntilTrip === 0
                                                        ? "Departing today!"
                                                        : "Trip in progress"}
                                            </p>
                                            <p className="text-sm text-blue-700">{tripDuration} day trip</p>
                                        </div>
                                    </div>
                                    <Badge variant={daysUntilTrip > 0 ? "secondary" : "default"}>
                                        {daysUntilTrip > 0 ? "Upcoming" : daysUntilTrip === 0 ? "Today" : "Active"}
                                    </Badge>
                                </div>

                                {/* Dates */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                                        <Calendar className="h-6 w-6 text-green-600" />
                                        <div>
                                            <p className="font-semibold">Start Date</p>
                                            <p className="text-gray-600">
                                                {new Date(trip.startDate).toLocaleDateString("en-US", {
                                                    weekday: "long",
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                                        <Calendar className="h-6 w-6 text-red-600" />
                                        <div>
                                            <p className="font-semibold">End Date</p>
                                            <p className="text-gray-600">
                                                {new Date(trip.endDate).toLocaleDateString("en-US", {
                                                    weekday: "long",
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Destinations */}
                                <div className='border-b-2 pb-8'>
                                    <div className="flex items-center space-x-2 mb-3">
                                        <MapPin className="h-5 w-5 text-blue-600" />
                                        <h3 className="text-lg font-semibold">Destinations</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {trip.destinations.map((destination, index) => (
                                            <Badge key={index} variant="outline" className="px-3 py-1">
                                                {destination}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Budget Overview */}
                                <div>
                                    <div className="flex items-center space-x-2 mb-4">
                                        <DollarSign className="h-5 w-5 text-green-600" />
                                        <h3 className="text-lg font-semibold">Budget Overview</h3>
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                                            <p className="text-sm text-gray-600">Total Budget</p>
                                            <p className="text-2xl font-bold text-gray-900">${trip.budget.total}</p>
                                        </div>
                                        <div className="text-center p-4 bg-red-50 rounded-lg">
                                            <p className="text-sm text-gray-600">Spent</p>
                                            <p className="text-2xl font-bold text-red-600">${trip.budget.spent}</p>
                                        </div>
                                        <div className="text-center p-4 bg-green-50 rounded-lg">
                                            <p className="text-sm text-gray-600">Remaining</p>
                                            <p className="text-2xl font-bold text-green-600">${remainingBudget}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Budget Progress</span>
                                            <span>{budgetProgress.toFixed(1)}%</span>
                                        </div>
                                        <Progress value={budgetProgress} className="h-2" />
                                    </div>
                                </div>

                                {/* Recent Expenses */}
                                {trip.budget.expenses.length > 0 && (
                                    <div>
                                        <h4 className="font-semibold mb-3">Recent Expenses</h4>
                                        <div className="space-y-2">
                                            {trip.budget.expenses.slice(0, 3).map((expense, index) => (
                                                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                    <div>
                                                        <p className="font-medium">{expense.name}</p>
                                                        <p className="text-sm text-gray-600">{new Date(expense.date).toLocaleDateString()}</p>
                                                    </div>
                                                    <p className="font-semibold">${expense.amount}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Collaborators */}
                                {trip.collaborators.length > 0 && (
                                    <div>
                                        <div className="flex items-center space-x-2 mb-3">
                                            <Users className="h-5 w-5 text-purple-600" />
                                            <h3 className="text-lg font-semibold">Collaborators</h3>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {trip.collaborators.map((email, index) => (
                                                <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${email}`} />
                                                        <AvatarFallback>{email.charAt(0).toUpperCase()}</AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-sm">{email}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Files */}
                                {trip.files.length > 0 && (
                                    <div>
                                        <div className="flex items-center space-x-2 mb-3">
                                            <FileText className="h-5 w-5 text-orange-600" />
                                            <h3 className="text-lg font-semibold">Files & Documents</h3>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-3">
                                            {trip.files.map((file, index) => (
                                                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                                    <div className="flex items-center space-x-2">
                                                        <FileText className="h-4 w-4 text-gray-400" />
                                                        <span className="text-sm">{file.url.split("/").pop()}</span>
                                                    </div>
                                                    <Button variant="ghost" size="sm">
                                                        <Download className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Action Cards - 1/3 width */}
                    <div className="lg:w-1/3 space-y-4">
                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Quick Actions</CardTitle>
                                <CardDescription>Manage your trip details</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <a href={`/itineraries?tripId=${trip._id}`} className="block">
                                    <Button variant="outline" className="w-full justify-start bg-transparent">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        View Itinerary
                                    </Button>
                                </a>
                                <a href={`/packing?tripId=${trip._id}`} className="block">
                                    <Button variant="outline" className="w-full justify-start bg-transparent">
                                        <Target className="mr-2 h-4 w-4" />
                                        Packing List
                                    </Button>
                                </a>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default TripInfo;

