const express = require("express");
const router = express.Router();
const offersCtrl = require("../../controllers/api/offersCtrl");

// POST /api/offers
router.post("/jobs", offersCtrl.create);
router.get("/jobs", offersCtrl.getAll);
router.get("/jobs/:id", offersCtrl.getOne);
router.delete("/jobs/:id", offersCtrl.deleteOne);
router.patch("/jobs/:id", offersCtrl.updateOne);

module.exports = router;
