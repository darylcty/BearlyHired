import sendRequest from "./send-request";
const BASE_URL = "/api/interviews";

export async function createInterview(inputInterviewData) {
    return sendRequest(`${BASE_URL}`, "POST", inputInterviewData);
}

export async function getAllInterviews(jobId) {
    return sendRequest(`${BASE_URL}/${jobId}`);
}

// export async function getOneInterview(interviewId) {
//     return sendRequest(`${BASE_URL}/${interviewId}`);
// }

export async function updateOneInterview(interviewId, inputInterviewData) {
    return sendRequest(`${BASE_URL}/${interviewId}`, "PATCH", inputInterviewData);
}

export async function deleteOneInterview(interviewId) {
    return sendRequest(`${BASE_URL}/${interviewId}`, "DELETE");
}