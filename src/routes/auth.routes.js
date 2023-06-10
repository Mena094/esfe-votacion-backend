const router = require("express").Router()
const jwt = require("jsonwebtoken")
const { getAuth , verifyAuth, getAuthEstudiante} = require("../controllers/auth.controllers")

router.post("/", getAuth)
router.post("/verify", verifyAuth)

router.post("/estudiante", getAuthEstudiante)



module.exports = router