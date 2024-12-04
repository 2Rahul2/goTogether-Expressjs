const express = require('express')

const router = express.Router()

const {createUser} = require('../../controllers/userController')
const {logout} = require('../../controllers/userController')
router.post("/create" , createUser)
router.get("/logout" , logout)

module.exports = router