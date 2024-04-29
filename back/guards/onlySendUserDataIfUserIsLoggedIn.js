var jwt = require("jsonwebtoken");
require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;
const models = require("../models");
const short = require('short-uuid')
const translator = short()

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
          attributes: [
            "firstname",
            "lastname1", 
            "lastname2",
            "color",
            "email",
            "username",
            "pronouns",
            "role",
            "officialId",
           ],
          include: [
            {
              model: models.Task,
              through: { attributes: [] },
              attributes: [
                "id",
                "title",
                "deadline",
                "description",
                "parentId",
                "status",
              ],
              order: [
                [models.Task, "deadline", 'ASC']
              ],
            // separate: true,
              include: [
                {
                  model: models.Task, as: "subTasks",
                  attributes: [
                    "id",
                    "title",
                    "deadline",
                    "parentId",
                    "status",
                  ],
                },
                {
                  model: models.Project,
                  attributes:  ["id", "name"],
                  order: [
                    [models.Project, "deadline", 'ASC']
                  ], 
                 },
                {
                    model: models.Note,
                    attributes:  ["id", "title", "text", "creatorId"],
                    order: [
                      [models.Notes, "createdAt", 'ASC']
                    ],
                  }
                ]
            },
            {
              model: models.Reunion,
              through: models.Workers_Invited_To_Reunions,
              order: [
                [models.Reunion, "date", 'ASC']
              ],
            },
            
            // **** commentables associated with user-self (pinboard?)
            {model: models.Note,
              attributes: ["id", "title", "text", "parentId"],
              order: [
                [models.Note, "createdAt", 'ASC']
              ],
              // separate: true,
            },
            {
              model: models.Document,
              attributes: ["id", "title", "url", "description"],
              order: [
                [models.Document, "createdAt", 'ASC'],
              ],
              // separate: true,
            },
            {
              model: models.Link,
              attributes: ["id", "title", "url", "description"],
              order: [
                [models.Link, "createdAt", 'ASC'],
              ], },
            
          ],
          
        
        })

        req.user = user


        next()
      }
    });
  }
}

module.exports = userShouldBeLoggedIn;
