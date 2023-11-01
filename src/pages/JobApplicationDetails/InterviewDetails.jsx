import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { deleteOneInterview, getAllInterviews } from "../../utils/interviews-service";
import { useNavigate } from "react-router-dom";
import DeleteInterviewModal from "../../components/Modal/DeleteInterviewModal";
import EditInterviewModal from "../../components/Modal/EditInterviewModal";

export default function InterviewDetails({ jobId })
    {
    const [ allInterviews, setAllInterviews ] = useState([]);
    const [ showModal, setShowModal ] = useState(false);
    const [ selectedInterview, setSelectedInterview ] = useState({});

    const navigate = useNavigate();
    useEffect(() => {
        async function fetchAllInterviews() {
            try {
                const interviews = await getAllInterviews(jobId);
                setAllInterviews(interviews);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllInterviews();
    }, [jobId]);

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleCreateInterview = (event) => {
        event.preventDefault();
        navigate(`/job-application-details/${jobId}/create-interview`);
    }

    const handleDeleteInterviewButtonClick = (interviewId) => {
        setSelectedInterview(interviewId);
        setShowModal("delete-interview");
    }

    async function handleDeleteInterview(selectedInterview) {
        if (selectedInterview) {
            await deleteOneInterview(selectedInterview);
            const updatedInterviews = allInterviews.filter(interviews => interviews._id !== selectedInterview);
            setAllInterviews(updatedInterviews);
            setShowModal(false);
            setSelectedInterview(null);
        }
    }

    async function handleDeleteInterviewConfirmation() {
        if (selectedInterview) {
            await handleDeleteInterview(selectedInterview);
            handleCloseModal();
            window.location.reload();
        }
    }

    const handleEditInterviewButtonClick = (interviewId) => {
        const selectedInterviewData = allInterviews.find(interview => interview._id === interviewId);
        setSelectedInterview(selectedInterviewData);
        setShowModal("edit-interview");
    }

    return (
        <div style={{ marginTop: "20px", marginBottom: "20px"}}>
            <DeleteInterviewModal show={showModal === "delete-interview"} onHide={handleCloseModal} onDelete={handleDeleteInterviewConfirmation}/>
            <EditInterviewModal show={showModal === "edit-interview"} onHide={handleCloseModal} interviewId={selectedInterview._id} allInterviews={allInterviews} setAllInterviews={setAllInterviews} originalData={selectedInterview}/>
            <h1>Interview Details</h1>
            <Button variant="success" onClick={handleCreateInterview} style={{ marginBottom: "30px"}}>Create an Interview</Button>
            <br/>
            <Card>
                {allInterviews.map((interview,idx) => {
                    return (
                        <Card.Header key={idx}>
                            <Card.Title>Interview ID: {interview._id}</Card.Title>
                            <Card.Text>
                                <p>Interview Type: {interview.interviewType}</p>
                                <p>Interview Date: {interview.interviewDate}</p>
                                <p>Interviewer Name: {interview.interviewerName}</p>
                                <p>Interviewer Email: {interview.interviewerEmail}</p>
                                <p>Interviewer Contact Number: {interview.interviewerContactNumber}</p>
                                <p>Interview Notes: {interview.interviewNotes}</p>
                            </Card.Text>
                            <Button variant="primary" onClick={() => handleEditInterviewButtonClick(interview._id)} style={{ marginRight: "20px"}}>Edit Interview</Button>
                            <Button variant="danger" onClick={() => handleDeleteInterviewButtonClick(interview._id)}>Delete Interview</Button>
                        </Card.Header>
                    )
                })}
            </Card>
        </div>
    );
}