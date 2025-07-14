import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Plan Trip Itinenary with Friends Project</h1>
      <h2>Created using React + Typescript + Firebase + OpenAI</h2>
      <h2> - Nechar KC</h2>
      <Button>Click</Button>
    </div>
  )
}

export default App
