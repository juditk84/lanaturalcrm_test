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


// GET all projects
// needs token
// s'ha d'enviar Authorization headers with token
// ara envia tb el "projectNames" q es un llistat rapidet de lo mateix (id, name, createdAt)

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

//GET one specific project
// needs token
// receives projectId tal cual. Maybe s'ha de encode somewhere along the way? 
router.get('/:projectId', userShouldBeLoggedIn, projectMustExist, async (req, res, next) => {
    const {project} = req
  try {
        res.status(200).send(project)
      // const minifiedUUID = translator.fromUUID(req.params.project_id)
    
  } catch (err) {
    res.status(500).send({message: "no s'ha trobat cap projecte, revisa les dades oi"})
  }
})

// POST new project
// needs token
/////////  s'ha d'enviar: { key: value, etc } objecte normal
// type (as a string), name, start_date, end_date, description, memberId, deadline, priority
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

// needs token
/// pass fields that we want to change as a { data : { field : newValue } } object
// sends updated project
router.patch('/:projectId', userShouldBeLoggedIn, projectMustExist, async (req, res, next) => {
  const { project } = req
  
  try {
    const updated = await project.update(req.body.data)
    res.status(200).send(updated)
  } catch (err) {
    res.status(400).send({message: "error al updatear el projecte"})
  }
})

// needs token
// paranoid : true? where
router.delete('/:projectId', userShouldBeLoggedIn, projectMustExist, async (req, res, next) => {
  const { project } = req
  try {
    await project.destroy()
    res.status(200).send({message: "el projecte s'ha destruït"})
  } catch (err) {
    res.status(400).send({message: "no s'ha destruït el projecte"})
  }
})



////// TASKS 

// POST task to projecte
// needs token
// s'ha d'enviar projectId (de moment not encoded) en req.params
// + title, startDate, description, defaultPrice, status, deadline, priority
// més endavant vull fer algo que calcula el status sol 
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

// GET one task
// needs token
router.get('/:projectId/tasks/:taskId', userShouldBeLoggedIn, projectMustExist, async (req, res, next) => {
  const {project} = req
  const {taskId} = req.params
  try {
   
      const task = await project.getTasks({
        where: {
          id: taskId
        }
      }) 
      res.status(200).send(task[0])

  } catch (err) {
    res.status(500).send(err.message)
  }
})

// UPDATE task
// needs token
/// pass fields that we want to change as a { data : { field : newValue } } object
// sends updated task
router.patch('/:projectId/tasks/:taskId', userShouldBeLoggedIn, projectMustExist, async (req, res, next) => {
  const {project} = req
  const {taskId} = req.params
  
  try {
   
      const taskToUpdate = await project.getTasks({
        where: {
          id: taskId
        }
      })
      const updatedTask = await taskToUpdate[0].update(req.body.data)   
      res.status(200).send(taskToUpdate)

  } catch (err) {
    res.status(500).send(err.message)
  }
})




// beforeEach userShouldBeLoggedIn?


//// connection pooling
/// destroy : paranoid true


module.exports = router;