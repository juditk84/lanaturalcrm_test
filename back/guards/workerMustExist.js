const models = require("../models");

async function memberMustExist(req, res, next) {
  
    try {
      const response = await models.Worker.findOne({
        where: {
          id: req.params.workerId
        },
        // include: [
        //     {
        //   model: models.Member,
        //   as: "parent"
        // },  
        //     {
        //   model: models.Member,
        //   as: "children"
        // },
        // {
        //   model: models.Project,
        //   as: "projects",
        //   include: [
        //     {
        //       model: models.ProjectType,
        //       attributes: ["type"]
        //     },
        //     {
        //       model: models.Worker,
        //       attributes: ["firstname"]
        //     }
        //   ]
        // }]
      })
    
    req.worker = response;

    next()

  } catch (err) {
    res.status(500).send({message: "no s'ha trobat la treballadora que busques, revisa les dades oi"})
  }

}

module.exports = memberMustExist;