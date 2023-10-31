import { Form, Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { updateOneInterview } from '../../utils/interviews-api';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
	const [ interviewType, setInterviewType ] = useState(originalInterviewType || "");
	const [ interviewDate, setInterviewDate ] = useState(originalInterviewDate || "");
    const [ interviewerName, setInterviewerName ] = useState(originalInterviewerName || "");
    const [ interviewerEmail, setInterviewerEmail ] = useState(originalInterviewerEmail || "");
    const [ interviewerContactNumber, setInterviewerContactNumber ] = useState(originalInterviewerContactNumber || "");
    const [ interviewNotes, setInterviewNotes ] = useState(originalInterviewNotes || "");

	useEffect(() => {
		setInterviewDate(originalInterviewDate || "");
		setInterviewType(originalInterviewType || "");
        setInterviewerName(originalInterviewerName || "");
        setInterviewerEmail(originalInterviewerEmail || "");
        setInterviewerContactNumber(originalInterviewerContactNumber || "");
        setInterviewNotes(originalInterviewNotes || "");
	}, [originalInterviewDate, originalInterviewType, originalInterviewerName, originalInterviewerEmail, originalInterviewerContactNumber, originalInterviewNotes]);

	async function handleSaveChanges() {
		try {
			await updateOneInterview(interviewId, { interviewType, interviewDate, interviewerName, interviewerEmail, interviewerContactNumber, interviewNotes });
			onHide();
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
							as="textarea"
							rows={1}
							value={interviewType}
							onChange={(event) => setInterviewType(event.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId="interviewDate">
						<Form.Label>Interview Date</Form.Label>
						<DatePicker
							selected={interviewDate ? new Date(interviewDate) : null}
							onChange={(event) => setInterviewDate(event.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId="interviewerName">
						<Form.Label>Interview Name</Form.Label>
						<Form.Control
							as="textarea"
							rows={1}
							value={interviewerName}
							onChange={date => setInterviewerName(date)}
						/>
					</Form.Group>
					<Form.Group controlId="interviewerEmail">
                        <Form.Label>Interview Email</Form.Label>
                        <Form.Control
                            as="email"
                            rows={1}
                            value={interviewerEmail}
                            onChange={(event) => setInterviewerEmail(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="interviewerContactNumber">
                        <Form.Label>Interview Contact Number</Form.Label>
                        <Form.Control
                            as="number"
                            rows={1}
                            value={interviewerContactNumber}
                            onChange={(event) => setInterviewerContactNumber(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="interviewNotes">
                        <Form.Label>Interview Notes</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={1}
                            value={interviewNotes}
                            onChange={(event) => setInterviewNotes(event.target.value)}
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
