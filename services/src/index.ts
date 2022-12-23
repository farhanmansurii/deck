import express from 'express'
import mongoose from 'mongoose'
const app = express()

app.use('/', (req, res) => {
  res.send('WelcomeBoy')
})
mongoose.connect('mongodb+srv://farhan:farhan@cluster0.23dxfen.mongodb.net/?retryWrites=true&w=majority').then(() => {
  console.log('connection established')
})
app.listen(5000, () => console.log('listening on port 5000'))
