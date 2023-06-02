const router = require("express").Router()
const {getAuth} = require("../controllers/auth.controlers")

router.get("/", getAuth)

module.exports = router