import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { Link, Route, Routes } from "react-router-dom";
import Header from './Header';
import SearchBar from './Search';
import BlockList from './BlockList';
import BlockInfo from './BlockInfo';
import './App.css';
import TransactionDetails from './Transaction';
import Address from './Address';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [gasPrice, setGasPrice] = useState();

  useEffect(() => {
    getGasPrice();
    getBlockNumber();
  }, []);

  async function getBlockNumber() {
    setBlockNumber(await alchemy.core.getBlockNumber());

  }
  async function getGasPrice() {
    const gasPrice = (await alchemy.core.getGasPrice());
    const gasPriceInGwei = gasPrice.div(10 ** 9).toString();
    setGasPrice(gasPriceInGwei);
  }
  return (
    <>
      <Header gasPrice={gasPrice} />
      <SearchBar />
      <Routes>
        <Route path="/" element={<><div ><h3><Link to={"/"} onClick={() => window.location.reload()}>Latest Blocks</Link></h3></div> <BlockList blockNumber={blockNumber} /></>} />
        <Route path="block/:blockNumber" element={<BlockInfo />} />
        <Route path="transaction/:hash" element={<TransactionDetails />} />
        <Route path="address/:address" element={<Address />} />
        <Route path="*" element={<div>
          <Link to={"/"}>Home</Link>
          <h1>No Match</h1>
        </div>} />
      </Routes>
    </>
  );
}

export default App;
