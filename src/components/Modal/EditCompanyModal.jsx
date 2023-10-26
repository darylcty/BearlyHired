import { Form, Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { updateCompany } from '../../utils/companies-api';

export default function EditCompanyModal({
	companyId,
	show,
	onHide,
	originalData: { companyName: originalCompanyName,
					companyAddress: originalCompanyAddress,
					country: originalCountry,
					industry: originalIndustry
				},
	allCompanies,
	setAllCompanies
	}) {

    const [ companyName, setCompanyName ] = useState(originalCompanyName || "");
	const [ companyAddress, setCompanyAddress ] = useState(originalCompanyAddress || "");
	const [ country, setCountry ] = useState(originalCountry || "");
	const [ industry, setIndustry ] = useState(originalIndustry || "");

	useEffect(() => {
		setCompanyName(originalCompanyName || "");
		setCompanyAddress(originalCompanyAddress || "");
		setCountry(originalCountry || "");
		setIndustry(originalIndustry || "");
	}, [originalCompanyName, originalCompanyAddress, originalCountry, originalIndustry]);

	async function handleSaveChanges() {
		try {
		await updateCompany(companyId, { companyName, companyAddress, country, industry });
		onHide();
		} catch (error) {
			console.log("Error updating company: ",error);
		}
		const updatedCompanies = allCompanies.map(company => {
			if (company._id === companyId) {
				return { ...company, companyName, companyAddress, country, industry };
			}
			return company;
		});
		setAllCompanies(updatedCompanies);
	}

    return (
        <>
            <Modal show={show} onHide={onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Edit Company</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group controlId="companyName">
						<Form.Label>Company Name</Form.Label>
						<Form.Control
							as="textarea"
							rows={1}
							value={companyName}
							onChange={(event) => setCompanyName(event.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId="companyAddress">
						<Form.Label>Company Address</Form.Label>
						<Form.Control
							as="textarea"
							rows={2}
							value={companyAddress}
							onChange={(event) => setCompanyAddress(event.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId="country">
						<Form.Label>Country</Form.Label>
						<Form.Control
							as="textarea"
							rows={1}
							value={country}
							onChange={(event) => setCountry(event.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId="industry">
						<Form.Label>Industry</Form.Label>
						<Form.Control
							as="select"
							value={industry}
							onChange={(event) => setIndustry(event.target.value)}>
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
						</Form.Control>
					</Form.Group>
					<br/>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onHide}>
					Cancel
				</Button>
				<Button variant="primary" onClick={handleSaveChanges}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
        </>
    )
	}