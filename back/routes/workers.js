var express = require('express');
var router = express.Router();
const models = require('../models');
const userShouldBeLoggedIn = require('../guards/userShouldBeLoggedIn');
const onlySendUserDataIfUserIsLoggedIn = require('../guards/onlySendUserDataIfUserIsLoggedIn') 
const short = require('short-uuid')
const translator = short()
const { v4: uuidv4 } = require('uuid')

router.get("/", onlySendUserDataIfUserIsLoggedIn, async (req, res) => {
    const { user } = req
      try {
          res.status(200).send({user: user})
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


// router.post('/', async (req, res, next) => {
//    try {   
//       /// this should be the auth.js file
//       res.status(200).send({message: "it is not possible to post a worker, talk to your mailman"})
//   } catch (err) {
//     res.status(500).send({message: err.message})
//   }
// })

router.post('/pinboard/:element', userShouldBeLoggedIn, async (req, res, next) => {
  const { user } = req
  const { element } = req.params
  const { data } = req.body
  
  try {
    switch (element){
      case "note":
      const note = user.createNote({
        id: uuidv4(),
        title: data.title,
        text: data.text,
        creatorId: user.id,
        parentId: data.parentId || null,
        commentableType: "worker",
        commentableId: user.id
      },
      // { fields: ["title", "text"]}
    )
      res.status(200).send({note})
      break;
      case "document":
      const doc = user.createDocument({
          id: uuidv4(),
          title: data.title,
          url: data.url,
          description: data.description,
          creatorId: user.id,
          commentableType: "worker",
          commentableId: user.id
        }, 
        // { fields: ["title", "url", "description"]}
      )
        res.status(200).send(doc)
        break;
        case "link":
        const link = user.createDocument({
            id: uuidv4(),
            title: data.title,
            url: data.url,
            description: data.description,
            creatorId: user.id,
            commentableType: "worker",
            commentableId: user.id
          }, 
          // { fields: ["title", "url", "description"]}
        )
        res.status(200).send(link)
        break;
        default:
          res.status(401).send({message: "hi ha abigut un error a l'hora de afegir elements al teu pinboard"})
        break;
    }
    
  } catch (err) {
    res.status(404).send({message: err.message})
  }
})

module.exports = router;
