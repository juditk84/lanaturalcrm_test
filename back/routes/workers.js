var express = require('express');
var router = express.Router();
const models = require('../models');
const userShouldBeLoggedIn = require('../guards/userShouldBeLoggedIn'); 

router.get("/", userShouldBeLoggedIn, async (req, res) => {
    const { user, userId } = req

    // const user = await models.Worker.findOne({
    //       where: {
    //         id: userId,
    //       },
    //       attributes: {exclude: ["password", "id"]},
    //       include: [
    //         {
    //           model: models.Project,
    //           through: models.Projects_Assigned_To_Workers,
    //           attributes: { exclude: ["workerId", "memberId", "projectTypeId"] },
    //           include: [
    //             {model: models.Note, attributes: { exclude: ["id", "workerId"]}}, /// notes linked to project (commentableId de la nota is projectId)
    //             {model: models.Member, attributes: { exclude: ["id"]}},
    //             models.Estimate,
    //             models.Transaction, 
    //             { model: models.ProjectType, attributes: ["type"] }]   
    //         },
    //         {
    //           model: models.Task,
    //           through: models.Tasks_Assigned_To_Workers
    //         },
    //         {
    //           model: models.Reunion,
    //           through: models.Workers_Invited_To_Reunions
    //         },
    //         // **** commentables associated with user-self (pinboard?)
    //         models.Note,
    //         models.Document,
    //         models.Link,
    //       ],
        
    //     })


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

router.post('/', async (req, res, next) => {
   try {   
      /// this should be the auth.js file
      res.status(200).send({message: "it is not possible to post a worker, talk to your mailman"})
  } catch (err) {
    res.status(500).send({message: err.message})
  }
})


module.exports = router;
