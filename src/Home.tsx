import { Card } from "./components/ui/card"
import { Input } from "./components/ui/input"
import {Button} from "./components/ui/button"
const Home = () => {
  return (
    <>
    <div className="flex flex-col h-screen w-screen justify-center items-center ">
        <h1 className="text-5xl px-4 pb-4 whitespace-nowrap">Where would you like to go?</h1>
        <Card className=" w-[60vw] p-2">
            <div className="flex space-x-2">
                
                <Input className="border-0 shadow-none" placeholder="Enter a destination"></Input>
                <Button>Go</Button>

            </div>
            
        </Card>
    </div>
        

    </>
  )
}

export default Home
