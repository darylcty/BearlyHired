const Job = require("../../models/job");

async function createJob(req, res) {
    const data = req.body;
    try {
        const job = await Job.create(data);
        res.json(job);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "An error occurred." });
    }
}

async function getOneJob(req, res) {
    try {
        const job = await Job.findById(req.params.id);
        res.json(job);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "An error occurred." });
    }
}

async function getAllJobs(req, res) {
    try {
        const jobs = await Job.find({});
        res.json(jobs);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "An error occurred." });
    }
}

async function deleteOneJob(req, res) {
    try {
        const deletedJob = await Job.findByIdAndRemove(req.params.id);
        res.json(deletedJob);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "An error occurred." });
    }
}

async function updateOneJob(req, res) {
    try {
        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if (!updatedJob) {
            res.status(404).json({ error: "Job not found." });
            return;
        }
        res.json(updatedJob);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "An error occurred." });
    }
}

module.exports = {
    createJob,
    getOneJob,
    getAllJobs,
    deleteOneJob,
    updateOneJob
};