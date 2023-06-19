import React, { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import abi from "../abi/abi.json";

const { ethers } = require("ethers");

const WithdrawForm = ({ signer }) => {

  const [rows, setRows] = useState([{ tokenId: '' }]);
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
    setRows(prevRows => [...prevRows, { tokenId: '' }]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    var token_ids = [];
    for(const i in rows){
      token_ids.push(rows[i].tokenId);
    };
    console.log(token_ids);
    try{
      if(ethers.getAddress(contractAddr)) {
        const tx = await bitContract.withdrawFunds(contractAddr, token_ids);
        await tx.wait;
        if(tx.blockNumber != null){
          alert("Transaction Successful, Amounts Withdrawed");
          setLoading(false);
        } else {
          alert("Transaction Unsuccessful, Amounts Can Not Be Withdrawed");
          setLoading(false);
        }
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
            <Form.Control type="text" name="tokenId" value={item.tokenId} onChange={e => handleChange(idx, e)} className="form-control-sm"/>
          </Form.Group>
        </Row>
      ))}
      <Button variant="primary" onClick={addRow}>Add another TokenID</Button>
      <Button variant="outline-light" onClick={handleSubmit} className="w-100 mt-3">
        { loading ? "Loading" :  "Withdraw" }
      </Button>
    </Form>
  );
};

export default WithdrawForm;
