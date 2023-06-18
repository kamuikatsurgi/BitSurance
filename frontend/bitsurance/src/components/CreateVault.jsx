import React, {useState, useEffect} from 'react';
import { Form, Button } from 'react-bootstrap';
import abi from "../abi/abi.json";

const { ethers } = require("ethers");

const VaultForm = () => {

  const ethprovider = new ethers.BrowserProvider(window.ethereum);
  const [signer, setSigner] = useState();
  const [contractAddr, setContractAddr] = useState("");
  const [inpDate, setDate] = useState(new Date());
  const bitContract = new ethers.Contract(ethers.getAddress("0x7c02E17940Ee7e316553f8496b70B00052564962"), abi.abi, signer);

  const handleSubmit = async () => {

    let currDate = new Date();
    let newDate = new Date(inpDate);
    console.log(Math.floor((newDate.getTime() - currDate.getTime())/1000));

    try{
      if(ethers.getAddress(contractAddr)) {
        if(Math.floor((newDate.getTime() - currDate.getTime())/1000) > 0) {
          let consent = window.confirm("Do you want to proceed? Make sure all the details are correct!");
          if(consent){
            const tx = await bitContract.createVault(ethers.getAddress(contractAddr), Math.floor((newDate.getTime() - currDate.getTime())/1000));
            await tx.wait();
            console.log(tx);
          }
        } else {
          alert("Please enter a valid date!");
        }
      } 
    } catch (error) {
      alert(`"${contractAddr}" is not a valid address, make sure to enter correct wallet addresses`);
    }
    console.log(contractAddr, newDate);
  };

  useEffect(() => {
    (async () => {
      const _signer = await ethprovider.getSigner();
      setSigner(_signer);
    })();
  }, []);  

  return (
    <Form className="vault-form p-5 rounded" style={{backgroundColor: '#2B2A3D'}}>
      <Form.Group className="mb-3">
        <Form.Label className="text-white">NFT Contract Address</Form.Label>
        <Form.Control onChange={(e) => setContractAddr(e.target.value)} type="text" placeholder="Enter NFT Contract Address" className="form-control-sm"/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="text-white">Date and Time</Form.Label>
        <Form.Control onChange={(e) => setDate(e.target.value)} type="datetime-local" className="form-control-sm"/>
      </Form.Group>
      <Button onClick={handleSubmit} variant="light" className="custom-btn w-100 mt-3">
        Create Vault
      </Button>
    </Form>
  );
};
export default VaultForm;
