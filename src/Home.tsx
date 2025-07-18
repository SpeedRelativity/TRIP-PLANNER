import { Card } from "./components/ui/card"
import {Button} from "./components/ui/button"
import Autocomplete from "react-google-autocomplete"

import { useState } from "react"
const Home = () => {

  const [place, setPlace] = useState(null)
  const [frame, setFrame] = useState("main")

  const handlePlaceSelect = (selectPlace: any) => {
    setPlace(selectPlace)
  }

  const handleFrameChange = (frame: string) => {
    setFrame(frame)
  }

  switch (frame) {
    case "main":
      return (
    <div className="flex flex-col h-screen w-screen justify-center items-center ">
        <h1 className="text-5xl px-4 pb-4 whitespace-nowrap">Where would you like to go?</h1>
        <Card className=" w-[60vw] p-2">
            <div className="flex space-x-2">
                
                <Autocomplete className="w-full" apiKey="AIzaSyAlv0uG9nKdQ13AmSQOlHkV2b2RgH4xY_w" onPlaceSelected={(place) => {console.log(place)}}/>
                <Button onClick={() => handleFrameChange("selectionPage")}>Go</Button>

            </div>
            
            
        </Card>
    </div>
    )

    case "selectionPage":
      return (
        <div className="flex flex-col h-screen w-screen justify-center items-center">
        <h1 className="text-5xl px-4 pb-4 whitespace-nowrap">go back?</h1>
        <Card className=" w-[60vw] p-2">
            <div className="flex space-x-2">
                <Autocomplete className="w-full" apiKey="AIzaSyAlv0uG9nKdQ13AmSQOlHkV2b2RgH4xY_w" onPlaceSelected={(place) => {console.log(place)}}/>
                <Button onClick={() => handleFrameChange("main")}>Go Back</Button>
            </div>
        </Card>
        </div>
      )

}

  
}

export default Home
