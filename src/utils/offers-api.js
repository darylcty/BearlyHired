import sendRequest from "./send-request";
const BASE_URL = "/api/offers";

export async function createOffer(inputOfferData) {
    return sendRequest(`${BASE_URL}`, "POST", inputOfferData);
}

export async function getOffer(jobId) {
    return sendRequest(`${BASE_URL}/${jobId}`);
}

export async function updateOffer(offerId, inputOfferData) {
    return sendRequest(`${BASE_URL}/${offerId}`, "PATCH", inputOfferData);
}

export async function deleteOffer(offerId) {
    return sendRequest(`${BASE_URL}/${offerId}`, "DELETE");
}