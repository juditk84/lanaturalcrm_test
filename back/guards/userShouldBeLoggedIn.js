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
            { model: models.Project, through: models.Projects_Assigned_To_Workers},
            // { model: models.Task, through: models.Tasks_Assigned_To_Workers},
            // { model: models.Reunion, through: models.Workers_Invited_To_Reunions},
            models.Document,
            // models.Estimate,
            // models.Link,
            // models.Member,
            // models.Note,
            // models.Project,
            // models.Reunion,
            // models.Task,
            // models.Transaction,   
          ]
          // include: { all: true, nested: true }, // Això sembla guai però crec que ho tranca. Caldria probar més
        })
        req.user = user; 
        next();
      }
    });
  }
}

module.exports = userShouldBeLoggedIn;
