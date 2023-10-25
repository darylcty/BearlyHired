const Company = require("../../models/company");

async function create(req, res) {
	const data = req.body;
	try {
		const company = await Company.create(data);
		res.json(company);
	} catch (error) {
		console.error(error);
		res.status(400).json({ error: "An error occurred." });
	}
}

async function getOne(req, res) {
	try {
		const company = await Company.findById(req.params.id);
		res.json(company);
	} catch (error) {
		console.error(error);
		res.status(400).json({ error: "An error occurred." });
	}
}

async function getAll(req, res) {
	try {
		const companies = await Company.find({});
		res.json(companies);
	} catch (error) {
		console.error(error);
		res.status(400).json({ error: "An error occurred." });
	}
}

async function deleteOne(req, res) {
	try {
		const deletedCompany = await Company.findByIdAndRemove(req.params.id);
		res.json(deletedCompany);
	} catch (error) {
		console.error(error);
		res.status(400).json({ error: "An error occurred." });
	}
}

async function updateOne(req, res) {
	try {
		const updatedCompany = await Company.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true
			}
		);
		if (!updatedCompany) {
			res.status(404).json({ error: "Company not found." });
			return;
		}
		res.json(updatedCompany);
	} catch (error) {
		console.error(error);
		res.status(400).json({ error: "An error occurred." });
	}
}

module.exports = {
	create,
	getOne,
	getAll,
	deleteOne,
	updateOne
};
