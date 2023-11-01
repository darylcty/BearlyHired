import { Table, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getAllJobApplications, deleteOneJobApplication } from '../../utils/jobs-service';
import DeleteJobApplicationModal from "../../components/Modal/DeleteJobApplicationModal";
import { getAllInterviews } from '../../utils/interviews-service';
import { getUser } from '../../utils/users-service';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [ allJobApplications, setAllJobApplications ] = useState([]);
    const [ modalShow, setModalShow ] = useState(false);
    const [ selectedJobApplication, setSelectedJobApplication ] = useState(null);
    const [ allInterviewsByJob, setAllInterviewsByJob ] = useState({});

    const navigate = useNavigate();
    const handleCreateJobApplication = (event) => {
        event.preventDefault();
        navigate("/job-application");
    }

    //? display all jobs
    useEffect(() => {
        async function fetchAllJobsApplications() {
            const currentUser = getUser();
            try {
                const jobApplications = await getAllJobApplications(currentUser._id);
                setAllJobApplications(jobApplications);

                jobApplications.forEach(async (jobApplication) => {
                    const interviews = await getAllInterviews(jobApplication._id);
                    setAllInterviewsByJob(prevState => ({...prevState, [jobApplication._id]: interviews}));
                });
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobsApplications();
    }, []);


    //? Close modal without action
    function handleCloseModal() {
        setModalShow(false);
    }

    //? Delete job application after confirmation and closing modal
    async function handleDeleteJobApplicationConfirmation() {
        if (selectedJobApplication) {
            await handleDeleteJobApplication();
            handleCloseModal();
        }
    }
    //? Render Delete Confirmation Modal
    async function handleDeleteButtonClick(event) {
        event.preventDefault();
        const jobApplicationId = event.currentTarget.getAttribute("data-id");
        setSelectedJobApplication(jobApplicationId);
        setModalShow("delete");
    }

    async function handleDeleteJobApplication() {
        if (selectedJobApplication) {
            await deleteOneJobApplication(selectedJobApplication);
            const updatedJobApplications = allJobApplications.filter(jobApplications => jobApplications._id !== selectedJobApplication);
            setAllJobApplications(updatedJobApplications);
            setModalShow(false);
            setSelectedJobApplication(null);
        }
    }

    return (
        <>
            <DeleteJobApplicationModal
            show={modalShow == "delete"}
            onHide={handleCloseModal}
            onDelete={handleDeleteJobApplicationConfirmation}
            />
            <h1>Dashboard</h1>
            {allJobApplications.length === 0 ? (
            <p>Oops, looks like you have yet to track an application! Click <Link to="/job-application">here</Link> to start!</p>
            ) : (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Company Name</th>
                        <th>Position</th>
                        <th>Minimum Salary</th>
                        <th>Maximum Salary</th>
                        <th>Job Type</th>
                        <th>Status</th>
                        <th>Application Date</th>
                        <th>Interview Date</th>
                        <th>Offer</th>
                        <th>Quick Delete</th>
                    </tr>
                </thead>
                <tbody>
                {allJobApplications.map((jobApplication, idx) => {
                    const { companyName, position, salaryMin, salaryMax, jobType, applicationDate, status, offer } = jobApplication;
                    const interviewsForThisJob = allInterviewsByJob[jobApplication._id] || [];
                    return (
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td><Link to={`/job-application-details/${jobApplication._id}`} key={idx}>{companyName}</Link></td>
                            <td>{position}</td>
                            <td>${salaryMin}</td>
                            <td>${salaryMax}</td>
                            <td>{jobType}</td>
                            <td>{status}</td>
                            <td>{applicationDate}</td>
                            {!interviewsForThisJob.length ? (
                                <td><Link to={`/job-application-details/${jobApplication._id}/create-interview`}>No Interview Date - Create New Interview</Link></td>
                            ) : (
                                <td>
                                    {interviewsForThisJob.map(interview => (
                                        <div key={interview._id}>{interview.interviewTimeDate}</div>
                                    ))}
                                </td>
                            )}
                            <td>{offer}</td>
                            <td><button className="btn btn-danger" onClick={handleDeleteButtonClick} data-id={jobApplication._id}>Delete</button></td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
            )}
            <Button variant="success" onClick={handleCreateJobApplication} style={{ display: 'block', margin: '0 auto', marginTop: "50px", marginBottom: "50px"}}>Create A New Job Application</Button>
            </>
    );
}