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
        <div className="flex bg-gray-900 p-8 flex-col gap-4">
            <h1 className="text-white text-4xl font-bold text-center"> All Saved Community Itineraries</h1>
            
            <div className="flex flex-col justify-center text-xl">
                <p className="text-white text-center"> Empty sections means not enough items added to bucket. </p>
                <Button className="text-xl bg-blue-400 m-4 w-auto self-center" onClick={() => setFrame("main")}> Back to Planner </Button>
            </div>
            {trips.map((trip: any) => (
                
                <Card key={trip._id} className="flex mb-6 flex-col gap-4">
                    <CardHeader>
                        <CardTitle>{trip.title}</CardTitle>
                        <CardDescription>{trip.prompt}</CardDescription>
                    </CardHeader>
                                            <CardContent>
                        {(() => {
                            try {
                            const itinerary = JSON.parse(trip.generatedItinerary);

                            return itinerary.Days?.map((day: any, index: number) => (
                                <div key={index} className="mb-4 border rounded p-4 bg-slate-100">
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
                    
                </Card>
            ))}          
        </div>
        
        </>

    )
}

export default TripFeed