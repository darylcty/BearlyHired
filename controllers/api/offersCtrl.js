const Offer = require("../../models/offer");

async function createOffer(req, res) {
    const data = req.body;
    try {
        const interview = await Offer.create(data);
        res.json(interview);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "An error occurred." });
    }
}

async function getOffer(req, res) {
    try {
        const jobId = req.params.jobId;
        const offer = await Offer.find({ jobId: jobId });
        res.json(offer);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "An error occurred." });
    }
}

async function deleteOffer(req, res) {
    try {
        const deletedOffer = await Offer.findByIdAndRemove(req.params.id);
        res.json(deletedOffer);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "An error occurred." });
    }
}

async function updateOffer(req, res) {
    try {
        const updatedOffer = await Offer.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if (!updatedOffer) {
            res.status(404).json({ error: "Interview not found." });
            return;
        }
        res.json(updatedOffer);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "An error occurred." });
    }
}

module.exports = {
    createOffer,
    getOffer,
    deleteOffer,
    updateOffer,
};