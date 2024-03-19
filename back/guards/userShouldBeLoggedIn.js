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
              attributes: { exclude:["workerId"] },
              include: [
                models.Note, /// notes linked to project (commentableId de la nota is projectId)
                models.Member,
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
            models.Note, // notes where worker is commentableId (notes left to self)
            models.Document,
            models.Estimate,
            models.Project,
            models.Link,
            models.Member,
            models.Reunion,
            models.Task,
            models.Transaction,   
          ],
          
        })

     
        const notes = await models.Note.findAll({      // notes created by user
          where: {
            workerId: decoded.user_id
          },
          attributes: ['commentableId', 'title'],
        });
        const projects = await models.Project.findAll({
          where: {
            workerId: decoded.user_id
          },
          attributes: ["name"]
        })

        req.projects = projects
        req.notes = notes;
        req.user = user; 
        next();
      }
    });
  }
}

module.exports = userShouldBeLoggedIn;
