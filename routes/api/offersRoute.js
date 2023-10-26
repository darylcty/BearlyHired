const express = require("express");
const router = express.Router();
const offersCtrl = require("../../controllers/api/offersCtrl");

// POST /api/offers
router.post("/", offersCtrl.create);
router.get("/", offersCtrl.getAll);
router.get("/:id", offersCtrl.getOne);
router.delete("/:id", offersCtrl.deleteOne);
router.patch("/:id", offersCtrl.updateOne);

module.exports = router;
