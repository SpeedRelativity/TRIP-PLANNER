import { Card } from "./components/ui/card"
import {Button} from "./components/ui/button"
import Autocomplete from "react-google-autocomplete"
import { Input } from "./components/ui/input"
import  generateItinerary  from "./GenerateItinerary"
import {motion } from "framer-motion"


const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY

import { useState } from "react"

type ActivityType = {
  id: string,
  title: string,
  location: string,
  description: string
}
const Home = () => {

  const [place, setPlace] = useState(null)
  const [frame, setFrame] = useState("main")
  const [prompt, setPrompt] = useState("3 day trip to Japan")
  const [itinerary, setItinerary] = useState<any>(null)
  const [activities, setActivities] = useState<ActivityType[]>([])
  const [selectedItems, setSelectedItems] = useState<ActivityType[]>([])

  const handlePlaceSelect = (selectPlace: any) => {
    setPlace(selectPlace)
  }

 const handleGenerate = async () => {
    const result = await generateItinerary(prompt)
    const parsed = JSON.parse(result)
    setActivities(parsed)
    setFrame("selectionPage")
  }

   const handleAddToBucket = (item: ActivityType) => {
    if (!selectedItems.find((i) => i.id === item.id)) {
      setSelectedItems([...selectedItems, item])
    }
  }

  const handleRemoveFromBucket = (id: string) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== id))
  }

  const handleFrameChange = (frame: string) => {
    setFrame(frame)
  }

const renderSelectionPage = () => (
    <div className="flex flex-col h-screen w-screen items-center p-6">
      <h1 className="text-5xl px-4 pb-4 text-center">
        Drag items to your list
      </h1>
      <Card className="w-[70vw] p-2 mb-4">
        <div className="flex space-x-2">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full"
          />
          <Button onClick={handleGenerate}>Regenerate</Button>
        </div>
      </Card>

      <div className="flex w-full h-full p-6 space-x-6">
        {/* Bucket */}
        <div className="w-1/3 border-2 p-4 rounded-md overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4">Your List</h2>
          {selectedItems.map((item) => (
            <Card key={item.id} className="p-4 mb-2">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.location}</p>
              <p className="text-sm">{item.description}</p>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveFromBucket(item.id)}
                className="mt-2"
              >
                Remove
              </Button>
            </Card>
          ))}
          {selectedItems.length > 0 && (
            <Button className="mt-4 w-full" onClick={() => setFrame("sortingPage")}>
              Next: Sort with AI
            </Button>
          )}
        </div>

        {/* All Generated Activities */}
        <div className="w-2/3 border-2 p-4 rounded-md overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4">Suggested Activities</h2>
          {activities.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className="p-4 mb-2 cursor-pointer hover:bg-gray-50"
                onClick={() => handleAddToBucket(item)}
              >
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.location}</p>
                <p className="text-sm">{item.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderSortingPage = () => (
    <div className="flex flex-col h-screen w-screen items-center p-6">
      <h1 className="text-5xl px-4 pb-4 text-center">Final Sorted Plan (Coming Soon)</h1>
      <div className="w-[70vw]">
        {selectedItems.map((item) => (
          <Card key={item.id} className="p-4 mb-2">
            <h3 className="text-lg font-bold">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.location}</p>
            <p className="text-sm">{item.description}</p>
          </Card>
        ))}
      </div>
    </div>
  )

  if (frame === "main") {
    return (
      <div className="flex flex-col h-screen w-screen justify-center items-center">
        <h1 className="text-5xl px-4 pb-4 text-center">Where would you like to go?</h1>
        <Card className="w-[60vw] p-4">
          <div className="flex space-x-2">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="3 day trip to Japan..."
              className="w-full"
            />
            <Button onClick={handleGenerate}>Go</Button>
          </div>
        </Card>
      </div>
    )
  }

  if (frame === "selectionPage") return renderSelectionPage()
  if (frame === "sortingPage") return renderSortingPage()
}

export default Home