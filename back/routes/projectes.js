var express = require('express');
var router = express.Router();
const models = require('../models');
const { v4: uuidv4 } = require('uuid')
const uppercaseFirst = str => `${str[0].toUpperCase()}${str.substr(1)}`
const userShouldBeLoggedIn = require('../guards/userShouldBeLoggedIn'); 

router.get('/', async (req, res, next) => {

  try {
  
      const allProjects = await models.Project.findAll({
        attributes: ["name", "start_date", "end_date"],
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

module.exports = router;