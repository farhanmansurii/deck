import { Input } from '@nextui-org/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card'

function App() {
  const [decks, setdecks] = useState([])
  const [title, settitle] = useState()
  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault()
    await fetch('http://localhost:5000/deck', {
      method: 'POST',
      body: JSON.stringify({
        title,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  useEffect(() => {
    async function getDecks() {
      axios.get('http://localhost:5000/deck').then((response) => {
        setdecks(response.data)
      })
      // axios.get('http://localhost:5000/decks').then((response) => setdecks(response.json()))
    }
    return () => {
      getDecks()
    }
  }, [])

  return (
    <div className="text-3xl font-semibold font-sans  w-9/12 mx-auto py-10 space-y-10 flex-col flex">
      <div className="text-3xl font-semibold ">CardDeck</div>
      <div></div>
      <div className="gap-3 w-full my-10 space-y-10   text-start ">
        <form onSubmit={handleCreateDeck}>
          <Input
            size="lg"
            value={title}
            placeholder="Enter deck name"
            width="400px"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              settitle(e.target.value)
            }}
          />
        </form>
        {decks.map((deck: any) => (
          <div>{deck.title}</div>
        ))}
        <Card />
      </div>
    </div>
  )
}

export default App
