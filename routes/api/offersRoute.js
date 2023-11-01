const express = require("express");
const router = express.Router();
const offersCtrl = require("../../controllers/api/offersCtrl");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

// POST /api/offers
router.post("/", ensureLoggedIn, offersCtrl.createOffer);
router.get("/:jobId", ensureLoggedIn, offersCtrl.getOffer);
router.delete("/:id", ensureLoggedIn, offersCtrl.deleteOffer);
router.patch("/:id", ensureLoggedIn, offersCtrl.updateOffer);

module.exports = router;
