const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jokeSchema = new Schema({
  joke: {
    type: String,
    unique: [true, 'joke sudah ada']
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
})

const Joke = mongoose.model('joke', jokeSchema)

module.exports = Joke