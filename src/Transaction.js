import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export default function TransactionDetails() {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [success, setSuccess] = useState();

    const { hash } = useParams();

    useEffect(() => {
        async function transactionDetails() {
            const tx = await alchemy.core.getTransactionReceipt(hash);
            setFrom(tx.from);
            setTo(tx.to);
            if (tx.status === 0) {
                setSuccess(0);
            }
            else {
                setSuccess(1);
            }
        }
        transactionDetails();
    }, [hash]);

    return (
        <>
            <div className="transaction-info">
                <Link to={"/"}>Home</Link>
                <h2>Transaction Hash</h2>
                <p>{hash}</p>
                <h2>From</h2>
                <p><Link to={`/address/${from}`}>{from}</Link></p>
                <h2>To</h2>
                <p><Link to={`/address/${to}`}>{to}</Link></p>
                <h2>TX Status</h2>
                <p>{success ? "Success" : "Failure"}</p>
            </div>
        </>
    );
}
