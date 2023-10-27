import { Modal, Button } from "react-bootstrap";
export default function SalaryAdjustmentModal({
    show,
    onHide,
    modalMessage
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
            Whoops!
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>{modalMessage}</h4>
            <h5>Matching both SalaryMin and SalaryMax</h5>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>Close</Button>
        </Modal.Footer>
        </Modal>
    );
}