var express = require('express');
var router = express.Router();
const checkUserIsLoggedInAndAssignComments = require('../guards/checkUserIsLoggedInAndAssignComments')
const userShouldBeLoggedIn = require('../guards/userShouldBeLoggedIn');
const { v4: uuidv4 } = require('uuid')


// ADD comment
// needs token
// s'ha d'enviar : { data : { object with data }}
// for note, object with data = title, text, commentableId (id de wtv we are linking to)
// for link or doc, object with data = title, description, url, commentableId

// URL : :element es "note", "document" o "link" (de moment document o link retorna link)
//        :type es el tipo de element al que ho afegim.
//        :type pot ser: pinboard, project, task, member, transaction, document, estimate, link,.... 
// NOTE pot tener parentId, en quin cas s'hauria de pasar a traves de un "respondre" botó o algo que figuri a cada NoteBox 
router.post('/:element/:type', checkUserIsLoggedInAndAssignComments, async (req, res, next) => {

    const {comment} = req
    try {
  
      res.status(200).send(comment)
      
    } catch (err) {
      res.status(404).send({message: err.message})
    }
  })

  module.exports = router;