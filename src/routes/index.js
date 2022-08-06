const express = require("express");
const router = express.Router()
const User = require("../controller/User")
const Match = require("../controller/Match")
const Sport = require("../controller/Sport")
const cors = require("cors")

router
    .use(cors({
      origin: [
        'http://localhost:3000',
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }))

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.get('/users', User.read)
router.post('/user', User.create)
router.get('/user/:id', User.find)
router.put('/user/:id', User.update)
router.delete('/user/:id', User.delete)

router.get('/matches', Match.read)
router.post('/match', Match.create)
router.get('/match/:id', Match.find)

router.get('/sports', Sport.read)
router.post('/sport', Sport.create)
router.get('/sport/:id', Sport.find)
router.put('/sport/:id', Sport.update)
router.delete('/sport/:id', Sport.detele)

// functional
router.post('/login', User.login)
router.post('/matchCity', Match.FindMatchViaCity)
router.post('/matchDistrict', Match.FindMatchViaDistrict)

module.exports = router;