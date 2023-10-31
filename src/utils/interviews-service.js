import * as interviewsAPI from "../utils/interviews-api"

export async function createInterview(inputInterviewData) {
    const {
        jobId,
        companyName,
        companyAddress,
        position,
        interviewType,
        interviewTimeDate,
        interviewerName,
        interviewerEmail,
        interviewerContactNumber,
        interviewNotes,
    } = inputInterviewData;
    const interviewFormData = {
        jobId,
        companyName,
        companyAddress,
        position,
        interviewType,
        interviewTimeDate,
        interviewerName,
        interviewerEmail,
        interviewerContactNumber,
        interviewNotes,
    };
    try {
        const response = await interviewsAPI.createInterview(interviewFormData);
        return response;
    } catch (error) {
        throw new Error('Could Not Create Interview');
    }
}

export async function getAllInterviews(jobId) {
    try {
        const response = await interviewsAPI.getAllInterviews(jobId);
        return response;
    } catch (error) {
        console.log('Original error: ', error)
        throw new Error('Could Not Get Interviews');
    }
}

// export async function getOneInterview(interviewId) {
//     try {
//         const response = await interviewsAPI.getOneInterview(interviewId);
//         return response;
//     } catch (error) {
//         throw new Error('Could Not Get Interview');
//     }
// }

export async function updateOneInterview(inputInterviewData, interviewId) {
    const {
        jobId,
        companyName,
        companyAddress,
        position,
        interviewType,
        interviewTimeDate,
        interviewerName,
        interviewerEmail,
        interviewerContactNumber,
        interviewNotes,
    } = inputInterviewData;
    const interviewFormData = {
        jobId,
        companyName,
        companyAddress,
        position,
        interviewType,
        interviewTimeDate,
        interviewerName,
        interviewerEmail,
        interviewerContactNumber,
        interviewNotes,
    };
    try {
        const response = await interviewsAPI.updateOneInterview(interviewId, interviewFormData);
        return response;
    } catch (error) {
        console.log('Original error: ', error);
        throw new Error('Could Not Update Interview');
    }
}

export async function deleteOneInterview(interviewId) {
    try {
        const response = await interviewsAPI.deleteOneInterview(interviewId);
        return response;
    } catch (error) {
        throw new Error('Could Not Delete Interview');
    }
}