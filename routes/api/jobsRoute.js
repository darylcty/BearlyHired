const express = require("express");
const router = express.Router();
const jobsCtrl = require("../../controllers/api/jobsCtrl");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

// POST /api/jobs
router.post("/", ensureLoggedIn, jobsCtrl.createJobApplication);
router.get("/user/:userId", ensureLoggedIn, jobsCtrl.getAllJobApplications);
router.get("/:id", ensureLoggedIn, jobsCtrl.getOneJobApplication);
router.delete("/:id", ensureLoggedIn, jobsCtrl.deleteOneJobApplication);
router.patch("/:id", ensureLoggedIn, jobsCtrl.updateOneJobApplication);

module.exports = router;
