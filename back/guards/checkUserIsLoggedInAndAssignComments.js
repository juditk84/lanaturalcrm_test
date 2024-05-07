const { v4: uuidv4 } = require('uuid')
var jwt = require("jsonwebtoken");
require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;
const models = require("../models");
const uppercaseFirst = str => `${str[0].toUpperCase()}${str.substr(1)}`

async function checkUserIsLoggedInAndAssignComments(req, res, next){
const { type, element } = req.params
const { data } = req.body


const token = req.headers["authorization"]?.replace(/^Bearer\s/, "");

if (!token) {
  res.status(401).send({ message: "please provide a token" });
} else {
  jwt.verify(token, supersecret, async function (err, decoded) {
    if (err) res.status(401).send({ message: err.message });
    else {
      let comment = null;
   
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
            creatorId: user.id,
            commentableId: data.commentableId
        };
        switch (element){
            case "note":
                comment = await models.Note.create({
                    ...commObj,
                    text: data.text,
                    parentId: data.parentId || null,
                    commentableType: type === "pinboard" ? "worker" : type
                })   
            break;
            case "link":
            case "document":
                if (data.url === null) throw new Error("falta una url!")
                comment = await models.Link.create({
                    ...commObj,
                    description: data.description,
                    url: data.url,
                    commentableType : type === "pinboard" ? "worker" : type,
                })
            break;
            default: 
            throw new Error(`no es pot afegir cap mena de ${element}`)
        }
        
    } catch (err) {
        return err
    }

    req.comment = comment
    next()
    }
  })
}

}

module.exports = checkUserIsLoggedInAndAssignComments;