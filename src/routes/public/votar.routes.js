const router = require("express").Router()
const {votar} = require("../../controllers/votar.controllers")

router.post("/", votar)

module.exports = router