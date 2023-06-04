const router = require("express").Router()
const { getAll } = require("../../controllers/estadistica.controllers")

router.get("/", getAll)

module.exports = router