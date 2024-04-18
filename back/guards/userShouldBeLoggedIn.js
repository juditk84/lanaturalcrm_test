var jwt = require("jsonwebtoken");
require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;
const models = require("../models");

// JUDIT: right now the guard send a lot of user data. I think that, for separation of concerns and clarity blabla,
// it should only check if the user is indeed logged in.
// for now I'm storing the decoded.user_id in a const, but I'm not really sure it's good practice. 
// It's in the backend, so I guess the user_id is still not really EXPOSED, but need to verify this.

async function userShouldBeLoggedIn(req, res, next) {
  
  const token = req.headers["authorization"]?.replace(/^Bearer\s/, "");
  if (!token) {
    console.log("ha estat horrible!")
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
        const id = decoded.user_id

        req.user = user
        req.id = id
        next()
      }
    });
  }
}

module.exports = userShouldBeLoggedIn;
