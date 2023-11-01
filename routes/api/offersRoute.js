const express = require("express");
const router = express.Router();
const offersCtrl = require("../../controllers/api/offersCtrl");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

// POST /api/offers
router.post("/", ensureLoggedIn, offersCtrl.create);
router.get("/", ensureLoggedIn, offersCtrl.getAll);
router.get("/:id", ensureLoggedIn, offersCtrl.getOne);
router.delete("/:id", ensureLoggedIn, offersCtrl.deleteOne);
router.patch("/:id", ensureLoggedIn, offersCtrl.updateOne);

module.exports = router;
