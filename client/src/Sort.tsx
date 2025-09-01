import { saveTrip } from "./api/tripAPI";
import { fetchSortedPlan } from "./api/sort";
type ActivityType = {
  id: string
  title: string
  location: string
  description: string
}

const loadSortedPlan = async ({selectedItems}: {selectedItems: ActivityType[]}) => {
  console.log("Sorting these items:", selectedItems);
  
    const result = await fetchSortedPlan(selectedItems);
    return result

}

  



import { useEffect, useState } from "react"
import { Card } from "./components/ui/card"
import { Button } from "./components/ui/button"

const Sort = ({selectedItems, setFrame, prompt}: {selectedItems: ActivityType[], setFrame: any, prompt: string}) => {
    const [sortedData, setSortedData] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const sortNew = async () => {
            const result = await loadSortedPlan({selectedItems})
            
            setSortedData(result)
            setLoading(false)
        }
        sortNew()
    }, [selectedItems])

    if (loading) {
        return <div>Generating sorted itinerary...</div>
    }

        return (
            <div className="flex flex-col min-h-screen bg-gray-900 px-4 py-6  justify-center">
                <div>
                    <h1 className="text-4xl text-white font-bold text-center mb-8">{sortedData.Title}</h1>

                    {sortedData.Days.map((day: any, index: number) => (
                    <div key={index} className="flex justify-center mb-6">
                        <Card className="w-full max-w-3xl bg-white shadow-md p-6 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4">{day.Day}</h2>

                        <div className="space-y-4">
                            {day.Schedule.map((activity: any, i: number) => (
                            <div key={i} className="p-4 bg-slate-100 rounded border">
                                <p className="text-sm text-gray-600 font-semibold">{activity.time}</p>
                                <p className="text-lg font-bold">{activity.title}</p>
                                <p className="text-sm text-gray-700 italic">{activity.location}</p>
                                <p className="text-sm mt-1">{activity.notes}</p>
                            </div>
                            ))}
                        </div>
                        </Card>
                    </div>
                    ))}

                    <div className="flex justify-center mt-10 ">
                        <div className="flex space-x-4 justify-center space-between-2">
                            <Button className="w-1/4 bg-black text-white" onClick={() => window.print()}>Download PDF</Button>
                            <Button className="w-1/4 bg-black text-white" onClick={() => saveTrip({title: sortedData.Title, prompt, activities: selectedItems, generatedItinerary: JSON.stringify(sortedData)})}>Save Itinerary</Button>
                            <Button className="w-1/4 bg-black text-white" onClick={() => setFrame("selectionPage")}>Back</Button>
                            <Button className="w-1/4 bg-black text-white" onClick={() => setFrame("tripPage")}>Saved Lists</Button>
                        </div>
                
                    </div>

                </div>
                
            </div>

            
            )
        
            

        }





export default Sort
