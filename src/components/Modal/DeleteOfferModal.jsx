import { Modal, Button } from "react-bootstrap";

export default function DeleteOfferModal({ show, onHide, onDelete }) {
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
            Are you sure you want to delete this offer?
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>Once deleted, this action cannot be undone!</h4>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>Close</Button>
            <Button variant="danger" onClick={onDelete}>Delete</Button>
        </Modal.Footer>
        </Modal>
    );
}