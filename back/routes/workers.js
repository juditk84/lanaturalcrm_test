var express = require('express');
var router = express.Router();
const models = require('../models');
const userShouldBeLoggedIn = require('../guards/userShouldBeLoggedIn'); 

router.get("/", userShouldBeLoggedIn, async (req, res, next) => {
  const {user, notes} = req
      try {
          // console.log(notes)
          res.status(200).send({user: user, notes: notes})
      } catch (err) {
          res.status(500).send(err.message)
      }
})

router.get('/all', async (req, res, next) => {
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

router.post('/', async (req, res, next) => {
   try {   
      /// this should be the auth.js file
      res.status(200).send({message: "it is not possible to post a worker, talk to your mailman"})
  } catch (err) {
    res.status(500).send({message: err.message})
  }
})


module.exports = router;
