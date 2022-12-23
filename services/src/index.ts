import cors from 'cors'
import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import DeckModel from './Schema/Deck'
const app = express()
app.use(
  cors({
    origin: '*',
  })
)
app.get('/', (req: Request, res: Response) => {
  res.send('WelcomeBoy')
})
app.use(express.json())
app.post('/deck', async (req: Request, res: Response) => {
  const newDeck = new DeckModel({
    title: req.body.title,
  })
  const savedDeck = await newDeck.save()
  res.json(savedDeck)
})
app.get('/deck', async (req: Request, res: Response) => {
  const Decks = await DeckModel.find()
  res.json(Decks)
})
mongoose.connect('mongodb+srv://farhan:farhan@cluster0.23dxfen.mongodb.net/?retryWrites=true&w=majority').then(() => {
  console.log('connection established')
})
app.listen(5000, () => console.log('listening on port 5000'))
