var express = require('express');
var router = express.Router();
const models = require('../models');
const userShouldBeLoggedIn = require('../guards/userShouldBeLoggedIn');
const onlySendUserDataIfUserIsLoggedIn = require('../guards/onlySendUserDataIfUserIsLoggedIn') 
const short = require('short-uuid')
const workerMustExist = require('../guards/workerMustExist')
const translator = short()
const { v4: uuidv4 } = require('uuid')
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.get("/", onlySendUserDataIfUserIsLoggedIn, async (req, res) => {
    const { user } = req
      try {
          res.status(200).send({user: user})
      } catch (err) {
          res.status(500).send(err.message)
      }
})

router.get('/all', userShouldBeLoggedIn, async (req, res, next) => {
  try {
    const allWorkers = await models.Worker.findAll({
      // attributes: []
    })
    res.status(200).send(allWorkers)
    // decide what to include
  } catch (err) {
    res.status(500).send({message: err.message})
  }
})

// GET one member
// needs token
// de moment envia tot (but no associations) becasue aviam que (no) volem enviar
// i el guard afegeix un "name" property, accessible independent de memberType
router.get('/:workerId', userShouldBeLoggedIn, workerMustExist, async (req, res, next) => {
  const {worker} = req
  try {
      res.status(200).send(worker)
  } catch (err) {
    res.status(500).send({message: "no s'ha trobat el membre que busques, revisa les dades oi"})
  }
})

router.patch('/', userShouldBeLoggedIn, async (req, res, next) => {
  const { user } = req
  const { data } = req.body
  try {
    if (data.password) {
      const hash = await bcrypt.hash(data.password, saltRounds)
      data.password = hash
    }
    const updated = await user.update(data)
    res.status(200).send(updated)

  } catch (err) {
    res.status(400).send({message: err.message})
  }
})




module.exports = router;
