var express = require('express');
var router = express.Router();
const models = require('../models');
require("dotenv").config();
const short = require('short-uuid');
const { v4: uuidv4 } = require('uuid')
const uppercaseFirst = str => `${str[0].toUpperCase()}${str.substr(1)}`
const userShouldBeLoggedIn = require('../guards/userShouldBeLoggedIn'); 
const projectMustExist = require('../guards/projectMustExist');

const translator = short()


router.get('/', userShouldBeLoggedIn, async (req, res, next) => {
  
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

      const projectNames = allProjects.map((project) => {
        return {id: project.id, name: project.name, createdAt: project.createdAt}
      })

      res.status(200).send({allProjects, projectNames})
  } catch (err) {
    res.status(500).send({message: "no s'ha trobat cap projecte, revisa les dades oi"})
  }
})


router.get('/:projectId', userShouldBeLoggedIn, projectMustExist, async (req, res, next) => {
    const {project} = req
  try {
        res.status(200).send(project)
      // const minifiedUUID = translator.fromUUID(req.params.project_id)

      
  } catch (err) {
    res.status(500).send({message: "no s'ha trobat cap projecte, revisa les dades oi"})
  }
})

router.post('/', userShouldBeLoggedIn, async (req, res, next) => {
  const { user } = req
  // const { data } = req.body

  try {
      const type = await models.ProjectType.findOne({
        where : {
          type: req.body.project_type
        }
      })
     
      const newProject = await models.Project.create({
        id: uuidv4(),
        name : req.body.name,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        description: req.body.description || null,
        ProjectTypeId: type.id,
        memberId: req.body.memberId || null,
        deadline: req.body.deadline,
        priority : req.body.priority,
        creatorId: user.id
      })
      res.status(200).send(newProject)

  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.post('/:projectId/tasks', userShouldBeLoggedIn, projectMustExist, async (req, res, next) => {
  const { user } = req
  const {project} = req

  try {
   
      const newTask = await project.createTask({
        id: uuidv4(),
        title : req.body.title,
        startDate: req.body.startDate,
        // end_date: req.body.end_date,
        description: req.body.description || null,
        defaultPrice: req.body.defaultPrice || 0,
        status: req.body.status,
        parentId: req.body.parentId || null,
        deadline: req.body.deadline,
        priority : req.body.priority,
        creatorId: user.id
      })
    
      res.status(200).send(newTask)

  } catch (err) {
    res.status(500).send(err.message)
  }
})


module.exports = router;