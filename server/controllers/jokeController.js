const axios = require('axios')
const Joke = require('../models/joke')

class JokeController {
  static fetchJoke(req, res) {
    axios.get('https://icanhazdadjoke.com')
      .then(({ data }) => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static addJoke(req, res) {
    Joke.create({
      joke: req.body.joke,
      user_id: req.body.user_id
    })
      .then(joke => {
        res.status(201).json(joke)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static findAll(req, res) {
    Joke.find({
      user_id: req.body.user_id
    })
      .then(joke => {
        res.status(200).json(joke)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = JokeController