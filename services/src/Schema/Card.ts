import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectID = mongoose.Types.ObjectId
const Card = new Schema({
  text: String,
})
const CardModel = mongoose.model('Card', Card)

export default CardModel
