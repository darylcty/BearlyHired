const express = require("express");
const router = express.Router();
const interviewsCtrl = require("../../controllers/api/interviewsCtrl");

// POST /api/interviews
router.post("/interviews", interviewsCtrl.create);
router.get("/interviews", interviewsCtrl.getAll);
router.get("interviews", interviewsCtrl.getOne);
router.delete("interviews", interviewsCtrl.deleteOne);
router.patch("interviews", interviewsCtrl.updateOne);

module.exports = router;
