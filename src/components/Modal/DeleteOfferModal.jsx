import { Modal, Button } from "react-bootstrap";

export default function DeleteOfferModal({ offerId, showModal, setShowModal, handleDeleteOfferConfirmation }) {
    return (
        <Modal show={showModal === "delete-offer"} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to delete this offer?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDeleteOfferConfirmation}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
    }