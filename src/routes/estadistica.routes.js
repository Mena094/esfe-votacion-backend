const router = require("express").Router()
const { getAll,getCarrera } = require("../controllers/estadistica.controllers")

router.get("/", getAll)
router.get("/carrera", getCarrera)

module.exports = router