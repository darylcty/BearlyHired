import * as offerAPI from "../utils/offers-api"

export async function createOffer(inputOfferData) {
    const {
        jobId,
        companyName,
        companyAddress,
        position,
        offeredSalary,
        offerDeadline,
        acceptance,
    } = inputOfferData;
    const offerFormData = {
        jobId,
        companyName,
        companyAddress,
        position,
        offeredSalary,
        offerDeadline,
        acceptance,
    };
    try {
        const response = await offerAPI.createOffer(offerFormData);
        return response;
    } catch (error) {
        throw new Error('Could Not Create Offer');
    }
}

export async function getOffer(jobId) {
    try {
        const response = await offerAPI.getOffer(jobId);
        return response;
    } catch (error) {
        console.log('Original error: ', error)
        throw new Error('Could Not Get Offer');
    }
}

export async function updateOffer(inputOfferData, offerId) {
    const {
        jobId,
        companyName,
        companyAddress,
        position,
        offeredSalary,
        offerDeadline,
        acceptance,
    } = inputOfferData;
    const offerFormData = {
        jobId,
        companyName,
        companyAddress,
        position,
        offeredSalary,
        offerDeadline,
        acceptance,
    };
    try {
        const response = await offerAPI.updateOffer(offerId, offerFormData);
        return response;
    } catch (error) {
        console.log('Original error: ', error);
        throw new Error('Could Not Update Offer');
    }
}

export async function deleteOffer(offerId) {
    try {
        const response = await offerAPI.deleteOffer(offerId);
        return response;
    } catch (error) {
        throw new Error('Could Not Delete Offer');
    }
}