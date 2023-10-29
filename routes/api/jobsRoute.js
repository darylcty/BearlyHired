const express = require("express");
const router = express.Router();
const jobsCtrl = require("../../controllers/api/jobsCtrl");

// POST /api/jobs
router.post("/", jobsCtrl.createJobApplication);
router.get("/user/:userId/", jobsCtrl.getAllJobApplications);
router.get("/:id", jobsCtrl.getOneJobApplication);
router.delete("/:id", jobsCtrl.deleteOneJobApplication);
router.patch("/:id", jobsCtrl.updateOneJobApplication);

module.exports = router;
