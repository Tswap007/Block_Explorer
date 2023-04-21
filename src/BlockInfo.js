import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TransactionDetails from "./Transaction";

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);


export default function BlockInfo() {
    const [hash, setHash] = useState("");
    const [timeStamp, setTimeStamp] = useState("");
    const [miner, setMiner] = useState("");
    const [nonce, setNonce] = useState("");
    const [transactions, setTransactions] = useState([]);

    const blockNumber = parseInt(useParams().blockNumber);

    useEffect(() => {
        async function blockDetails() {
            const block = await alchemy.core.getBlockWithTransactions(blockNumber);
            setHash(block.hash);
            setTimeStamp(block.timestamp);
            setMiner(block.miner);
            setNonce(block.nonce);
            setTransactions(block.transactions);
        }
        blockDetails();
    }, [blockNumber])

    console.log(nonce);

    const formatDate = (unixTimeStamp) => {
        const date = new Date(unixTimeStamp * 1000);
        return `${date.toLocaleDateString()} | ${date.toLocaleTimeString()}`;
    };


    return (
        <>
            <div className="transaction-box">
                <Link to="/">Home</Link>
                <h2>Block {blockNumber}</h2>
                <div className="block-details">
                    <div>
                        <h2>Block Hash</h2>
                        <p>{hash}</p>
                    </div>
                    <div>
                        <h2>Timestamp</h2>
                        <p>{formatDate(timeStamp)}</p>
                    </div>
                    <div>
                        <h2>Miner</h2>
                        <p><Link to={`/address/${miner}`}>{miner}</Link></p>
                    </div>
                </div>
                <br />
                <h2><u>{transactions.length} Transactions</u></h2>
                <div className="transaction-list">
                    <ul>
                        {transactions.map((tx, i) => (
                            <li key={tx.hash} className="transaction-box">
                                <Link to={`/transaction/${tx.hash}`} element={<TransactionDetails />} >{tx.hash}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
