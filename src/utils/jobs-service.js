import * as jobsAPI from './jobs-api';

export async function createJob(inputJobData) {
    const {
        companyName,
        position,
        jobType,
        workArrangement,
        jobDescription,
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
    } = inputJobData;
    const jobFormData = {
        companyName,
        position,
        jobType,
        workArrangement,
        jobDescription,
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

export async function getAllJobs() {
    try {
        const response = await jobsAPI.getAllJobApplications();
        return response;
    } catch (error) {
        throw new Error('Could Not Get Jobs');
    }
}

export async function getOneJob(jobId) {
    try {
        const response = await jobsAPI.getOneJobApplication(jobId);
        return response;
    } catch (error) {
        throw new Error('Could Not Get Job');
    }
}

export async function updateJob(jobId, inputJobData) {
    const {
        companyName,
        position,
        jobType,
        workArrangement,
        jobDescription,
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
    } = inputJobData;
    const jobFormData = {
        companyName,
        position,
        jobType,
        workArrangement,
        jobDescription,
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

export async function deleteOneJob(jobId) {
    try {
        const response = await jobsAPI.deleteOneJobApplication(jobId);
        return response;
    } catch (error) {
        throw new Error('Could Not Delete Job');
    }
}
