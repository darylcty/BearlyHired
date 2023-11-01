import { Form, Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { updateOneInterview } from '../../utils/interviews-api';

export default function EditInterviewModal({
	interviewId,
	show,
	onHide,
	originalData: {
        interviewType: originalInterviewType,
        interviewDate: originalInterviewDate,
        interviewerName: originalInterviewerName,
        interviewerEmail: originalInterviewerEmail,
        interviewerContactNumber: originalInterviewerContactNumber,
        interviewNotes: originalInterviewNotes
    } = {},
	allInterviews,
	setAllInterviews
}) {

	const [formData, setFormData] = useState({
		interviewType: originalInterviewType || "",
		interviewDate: originalInterviewDate || "",
		interviewerName: originalInterviewerName || "",
		interviewerEmail: originalInterviewerEmail || "",
		interviewerContactNumber: originalInterviewerContactNumber || "",
		interviewNotes: originalInterviewNotes || ""
	});

	useEffect(() => {
		setFormData({
			interviewType: originalInterviewType || "",
			interviewDate: originalInterviewDate || "",
			interviewerName: originalInterviewerName || "",
			interviewerEmail: originalInterviewerEmail || "",
			interviewerContactNumber: originalInterviewerContactNumber || "",
			interviewNotes: originalInterviewNotes || ""
		});
	}, [originalInterviewDate, originalInterviewType, originalInterviewerName, originalInterviewerEmail, originalInterviewerContactNumber, originalInterviewNotes]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData(prevState => ({
			...prevState,
			[name]: value
		}));
	};
	async function handleSaveChanges() {
		try {
			await updateOneInterview(interviewId, formData);
			onHide();
			window.location.reload();
		} catch (error) {
			console.log("Error updating interview: ", error);
		}

		const updatedInterviews = allInterviews.map(interview => {
			if (interview._id === interviewId) {
				return { ...interview, interviewType, interviewDate, interviewerName, interviewerEmail, interviewerContactNumber, interviewNotes };
			}
			return interview;
		});

		setAllInterviews(updatedInterviews);
	}

	return (
        <>
            <Modal show={show} onHide={onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Edit Interview</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group controlId="interviewType">
						<Form.Label>Interview Type</Form.Label>
						<Form.Control
							type="text"
							name="interviewType"
							rows={1}
							value={formData.interviewType}
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group controlId="interviewDate">
						<Form.Label>Interview Date</Form.Label>
						{/* <DatePicker
							selected={interviewDate ? new Date(interviewDate) : null}
							onChange={date => setInterviewDate(date)}
						/> */}
						<Form.Control
                        type="date"
                        name="interviewDate"
                        value={formData.interviewDate}
						onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group controlId="interviewerName">
						<Form.Label>Interview Name</Form.Label>
						<Form.Control
							type="text"
							name="interviewerName"
							rows={1}
							value={formData.interviewerName}
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group controlId="interviewerEmail">
                        <Form.Label>Interview Email</Form.Label>
                        <Form.Control
							type="text"
							name="interviewerEmail"
                            rows={1}
                            value={formData.interviewerEmail}
							onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="interviewerContactNumber">
                        <Form.Label>Interview Contact Number</Form.Label>
                        <Form.Control
							type="text"
							name="interviewerContactNumber"
                            rows={1}
                            value={formData.interviewerContactNumber}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="interviewNotes">
                        <Form.Label>Interview Notes</Form.Label>
                        <Form.Control
							type="text"
							name="interviewNotes"
                            rows={1}
                            value={formData.interviewNotes}
                            onChange={handleChange}
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
