const models = require("../models");

async function memberMustExist(req, res, next) {
  
    try {
      const response = await models.Member.findOne({
        where: {
          id: req.params.memberId
        },
        include: [{
          model: models.Member,
          as: "Child"
        }]
      })
    response.dataValues.name = response.dataValues.memberType === 'contact'
            ? `${response.dataValues.firstname} ${response.dataValues.lastname1} ${response.dataValues.lastname2 ?? ""}`.trim()
            :  `${response.dataValues.commercialName1}`
    
    req.member = response;

    next()

  } catch (err) {
    res.status(500).send({message: "no s'ha trobat el membre que busques, revisa les dades oi"})
  }

}

module.exports = memberMustExist;