const User = require('../models/user')
const { sign } = require('../helpers/jwt')
const { compare } = require('../helpers/bcrypt')

class UserController {

  static register(req, res) {
    User.findOne({
      email: req.body.email
    })
      .then(foundUser => {
        if (!foundUser) {
          return User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          })
        } else {
          return new Promise(resolve => {
            resolve({
              status: 401,
              error: true,
              message: 'email already exist'
            })
          })
        }
      })
      .then(user => {
        if (user.error) {
          res.status(401).json(user.message)
        } else {
          res.status(201).json(user)
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static login(req, res) {
    User.findOne({
      email: req.body.email
    })
      .then(foundUser => {
        if (!foundUser) {
          res.status(401).json({
            message: 'email not found'
          })
        } else {
          const verifyPassword = compare(req.body.password, foundUser.password)
          if (!verifyPassword) {
            res.status(401).json({ message: 'password wrong!' })
          } else {
            const { id, email } = foundUser
            let token = sign({
              id: foundUser.id,
              email: foundUser.email
            }, process.env.SECRET_KEY)
            res.status(200).json({
              token,
              id,
              email
            })
          }
        }
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }
}

module.exports = UserController