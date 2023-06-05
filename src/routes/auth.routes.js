const router = require("express").Router()
const { getAuth } = require("../controllers/auth.controllers")

router.get("/", getAuth)

module.exports = router