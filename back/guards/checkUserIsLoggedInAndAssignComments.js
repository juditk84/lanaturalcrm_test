const { v4: uuidv4 } = require('uuid')
var jwt = require("jsonwebtoken");
require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;
const models = require("../models");

async function checkUserIsLoggedInAndAssignComments(req, res, next){
const { type } = req.params
const { element } = req.params
const { data } = req.body

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
        attributes: ["id"] 
      })

      try {
        let commObj = {
            id: uuidv4(),
            title: data.title,
            description: data.description,
            creatorId: user.id,
        };
        switch (element){
            case "note":
                commObj = {
                    ...commObj,
                    title: data.title,
                    parentId: data.parentId || null,
                    commentableType: type === "pinboard" ? "worker" : type
                }    
            break;
            case "link":
            case "document":
                commObj = { ...commObj,
                            url: data.url,
                            commentableType : type === "pinboard" ? "worker" : type,
                        }
            break;
            default: 
            throw new Error(`no es pot afegir cap mena de ${element}`)
        }
        
    } catch (err) {
        return err
    }
    req.commObj = commObj;
    next()
    }
  })
}

}

module.exports = checkUserIsLoggedInAndAssignComments;