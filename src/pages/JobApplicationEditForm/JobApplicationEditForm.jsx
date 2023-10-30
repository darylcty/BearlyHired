import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { updateJobApplication } from "../../utils/jobs-service";
import { useParams, useNavigate } from "react-router-dom";
import { getAllCompanies } from "../../utils/companies-service";

export default function JobApplicationEditForm({ jobApplicationDetails }) {
    //? originalJobApplication is the job application data before editing
    const [ originalJobApplication, setOriginalJobApplication ] = useState(jobApplicationDetails);
    console.log(originalJobApplication);
    const { id } = useParams();
    const navigate = useNavigate();
    const handleBackButtonClick = (event) => {
        event.preventDefault();
        navigate(`/job-application-details/${id}`);
    }

    const [ allCompanies, setAllCompanies ] = useState([]);
    async function fetchCompanies() {
        const companies = await getAllCompanies();
        setAllCompanies(companies);
    }
    useEffect(() => {
        fetchCompanies();
        setOriginalJobApplication(jobApplicationDetails);
    }, [jobApplicationDetails]);

    const handleChange = (event) => {
        setOriginalJobApplication((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
        }));
    };


    const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const editedJobApplication = await updateJobApplication(originalJobApplication);
			setOriginalJobApplication(editedJobApplication);
			handleBackButtonClick();
		} catch (error) {
			setOriginalJobApplication((prevData) => ({...prevData, error: "Edit Failed - Try again" }));
		}
    };

    return (
        <div>
            <h1>Edit Job Application</h1>
            <Container className="job-application-form">
            <Row>
                <Col md={6}>
                <div className="form-container">
                    <Form autoComplete="on" onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Company Name *</Form.Label>
                        <Form.Select
                        type="text"
                        name="companyName"
                        value={originalJobApplication.companyName}
                        onChange={handleChange}
                        required
                        >
                            <option>Select Company Name *</option>
                            {allCompanies.map((companyData => (
                                <option key={companyData._id} value={companyData.companyName}>{companyData.companyName}</option>
                                )))}
                        </Form.Select>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Position/Title *</Form.Label>
                        <Form.Control
                        type="text"
                        name="position"
                        value={originalJobApplication.position || ""}
                        onChange={handleChange}
                        required
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Job Type *</Form.Label>
                        <Form.Select
                        type="select"
                        name="jobType"
                        value={originalJobApplication.jobType || ""}
                        onChange={handleChange}
                        required
                        >
                            <option>Select Job Type</option>
                            <option value="Full Time">Full Time</option>
                            <option value="Part Time">Part Time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                            <option value="Freelance">Freelance</option>
                            <option value="Temporary">Temporary</option>
                        </Form.Select>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Job Description *</Form.Label>
                        <Form.Control
                        type="text"
                        name="jobDescription"
                        rows={5}
                        value={originalJobApplication.jobDescription || ""}
                        onChange={handleChange}
                        required
                        placeholder="Copy and paste job description here."
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Work Arrangement</Form.Label>
                        <br/>
                        <Form.Check
                        type="radio"
                        name="workArrangement"
                        label="Remote"
                        value="Remote"
                        onChange={handleChange}
                        inline
                        />
                        <Form.Check
                        type="radio"
                        name="workArrangement"
                        label="Onsite"
                        value="Onsite"
                        onChange={handleChange}
                        inline
                        />
                        <Form.Check
                        type="radio"
                        name="workArrangement"
                        label="Hybrid"
                        value="Hybrid"
                        onChange={handleChange}
                        inline
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Salary Min</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>$</InputGroup.Text>
                                <Form.Control
                                aria-label="Amount (to the nearest dollar)"
                                type="number"
                                name="salaryMin"
                                min={0}
                                step={500}
                                value={originalJobApplication.salaryMin || ""}
                                onChange={handleChange}
                                // onBlur={handleSalaryChange}
                                />
                            </InputGroup>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Salary Max</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control
                                aria-label="Amount (to the nearest dollar)"
                                type="number"
                                name="salaryMax"
                                step={500}
                                value={originalJobApplication.salaryMax || ""}
                                onChange={handleChange}
                                // onBlur={handleSalaryChange}
                                />
                        </InputGroup>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Annual Wage Supplement (AWS)</Form.Label>
                        <br/>
                        <Form.Check
                        type="radio"
                        name="AWS"
                        label="Yes"
                        value="true"
                        checked={originalJobApplication.AWS === true}
                        onChange={handleChange}
                        inline
                        />
                        <Form.Check
                        type="radio"
                        name="AWS"
                        label="No"
                        value="false"
                        checked={originalJobApplication.AWS === false}
                        onChange={handleChange}
                        inline
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Bonus</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Up to</InputGroup.Text>
                            <Form.Control
                                aria-label="in months"
                                type="number"
                                name="bonus"
                                min={0}
                                step={1}
                                value={originalJobApplication.bonus || ""}
                                onChange={handleChange} />
                                <InputGroup.Text>Months</InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Annual Leaves</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Up to</InputGroup.Text>
                            <Form.Control
                                aria-label="in days"
                                type="number"
                                name="annualLeaves"
                                min={0}
                                step={1}
                                value={originalJobApplication.annualLeaves || ""}
                                onChange={handleChange} />
                                <InputGroup.Text>Days</InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Benefits</Form.Label>
                        <Form.Control
                        type="text"
                        name="benefits"
                        value={originalJobApplication.benefits || ""}
                        onChange={handleChange}
                        placeholder="e.g. Medical, Dental, Vision, etc."
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Portal URL</Form.Label>
                        <Form.Control
                        type="text"
                        name="portalURL"
                        value={originalJobApplication.portalURL || ""}
                        onChange={handleChange}
                        placeholder="e.g. LinkedIn, Indeed, etc."
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Post ID</Form.Label>
                        <Form.Control
                        type="text"
                        name="postID"
                        value={originalJobApplication.postID || ""}
                        onChange={handleChange}
                        placeholder="Enter ID of job listing if applicable."
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Application Status</Form.Label>
                        <br/>
                        <Form.Check
                        type="radio"
                        label="Not Applied"
                        name="status"
                        value="Not Applied"
                        checked={originalJobApplication.status === "Not Applied"}
                        onChange={handleChange}
                        inline
                        />
                        <Form.Check
                        type="radio"
                        label="Applied"
                        name="status"
                        value="Applied"
                        checked={originalJobApplication.status === "Applied"}
                        onChange={handleChange}
                        inline
                        />
                        <Form.Check
                        type="radio"
                        label="Interviewed"
                        name="status"
                        value="Interviewed"
                        checked={originalJobApplication.status === "Interviewed"}
                        onChange={handleChange}
                        inline
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Application Date</Form.Label>
                        <Form.Control
                        type="date"
                        name="applicationDate"
                        value={originalJobApplication.applicationDate || ""}
                        onChange={handleChange}
                        disabled={originalJobApplication.status === "Not Applied"}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Interview Date</Form.Label>
                        <Form.Control
                        type="date"
                        name="interviewDate"
                        value={originalJobApplication.interviewDate || ""}
                        onChange={handleChange}
                        disabled={originalJobApplication.status !== "Interviewed"}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                        type="text"
                        name="notes"
                        value={originalJobApplication.notes || ""}
                        onChange={handleChange}
                        placeholder="Enter any notes here."
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Offer Status</Form.Label>
                        <br/>
                            <Form.Check
                            type="radio"
                            label="Offered"
                            name="offered"
                            value="Offered"
                            checked={originalJobApplication.offered === "Offered"}
                            onChange={handleChange}
                            inline
                            />
                            <Form.Check
                            type="radio"
                            label="Rejected"
                            name="offered"
                            value="Rejected"
                            checked={originalJobApplication.offered === "Rejected"}
                            onChange={handleChange}
                            inline
                            />
                            <Form.Check
                            type="radio"
                            label="Accepted"
                            name="offered"
                            value="Accepted"
                            checked={originalJobApplication.offered === "Accepted"}
                            onChange={handleChange}
                            inline
                            />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Offered Salary</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>$</InputGroup.Text>
                                <Form.Control
                                aria-label="Amount (to the nearest dollar)"
                                type="number"
                                name="offerSalary"
                                min={0}
                                step={500}
                                value={originalJobApplication.offerSalary || ""}
                                onChange={handleChange}
                                disabled={!originalJobApplication.offered} />
                            </InputGroup>
                    </Form.Group>
                    <br></br>
                    <Button type="submit" variant="warning" >
                        Save Changes
                    </Button>
                    <Button type="submit" variant="secondary" onClick={handleBackButtonClick} style={{ marginLeft: "20px"}}>
                        Go Back Without Making Changes
                    </Button>
                    </Form>
                </div>
                </Col>
            </Row>
            </Container>
        );
        </div>
    )
}