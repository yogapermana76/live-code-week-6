const router = require('express').Router()
const UserController = require('../controllers/userController')
const JokeController = require('../controllers/jokeController')
const authenticate = require('../middlewares/authenticate')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/jokes', authenticate, JokeController.fetchJoke)
router.post('/favorites', authenticate, JokeController.addJoke)

module.exports = router