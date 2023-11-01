import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DeleteOfferModal from "../../components/Modal/DeleteOfferModal";
import EditOfferModal from "../../components/Modal/EditOfferModal";
import { deleteOffer, getOffer } from "../../utils/offers-service";

export default function OfferDetails({ jobId }) {
    const [allOffers, setAllOffers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState({});
    const [offer, setOffer] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchOffer() {
            try {
                const offers = await getOffer(jobId);
                if (offers.length > 0) {
                    setOffer(offers[0]);
                }
                setAllOffers(offers);
            } catch (error) {
                console.log(error);
            }
        }
        fetchOffer();
    }, [jobId]);

    const handleCloseModal = () => setShowModal(false);

    const handleCreateOffer = (event) => {
        event.preventDefault();
        navigate(`/job-application-details/${jobId}/create-offer`);
    };

    const handleDeleteOfferButtonClick = (offerId) => {
        setSelectedOffer(offerId);
        setShowModal("delete-offer");
    };

    const handleDeleteOffer = async (offerId) => {
        try {
            await deleteOffer(offerId);
            const updatedOffers = allOffers.filter(o => o._id !== offerId);
            setAllOffers(updatedOffers);
            setShowModal(false);
            setSelectedOffer(null);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteOfferConfirmation = async () => {
        if (selectedOffer) {
            await handleDeleteOffer(selectedOffer);
            handleCloseModal();
        }
    };

    const handleEditOfferButtonClick = (offerId) => {
        const selectedOfferData = allOffers.find(o => o._id === offerId);
        setSelectedOffer(selectedOfferData);
        setShowModal("edit-offer");
    };

    return (
        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <DeleteOfferModal show={showModal === "delete-offer"} onHide={handleCloseModal} onDelete={handleDeleteOfferConfirmation} />
            <EditOfferModal show={showModal === "edit-offer"} onHide={handleCloseModal} offerId={selectedOffer?._id} allOffers={allOffers} setAllOffers={setAllOffers} originalData={selectedOffer} />
            <h1>Offer Details</h1>
            <Button variant="outline-success" onClick={handleCreateOffer} style={{ display: "block", margin: "0 auto", width: "100%" }}>Create an Offer</Button>
            <br />
            <Card>
                <Card.Header>
                    <Card.Title>Offer ID: {offer._id}</Card.Title>
                    <Card.Text>
                        <p>Offered Salary: {offer.offeredSalary}</p>
                        <p>Offer Deadline: {offer.offerDeadline}</p>
                        <p>Acceptance: {offer.acceptance}</p>
                    </Card.Text>
                    <Button variant="primary" onClick={() => handleEditOfferButtonClick(offer._id)} style={{ marginRight: "20px" }}>Edit Offer</Button>
                    <Button variant="danger" onClick={() => handleDeleteOfferButtonClick(offer._id)}>Delete Offer</Button>
                </Card.Header>
            </Card>
        </div>
    );
}
