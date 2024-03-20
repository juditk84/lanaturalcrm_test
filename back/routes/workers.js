var express = require('express');
var router = express.Router();
const models = require('../models');
const userShouldBeLoggedIn = require('../guards/userShouldBeLoggedIn'); 

router.get("/", userShouldBeLoggedIn, async (req, res) => {

    const { user } = req
      try {

        //********* elements created by user
        const userCreatedNotes = await models.Note.findAll({      
          where: {
            workerId: user.id,
          },
          attributes: ['commentableId', 'title'],
        });
        const userCreatedProjects = await models.Project.findAll({ 
          where: {
            workerId: user.id,
          },
          attributes: ["name"], 
          include: [
            {model: models.Task, attributes: ["title"]}
          ]
        });
        const userCreatedContacts = await models.Member.findAll({    /// estic pensant que contacts i entities potser s'haurien de separar... aviam
          where: {
            workerId: user.id,
            memberType: "contact"
          },
          attributes: ["firstname", "lastname1", "lastname2", "pronouns", "role"]
        });
        const userCreatedEntities = await models.Member.findAll({
          where: {
            workerId: user.id,
            memberType: "entity"
          },
          attributes: ["commercialName1"]
        })
        const userCreatedTasks = await models.Task.findAll({
          where: {
            workerId: user.id,
          },
          attributes: ["title"], 
          include: [
            {model: models.Project, attributes: ["name"]}
          ]
        })

          res.status(200).send({user: user,
                                notes: userCreatedNotes,
                                tasks: userCreatedTasks,
                                entities: userCreatedEntities,
                                contacts: userCreatedContacts
                              })

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
