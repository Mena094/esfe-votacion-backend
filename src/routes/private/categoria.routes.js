const router = require("express").Router()
const {getItems} = require("../../controllers/categoria.controllers")

router.get("/", getItems)

module.exports = router