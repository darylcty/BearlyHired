const express = require("express");
const router = express.Router();
const interviewsCtrl = require("../../controllers/api/interviewsCtrl");

// POST /api/interviews
router.post("/", interviewsCtrl.createInterview);
router.get("/", interviewsCtrl.getAllInterviews);
router.get("/:id", interviewsCtrl.getOneInterview);
router.delete("/:id", interviewsCtrl.deleteOneInterview);
router.patch("/:id", interviewsCtrl.updateOneInterview);

module.exports = router;
