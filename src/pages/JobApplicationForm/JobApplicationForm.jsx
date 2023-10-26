import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { createJob } from "../../utils/jobs-service";
export default function JobApplicationForm() {
    const [ jobApplicationData, setJobApplicationData ] = useState({
        companyName: "",
        position: "",
        jobType: "",
        jobDescription: "",
        workArrangement: "",
        salaryMin: 0,
        salaryMax: 10000,
        AWS: false,
        bonus: 0,
        annualLeaves: 0,
        benefits: "",
        portalURL: "",
        postID: "",
        applicationDate: new Date(),
        status: "Not Applied",
        interviewDate: new Date(),
        notes: "",
        offered: false,
        offerSalary: 0,
    });

	// const navigate = useNavigate();

    const handleChange = (event) => {
        setJobApplicationData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
        }));
    };

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const jobApplication = await createJob(jobApplicationData);
			setJobApplicationData(jobApplication);
			// navigate("/job-application");
            // setModalShow(true);
		} catch (error) {
			setJobApplicationData((prevData) => ({...prevData, error: "Creation Failed - Try again" }));
		}
        //? Reset from to default after submission
        setJobApplicationData({
            companyName: "",
            position: "",
            jobType: "",
            jobDescription: "",
            workArrangement: "",
            salaryMin: 0,
            salaryMax: 100000,
            AWS: false,
            bonus: 0,
            annualLeaves: 0,
            benefits: "",
            portalURL: "",
            postID: "",
            applicationDate: new Date(),
            status: "Not Applied",
            interviewDate: new Date(),
            notes: "",
            offered: false,
            offerSalary: 0,})
    };

    const disable = (!jobApplicationData.companyName ||
        !jobApplicationData.position ||
        !jobApplicationData.jobType ||
        !jobApplicationData.jobDescription);

    // let [ modalShow, setModalShow ] = useState(false);

    // function closeModal() {
    //     setModalShow(false);
    // }

    return (
        <>
            <h1>Job Application Form</h1>
            {/* <CreateCompanyModal show={modalShow} onHide={closeModal}  /> */}
            <Container className="job-application-form">
            <Row>
                <Col md={6}>
                <div className="form-container">
                    <Form autoComplete="off" onSubmit={handleSubmit}>
                    <Form.Group>
                        {/* //! TODO: add company selection from created companies list */}
                        <Form.Label>Company Name *</Form.Label>
                        <Form.Control
                        type="text"
                        name="companyName"
                        value={jobApplicationData.companyName}
                        onChange={handleChange}
                        required
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Position/Title *</Form.Label>
                        <Form.Control
                        type="text"
                        name="position"
                        value={jobApplicationData.position}
                        onChange={handleChange}
                        required
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        {/* //! TO DO: add a mouseover info button to explain the different job types */}
                        <Form.Label>Job Type *</Form.Label>
                        <Form.Select
                        type="select"
                        name="jobType"
                        value={jobApplicationData.jobType}
                        onChange={handleChange}
                        required
                        >
                            <option>Select Job Type *</option>
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
                        value={jobApplicationData.jobDescription}
                        onChange={handleChange}
                        required
                        placeholder="Copy and paste job description here."
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        {/* //! TODO: add mouse over info button to explain the different work arrangements */}
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
                                value={jobApplicationData.salaryMin}
                                onChange={handleChange} />
                                <InputGroup.Text>.00</InputGroup.Text>
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
                                min={0}
                                step={500}
                                value={jobApplicationData.salaryMax}
                                onChange={handleChange} />
                            <InputGroup.Text>.00</InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>AWS</Form.Label>
                        <br/>
                        <Form.Check
                        type="radio"
                        name="AWS"
                        label="Yes"
                        value={true}
                        checked={jobApplicationData.AWS === true}
                        onChange={handleChange}
                        inline
                        />
                        <Form.Check
                        type="radio"
                        name="AWS"
                        label="No"
                        value={false}
                        checked={jobApplicationData.AWS === false}
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
                                value={jobApplicationData.bonus}
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
                                value={jobApplicationData.annualLeaves}
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
                        value={jobApplicationData.benefits}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Portal URL</Form.Label>
                        <Form.Control
                        type="text"
                        name="portalURL"
                        value={jobApplicationData.portalURL}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Post ID</Form.Label>
                        <Form.Control
                        type="text"
                        name="postID"
                        value={jobApplicationData.postID}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Application Date</Form.Label>
                        <Form.Control
                        type="date"
                        name="applicationDate"
                        value={jobApplicationData.applicationDate}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Status</Form.Label>
                        <br/>
                        <Form.Check
                        type="radio"
                        label="Not Applied"
                        name="status"
                        value="Not Applied"
                        checked={jobApplicationData.status === "Not Applied"}
                        onChange={handleChange}
                        inline
                        />
                        <Form.Check
                        type="radio"
                        label="Applied"
                        name="status"
                        value="Applied"
                        checked={jobApplicationData.status === "Applied"}
                        onChange={handleChange}
                        inline
                        />
                        <Form.Check
                        type="radio"
                        label="Interviewed"
                        name="status"
                        value="Interviewed"
                        checked={jobApplicationData.status === "Interviewed"}
                        onChange={handleChange}
                        inline
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Interview Date</Form.Label>
                        <Form.Control
                        type="date"
                        name="interviewDate"
                        value={jobApplicationData.interviewDate}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                        type="text"
                        name="notes"
                        value={jobApplicationData.notes}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Offered</Form.Label>
                        <br/>
                            <Form.Check
                            type="radio"
                            label="Offered"
                            name="status"
                            value="Offered"
                            checked={jobApplicationData.status === "Offered"}
                            onChange={handleChange}
                            inline
                            />
                            <Form.Check
                            type="radio"
                            label="Rejected"
                            name="status"
                            value="Rejected"
                            checked={jobApplicationData.status === "Rejected"}
                            onChange={handleChange}
                            inline
                            />
                            <Form.Check
                            type="radio"
                            label="Accepted"
                            name="status"
                            value="Accepted"
                            checked={jobApplicationData.status === "Accepted"}
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
                                value={jobApplicationData.offerSalary}
                                onChange={handleChange} />
                                <InputGroup.Text>.00</InputGroup.Text>
                            </InputGroup>
                    </Form.Group>
                    <br></br>
                    <Button type="submit" disabled={disable}>
                        Create Job Application
                    </Button>
                    </Form>
                </div>
                </Col>
            </Row>
            </Container>
    </>
        );
}