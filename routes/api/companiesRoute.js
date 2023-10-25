const express = require("express");
const router = express.Router();
const companiesCtrl = require("../../controllers/api/companiesCtrl");

// POST /api/companies
router.post("/", companiesCtrl.createCompany);
router.get("/", companiesCtrl.getAllCompanies);
router.get("/:id", companiesCtrl.getOneCompany);
router.delete("/:id", companiesCtrl.deleteOneCompany);
router.patch("/:id", companiesCtrl.updateOneCompany);

module.exports = router;
