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

    async function handleDeleteJobApplication() {
        if (selectedJobApplication) {
            await deleteOneJobApplication(selectedJobApplication);
            const updatedJobApplications = allJobApplications.filter(jobApplications => jobApplications._id !== selectedJobApplication);
            setAllJobApplications(updatedJobApplications);
            setModalShow(false);
            setSelectedJobApplication(null);
        }
    }

    function renderInterviewsCell(applicationDate, interviewsForThisJob, jobId) {
        if (!applicationDate) {
            return <td><Link to={`/job-application-details/${jobId}`}>No Application Date - Apply First!</Link></td>
        }
        if (!interviewsForThisJob.length) {
            return <td><Link to={`/job-application-details/${jobId}/create-interview`}>No Interview Date - Create New Interview</Link></td>
        }
        return (
            <td>
                {interviewsForThisJob.map(interview => (
                    <div key={interview._id} onClick={() => navigate(`/job-application-details/${jobId}/`, { state: { activeTab: 'interview' } })}>
                    <Link>{interview.interviewTimeDate}</Link>
                    </div>
                ))}

            </td>
        );
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
            <p>Oops, looks like you have yet to track an application. Create your first job application to start tracking!</p>
            ) : (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Company Name</th>
                        <th>Position</th>
                        <th>Minimum Monthly Salary</th>
                        <th>Maximum Monthly Salary</th>
                        <th>Job Type</th>
                        <th>Status</th>
                        <th>Application Date</th>
                        <th>Interview Date</th>
                        <th>Offer</th>
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
                            { renderInterviewsCell(applicationDate, interviewsForThisJob, jobApplication._id) }
                            <td>{offer}</td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
            )}
            <Button variant="outline-success" onClick={handleCreateJobApplication} style={{ display: 'block', margin: '0 auto', marginTop: "50px", marginBottom: "50px", width: "100%"}}>Create A New Job Application</Button>
            </>
    );
}