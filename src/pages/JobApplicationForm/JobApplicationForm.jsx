import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { createJob } from "../../utils/jobs-service";
import { getAllCompanies } from "../../utils/companies-api";
import SalaryAdjustmentModal from "../../components/Modal/SalaryAdjustmentModal";
import CreateJobModal from "../../components/Modal/CreateJobModal";


export default function JobApplicationForm() {
    //? setup default date using date-fns
    const [ jobApplicationData, setJobApplicationData ] = useState({
        companyName: "",
        position: "",
        jobType: "",
        jobDescription: "",
        workArrangement: "",
        salaryMin: 1000,
        salaryMax: 10000,
        AWS: true,
        bonus: 0,
        annualLeaves: 14,
        benefits: "",
        portalURL: "",
        postID: "",
        status: "Not Applied",
        applicationDate: "",
        interviewDate: "",
        notes: "",
        offered: null,
        offerSalary: 0,
    });

    //? setup modal
    const [ showSalaryModal, setShowSalaryModal ] = useState(false);
    const [ modalMessage, setModalMessage ] = useState("");
    const [ showConfirmationModal, setShowConfirmationModal ] = useState(false);

    //? Fetch all companies to populate the dropdown list
    const [ allCompanies, setAllCompanies ] = useState([]);
    async function fetchCompanies() {
        const companies = await getAllCompanies();
        setAllCompanies(companies);
    }
    useEffect(() => {
        fetchCompanies();
    }, []);

    //? handle generic form changes
    const handleChange = (event) => {
        setJobApplicationData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
        }));
    };

    //? handle AWS changes as radio inputs always return string
    const handleAWSChange = (event) => {
        const AWSValue = event.target.value === "true";
        setJobApplicationData((prevData) => ({
            ...prevData,
            AWS: AWSValue,
        }));
    };

    //? handle salaryMin and salaryMax changes
    const handleSalaryChange = (event) => {
        console.log("handleSalaryChange")
        const { name, value } = event.target;
        const parsedSalary= parseInt(value);

        setJobApplicationData(prevData => {
            //? if salaryMin and parsedSalary > current salaryMax, set the salaryMax = parsedSalary
            if (name === "salaryMin" && parsedSalary > prevData.salaryMax) {
                setModalMessage("SalaryMin cannot be greater than SalaryMax");
                setShowSalaryModal(true);
                return { ...prevData, salaryMin: parsedSalary, salaryMax: parsedSalary }

            //? if salaryMax and parsedSalary < current salaryMin, set the salaryMin = parsedSalary
            } else if (name === "salaryMax" && parsedSalary < prevData.salaryMin) {
                setModalMessage("SalaryMax cannot be less than SalaryMin");
                setShowSalaryModal(true);
                return { ...prevData, salaryMax: parsedSalary, salaryMin: parsedSalary }

            //? if salaryMax and parsedSalary > current salaryMin, set the salaryMax = parsedSalary
            } else {
                return { ...prevData, [name]: parsedSalary }
            }
        });
    };

    function clearForm() {
        setJobApplicationData({
        companyName: "",
        position: "",
        jobType: "",
        jobDescription: "",
        workArrangement: "",
        salaryMin: 1000,
        salaryMax: 10000,
        AWS: true,
        bonus: 0,
        annualLeaves: 14,
        benefits: "",
        portalURL: "",
        postID: "",
        status: "Not Applied",
        applicationDate: "",
        interviewDate: "",
        notes: "",
        offered: null,
        offerSalary: 0,})
    }
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const jobApplication = await createJob(jobApplicationData);
			setJobApplicationData(jobApplication);
            setShowConfirmationModal(true);
		} catch (error) {
			setJobApplicationData((prevData) => ({...prevData, error: "Creation Failed - Try again" }));
		}
        //? Reset from to default after submission
        clearForm();
    };

    //? disable submit button if any of the required fields are empty
    const disable = (!jobApplicationData.companyName ||
        !jobApplicationData.position ||
        !jobApplicationData.jobType ||
        !jobApplicationData.jobDescription);

    const clearSelection = () => {
        setJobApplicationData(prev => ({
            ...prev,
            offered: null,
        }));
    };

    return (
        <>
            <SalaryAdjustmentModal show={showSalaryModal} onHide={() => setShowSalaryModal(false)} modalMessage={modalMessage} />
            <CreateJobModal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)} />
            <h1>Job Application Form</h1>
            <br/>
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
                        value={jobApplicationData.companyName}
                        onChange={handleChange}
                        required
                        >
                            <option>Select Company Name *</option>
                            {allCompanies.map((company => (
                                <option key={company._id} value={company.companyName}>{company.companyName}</option>
                                )))}
                        </Form.Select>
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
                        <Form.Label>Job Type *</Form.Label>
                        <Form.Select
                        type="select"
                        name="jobType"
                        value={jobApplicationData.jobType}
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
                        value={jobApplicationData.jobDescription}
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
                                value={jobApplicationData.salaryMin}
                                onChange={handleChange}
                                onBlur={handleSalaryChange}
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
                                value={jobApplicationData.salaryMax}
                                onChange={handleChange}
                                onBlur={handleSalaryChange}
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
                        checked={jobApplicationData.AWS === true}
                        onChange={handleAWSChange}
                        inline
                        />
                        <Form.Check
                        type="radio"
                        name="AWS"
                        label="No"
                        value="false"
                        checked={jobApplicationData.AWS === false}
                        onChange={handleAWSChange}
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
                        placeholder="e.g. Medical, Dental, Vision, etc."
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
                        placeholder="e.g. LinkedIn, Indeed, etc."
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
                        <Form.Label>Application Date</Form.Label>
                        <Form.Control
                        type="date"
                        name="applicationDate"
                        value={jobApplicationData.applicationDate}
                        onChange={handleChange}
                        disabled={jobApplicationData.status === "Not Applied"}
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
                        disabled={jobApplicationData.status !== "Interviewed"}
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
                            checked={jobApplicationData.offered === "Offered"}
                            onChange={handleChange}
                            inline
                            />
                            <Form.Check
                            type="radio"
                            label="Rejected"
                            name="offered"
                            value="Rejected"
                            checked={jobApplicationData.offered === "Rejected"}
                            onChange={handleChange}
                            inline
                            />
                            <Form.Check
                            type="radio"
                            label="Accepted"
                            name="offered"
                            value="Accepted"
                            checked={jobApplicationData.offered === "Accepted"}
                            onChange={handleChange}
                            inline
                            />
                            <Button variant="outline-secondary" style={{ marginLeft: "25px" }} onClick={clearSelection}>Clear Selection</Button>
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
                                onChange={handleChange}
                                disabled={!jobApplicationData.offered} />
                            </InputGroup>
                    </Form.Group>
                    <br></br>
                    <Button type="submit" disabled={disable}>
                        Create Job Application
                    </Button>
                    <Button variant="warning" style={{ marginLeft: "25px" }} onClick={clearForm} >
                        Clear Form
                    </Button>
                    </Form>
                </div>
                </Col>
            </Row>
            </Container>
    </>
        );

}