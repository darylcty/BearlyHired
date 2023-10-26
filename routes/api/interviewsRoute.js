const express = require("express");
const router = express.Router();
const interviewsCtrl = require("../../controllers/api/interviewsCtrl");

// POST /api/interviews
router.post("/", interviewsCtrl.create);
router.get("/", interviewsCtrl.getAll);
router.get("/:id", interviewsCtrl.getOne);
router.delete("/:id", interviewsCtrl.deleteOne);
router.patch("/:id", interviewsCtrl.updateOne);

module.exports = router;
