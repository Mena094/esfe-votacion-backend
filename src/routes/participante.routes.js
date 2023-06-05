const router = require("express").Router()
const {
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

router.get("/:Id/voto", readVotoById)
router.post("/:Id/voto", votar)

// router.get("/:Id/puntaje", readVotoById)
// router.post("/:Id/puntaje", createItem)

module.exports = router