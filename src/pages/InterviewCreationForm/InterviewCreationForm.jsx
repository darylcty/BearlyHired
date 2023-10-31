import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { getAllCompanies } from "../../utils/companies-service";
import { getOneJobApplication } from "../../utils/jobs-service";
import { createInterview } from "../../utils/interviews-service";
import CreateInterviewModal from "../../components/Modal/CreateInterviewModal";

export default function InterviewCreationForm() {
    const [ interviewData, setInterviewData ] = useState({
        jobId: "",
        companyName: "",
        companyAddress: "",
        position: "",
        interviewType: "",
        interviewTimeDate: "",
        interviewerName: "",
        interviewerEmail: "",
        interviewerContactNumber: "",
        interviewNotes: "",
    });

    const [ modalShow, setModalShow ] = useState(false);
    const [ error, setError ] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();

    const handleNavigateToJobApplicationDetails = (event) => {
        event.preventDefault();
        navigate(`/job-application-details/${id}`);
    }
    //? Fetch all companies to populate the dropdown list
    const [ allCompanies, setAllCompanies ] = useState([]);
    const fetchData = useCallback(async () => {
        const companies = await getAllCompanies();
        setAllCompanies(companies);
        //? fetch job position and company name from jobId
        const jobPosition = await getOneJobApplication(id);
        if (jobPosition) {
            const selectedCompany = companies.find((company) => company.companyName === jobPosition.companyName);
            if (selectedCompany) {
                setInterviewData((prevState) => ({
                    ...prevState,
                    companyName: selectedCompany.companyName,
                    companyAddress: selectedCompany.companyAddress,
                    position: jobPosition.position,
                }));
            }
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    }

    const handleChange = (event) => {
        let updatedValue = { [event.target.name]: event.target.value };
        let errorValue = "";
        if (event.target.name === "companyName") {
            const selectedCompany = allCompanies.find((company) => company.companyName === event.target.value);
            if (selectedCompany) {
                updatedValue = {
                    ...updatedValue,
                    companyAddress: selectedCompany.companyAddress,
                    interviewerEmail: selectedCompany.companyEmail,
                };
            }
        }
        if (event.target.name === "interviewerEmail") {
            if (!isValidEmail(event.target.value)) {
                errorValue = "Email is invalid";
            }
        }
        setInterviewData((prevState) => ({
            ...prevState,
            ...updatedValue,
            error: errorValue,
        }));
        if (errorValue) {
            setError(errorValue);
        } else {
            setError("");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const interviewDataWithJobId = { ...interviewData}
        if (id) {
            console.log("id", id);
            interviewDataWithJobId.jobId = id;
            console.log("interviewDataWithJobId", interviewDataWithJobId);
        }
        try {
            const interview = await createInterview(interviewDataWithJobId);
            setInterviewData(interview);
            setModalShow(true);
        } catch (error) {
            setInterviewData((prevState) => ({...prevState, error: "Creation Failed - Try again" }));
        }
    }

    const disable = (!interviewData.interviewType || !interviewData.interviewTimeDate)

    const clearForm = () => {
        setInterviewData({
            companyName: interviewData.companyName,
            companyAddress: interviewData.companyAddress,
            position: interviewData.position,
            interviewType: "",
            interviewTimeDate: "",
            interviewerName: "",
            interviewerEmail: "",
            interviewerContactNumber: "",
            interviewNotes: "",
        });
    }

    return (
        <div>
        <CreateInterviewModal interviewData={interviewData} show={modalShow} onHide={() => {setModalShow(false)}} clearForm={clearForm}/>
        <h1>Interview Creation Form</h1>
        <Container className="interview-form">
            <Row>
                <Col md={6}>
                <div className="form-container">
                    <Form autoComplete="on" onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control
                        readOnly
                        style={{ backgroundColor: "#f5f5f5", borderColor: "#ccc" }}
                        type="text"
                        name="companyName"
                        text={interviewData.companyName}
                        value={interviewData.companyName}
                        >
                        </Form.Control>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Company Address</Form.Label>
                        <Form.Control
                        readOnly
                        style={{ backgroundColor: "#f5f5f5", borderColor: "#ccc" }}
                        type="text"
                        name="companyAddress"
                        value={interviewData.companyAddress}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Position</Form.Label>
                        <Form.Control
                        readOnly
                        style={{ backgroundColor: "#f5f5f5", borderColor: "#ccc" }}
                        type="select"
                        name="jobType"
                        value={interviewData.position}
                        >
                        </Form.Control>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Interview Type *</Form.Label>
                        <Form.Control
                        type="text"
                        name="interviewType"
                        value={interviewData.interviewType}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Phone, Video, Face-to-Face, Technical, Group, Panel etc."
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Interview Date *</Form.Label>
                        <Form.Control
                        type="date"
                        name="interviewTimeDate"
                        value={interviewData.interviewTimeDate}
                        onChange={handleChange}
                        required
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Interviewer Name</Form.Label>
                        <Form.Control
                        type="text"
                        name="interviewerName"
                        value={interviewData.interviewerName}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Interviewer Email</Form.Label>
                        <Form.Control
                        type="text"
                        name="interviewerEmail"
                        value={interviewData.interviewerEmail}
                        onChange={handleChange}
                        />
                        {error && <p className="error-message" style={{ color: "red"}}>{error}</p>}
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Interviewer Contact Number</Form.Label>
                        <Form.Control
                        type="text"
                        name="interviewerContactNumber"
                        value={interviewData.interviewerContactNumber}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Interview Notes</Form.Label>
                        <Form.Control
                        type="text"
                        name="interviewNotes"
                        value={interviewData.interviewNotes}
                        onChange={handleChange}
                        placeholder="Enter any notes here."
                        />
                    </Form.Group>
                    <br></br>
                    <Button type="submit" disabled={disable}>
                        Create Interview
                    </Button>
                    <Button variant="warning" style={{ marginLeft: "25px" }} onClick={clearForm} >
                        Clear Form
                    </Button>
                    <Button variant="secondary" style={{ marginLeft: "25px" }} onClick={handleNavigateToJobApplicationDetails}>
                        Back to Job Application Details
                    </Button>
                    </Form>
                </div>
                </Col>
            </Row>
            </Container>
        </div>
    );
}