const mongoose = require("mongoose");
const { Schema } = mongoose;

const offerSchema = new Schema(
	{
        jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
		companyName: { type: String, required: true },
		companyAddress: { type: String, required: true },
        position: { type: String, required: true },
        offeredSalary: { type: Number, required: true },
        offerDeadline: { type: Date, required: true },
        acceptance: { type: Boolean }
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Offer", offerSchema);