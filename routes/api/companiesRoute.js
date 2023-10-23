const express = require("express");
const router = express.Router();
const companiesCtrl = require("../../controllers/api/companiesCtrl");

// POST /api/companies
router.post("/companies", companiesCtrl.create);
router.get("/companies", companiesCtrl.getAll);
router.get("/companies/:id", companiesCtrl.getOne);
router.delete("/companies/:id", companiesCtrl.deleteOne);
router.patch("/companies/:id", companiesCtrl.updateOne);

module.exports = router;
