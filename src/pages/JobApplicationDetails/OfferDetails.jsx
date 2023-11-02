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

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchOffers() {
            try {
                const offers = await getOffer(jobId);
                setAllOffers(offers);
            } catch (error) {
                console.log(error);
            }
        }
        fetchOffers();
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
            allOffers();
        }
    };

    const handleEditOfferButtonClick = (offerId) => {
        const selectedOfferData = allOffers.find(offer => offer._id === offerId);
        setSelectedOffer(selectedOfferData);
        setShowModal("edit-offer");
    };

    const disableCreateOfferButton = (allOffers.length > 1);

    return (
        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <DeleteOfferModal show={showModal === "delete-offer"} onHide={handleCloseModal} onDelete={handleDeleteOfferConfirmation} />
            <EditOfferModal show={showModal === "edit-offer"} onHide={handleCloseModal} offerId={selectedOffer?._id} allOffers={allOffers} setAllOffers={setAllOffers} originalData={selectedOffer} />
            <h1>Offer Details</h1>
            {allOffers.length === 0 && (
                <Button variant="outline-success" onClick={handleCreateOffer} style={{ display: "block", margin: "0 auto", width: "100%" }} disabled={disableCreateOfferButton}>Create an Offer</Button>
            )}
            <br />
            <Card>
                {allOffers.map((offer, idx) => {
                    return (
                    <Card.Header key={idx}>
                    <Card.Title>Offer ID: {offer._id}</Card.Title>
                    <Card.Text>
                        <p>Offered Salary: {offer.offeredSalary}</p>
                        <p>Offer Deadline: {offer.offerDeadline}</p>
                        <p>Acceptance: {offer.acceptance}</p>
                    </Card.Text>
                    <Button variant="primary" onClick={() => handleEditOfferButtonClick(offer._id)} style={{ marginRight: "20px" }}>Edit Offer</Button>
                    <Button variant="danger" onClick={() => handleDeleteOfferButtonClick(offer._id)}>Delete Offer</Button>
                </Card.Header>
                    )
                })}
            </Card>
        </div>
    );
}
