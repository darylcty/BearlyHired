const Job = require("../../models/job");

async function createJobApplication(req, res) {
    const data = req.body;
    try {
        const job = await Job.create(data);
        res.json(job);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "An error occurred." });
    }
}

async function getAllJobApplications(req, res) {
    try {
        const userId = req.params.userId;
        const jobs = await Job.find({ userId: userId });
        res.json(jobs);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "An error occurred." });
    }
}
async function getOneJobApplication(req, res) {
    try {
        const job = await Job.findById(req.params.id);
        res.json(job);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "An error occurred." });
    }
}


async function deleteOneJobApplication(req, res) {
    try {
        const deletedJob = await Job.findByIdAndRemove(req.params.id);
        res.json(deletedJob);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "An error occurred." });
    }
}

async function updateOneJobApplication(req, res) {
    try {
        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                //? returns modified document instead of default original document
                new: true,
                //? run mongoose validators on update
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
    createJobApplication,
    getOneJobApplication,
    getAllJobApplications,
    deleteOneJobApplication,
    updateOneJobApplication
};