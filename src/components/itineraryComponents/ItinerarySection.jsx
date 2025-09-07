import useApi from '@/hooks/useApi'
import React from 'react'
import Loading from '../shared/Loading';
import { Package, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

const ItinerarySection = ({selectedTripId}) => {
    const {data: itineraries, loading, error} = useApi(`/itineraries/${selectedTripId}`);
    console.log(itineraries)

    if(loading) return <Loading />
    if(error) return <div>{error}</div>
  return (
    <section>


        <div className="space-y-4">
        {itineraries.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-600 mb-4">Start adding activities to your itinerary</p>
              <a href={`/itineraries/add?tripId=${selectedTripId}`}>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add First Item
              </Button>
              </a>
            </CardContent>
          </Card>
        ) : (
            "added"
        )
    }
    </div>
    </section>
  )
}

export default ItinerarySection