const models = require("../models");

async function memberMustExist(req, res, next) {

    const membre = await models.Member.findOne({
        where: {
            id: memberId
        }
    })

}

module.exports = memberMustExist;