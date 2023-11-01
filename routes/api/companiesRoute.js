const express = require("express");
const router = express.Router();
const companiesCtrl = require("../../controllers/api/companiesCtrl");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

// POST /api/companies
router.post("/", ensureLoggedIn, companiesCtrl.createCompany);
router.get("/", ensureLoggedIn, companiesCtrl.getAllCompanies);
router.get("/:name", ensureLoggedIn, companiesCtrl.getOneCompanyByName);
router.delete("/:id", ensureLoggedIn, companiesCtrl.deleteOneCompany);
router.patch("/:id", ensureLoggedIn, companiesCtrl.updateOneCompany);

module.exports = router;
