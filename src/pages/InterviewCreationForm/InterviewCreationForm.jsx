import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { getAllCompanies } from "../../utils/companies-service";
import { getOneJobApplication } from "../../utils/jobs-service";
export default function InterviewCreationForm() {
    const [ interviewData, setInterviewData ] = useState({
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

    const { id } = useParams();

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

    const handleChange = (event) => {
        setInterviewData((prevState) => ({
            ...prevState, [event.target.name]: event.target.value }));
            if (event.target.name === "companyName") {
                const selectedCompany = allCompanies.find((company) => company.companyName === event.target.value);
                if (selectedCompany) {
                    setInterviewData((prevState) => ({
                    ...prevState, companyAddress: selectedCompany.companyAddress }));
            }
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Interview Data: ", interviewData);
    }

    const disable = (!interviewData.interviewType || !interviewData.interviewTimeDate)

    const clearForm = () => {
        setInterviewData({
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
    }

    return (
        <div>
        <h1>Interview Creation Form</h1>
        <Container className="interview-form">
            <Row>
                <Col md={6}>
                <div className="form-container">
                    <Form autoComplete="on" onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Company Name *</Form.Label>
                        <Form.Control
                        readOnly
                        type="text"
                        name="companyName"
                        value={interviewData.companyName}
                        >
                        </Form.Control>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Company Address *</Form.Label>
                        <Form.Control
                        readOnly
                        type="text"
                        name="companyAddress"
                        value={interviewData.companyAddress}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Position *</Form.Label>
                        <Form.Control
                        readOnly
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
                        <Form.Label>Interview Date</Form.Label>
                        <Form.Control
                        type="date"
                        name="interviewDate"
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
                    </Form>
                </div>
                </Col>
            </Row>
            </Container>
        </div>
    );
                            }