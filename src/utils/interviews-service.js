import * as interviewAPI from '../api/interviews-api';

export async function createInterview(inputInterviewData) {
    const {
        jobId,
        companyName,
        companyAddress,
        position,
        interviewRound,
        totalRounds,
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
        interviewRound,
        totalRounds,
        interviewTimeDate,
        interviewerName,
        interviewerEmail,
        interviewerContactNumber,
        interviewNotes,
    };
    try {
        const response = await interviewAPI.createInterview(interviewFormData);
        return response;
    } catch (error) {
        throw new Error('Could Not Create Interview');
    }
}

export async function getAllInterviews(jobId) {
    try {
        const response = await interviewAPI.getAllInterviews(jobId);
        return response;
    } catch (error) {
        console.log('Original error: ', error)
        throw new Error('Could Not Get Interviews');
    }
}

export async function getOneInterview(interviewId) {
    try {
        const response = await interviewAPI.getOneInterview(interviewId);
        return response;
    } catch (error) {
        throw new Error('Could Not Get Interview');
    }
}

export async function updatedInterview(inputInterviewData, interviewId) {
    const {
        jobId,
        companyName,
        companyAddress,
        position,
        interviewRound,
        totalRounds,
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
        interviewRound,
        totalRounds,
        interviewTimeDate,
        interviewerName,
        interviewerEmail,
        interviewerContactNumber,
        interviewNotes,
    };
    try {
        const response = await interviewAPI.updatedInterview(interviewId, interviewFormData);
        return response;
    } catch (error) {
        console.log('Original error: ', error);
        throw new Error('Could Not Update Interview');
    }
}

export async function deleteOneInterview(interviewId) {
    try {
        const response = await interviewAPI.deleteOneInterview(interviewId);
        return response;
    } catch (error) {
        throw new Error('Could Not Delete Interview');
    }
}