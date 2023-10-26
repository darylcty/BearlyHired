const BASE_URL = "/api/jobs";
import sendRequest from "./send-request";

export async function createJobApplication(inputJobData) {
    return sendRequest(`${BASE_URL}`, "POST", inputJobData);
}

export async function getAllJobApplications() {
    return sendRequest(`${BASE_URL}`);
}

export async function getOneJobApplication(jobId) {
    return sendRequest(`${BASE_URL}/${jobId}`);
}

export async function updateJobApplication(jobId, inputJobData) {
    return sendRequest(`${BASE_URL}/${jobId}`, "PATCH", inputJobData);
}

export async function deleteOneJobApplication(jobId) {
    return sendRequest(`${BASE_URL}/${jobId}`, "DELETE");
}