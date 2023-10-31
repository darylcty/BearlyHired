import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { getAllInterviews } from "../../utils/interviews-service";
import { useNavigate } from "react-router-dom";

export default function InterviewDetails({ jobId }) {
    const [ allInterviews, setAllInterviews ] = useState([]);

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

    const navigate = useNavigate();

    const handleCreateInterview = (event) => {
        event.preventDefault();
        navigate(`/job-application-details/${jobId}/create-interview`);
    }

    return (
        <div style={{ marginTop: "20px", marginBottom: "20px"}}>
            <h1>Interview Details</h1>
            <Button variant="success" onClick={handleCreateInterview}>Create an Interview</Button>
            <br/>
            {/* {allInterviews.length === 0 ? (
                <p> Yikes, looks like you don't have any interviews to track for this job application. Click <Link to={`job-application-details/${id}/create-interview`}>here</Link> to create one!</p>
            ) : ( */}
            <Card>
                {allInterviews.map((interview,idx) => {
                    return (
                        <Card.Header key={idx}>
                            <Card.Title>Interview {idx+1}</Card.Title>
                            <Card.Text>
                                <p>Interview Type: {interview.interviewType}</p>
                                <p>Interview Date: {interview.interviewTimeDate}</p>
                                <p>Interviewer Name: {interview.interviewerName}</p>
                                <p>Interviewer Email: {interview.interviewerEmail}</p>
                                <p>Interviewer Contact Number: {interview.interviewerContactNumber}</p>
                                <p>Interview Notes: {interview.interviewNotes}</p>
                            </Card.Text>
                            <Button variant="primary" style={{ marginRight: "20px"}}>Edit Interview</Button>
                            <Button variant="danger">Delete Interview</Button>
                        </Card.Header>
                    )
                })}
            </Card>
            {/* )} */}
        </div>
    );
}