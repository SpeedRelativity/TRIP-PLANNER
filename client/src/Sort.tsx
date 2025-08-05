import { saveTrip } from "./api/tripAPI";
type ActivityType = {
  id: string
  title: string
  location: string
  description: string
}

const fetchSortedPlan = async ({selectedItems}: {selectedItems: ActivityType[]}) => {

  const prompt = `You are a travel planning assistant. Given a list of activities, sort them into an efficient and logical travel itinerary with a timeline. If enough items are not available, do not split them into multiple days. Aim for 3 items a day. Consider location proximity and activity type. Ensure JSON array is valid. No markdown, no text outside the array. Use the below format as a guideline.

{
  "Title": "Final Japan Itinerary",
  "Days": [
    {
      "Day": "Day 1",
      "Schedule": [
        { "time": "9:00 AM", "title": "Tokyo Skytree Visit", "location": "Tokyo", "notes": "Start the day with a panoramic view." },
        ...
      ]
    },
    ...
  ]
}

Activities:
${JSON.stringify(selectedItems, null, 2)}
`
  const apiKey = import.meta.env.VITE_GROQ_API_KEY
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: prompt
        },
        {
          role: "user",
          content: "Sort this into a travel timeline and return in the same json format."
        }
      ]
    })
  })
  const result = await response.json()
  const parsed = JSON.parse(result.choices[0].message.content)
  console.log(parsed)
  return parsed
  
}


import { useEffect, useState } from "react"
import { Card } from "./components/ui/card"
import { Button } from "./components/ui/button"

const Sort = ({selectedItems, setFrame, prompt}: {selectedItems: ActivityType[], setFrame: any, prompt: string}) => {
    const [sortedData, setSortedData] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const sortNew = async () => {
            const result = await fetchSortedPlan({selectedItems})
            
            setSortedData(result)
            setLoading(false)
        }
        sortNew()
    }, [selectedItems])

    if (loading) {
        return <div>Generating sorted itinerary...</div>
    }

        return (
            <div className="flex flex-col min-h-screen bg-blue-100 px-4 py-6 justify-center">
                <h1 className="text-4xl font-bold text-center mb-8">{sortedData.Title}</h1>

                {sortedData.Days.map((day: any, index: number) => (
                <div key={index} className="flex justify-center mb-6">
                    <Card className="w-full max-w-3xl bg-white shadow-md p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">{day.Day}</h2>

                    <div className="space-y-4">
                        {day.Schedule.map((activity: any, i: number) => (
                        <div key={i} className="p-4 bg-orange-50 rounded border">
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

                <div className="flex justify-center mt-10">
                    <div className="flex space-x-4 w-[60%] justify-center">
                        <Button className="w-1/2 bg-black text-white" onClick={() => window.print()}>
                            Download PDF
                        </Button>
                        <Button className="w-1/2 bg-black text-white" onClick={() => saveTrip({title: sortedData.Title, prompt, activities: selectedItems, generatedItinerary: JSON.stringify(sortedData)})}>Save Itinerary</Button>
                        <Button className="w-1/2" onClick={() => setFrame("selectionPage")}>Back</Button>
                    </div>
                
                </div>
            </div>
            )

        }





export default Sort
