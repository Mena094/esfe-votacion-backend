const router = require("express").Router()
const jwt = require("jsonwebtoken")
const { getAuth , verifyAuth, getAuthJuez} = require("../controllers/auth.controllers")

router.post("/", getAuth)
router.post("/verify", verifyAuth)

router.post("/juez", getAuthJuez)



module.exports = router