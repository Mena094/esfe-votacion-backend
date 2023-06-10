const router = require("express").Router()
const { verifyTokenEstudiante } = require("../shared/middlewares/verifyToken")

const {
  puntaje,
  readItems,
  readVotoById,
  createItem,
  updateItem,
  deleteItem,
  votar } = require("../controllers/participante.controllers")

router.get("/", readItems)
router.post("/", createItem)
router.put("/", updateItem)
router.delete("/:Id", deleteItem)

router.get("/voto", readVotoById)
router.post("/voto", verifyTokenEstudiante, votar)

// router.get("/:Id/puntaje", readVotoById)
router.put("/puntaje", verifyTokenEstudiante, puntaje)

module.exports = router