import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { getOneJobApplication } from "../../utils/jobs-service";
import { Button, Tab, Tabs } from 'react-bootstrap';

export default function JobApplicationDetails() {
    const [ jobApplicationDetails, setJobApplicationDetails ] = useState({});
    const { id } = useParams();

    useEffect (() => {
        async function fetchJobApplicationDetails() {
            try {
                const jobApplicationDetails = await getOneJobApplication(id);
                console.log(jobApplicationDetails);
                setJobApplicationDetails(jobApplicationDetails);
            } catch (error) {
                console.log(error);
            }
        }
        fetchJobApplicationDetails();
    }, [id]);

    return (
        <>
            <h1>Job Application Details</h1>
            <Tabs
            defaultActiveKey="profile"
            id="fill-tab-example"
            className="mb-3"
            fill
            >
        <Tab eventKey="job-application" title="Job Application">
                    <br/>
                    <h4>Company Name </h4>
                    <p>{jobApplicationDetails.companyName}</p>
                    <h4>Position</h4>
                    <p>{jobApplicationDetails.position}</p>
                    <h4>Job Type</h4>
                    <p>{jobApplicationDetails.jobType}</p>
                    <h4>Job Description</h4>
                    <p>{jobApplicationDetails.jobDescription}</p>
                    <h4>Work Arrangement</h4>
                    <p>{jobApplicationDetails.workArrangement}</p>
                    <h4>Salary Min</h4>
                    <p>${jobApplicationDetails.salaryMin}</p>
                    <h4>Salary Max</h4>
                    <p>${jobApplicationDetails.position}</p>
                    <h4>Annual Wage Supplement(AWS) </h4>
                    <p>{jobApplicationDetails.AWS}</p>
                    <h4>Bonus</h4>
                    <p>{jobApplicationDetails.bonus} months</p>
                    <h4>Annual Leaves</h4>
                    <p>{jobApplicationDetails.annualLeaves} days</p>
                    <h4>Benefits</h4>
                    <p>{jobApplicationDetails.benefits}</p>
                    <h4>Portal URL</h4>
                    <p><Link to={jobApplicationDetails.portalURL}>{jobApplicationDetails.portalURL}</Link></p>
                    <h4>Post ID</h4>
                    <p>{jobApplicationDetails.postId}</p>
                    <h4>Status</h4>
                    <p>{jobApplicationDetails.status}</p>
                    <h4>Application Date</h4>
                    <p>{jobApplicationDetails.applicationDate}</p>
                    <h4>Notes</h4>
                    <p>{jobApplicationDetails.notes}</p>
                    <Button variant="primary" href={`/job-application-details/${jobApplicationDetails._id}/edit`}>Edit</Button>
        </Tab>
        <Tab eventKey="interview" title="Interviews">
            Interview Details
        </Tab>
        <Tab eventKey="offers" title="Offer">
            Offer Details
        </Tab>
        </Tabs>
        </>
    );
}