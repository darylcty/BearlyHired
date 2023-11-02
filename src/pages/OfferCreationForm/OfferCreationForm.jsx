import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row, InputGroup } from "react-bootstrap";
import { getOneJobApplication } from "../../utils/jobs-service";
import { getOneCompanyByName } from "../../utils/companies-service";
import { createOffer } from "../../utils/offers-service";
import CreateOfferModal from "../../components/Modal/CreateOfferModal";

export default function OfferCreationForm() {
    const [ offerData, setOfferData ] = useState({
        jobId: "",
        companyName: "",
        companyAddress: "",
        position: "",
        offeredSalary: "",
        offerDeadline: "",
        acceptance: null
    });

    const [ modalShow, setModalShow ] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();
    const [ selectedJobApplication, setSelectedJobApplication ] = useState({});
    const [ oneCompany, setOneCompany ] = useState({});

    const disable = (!offerData.offeredSalary || !offerData.offerDeadline)

    useEffect(() => {
        fetchJobApplication();
    }, [id]);

    useEffect(() => {
        if (offerData.companyName) {
        fetchCompanyByName(offerData.companyName);
        }
    }, [offerData.companyName]);

    async function fetchCompanyByName(companyName) {
        const company = await getOneCompanyByName(companyName);
        setOneCompany(company);
        setOfferData((prevState) => ({
            ...prevState,
            companyAddress: company.companyAddress
        }));
    }

    async function fetchJobApplication() {
        const jobApplication = await getOneJobApplication(id);
        setSelectedJobApplication(jobApplication);
        setOfferData((prevState) => ({
            ...prevState,
            companyName: jobApplication.companyName,
            companyAddress: jobApplication.companyAddress,
            position: jobApplication.position,
            offeredSalary: jobApplication.salaryMax,
        }));
    }

    const handleChange = (event) => {
        let updatedValue = { [event.target.name]: event.target.value };
        if (event.target.name === "companyName") {
            if (oneCompany !== null) {
                updatedValue = {
                    ...updatedValue,
                    companyAddress: oneCompany.companyAddress,
                };
            }
        }
        setOfferData((prevState) => ({
            ...prevState,
            ...updatedValue,
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const offerDataWithJobId = { ...offerData}
        if (id) {
            offerDataWithJobId.jobId = id;
        }
        try {
            const offer = await createOffer(offerDataWithJobId);
            setOfferData(offer);
            setModalShow(true);
        } catch (error) {
            console.log("Creation Failed - Try again", error);
        }
    }

    const handleNavigateToJobApplicationDetails = (event) => {
        event.preventDefault();
        navigate(`/job-application-details/${id}`);
    }

    const clearForm = () => {
        setOfferData({
            jobId: offerData.jobId,
            companyName: offerData.companyName,
            companyAddress: offerData.companyAddress,
            position: offerData.position,
            offeredSalary: "",
            offerDeadline: "",
            acceptance: null,
        });
    }

    return (
        <div>
        <h1>Offer Creation Form</h1>
        <CreateOfferModal show={modalShow} onHide={() => setModalShow(false)} jobId={id} />
        <Container className="offer-form">
            <Row>
                <Col md={12}>
                <div className="form-container">
                    <Form autoComplete="on" onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control
                        readOnly
                        style={{ backgroundColor: "#f5f5f5", borderColor: "#ccc" }}
                        type="text"
                        name="companyName"
                        text={offerData.companyName}
                        value={offerData.companyName}
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
                        text={offerData.companyAddress}
                        value={offerData.companyAddress}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Position</Form.Label>
                        <Form.Control
                        readOnly
                        style={{ backgroundColor: "#f5f5f5", borderColor: "#ccc" }}
                        type="text"
                        name="jobType"
                        value={offerData.position}
                        >
                        </Form.Control>
                    </Form.Group>
                    <br/>
                    <Form.Label>Offered Monthly Salary *</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>$</InputGroup.Text>
                                <Form.Control
                                aria-label="Amount (to the nearest dollar)"
                                type="number"
                                name="offeredSalary"
                                min={0}
                                step={1}
                                value={offerData.offeredSalary}
                                onChange={handleChange}
                                />
                            </InputGroup>
                    <br/>
                    <Form.Group>
                        <Form.Label>Offer Deadline *</Form.Label>
                        <Form.Control
                        type="date"
                        name="offerDeadline"
                        value={offerData.offerDeadline}
                        onChange={handleChange}
                        required
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Offer Acceptance</Form.Label>
                        <br/>
                        <Form.Check
                        type="radio"
                        name="acceptance"
                        label="Accepted"
                        value="Accepted"
                        onChange={handleChange}
                        inline
                        />
                        <Form.Check
                        type="radio"
                        name="acceptance"
                        label="Rejected"
                        value="Rejected"
                        onChange={handleChange}
                        inline
                        />
                    </Form.Group>
                    <br></br>
                    <Button type="submit" style={{ display: "inline" }} disabled={disable}>
                        Create Offer
                    </Button>
                    <Button variant="warning" style={{ marginLeft: "25px", display: "inline" }} onClick={clearForm} >
                        Clear Form
                    </Button>
                    <Button variant="secondary" style={{ marginLeft: "25px", display: "inline" }} onClick={handleNavigateToJobApplicationDetails}>
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