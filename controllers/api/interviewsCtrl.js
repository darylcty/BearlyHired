const Interview = require("../../models/interview");

async function createInterview(req, res) {
    const data = req.body;
    try {
        const interview = await Interview.create(data);
        res.json(interview);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "An error occurred." });
    }
}

async function getAllInterviews(req, res) {
    try {
        const jobId = req.params.jobId;
        const interviews = await Interview.find({ jobId: jobId });
        res.json(interviews);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "An error occurred." });
    }
}

async function deleteOneInterview(req, res) {
    try {
        const deletedInterview = await Interview.findByIdAndRemove(req.params.id);
        res.json(deletedInterview);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "An error occurred." });
    }
}

async function updateOneInterview(req, res) {
    try {
        const updatedInterview = await Interview.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if (!updatedInterview) {
            res.status(404).json({ error: "Interview not found." });
            return;
        }
        res.json(updatedInterview);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "An error occurred." });
    }
}

module.exports = {
    createInterview,
    getAllInterviews,
    deleteOneInterview,
    updateOneInterview,
};