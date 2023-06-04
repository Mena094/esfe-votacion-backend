const router = require("express").Router()
const { votar } = require("../../controllers/votar.controllers")
const verifyActive = require("../../shared/middlewares/veryfyActiveConcurso")

router.post("/",verifyActive, votar)

module.exports = router