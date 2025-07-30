import { Card } from "./components/ui/card"
import {Button} from "./components/ui/button"
import Autocomplete from "react-google-autocomplete"
import { Input } from "./components/ui/input"
import  generateItinerary  from "./GenerateItinerary"
import {motion } from "framer-motion"
import Sort  from "./Sort"

import {
  DndContext,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core"

import type { DragEndEvent } from "@dnd-kit/core"


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

  const DraggableActivity = ({item}: {item: ActivityType}) => {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
      id: item.id,
      data: {item}
    })

    const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined, zIndex: 999, position: transform ? "absolute":"relative", pointerEvents: "auto" }

  return (
    <div ref={setNodeRef}  style={style} {...listeners} {...attributes}>
      <Card className="p-4 mb-2 cursor-pointer hover:bg-gray-50">
        <h3 className="text-lg font-bold">{item.title}</h3>
        <p className="text-sm text-gray-600">{item.location}</p>
        <p className="text-sm">{item.description}</p>
      </Card>
    </div>
  )
  }

const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event
    if (over?.id === "bucket") {
      const item = active.data.current?.item
      if (item) {
        handleRemoveFromSuggested(item.id)
        handleAddToBucket(item)
      } 
    }
  }

  const handlePlaceSelect = (selectPlace: any) => {
    setPlace(selectPlace)
  }

 const handleRemoveFromSuggested = (id: string) => {
  setActivities((prev) => prev.filter((item) => item.id !== id))
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



  const DropZone = ({ children }: { children: React.ReactNode }) => {
    const { setNodeRef } = useDroppable({
      id: "bucket"
    })

    return (
      <div ref={setNodeRef} className="w-1/3 border-2 p-4 rounded-md overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Your List</h2>
        {children}
        {selectedItems.length > 0 && (
          <Button className="mt-4 w-full" onClick={() => setFrame("sortingPage")}>
            Next: Sort with AI
          </Button>
        )}
      </div>
    )
  }



const renderSelectionPage = () => (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col h-screen w-screen items-center p-6">
        <h1 className="text-5xl px-4 pb-4 text-center">Drag items to your list</h1>
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
          <DropZone>
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
          </DropZone>
          

          <div className="w-2/3 border-2 p-4 rounded-md overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4">Suggested Activities</h2>
            {activities.map((item, index) => (
              
              
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >

              <div>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.title)}`} target="_blank" rel="noopener noreferrer"></a>
                <Button variant="outline" size="sm" className="mt-2">Open in Maps</Button>
              </div>
                <DraggableActivity item={item} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </DndContext>
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
  if (frame === "sortingPage") return <Sort selectedItems={selectedItems}/>
}

export default Home