const express = require("express");
const router = express.Router();
const jobsCtrl = require("../../controllers/api/jobsCtrl");

// POST /api/jobs
router.post("/", jobsCtrl.createJob);
router.get("/", jobsCtrl.getAllJobs);
router.get("/:id", jobsCtrl.getOneJob);
router.delete("/:id", jobsCtrl.deleteOneJob);
router.patch("/:id", jobsCtrl.updateOneJob);

module.exports = router;
