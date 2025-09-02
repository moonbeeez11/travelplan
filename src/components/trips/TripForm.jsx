import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Calendar, MapPin, DollarSign, Plus, Trash2, Plane, Receipt } from "lucide-react"
import useApi from "@/hooks/useApi"
import api from "@/api/axios"
import { useNavigate } from "react-router-dom"

const budgetSchema = z.object({
  total: z.number().min(0, "Total budget must be 0 or greater"),
  spent: z.number().default(0),
})

const tripInfoSchema = z
  .object({
    title: z.string().min(1, "Trip title is required"),
    description: z.string().optional(),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    destinations: z
      .array(z.string().min(1, "Destination cannot be empty"))
      .min(1, "At least one destination is required"),
    budget: budgetSchema,
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "End date must be after start date",
    path: ["endDate"],
  })

export function TripForm({ initialData }) {

    const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(tripInfoSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      destinations: [""],
      budget: {
        total: "",
        spent: 0,
      },
    },
  })

  const {
    fields: destinationFields,
    append: appendDestination,
    remove: removeDestination,
  } = useFieldArray({
    control: form.control,
    name: "destinations",
  })

  const addDestination = () => {
    appendDestination("")
  }

  const onSubmit = async (data) => {
    console.log(data);
    try {
        const response = await api.post('/trips', data);
        if (response._id){
            navigate(`/trips/${response._id}`);
        }
    } catch (error) {
        console.error('Error creating trip:', error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Trip Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plane className="mr-2 h-5 w-5 text-blue-600" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    Trip Title
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., European Adventure 2024" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your trip plans, goals, and what makes this journey special..."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      Start Date
                    </FormLabel>
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
                    <FormLabel className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      End Date
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Destinations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-green-600" />
                Destinations
              </div>
              <Button type="button" onClick={addDestination} size="sm" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Destination
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {destinationFields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name={`destinations.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder={`Destination ${index + 1} (e.g., Paris, France)`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {destinationFields.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => removeDestination(index)}
                    size="sm"
                    variant="outline"
                    className="flex-shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Budget */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="mr-2 h-5 w-5 text-purple-600" />
              Budget Planning
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="budget.total"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Budget (USD)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="e.g., 5000"
                        {...field}
                        onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}
