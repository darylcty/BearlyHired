import { checkToken } from "../../utils/users-service";

export default function OrderHistory() {
    async function handleCheckToken(event) {
        event.preventDefault();
        const expDate =  await checkToken();
        console.log(expDate);
    }

    return (
        <>
            <h1>Order History</h1>
            <button onClick={handleCheckToken}>Check When My Login Expires</button>
        </>
    )
}