const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const models = require("../models");
const { v4: uuidv4 } = require('uuid');

const supersecret = process.env.SUPER_SECRET;

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
      const hash = await bcrypt.hash(password, saltRounds);
      const newUser = await models.Worker.create({id: uuidv4(), username: username, password: hash})
      res.status(200).send({ message: `${username} was created!` }); 
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const results = await models.Worker.findOne({
      where: {
        username
      }
    })
    const user = results.dataValues;
    if (user) {
      const user_id = user.id;

      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) throw new Error("Incorrect password");
      var token = jwt.sign({ user_id }, supersecret);
      res.send({ user: user} );
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get("/profile", (req, res) => {
  res.send({
    message: "We should do a user-homepage eh"
  });
});

module.exports = router;
