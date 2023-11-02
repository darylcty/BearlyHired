import { Form, Modal, Button, InputGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { updateOffer } from '../../utils/offers-service';
import { useNavigate } from 'react-router-dom';

export default function EditOfferModal({
	offerId,
	show,
	onHide,
	originalData: {
        offeredSalary: originalOfferedSalary,
        offerDeadline: originalOfferDeadline,
        acceptance: originalAcceptance,
    } = {},
    jobId
}) {
    const navigate = useNavigate();

	const [formData, setFormData] = useState({
		offeredSalary: originalOfferedSalary || "",
		offerDeadline: originalOfferDeadline || "",
		acceptance: originalAcceptance || null,
	});

	useEffect(() => {
		setFormData({
			offeredSalary: originalOfferedSalary || "",
            offerDeadline: originalOfferDeadline || "",
            acceptance: originalAcceptance || null,
		});
	}, [originalOfferedSalary, originalOfferDeadline, originalAcceptance]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData(prevState => ({
			...prevState,
			[name]: value
		}));
	};
	async function handleSaveChanges() {
		try {
			await updateOffer(formData, offerId);
			onHide();
            window.location.reload();
        } catch (error) {
			console.log("Error updating interview: ", error);
		}
	}

	return (
        <>
            <Modal show={show} onHide={onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Edit Offer</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group controlId="offeredSalary">
                        <InputGroup className='mb-3'>
                            <Form.Label>Offered Monthly Salary</Form.Label>
                                <InputGroup.Text>$</InputGroup.Text>
                                <Form.Control
                                type="number"
                                name="offeredSalary"
                                rows={1}
                                value={formData.offeredSalary}
                                onChange={handleChange}
                                />
                        </InputGroup>
					</Form.Group>
					<Form.Group controlId="offerDeadline">
						<Form.Label>Offer Deadline</Form.Label>
						<Form.Control
                        type="date"
                        name="offerDeadline"
                        value={formData.offerDeadline}
						onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group controlId="acceptance">
						<Form.Label>Acceptance</Form.Label>
                        <br/>
						<Form.Check
							type="radio"
							name="acceptance"
                            label="Accepted"
                            value="Accepted"
                            checked={formData.acceptance === "Accepted"}
                            onChange={handleChange}
                            inline
						/>
						<Form.Check
							type="radio"
							name="acceptance"
                            label="Rejected"
                            value="Rejected"
                            checked={formData.acceptance === "Rejected"}
                            onChange={handleChange}
                            inline
						/>
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
	);
}
