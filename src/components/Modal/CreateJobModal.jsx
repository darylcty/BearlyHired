import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

export default function createJobModal({
    show,
    onHide,
}) {

    const navigate = useNavigate();

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
            <h4>Job was created successfully.</h4>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => {onHide(), navigate("/dashboard")}}>Return to Dashboard</Button>
            <Button variant="primary" onClick={onHide}>Create Another</Button>
        </Modal.Footer>
        </Modal>
    );
}