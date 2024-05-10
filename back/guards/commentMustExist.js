const models = require('../models')



async function commentMustExist(req, res, next) {
    const {element, id} = req.params
    let comment = null;

    switch(element){
        case "note" : 
            comment = await models.Note.findOne({
                where: {id: id},
                include: { model: models.Note, as: 'SubNotes'}
            })
        break;
        case "link":
            comment = await models.Link.findOne({
                where: {id: id}
            })
        break;
        default:
            throw new Error(`no tenim ${element}, proba something else`)
    }

    req.comment = comment;

    next()

}

module.exports = commentMustExist;