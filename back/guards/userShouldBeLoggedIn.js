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
          attributes: {exclude: ["password", "id"]},
          include: [
            {
              model: models.Project,
              through: models.Projects_Assigned_To_Workers,
              attributes: { exclude: ["workerId", "memberId", "projectTypeId"] },
              include: [
                {model: models.Note, attributes: { exclude: ["id", "workerId"]}}, /// notes linked to project (commentableId de la nota is projectId)
                {model: models.Member, attributes: { exclude: ["id"]}},
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

        req.user = user

        next()
      }
    });
  }
}

module.exports = userShouldBeLoggedIn;
