const mongoose = require("mongoose");
const { Schema } = mongoose;

const jobSchema = new Schema(
	{
		companyName: { type: String, required: true },
		position: { type: String, required: true },
        jobType: { type: String, required: true },
        workArrangement: { type: String, required: true },
        jobDescription: { type: String, required: true },
        salaryMin: { type: Number },
        salaryMax: { type: Number },
        AWS: { type: Boolean },
        bonus: { type: Number },
		annualLeaves: { type: Number },
		benefits: { type: String },
        portalURL: { type: String },
        postID: { type: String },
        applicationDate: { type: Date },
        status: { type: String },
        interviewDate: { type: Date },
        notes: { type: String },
        offered: { type: Boolean },
        offeredSalary: { type: Number },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Job", jobSchema);