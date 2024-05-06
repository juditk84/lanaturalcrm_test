const models = require("../models");

async function projectMustExist(req, res, next) {

const project = await models.Project.findOne({
        where: {
          id: req.params.projectId,
        },
        include: [
          {
            model: models.Member,
            attributes: {
              exclude: ["id", "ProjectTypeId"]
            }
          },
          {
            model: models.ProjectType,
            attributes: ["type"]
            
          },
          {
            model: models.Worker,
            attributes: {
              exclude: ["password"]
            },
          },
          {
            model: models.Task,
            include: [
              {
                model: models.Worker, 
                through: {
                  model: models.Tasks_Assigned_To_Workers,
                  attributes: []
                }
              }
            ]
          },
          {
            model: models.Transaction,
            include: [
              {
                model: models.Member,
                attributes: ["commercialName1"]
              }
              
              ]
          }
        ],
      })

    req.project = project

    next()
}

module.exports = projectMustExist;