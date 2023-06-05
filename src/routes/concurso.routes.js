const router = require("express").Router()
const {
  readItems,
  readCategoriaById,
  createItem,
  updateItem,
  deleteItem } = require("../controllers/concurso.controllers")

router.get("/", readItems)
router.get("/:Id/categoria", readCategoriaById)
router.post("/", createItem)
router.put("/", updateItem)
router.delete("/:Id", deleteItem)

module.exports = router