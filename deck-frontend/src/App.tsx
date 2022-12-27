import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Spinner from 'react-spinner-material'
import { createDeck } from './api/createDeck'
import { deleteDeck } from './api/deleteDecks'
import { getDecks, TDeck } from './api/getDecks'
import './App.css'
function App() {
  const [decks, setdecks] = useState<TDeck[]>([])
  const [loading, setLoading] = useState(false)
  const [isloading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<string | undefined>()
  const [title, settitle] = useState<string | undefined>()
  const ripple = useAnimation()

  const startRipple = () => {
    ripple.start({
      scale: 1,
      transition: { duration: 0.5 },
    })
  }
  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault()
    const deck = await createDeck(title)
    setdecks([...decks, deck])
    settitle('')
  }
  async function deleteDecks(id: any) {
    setdecks(decks.filter((deck) => deck._id !== id))
    await deleteDeck(id)
  }

  useEffect(() => {
    async function fetchDecks() {
      const newDecks = await getDecks()
      setdecks(newDecks)
    }
    fetchDecks()
  }, [])

  return (
    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.25 }}>
      <div className=" font-sans min-h-screen  bg-[#363636] text-[#bebebe] w-11/12 lg:w-9/12 mx-auto py-10 flex-col flex">
        <div className=" text-5xl lg:text-7xl my-2  capitalize">All Boards</div>

        <div className="gap-3 w-full mb-10   text-start ">
          <form onSubmit={handleCreateDeck} className="my-3  flex flex-row justify-between">
            <input
              autoComplete="true"
              value={title}
              placeholder="Enter Board Name"
              className="w-10/12 p-2 focus:border-b-2 focus:border-[#bebebe] placeholder:text-[#bebebe] text-xl bg-inherit border-0 focus:outline-none"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => settitle(e.target.value)}
            />
            <button className="bg-[#bebebe] hover:text-[#bebebe] w-fit hover:bg-[#363636] hover:border-[#bebebe] border-[#363636] border-2 text-[#363636] p-3 hover: duration-200 hover:scale-95 rounded-full border-3 ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </form>

          {isloading ? (
            <div className="w-full grid justify-center h-[200px] ">
              <Spinner radius={30} color={'#bebebe'} stroke={2} visible={true} className="my-auto" />
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {decks.length > 0 ? (
                decks.reverse().map((deck: any) => (
                  <div
                    key={deck._id}
                    className=" min-h-[100px] break-all lg:aspect-video text-2xl items-center  flex justify-between   hover:scale-[98%] duration-150  hover:bg-[#bebebe]/80 rounded-xl text-[#363636] bg-[#bebebe]"
                  >
                    <Link to={`/deck/${deck._id}`} className=" px-5 capitalize text-[#363636]">
                      {deck.title}
                    </Link>

                    <div className="p-3" onClick={() => deleteDecks(deck._id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 hover:text-red-500 duration-150 hover:animate-pulse rounded-full  h-6"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                ))
              ) : (
                <div className=" text-center text-3xl mt-10 mx-auto flex w-10/12 "> No Decks :/</div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default App
