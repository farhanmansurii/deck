import './App.css'
import Card from './components/Card'

function App() {
  return (
    <div className="text-3xl font-semibold font-sans  flex-col flex">
      <div className="text-3xl font-semibold ">CardDeck</div>
      <div></div>
      <div className="gap-3 w-full my-10  text-start ">
        <Card />
      </div>
    </div>
  )
}

export default App
