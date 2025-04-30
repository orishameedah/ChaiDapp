// import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import abi from "./contractJson/chai.json"
import { ethers } from 'ethers';
import Buy from './components/Buy';
import Memos from './components/Memos';
import chai from './chai.png';

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });

  const [account, setAccount] = useState("Not Connected")

  useEffect(() => { //what 
    const template = async () => {
      const contractAddress = "0xa26D19951e8f0a7e5c446d0e6fe5044D727d3436";
      const contractABI = abi.abi;
      //Metamask port 
      //1. Inorder to do transaction on goerli testnet
      // Metamask consists of infura api which actually help in connecting to the blockchain
      try {
        const { ethereum } = window;

        const account = await ethereum.request({
          method: "eth_requestAccounts"
        })

        window.ethereum.on("accountChanged", () => {
          window.location.reload();
        })
        setAccount(account)  //connected 

        const provider = new ethers.BrowserProvider(ethereum); //this will be useful when we want to read the blockchain
        const signer = await provider.getSigner();  //write the blockchain

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer  //the signer is use for all sort of transaction on the contract
        )
        console.log(contract)
        setState({ provider, signer, contract })
      } catch (error) {
        console.log(error)
        alert(error)
      }

    }
    template()
  }, [])
  return (
    <div>
      <img src={chai} className="img-fluid" alt=".." width="100%" />
      <p style={{ marginTop: "10px", marginLeft: "5px" }}>
        <small>Connected Account - {account}</small>
      </p>
      <Buy state={state} />
      <Memos state={state} />
    </div>
  );
}

export default App;