var jwt = require("jsonwebtoken");
require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;
const models = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function userShouldExist(req, res, next) {
    const { username } = req.body;

  try {
    const results = await models.Worker.findOne({
      where: {
        username
      }
    })

    const user = results.dataValues;
    console.log("line 35")
    if (user) {
      const user_id = user.id;

      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) throw new Error("Incorrect password");
      var token = jwt.sign({ user_id }, supersecret);
      req.token = token
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }



  // const token = req.headers["authorization"]?.replace(/^Bearer\s/, "");

  // if (!token) {
  //   res.status(401).send({ message: "please provide a token" });
  // } else {
  //   jwt.verify(token, supersecret, async function (err, decoded) {
  //     if (err) res.status(401).send({ message: err.message });
  //     else {

  //       const user = await models.Worker.findOne({
  //         where: {
  //           id: decoded.user_id,
  //         },
  //         attributes: ["username", "id"],
  //         include: [
  //           {
  //             model: models.Project,
  //             through: models.Projects_Assigned_To_Workers,
  //             attributes: { exclude: ["workerId", "memberId", "createdAt", "updatedAt", "projectTypeId"] },
  //             include: [
  //               {model: models.Note, attributes: { exclude: ["id", "workerId", "createdAt", "updatedAt"]}}, /// notes linked to project (commentableId de la nota is projectId)
  //               {model: models.Member, attributes: { exclude: ["id", "createdAt", "updatedAt"]}},
  //               models.Estimate,
  //               models.Transaction, 
  //               { model: models.ProjectType, attributes: ["type"] }]   
  //           },
  //           {
  //             model: models.Task,
  //             through: models.Tasks_Assigned_To_Workers
  //           },
  //           {
  //             model: models.Reunion,
  //             through: models.Workers_Invited_To_Reunions
  //           },
  //           // **** commentables associated with user-self (pinboard?)
  //           models.Note,
  //           models.Document,
  //           models.Link,
  //         ],
  //       })

      }
    // });
  // }
// }

module.exports = userShouldExist;
