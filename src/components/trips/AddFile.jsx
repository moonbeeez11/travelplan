import React from 'react'
import { BanknoteArrowDown, DollarSign, File, Plus, Upload } from 'lucide-react'
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

const fileSchema = z.object({
    file: z.array(z.file().min(1, "Choose atleast one file"))
})


const AddFile = ({ tripId, dependancy, setDependancy }) => {

    const form = useForm({
        resolver: zodResolver(fileSchema),
        defaultValues: {
            file: "",
        },
    })

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const formData = new FormData();
            formData.append("files", data.file[0]); 

            const response = await api.post(`/trips/${tripId}/files`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log(response)

            // if (response.data._id) {
            //     toast.success("Files added successfully!");
            //     setDependancy(dependancy + 1);
            // } else {
            //     toast.error("Failed to add file");
            // }
        } catch (error) {
            console.error("Error adding file:", error);
            toast.error("An error occurred while adding file");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                            <File className="mr-2 h-5 w-5 text-red-600" />
                            Add File
                        </CardTitle>
                        <CardDescription>Upload photos, tickets, bills, and more.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">

                        <FormField
                            control={form.control}
                            name="file"
                            render={({ field: { onChange } }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            multiple
                                            onChange={(e) => onChange(e.target.files ? Array.from(e.target.files) : [])}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />



                        <Button type="submit" className="w-full">
                            <Upload className="mr-2 h-5 w-5" />
                            Upload
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </Form>
    )
}

export default AddFile