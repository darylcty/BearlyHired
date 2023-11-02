import Card from 'react-bootstrap/Card';
export default function LandingPage() {
    return (
        <>
            <Card className="bg-dark text-white">
                <Card.Img src="https://i.imgur.com/UMotMtq.png" alt="Card image" />
            </Card>
            <br />
            <h1>Welcome to BearlyHired</h1>
            <h2>Your job hunting companion trekking through the forest of opportunities</h2>
        </>
    );
}