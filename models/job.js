const mongoose = require("mongoose");
const { Schema } = mongoose;

const jobSchema = new Schema(
	{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
		companyName: { type: String, required: true },
		position: { type: String, required: true },
        jobType: { type: String, required: true },
        jobDescription: { type: String, required: true },
        workArrangement: { type: String },
        salaryMin: { type: Number },
        salaryMax: { type: Number },
        AWS: { type: Boolean },
        bonus: { type: Number },
		annualLeaves: { type: Number },
		benefits: { type: String },
        portalURL: { type: String },
        postID: { type: String },
        status: { type: String },
        applicationDate: { type: Date },
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