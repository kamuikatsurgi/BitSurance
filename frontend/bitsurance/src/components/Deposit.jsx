import React, { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import abi from "../abi/abi.json";

const { ethers } = require("ethers");

const DepositForm = ({ signer }) => {
  const [rows, setRows] = useState([{ tokenId: '', amount: '' }]);
  const [loading, setLoading] = useState(false);
  const [contractAddr, setContractAddr] = useState("");
  const bitContract = new ethers.Contract(ethers.getAddress("0x48d04242a1eE506489cBeb5847C770001CF86adD"), abi.abi, signer);

  const handleChange = (i, e) => {
    const { name, value } = e.target;
    const newRows = [...rows];
    newRows[i][name] = Number(value);
    setRows(newRows);
  };

  const addRow = () => {
    setRows(prevRows => [...prevRows, { tokenId: '', amount: 0 }]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    var token_ids = [];
    var amount = [];
    var total_amount = 0;
    for(const i in rows){
      token_ids.push(rows[i].tokenId);
      amount.push(rows[i].amount * 10**8);
      total_amount = total_amount + (rows[i].amount * 10**8);
    };
    console.log(token_ids, amount);
    try{
      if(ethers.getAddress(contractAddr)) {
        const tx = await bitContract.depositFunds(contractAddr, token_ids, amount, {value : total_amount});
        await tx.wait;
        alert("Transaction Successful, Amounts Deposited");
        setLoading(false);
      } 
    } catch (error) {
      alert(`"${contractAddr}" is not a valid address, make sure to enter correct wallet addresses`);
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Form className="vault-form p-5 rounded" style={{backgroundColor:'#2B2A3D'}}>
      <Form.Group className="mb-3">
        <Form.Label className="text-white">NFT Contract Address</Form.Label>
        <Form.Control type="text" onChange={(e) => setContractAddr(e.target.value)} placeholder="Enter NFT Contract Address" className="form-control-sm"/>
      </Form.Group>
      {rows.map((item, idx) => (
        <Row className="mb-3" key={idx}>
          <Form.Group as={Col}>
            <Form.Label className="text-white">Token ID</Form.Label>
            <Form.Control type="number" min={0} step={1} name="tokenId" value={item.tokenId} onChange={e => handleChange(idx, e)} className="form-control-sm"/>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label className="text-white">Amount in BFT</Form.Label>
            <Form.Control type="number" min={0} name="amount" value={item.amount} onChange={e => handleChange(idx, e)} className="form-control-sm"/>
          </Form.Group>
        </Row>
      ))}
      <Button variant="primary" onClick={addRow}>Add another pair</Button>
      <Button variant="outline-light" className="w-100 mt-3" onClick={handleSubmit}>
        { loading ? "Loading.." : "Deposit"}
      </Button>
    </Form>
  );
};

export default DepositForm;
