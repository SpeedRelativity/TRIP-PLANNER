
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

const Sort = ({selectedItems}: {selectedItems: ActivityType[]}) => {
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
            <>
                <div className="flex w-screen h-screen bg-blue-200">
                    <h1>{sortedData.Title}</h1>
                    {sortedData.Days.map((day: any, index: any) => (
                        <div key={index}>
                            <p>{day.Day}</p>

                            {day.Schedule.map((activity: any, i: number) => (
                                <div key={i}>
                                    <p>{activity.time}</p>
                                    <p>{activity.title}</p>
                                    <p>{activity.location}</p>
                                    <p>{activity.notes}</p>
                                </div>
                            ))}

                        </div>

                        
                    ))}

                </div>


            </>
        )
        }



export default Sort
