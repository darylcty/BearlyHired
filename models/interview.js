const mongoose = require("mongoose");
const { Schema } = mongoose;

const interviewSchema = new Schema(
	{
        jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
		companyName: { type: String, required: true },
		companyAddress: { type: String, required: true },
        position: { type: String, required: true },
        interviewType: { type: String, required: true },
        interviewTimeDate: [{ type: Date, required: true }],
        interviewerName: { type: String },
        interviewerEmail: { type: String, match: [/\S+@\S+\.\S+/, 'is invalid'] },
        interviewerContactNumber: { type: String },
        interviewNotes: { type: String },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Interview", interviewSchema);