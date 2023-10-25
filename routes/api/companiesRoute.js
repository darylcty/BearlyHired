const express = require("express");
const router = express.Router();
const companiesCtrl = require("../../controllers/api/companiesCtrl");

// POST /api/companies
router.post("/", companiesCtrl.create);
router.get("/", companiesCtrl.getAll);
router.get("/:id", companiesCtrl.getOne);
router.delete("/:id", companiesCtrl.deleteOne);
router.patch("/:id", companiesCtrl.updateOne);

module.exports = router;
