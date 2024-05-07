var express = require('express');
var router = express.Router();
const models = require('../models');
const { v4: uuidv4 } = require('uuid');
const { Op } = require('@sequelize/core');
const uppercaseFirst = str => `${str[0].toUpperCase()}${str.substr(1)}`
const memberMustExist = require('../guards/memberMustExist')
const userShouldBeLoggedIn = require('../guards/userShouldBeLoggedIn')


// GET all members
// needs token
// sends also un "name" value que es el nom posat en un string bonic, accessible independement de memberType
router.get('/', userShouldBeLoggedIn, async (req, res, next) => {
  try {
      const response = await models.Member.findAll()
      const memberInfo = await Promise.all(response.map(async (member) => { return namify(member) }))

      res.status(200).send(memberInfo)
  } catch (err) {
    res.status(500).send({message: "error al carregar els membres de la xarxa, ups"})
  }
})

// GET one member
// needs token
// de moment envia tot (but no associations) becasue aviam que (no) volem enviar
// i el guard afegeix un "name" property, accessible independent de memberType
router.get('/:memberId', userShouldBeLoggedIn, memberMustExist, async (req, res, next) => {
  const {member} = req
  try {
      res.status(200).send(member)
  } catch (err) {
    res.status(500).send({message: "no s'ha trobat el membre que busques, revisa les dades oi"})
  }
})

// POST new membro
// needs token
//  s'ha d'enviar: { data : { key: value, etc }} objecte 
// if contact enviar firstname, lastname1(opcional #2), role, pronouns
// if entity commercialName1(opcional #2) 
// ALL : memberType, officialId, email, address, city, postcode, country, phoneNumber, authorizationImg, parentId (or null)

// molt important que les dades que s'envian, el default sigui NULL

// retorna member + boolean CREATED si s'ha fet un nou
router.post('/', userShouldBeLoggedIn, async (req, res, next) => {
  const { user } = req
  const { data } = req.body

  const defaultOptions = {
    id: uuidv4(),
    ...data,
    creatorId: user.id,
  }

  try {
   await checkMemberTypeMatchesData(data, data.memberType)

    const [response, created] = await models.Member.findOrCreate({ 
      where : {
        memberType: data.memberType,
    
        [Op.or]: {
          officialId: data.officialId,
          firstname: data.firstname,
          lastname1 : data.lastname1,
          commercialName1: data.commercialName1
        }
      },
      defaults: defaultOptions
    })
    const member = await namify(response)
    res.status(200).send({member, created})
  } catch (err) {
    res.status(500).send(err.message)
  }
})

// needs token
/// pass fields that we want to change as a { data : { field : newValue } } object
// sends updated project
router.patch('/:memberId', userShouldBeLoggedIn, memberMustExist, async (req, res, next) => {
  const { member } = req
  const { data } = req.body
  try {
    await checkMemberTypeMatchesData(data, data.memberType)
    const updated = await member.update(data)
    res.status(200).send(updated)
  } catch (err) {
    res.status(400).send({message: err.message})
  }
})

async function namify(member){
  try {
    await checkMemberTypeMatchesData(member, member.memberType)

    return {
       ...member.dataValues,
       name : member.memberType === 'contact' ? `${member.firstname} ${member.lastname1} ${member.lastname2 ?? ""}`.trim()
        : `${member.commercialName1}`
       }
  } catch(err) {
    return member
    // hopefully aixó retorna el membre sense canviar-ho si no funciona for some reason
  }

}

// this should be refactorized, those are some ugly ifs
async function checkMemberTypeMatchesData(member, memberType) {
  switch (memberType) {
    case "contact" :
      if ((member.firstname === null || member.lastname1 === null) || (member.commercialName1)) throw new Error("contactes poder tener nom, primer cognóm, i un segon cognóm opcional")
      break;
    case "entity" :
      if (member.commercialName1 === null || (member.firstname || member.firstname)) throw new Error("les entitats poden tener un o dos noms comercials")
    break;
    default: 
      throw new Error("s'ha d'indicar el tipus de membre")
  }
}

module.exports = router;
