import { useParams, useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import { getOneJobApplication, deleteOneJobApplication } from "../../utils/jobs-service";
import { getOneCompanyByName } from "../../utils/companies-service";
import { Button, Tab, Tabs } from 'react-bootstrap';
import EditedJobApplicationModal from "../../components/Modal/EditJobApplicationModal";
import InterviewDetails from "./InterviewDetails";
import OfferDetails from "./OfferDetails";
import DeleteJobApplicationModal from "../../components/Modal/DeleteJobApplicationModal";

export default function JobApplicationDetails() {
    const [ jobApplicationDetails, setJobApplicationDetails ] = useState({});
    const [ modalShow, setModalShow ] = useState(false);
    const [ companyDetails, setCompanyDetails ] = useState({});
    const [ activeTab, setActiveTab ] = useState("job-application");

    const { id } = useParams();

    const navigate = useNavigate();
    //? initialize location to get activeTab from state passed from Dashboard
    const location = useLocation();

    // ? render tab based on activeTab from state
    useEffect(() => {
        const tabFromState = location.state?.activeTab ?? "job-application";
        if (tabFromState) {
            setActiveTab(tabFromState);
                }
    }, [location]);

    useEffect (() => {
        async function fetchJobApplicationDetails() {
            try {
                const jobApplicationDetails = await getOneJobApplication(id);
                setJobApplicationDetails(jobApplicationDetails);
            } catch (error) {
                console.log(error);
            }
        }
        fetchJobApplicationDetails();
    }, [id]);

    useEffect(() => {
        async function fetchCompanyDetails() {
            try {
                const companyDetails = await getOneCompanyByName(jobApplicationDetails.companyName);
                setCompanyDetails(companyDetails);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanyDetails();
    }, [jobApplicationDetails]);

    const handleEditApplicationButtonClick = (event) => {
        event.preventDefault();
        setModalShow("edit");
    }

    const handleDeleteApplicationButtonClick = (event) => {
        event.preventDefault();
        setModalShow("delete");
    }
     //? Delete job application after confirmation and closing modal
    async function handleDeleteJobApplicationConfirmation() {
            await handleDeleteJobApplication();
            handleCloseModal();
            navigate("/dashboard");
        }

    async function handleDeleteJobApplication() {
        try {
            await deleteOneJobApplication(id);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCloseModal = () => {
        setModalShow(false);
    }

    // const disableInterviewTab = jobApplicationDetails.status === null ? true : false;
    // const disableOfferTab = jobApplicationDetails.interviewDate ? true : false;

    return (
        <div className="container-fluid justify-content-center">
            <EditedJobApplicationModal jobApplicationDetails={jobApplicationDetails} show={modalShow === "edit"} onHide={handleCloseModal}/>
            <DeleteJobApplicationModal jobApplicationDetails={jobApplicationDetails} show={modalShow === "delete"} onHide={handleCloseModal} onDelete={handleDeleteJobApplicationConfirmation}/>
                        <br/>
                        <h3>Job Application ID: {jobApplicationDetails._id} Details</h3>
                        <br/>
                        <h4>Company Name</h4>
                        <p>{companyDetails ? companyDetails.companyName : "Loading..."}</p>
                        <h4>Company Address</h4>
                        <p>{companyDetails ? companyDetails.companyAddress : "Loading..."}</p>
                        <h4>Position</h4>
                        <p>{jobApplicationDetails.position}</p>
                        <br/>
                        <h4>Click on a Tab below to see details.</h4>
                        <Tabs
                        activeKey={activeTab}
                        onSelect={(k) => setActiveTab(k)}
                        id="fill-tab-example"
                        className="mb-3"
                        fill
                        >
                        <Tab eventKey="job-application" title="Job Application">
                            <br/>
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
                            <Button variant="primary" style={{ width: "48%"}} onClick={handleEditApplicationButtonClick}>Edit</Button>
                            <Button variant="danger" style={{ marginLeft: "20px", width: "48%"}} onClick={handleDeleteApplicationButtonClick}>Delete</Button>
                </Tab>
                <Tab eventKey="interview" title="Interviews" >
                    <InterviewDetails
                    jobId={id}
                    handleCloseModal={handleCloseModal}/>
                </Tab>
                <Tab eventKey="offers" title="Offer">
                    <OfferDetails jobId={id}
                    handleCloseModal={handleCloseModal}/>
                </Tab>
                </Tabs>
                <Button variant="secondary" onClick={() => window.scrollTo(0,0)} style={{ marginTop: "20px"}}>Return to Top</Button>
        </div>
    )
}