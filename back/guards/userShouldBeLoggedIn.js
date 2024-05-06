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
          attributes: ["id", "username"] 
        })

        req.user = user

        next()
      }
    });
  }
}

module.exports = userShouldBeLoggedIn;
