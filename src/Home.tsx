import { Card } from "./components/ui/card"
import {Button} from "./components/ui/button"
import Autocomplete from "react-google-autocomplete"
import { Input } from "./components/ui/input"
import  generateItinerary  from "./GenerateItinerary"

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY

import { useState } from "react"
const Home = () => {

  const [place, setPlace] = useState(null)
  const [frame, setFrame] = useState("main")
  const [prompt, setPrompt] = useState("")
  const [itinerary, setItinerary] = useState<any>(null)

  const handlePlaceSelect = (selectPlace: any) => {
    setPlace(selectPlace)
  }

  const handleFrameChange = (frame: string) => {
    setFrame(frame)
  }

  const returnCards = () => {
    if (!itinerary || !itinerary.Title) return null

    return (
      <>
        <h1>{itinerary.Title}</h1>
        <Card className="w-full min-h-[150px] p-4">
          <h1 className="text-2xl">{itinerary.Description}</h1>
        </Card>
      </>
      
)

  }

  switch (frame) {
    case "main":
      return (
    <div className="flex flex-col h-screen w-screen justify-center items-center ">
        <h1 className="text-5xl px-4 pb-4 whitespace-nowrap">Where would you like to go?</h1>
        <Card className=" w-[60vw] p-2">
            <div className="flex space-x-2">
                <Input value={prompt} onChange={(e) => {
                  setPrompt(e.target.value)
                  console.log("success")
                 }} placeholder="3 day trip to Japan..." className="w-full" />
                {/*<Autocomplete className="w-full" apiKey={API_KEY} onPlaceSelected={(place) => {console.log(place)}}/>*/}
                <Button onClick={() => handleFrameChange("selectionPage")}>Go</Button>

            </div>
            
            
        </Card>
    </div>
    )

    case "selectionPage":
      return (
        <div className="flex flex-col h-screen w-screen items-center p-6">
        <h1 className="text-5xl px-4 pb-4 text-center">Based on your location selection, here are some recommended itinerary items.</h1>
        <Card className=" w-[70vw] p-2">
            <div className="flex space-x-2">
                 <Input value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full" />
                <Button onClick={async () => {
                  console.log({prompt})
                  const result = await generateItinerary(prompt)
                  console.log(result)
                  setItinerary(JSON.parse(result))}}>Go</Button>
            </div>
        </Card>
        <div className="w-full h-full flex flex-col justify-around p-24">
            {returnCards()}

          
        </div>
        
        </div>
      )

}

  
}

export default Home
