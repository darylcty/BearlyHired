import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate, useParams } from 'react-router-dom';
export default function CreateInterviewModal({
    show,
    onHide,
    clearForm,
}) {

    const navigate = useNavigate();
    const { id } = useParams();

    return (
        <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Success!
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>Interview was created successfully.</h4>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => {onHide(), navigate(`/job-application-details/${id}`)}}>Return to Job Application Details</Button>
            <Button variant="primary" onClick={() => {onHide(); clearForm();}} >Create Another Interview</Button>
        </Modal.Footer>
        </Modal>
    );
}