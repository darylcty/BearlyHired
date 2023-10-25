const mongoose = require("mongoose");
const { Schema } = mongoose;

const companySchema = new Schema(
	{
		companyName: { type: String, required: true },
		companyLocation: { type: String, required: true },
		country: { type: String, required: true },
		industry: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Company", companySchema);