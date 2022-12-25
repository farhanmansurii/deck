import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import Spinner from 'react-spinner-material';
function Deck() {
  const { deckId } = useParams()
  const [card, setcard] = useState([])
  const [isloading, setIsLoading] = useState(true)
  const [deck, setDeck] = useState([])
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string | undefined>()
  const [text, setText] = useState<string | undefined>()
  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault()
    if (text?.trim().length > 0) {

      await fetch(`http://localhost:5000/deck/${deckId}/card`, {
        method: 'POST',
        body: JSON.stringify({
          text
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => { console.log(response), getDecks(), setText(''), setStatus("New Deck Created") },)
    }
  }

  async function deleteCard(deckId: any, index: number) {

    if (!deckId) return;
    await axios.delete(`http://localhost:5000/deck/${deckId}/card/${index}`).then(res => console.log(res))
    getDecks()

  }
  async function getDecks() {
    await axios.get(`http://localhost:5000/deck/${deckId}/card`).then((response) => {
      setcard(response.data.cards)
      setDeck(response.data)

    })
    setIsLoading(false)
  }
  useEffect(() => {
    setIsLoading(true)
    getDecks()
  }, [])

  return (
    <motion.div
      initial={{ scale: 0.8 }}

      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    >

      <div className='w-full min-h-screen  text-[#363636] bg-[#bebebe]'>
        {
          isloading ? (

            <div className='w-full grid justify-center h-[500px] '>
              <Spinner radius={30} color={"#333"} stroke={2} visible={true} className='my-auto' />
            </div>
          ) : (
            <div className=" font-sans  w-11/12 lg:w-9/12 mx-auto py-10  flex-col flex">

              <div className="text-5xl gap-5 lg:text-7xl flex  my-2 capitalize ">
                <Link className='text-inherit grid items-center ' to='/'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12  duration-100 hover:border-2  rounded-full border-[#333] p-2  h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                  </svg>

                </Link>
                <div>

                  {deck.title}
                </div>
              </div>

              <div className="gap-3 w-full mb-10   text-start ">
                <form onSubmit={handleCreateDeck} className='my-3  flex flex-row justify-between'>

                  <input autoComplete='true'
                    value={text}
                    placeholder="Enter Card Name"
                    className='w-9/12 p-2 focus:border-b-2 focus:border-[#363636] text-xl  placeholder:text-[#363636] bg-inherit border-0 focus:outline-none'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setText(e.target.value)
                    }
                  />
                  <button className='text-[#bebebe]  hover:bg-[#bebebe] w-fit hover:text-[#363636] border-[#bebebe] hover:border-[#363636] border-2 bg-[#363636] p-3 hover: duration-200  rounded-full border-3 '>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                  </button>
                </form>

                <div className="grid  lg:grid-cols-4 gap-2">
                  {
                    card.map((e: string, index: number) =>
                      <div key={index} className=' min-h-[100px] lg:aspect-video text-xl items-center  flex justify-between rounded-xl lg:text-2xl hover:scale-[98%] duration-150  hover:bg-[#363636]/80 bg-[#363636] text-[#bebebe]' >
                        <div className=' whitespace-pre-wrap p-2 w-fit text-clip text-2xl break-all  text-[#bebebe]'>
                          <div className=' px-3 capitalize my-auto'>
                            {e}
                          </div>
                        </div>
                        <div className='p-3' onClick={() => {
                          deleteCard(deckId, index)
                        }}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 hover:text-red-500 duration-150 hover:animate-pulse rounded-full  h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>


                        </div>
                      </div>)
                  }
                </div>
              </div>
            </div >)}
      </div>
    </motion.div>
  )
}

export default Deck