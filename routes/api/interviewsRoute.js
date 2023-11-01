const express = require("express");
const router = express.Router();
const interviewsCtrl = require("../../controllers/api/interviewsCtrl");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

// POST /api/interviews
router.post("/", ensureLoggedIn, interviewsCtrl.createInterview);
router.get("/:jobId", ensureLoggedIn, interviewsCtrl.getAllInterviews);
// router.get("/:id", ensureLoggedIn, interviewsCtrl.getOneInterview);
router.delete("/:id", ensureLoggedIn, interviewsCtrl.deleteOneInterview);
router.patch("/:id", ensureLoggedIn, interviewsCtrl.updateOneInterview);

module.exports = router;
