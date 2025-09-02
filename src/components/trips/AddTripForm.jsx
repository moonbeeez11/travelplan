import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import { useState } from "react"

const budgetSchema = z.object({
    total: z.coerce.number().min(0, { message: "Budget must be at least 0." }),
    spent: z.coerce.number(),
});

const tripSchema = z.object({
    title: z.string().min(2, { message: "Title must be at least 2 characters." }).max(20, { message: "Title must be at most 20 characters." }),
    description: z.string().optional(),
    startDate: z.date({ required_error: "Start date is required" }),
    endDate: z.date({ required_error: "End date is required" }),
    budget: budgetSchema,
})

export function AddTripForm() {

    const form = useForm({
        resolver: zodResolver(tripSchema),
        defaultValues: {
            title: '',
            description: '',
            startDate: new Date(),
            endDate: new Date(),
            budget: {
                total: 0,
                spent: 0,
            },
        },
    })

    const [destinations, setDestinations] = useState([" "]);

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Paris, France" {...field} />
                            </FormControl>
                            <FormDescription>
                                Must be less than 20 characters.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="My Trip to Paris" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

<div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Start Date</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>End Date</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                </div>

                <div>

                    <div className="flex items-center justify-between">
                    <p className="text-lg font-medium">Destination</p>
                    <Button type="button" size="sm" variant="outline" onClick={()=>{
                        setDestinations([...destinations, ""])
                        console.log(destinations)
                    }}>Add Destination</Button>

                    </div>

                    <div className="mt-2">
                        {
                            destinations.map((destination, index) => {
                                return (
                                    <>
                                    <p className="text-sm text-gray-500 mt-2">Destination {index+1}</p>
                                    <Input key={index} value={destination} onChange={()=>{
                                        destinations[index] = destination
                                    }} className="mb-2 w-full" />
                                    </>
                                )
                            })
                        }
                    </div>

                </div>

                <FormField
                    control={form.control}
                    name="budget.total"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Budget</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="5000" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}