var express = require('express');
var router = express.Router();
const checkUserIsLoggedInAndAssignComments = require('../guards/checkUserIsLoggedInAndAssignComments')
const userShouldBeLoggedIn = require('../guards/userShouldBeLoggedIn');
const commentMustExist = require('../guards/commentMustExist')
const { v4: uuidv4 } = require('uuid')

// ************ EN TOTES LES URLs de comments
// *******    s'ha d'especificar /comments/note o /comments/link (de moment deixo enrere els documents)


// ADD comment
// needs token
// s'ha d'enviar : { data : { object with data }}
// for note, object with data = title, text, commentableId (id de wtv we are linking to)
// for link or doc, object with data = title, description, url, commentableId

// URL : :element es "note", o "link" (document per pereza ho deixo per més endavant)
//        :type es el tipo de element al que ho afegim.
//        :type pot ser: pinboard, project, task, member, transaction, document, estimate, link,.... 
// NOTE pot tener parentId, en quin cas s'hauria de pasar a traves de un "respondre" botó o algo que figuri a cada NoteBox 
router.post('/:element/:type', checkUserIsLoggedInAndAssignComments, async (req, res, next) => {

    const {comment} = req
    try {
  
      res.status(200).send(comment)
      
    } catch (err) {
      res.status(500).send({message: err.message})
    }
  })

  // needs token
router.get('/:element/:id', userShouldBeLoggedIn, commentMustExist, async (req, res, next) => {
  const { comment } = req

  try {
    res.status(200).send(comment)
  } catch (err) {
    res.status(500).send({message: err.message})
  }

})

// needs token
/// pass fields that we want to change as a { data : { field : newValue } } object
// sends updated comment

/// maybe we want to check if user is creatorId? but maybe not also. de moment no ho fem.
router.patch('/:element/:id', userShouldBeLoggedIn, commentMustExist, async (req, res, next) => {
  const { comment } = req
  
  try {
    const updated = await comment.update(req.body.data)
    res.status(200).send(updated)
  } catch (err) {
    res.status(400).send({message: `error al updatear el element ${element}`})
  }
})

// needs token
// paranoid : true? where
router.delete('/:element/:id', userShouldBeLoggedIn, commentMustExist, async (req, res, next) => {
  const { comment } = req

  try {
    await comment.destroy()
    res.status(200).send({message: `${req.params.element} destroyed`})
  } catch (err) {
    res.status(400).send({message: `ups! ${req.params.element} not destroyed`})
  }
})

module.exports = router;