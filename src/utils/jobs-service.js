import * as jobsAPI from './jobs-api';

export async function createJobApplication(inputJobData) {
    const {
        userId,
        companyName,
        position,
        jobType,
        jobDescription,
        workArrangement,
        salaryMin,
        salaryMax,
        AWS,
        bonus,
        annualLeaves,
        benefits,
        portalURL,
        postID,
        status,
        applicationDate,
        interviewDate,
        notes,
        offered,
        offeredSalary,
    } = inputJobData;
    const jobFormData = {
        userId,
        companyName,
        position,
        jobType,
        jobDescription,
        workArrangement,
        salaryMin,
        salaryMax,
        AWS,
        bonus,
        annualLeaves,
        benefits,
        portalURL,
        postID,
        applicationDate,
        status,
        interviewDate,
        notes,
        offered,
        offeredSalary,
    };
    try {
        const response = await jobsAPI.createJobApplication(jobFormData);
        return response;
    } catch (error) {
        throw new Error('Could Not Create Job');
    }
}

export async function getAllJobApplications(userId) {
    try {
        const response = await jobsAPI.getAllJobApplications(userId);
        return response;
    } catch (error) {
        console.log('Original error: ', error)
        throw new Error('Could Not Get Jobs');
    }
}

export async function getOneJobApplication(jobId) {
    try {
        const response = await jobsAPI.getOneJobApplication(jobId);
        return response;
    } catch (error) {
        throw new Error('Could Not Get Job');
    }
}

export async function updateJobApplication(jobId, inputJobData) {
    const {
        companyName,
        position,
        jobType,
        jobDescription,
        workArrangement,
        salaryMin,
        salaryMax,
        AWS,
        bonus,
        annualLeaves,
        benefits,
        portalURL,
        postID,
        status,
        applicationDate,
        interviewDate,
        notes,
        offered,
        offeredSalary,
    } = inputJobData;
    const jobFormData = {
        companyName,
        position,
        jobType,
        jobDescription,
        workArrangement,
        salaryMin,
        salaryMax,
        AWS,
        bonus,
        annualLeaves,
        benefits,
        portalURL,
        postID,
        applicationDate,
        status,
        interviewDate,
        notes,
        offered,
        offeredSalary,
    };
    try {
        const response = await jobsAPI.updateJobApplication(jobId, jobFormData);
        return response;
    } catch (error) {
        console.log('Original error: ', error);
        throw new Error('Could Not Update Job');
    }
}

export async function deleteOneJobApplication(jobId) {
    try {
        const response = await jobsAPI.deleteOneJobApplication(jobId);
        return response;
    } catch (error) {
        throw new Error('Could Not Delete Job');
    }
}