var express = require('express');
var router = express.Router();
const models = require('../models');
require("dotenv").config();
const short = require('short-uuid');
const { v4: uuidv4 } = require('uuid')
const uppercaseFirst = str => `${str[0].toUpperCase()}${str.substr(1)}`
const userShouldBeLoggedIn = require('../guards/userShouldBeLoggedIn'); 

const translator = short()


router.get('/', async (req, res, next) => {
  
  try {
      const allProjects = await models.Project.findAll({
        attributes: ["id", "name", "start_date", "end_date"],
        include: [
          {
            model: models.Member,
            attributes: ["commercialName1"],
          },
          {
            model: models.Worker,
            attributes: ["firstname"]
          }
        ],

      })



      res.status(200).send(allProjects)
  } catch (err) {
    res.status(500).send({message: "no s'ha trobat cap projecte, revisa les dades oi"})
  }
})

// JUDIT: Probablement l'endpoint més macarra de l'univers, but if it works it works:
router.get('/userprojects', userShouldBeLoggedIn, async (req, res) => {

  try {
  
      const userProjects = await models.Worker.findAll({
        where: {
          id: req.id,
        },
        attributes: [],
        include: [
          {
            model: models.Project,
            // attributes: {            we'll add the ID too for now. 
            //   exclude: ["id"],
            // },
            include: [
              {
                model: models.Member,
                attributes: ["id", "commercialName1"],
              },
              {
                model: models.Worker,
                  attributes: {
                    exclude: ["id", "password"]
                  }
              }
            ],
        through: {attributes: []} 
          }
        ],

      })
      res.status(200).send(userProjects[0].Projects)
  } catch (err) {
    res.status(500).send({message: "no s'ha trobat cap projecte, revisa les dades oi"})
  }
})

router.get('/:project_id', userShouldBeLoggedIn, async (req, res, next) => {


  try {
  
      const oneSpecificProject = await models.Project.findOne({
        where: {
          id: req.params.project_id,
        },
        include: [
          {
            model: models.Member,
            attributes: {
              exclude: ["id"]
            }
          },
          {
            model: models.Worker,
            attributes: {
              exclude: ["password"]
            },
          },
          {
            model: models.Task,
            include: [
              {
                model: models.Worker, 
                through: {
                  model: models.Tasks_Assigned_To_Workers,
                  attributes: []
                }
              }
            ]
          },
          {
            model: models.Transaction,
            include: [
              {
                model: models.Member,
                attributes: ["commercialName1"]
              }
              
              ]
          }
        ],
      })

        res.status(200).send(oneSpecificProject)

      const minifiedUUID = translator.fromUUID(req.params.project_id)

      
  } catch (err) {
    res.status(500).send({message: "no s'ha trobat cap projecte, revisa les dades oi"})
  }
})

module.exports = router;