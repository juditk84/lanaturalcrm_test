var jwt = require("jsonwebtoken");
require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;
const models = require("../models");

async function userShouldBeLoggedIn(req, res, next) {
  const token = req.headers["authorization"]?.replace(/^Bearer\s/, "");

  if (!token) {
    res.status(401).send({ message: "please provide a token" });
  } else {
    jwt.verify(token, supersecret, async function (err, decoded) {
      if (err) res.status(401).send({ message: err.message });
      else {
        const user = await models.Worker.findOne({
          where: {
            id: decoded.user_id,
          },
          attributes: ["username"],
          include: [
            {
              model: models.Project,
              through: models.Projects_Assigned_To_Workers,
              attributes: { exclude: ["workerId", "memberId", "id", "createdAt", "updatedAt", "projectTypeId"] },
              include: [
                {model: models.Note, attributes: { exclude: ["id", "workerId", "createdAt", "updatedAt"]}}, /// notes linked to project (commentableId de la nota is projectId)
                {model: models.Member, attributes: { exclude: ["id", "createdAt", "updatedAt"]}},
                models.Estimate,
                models.Transaction, 
                { model: models.ProjectType, attributes: ["type"] }]   
            },
            {
              model: models.Task,
              through: models.Tasks_Assigned_To_Workers
            },
            {
              model: models.Reunion,
              through: models.Workers_Invited_To_Reunions
            },
            // **** commentables associated with user-self (pinboard?)
            models.Note,
            models.Document,
            models.Link,
          ],
          
        })

        //********* elements created by user
        const userCreatedNotes = await models.Note.findAll({      
          where: {
            workerId: decoded.user_id
          },
          attributes: ['commentableId', 'title'],
        });
        const userCreatedProjects = await models.Project.findAll({ 
          where: {
            workerId: decoded.user_id
          },
          attributes: ["name"], 
          include: [
            {model: models.Task, attributes: ["title"]}
          ]
        });
        const userCreatedContacts = await models.Member.findAll({    /// estic pensant que contacts i entities potser s'haurien de separar... aviam
          where: {
            workerId: decoded.user_id,
            memberType: "contact"
          },
          attributes: ["firstname", "lastname1", "lastname2", "pronouns", "role"]
        });
        const userCreatedEntities = await models.Member.findAll({
          where: {
            workerId: decoded.user_id,
            memberType: "entity"
          },
          attributes: ["commercialName1"]
        })
        const userCreatedTasks = await models.Task.findAll({
          where: {
            workerId: decoded.user_id
          },
          attributes: ["title"], 
          include: [
            {model: models.Project, attributes: ["name"]}
          ]
        })

        req.projects = userCreatedProjects;
        req.notes = userCreatedNotes;
        req.tasks = userCreatedTasks;
        req.entities = userCreatedEntities;
        req.contact = userCreatedContacts;

        req.user = user; 
        next();
      }
    });
  }
}

module.exports = userShouldBeLoggedIn;
