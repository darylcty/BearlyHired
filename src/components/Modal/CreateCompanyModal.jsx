import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function CreateCompanyModal({
    show,
    onHide,
}) {

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
            <h4>Company was created successfully.</h4>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>Close</Button>
        </Modal.Footer>
        </Modal>
    );
}