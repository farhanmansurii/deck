import cors from 'cors'
import { config } from "dotenv"
import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import { createCardController } from './contoller/card/createCardController'
import { deleteCardController } from './contoller/card/deleteCardController'
import { getCardController } from './contoller/card/getCardController'
import { createDeckController } from './contoller/deck/createDeckContoller'
import { deleteDeckController } from './contoller/deck/deleteDeckController'
import { getDeckController } from './contoller/deck/getDeckController'

config();
const app = express()
app.use(
  cors({
    origin: '*',
  })
)
app.use(express.json())
app.get('/', (req: Request, res: Response) => {
  res.send('WelcomeBoy to the API')
})


//DECK endpoints
app.delete('/deck/:deckId', deleteDeckController)
app.post('/deck', createDeckController)
app.get('/deck', getDeckController
)

//Card endpoints
app.post('/deck/:deckId/card', createCardController)
app.delete('/deck/:deckId/card/:index', deleteCardController)
app.get('/deck/:deckId/card', getCardController
)

mongoose.connect(process.env.MONGO_URL ?? "").then(() => {
  console.log("connected to DB")
})
app.listen(5000, () => console.log('listening on port 5000'))
