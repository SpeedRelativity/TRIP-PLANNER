import { useEffect, useState } from "react"
import { Card } from "./components/ui/card"
import { Button } from "./components/ui/button"
import { getAllTrips } from "./api/tripAPI"
import { CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "./components/ui/card"


const TripFeed = ({setFrame}: {setFrame: any}) => {
    const [trips, setTrips] = useState([]);

    // run once when component mounts/loads
    useEffect(() => {

        const fetchTrips = async () =>{
            const data: any = await getAllTrips();
            // set state of the data
            setTrips(data);
        };

        // call the function
        fetchTrips();
    },[]);

    return (
        <>
        <div className="flex flex-col gap-4">
            {trips.map((trip: any) => (
                
                <Card key={trip._id} className="flex flex-col gap-4">
                    <CardHeader>
                        <CardTitle>{trip.title}</CardTitle>
                        <CardDescription>{trip.prompt}</CardDescription>
                    </CardHeader>
                                            <CardContent>
                        {(() => {
                            try {
                            const itinerary = JSON.parse(trip.generatedItinerary);

                            return itinerary.Days?.map((day: any, index: number) => (
                                <div key={index} className="mb-4 border rounded p-4 bg-orange-50">
                                <h3 className="text-xl font-bold mb-2">{day.Day}</h3>
                                <div className="space-y-2">
                                    {day.Schedule.map((item: any, i: number) => (
                                    <div key={i} className="border-b pb-2">
                                        <p className="text-sm font-semibold">{item.time} - {item.title}</p>
                                        <p className="text-sm text-gray-600 italic">{item.location}</p>
                                        <p className="text-sm text-gray-800">{item.notes}</p>
                                    </div>
                                    ))}
                                </div>
                                </div>
                            ));
                            } catch (err) {
                            return <p className="text-sm text-red-500">Failed to load itinerary</p>;
                            }
                        })()}
                        </CardContent>
                    <CardFooter>
                        <Button onClick={() => setFrame(trip)}>View Trip</Button>
                    </CardFooter>
                </Card>
            ))}          
        </div>
        <div>
            <Button onClick={() => setFrame("main")}> Back to Planner </Button>
        </div>
        </>

    )
}

export default TripFeed