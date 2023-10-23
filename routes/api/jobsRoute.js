const express = require("express");
const router = express.Router();
const jobsCtrl = require("../../controllers/api/jobsCtrl");

// POST /api/jobs
router.post("/jobs", jobsCtrl.create);
router.get("/jobs", jobsCtrl.getAll);
router.get("/jobs/:id", jobsCtrl.getOne);
router.delete("/jobs/:id", jobsCtrl.deleteOne);
router.patch("/jobs/:id", jobsCtrl.updateOne);

module.exports = router;
