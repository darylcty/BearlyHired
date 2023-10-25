import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { create } from "../../utils/companies-service";


export default function CompanyCreationForm() {
    const [companyData, setCompanyData] = useState({
		companyName: "",
		companyLocation: "",
		country: "",
        industry: "",
	});

	const navigate = useNavigate();

    const handleChange = (event) => {
        setCompanyData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
        }));
    };

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const company = await create(companyData);
			setCompanyData(company);
			navigate("/companycreation");
		} catch (error) {
			setCompanyData((prevData) => ({...prevData, error: "Creation Failed - Try again" }));
		}
        //? Reset from to default after submission
        setCompanyData({ companyName: "", companyLocation: "", country: "", industry: "Select Industry"})
    };

    const disable = (!companyData.companyName || !companyData.companyLocation || !companyData.country || !companyData.industry);

    return (
        <>
            <Container className="companycreationpage">
            <h1>Company Creation Page</h1>
            <Row>
                <Col md={6}>
                <div className="form-container">
                    <Form autoComplete="off" onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control
                        type="text"
                        name="companyName"
                        value={companyData.companyName}
                        onChange={handleChange}
                        required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Company Location</Form.Label>
                        <Form.Control
                        type="text"
                        name="companyLocation"
                        value={companyData.companyLocation}
                        onChange={handleChange}
                        required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                        type="text"
                        name="country"
                        value={companyData.country}
                        onChange={handleChange}
                        required
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Label>Industry</Form.Label>
                    <Form.Select aria-label="industry" name="industry" onChange={handleChange} required>
                        <option>Select Industry</option>
                        <option value="Education">Education</option>
                        <option value="Health Services">Health Services</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Retail">Retail</option>
                        <option value="Financial Services">Financial Services</option>
                        <option value="Hospitality">Hospitality</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Construction">Construction</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Other">Other</option>
                    </Form.Select>
                    <br></br>
                    <Button type="submit" disabled={disable}>
                        Create Company
                    </Button>
                    </Form>
                </div>
                </Col>
            </Row>
            <Row>
        </Row>
            </Container>
        );
    </>
    )
}