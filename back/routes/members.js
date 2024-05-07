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
      const memberInfo = await response.map((member) => {
       return {
        ...member.dataValues,
        name : member.memberType === 'contact' ? `${member.firstname} ${member.lastname1} ${member.lastname2 ?? ""}`.trim()
         : `${member.commercialName1}`
        }
        })
      res.status(200).send(workerInfo)
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
// if contact enviar firstname, lastname1(+2), role, pronouns
// if entity commercialName1(+2) 
// ALL : memberType, officialId, email, address, city, postcode, country, phoneNumber, authorizationImg, parentId (or null)

// data by default should be NULL i quant ho sigui podem borrar tots els || null aqui

// retorna member + boolean CREATED si s'ha fet un nou
// if created === false NO S'HA CREAT, estem tornant un membre que ja existia
router.post('/', userShouldBeLoggedIn, async (req, res, next) => {
  const { user } = req
  const { data } = req.body

  const defaultOptions = {
    id: uuidv4(),
    firstname : data.firstname || null,
    lastname1 : data.lastname1 || null,
    commercialName1: data.commercialName1 || null,
    memberType : data.memberType,
    lastname2 : data.lastname2,
    commercialName2 : data.commercialName2,
    pronouns : data.pronouns || null,
    role: data.role || null,
    officialId : data.officialId || null,
    email: data.email || null, 
    address: data.address || null, 
    city: data.city || null, 
    postcode: data.postcode || null,
    country: data.country || null,
    phoneNumber: data.phoneNumber || null,
    authorizationImg: data.authorizationImg || null,
    parentId: data.parentId || null,
    creatorId: user.id,
  }

  try {
   await checkMemberTypeMatchesData(data, data.memberType)

    // here we check si ja hi ha un member de aquest tipus amb aquest nom
    // si no existeix ho creem
    const [member, created] = await models.Member.findOrCreate({ 
      where : {
        memberType: data.memberType,
        [Op.or]: [
          {firstname : data.firstname, lastname1 : data.lastname1, commercialName1: null},
          {firstname: null, lastname1: null, commercialName1 : data.commercialName1},
        ]
      },
      defaults: defaultOptions
    })
  
    res.send({member, created})
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

async function checkMemberTypeMatchesData(member, memberType) {
  switch (memberType) {
    case "contact" :
      if (member.firstname === null || member.lastname1 === null) throw new Error("contactes necesitan com a minim nom i 1r cognom")
      break;
    case "entity" :
      if (member.commercialName1 === null) throw new Error("entitats necesitan com a minim nom comercial")
    break;
    default: 
      throw new Error("s'ha d'indicar el tipus de membre")
  }
}

module.exports = router;
