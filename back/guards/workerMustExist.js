const models = require("../models");

async function memberMustExist(req, res, next) {
  
    try {
      const response = await models.Worker.findOne({
        where: {
          id: req.params.workerId
        },
        include: [
          {
            model: models.Project
          }
        ]
      })
    
    req.worker = response;

    next()

  } catch (err) {
    res.status(500).send({message: "no s'ha trobat la treballadora que busques, revisa les dades oi"})
  }

}

module.exports = memberMustExist;