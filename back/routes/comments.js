var express = require('express');
var router = express.Router();
const userShouldBeLoggedIn = require('../guards/userShouldBeLoggedIn');
const { v4: uuidv4 } = require('uuid')



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
        { fields: ["title", "text"]})
        res.status(200).send({data: note})
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
          { fields: ["title", "url", "description"]}
        )
          res.status(200).send({data: doc})
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
            { fields: ["title", "url", "description"]}
          )
          res.status(200).send({data: link})
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