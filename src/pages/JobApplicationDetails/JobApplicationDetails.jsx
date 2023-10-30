import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { getOneJobApplication } from "../../utils/jobs-service";
import { Button, Tab, Tabs } from 'react-bootstrap';
import EditedJobApplicationModal from "../../components/Modal/EditJobApplicationModal";
export default function JobApplicationDetails() {
    const [ jobApplicationDetails, setJobApplicationDetails ] = useState({});
    const [ modalShow, setModalShow ] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect (() => {
        async function fetchJobApplicationDetails() {
            try {
                const jobApplicationDetails = await getOneJobApplication(id);
                console.log("passed details: ",jobApplicationDetails);
                setJobApplicationDetails(jobApplicationDetails);
            } catch (error) {
                console.log(error);
            }
        }
        fetchJobApplicationDetails();
    }, [id]);

    const handleEditButtonClick = (event) => {
        event.preventDefault();
        setModalShow(true);
    }

    const handleCloseModal = () => {
        setModalShow(false);
    }

    const handleBackToDashboard = (event) => {
        event.preventDefault();
        navigate("/dashboard");
    }

    return (
        <div className="container-fluid justify-content-center">
            <EditedJobApplicationModal jobApplicationDetails={jobApplicationDetails} show={modalShow} onHide={handleCloseModal}/>
                        <h1>Job Application Details</h1>
                        <br/>
                        <h4>Click on a Tab below to see details.</h4>
                        <Tabs
                        defaultActiveKey="profile"
                        id="fill-tab-example"
                        className="mb-3"
                        fill
                        >
                        <Tab eventKey="job-application" title="Job Application">
                        <h1>Post Details</h1>
                            <br/>
                            <h4>Company Name </h4>
                            <p>{jobApplicationDetails.companyName}</p>
                            <br/>
                            <h4>Position</h4>
                            <p>{jobApplicationDetails.position}</p>
                            <h4>Job Type</h4>
                            <p>{jobApplicationDetails.jobType}</p>
                            <br/>
                            <h4>Job Description</h4>
                            <p>{jobApplicationDetails.jobDescription}</p>
                            <br/>
                            <h4>Work Arrangement</h4>
                            <p>{jobApplicationDetails.workArrangement}</p>
                            <br/>
                            <h4>Salary Min</h4>
                            <p>${jobApplicationDetails.salaryMin}</p>
                            <br/>
                            <h4>Salary Max</h4>
                            <p>${jobApplicationDetails.salaryMax}</p>
                            <br/>
                            <h4>Annual Wage Supplement(AWS) </h4>
                            <p>{jobApplicationDetails.AWS}</p>
                            <br/>
                            <h4>Bonus</h4>
                            <p>{jobApplicationDetails.bonus} months</p>
                            <br/>
                            <h4>Annual Leaves</h4>
                            <p>{jobApplicationDetails.annualLeaves} days</p>
                            <br/>
                            <h4>Benefits</h4>
                            <p>{jobApplicationDetails.benefits}</p>
                            <br/>
                            <h4>Portal URL</h4>
                            <p>{jobApplicationDetails.portalURL}</p>
                            <br/>
                            <h4>Post ID</h4>
                            <p>{jobApplicationDetails.postId}</p>
                            <br/>
                            <h4>Status</h4>
                            <p>{jobApplicationDetails.status}</p>
                            <br/>
                            <h4>Application Date</h4>
                            <p>{jobApplicationDetails.applicationDate}</p>
                            <br/>
                            <h4>Notes</h4>
                            <p>{jobApplicationDetails.notes}</p>
                            <br/>
                            <Button variant="primary" onClick={handleEditButtonClick}>Edit</Button>
                </Tab>
                <Tab eventKey="interview" title="Interviews">
                    Interview Details
                </Tab>
                <Tab eventKey="offers" title="Offer">
                    Offer Details
                </Tab>
                </Tabs>
                <hr/>
                <Button variant="secondary" onClick={handleBackToDashboard} style={{ marginTop: "20px"}}>Back to Dashboard</Button>
        </div>
    )
}