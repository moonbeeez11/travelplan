import React from 'react'
import { BanknoteArrowDown, DollarSign, Plus } from 'lucide-react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import api from "@/api/axios"
import { toast } from "sonner"
import { useNavigate, useSearchParams } from "react-router-dom"

const expenseSchema = z.object({
    name: z.string().min(1, "name is required"),
    amount: z.coerce.number().min(1, "amount is required"),
})


const AddExpense = ({ tripId, dependancy, setDependancy }) => {

    const form = useForm({
        resolver: zodResolver(expenseSchema),
        defaultValues: {
            name: "",
            amount: "",
        },
    })

    const onSubmit = async (data) => {
        try {
            const response = await api.post(`/trips/${tripId}/expenses`, data);
            console.log(response)
            if (response.data._id) {
                toast.success("Expense added successfully!");
                setDependancy(dependancy+1);
            } else {
                toast.error("Failed to add expense");
            }
        } catch (error) {
            console.error('Error adding expense:', error);
            toast.error("An error occurred while adding expense");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                            <DollarSign className="mr-2 h-5 w-5 text-green-600" />
                            Add Expense
                        </CardTitle>
                        <CardDescription>Track your trip expenses</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Expense Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="number" placeholder="200" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full">
                            <BanknoteArrowDown className="mr-2 h-5 w-5" />
                            Add New Expense
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </Form>
    )
}

export default AddExpense