import React from 'react';
import { Form, Button } from 'react-bootstrap';

const VaultForm = () => {
  return (
    <Form className="vault-form p-5 rounded" style={{backgroundColor: '#2B2A3D'}}>
      <Form.Group className="mb-3">
        <Form.Label className="text-white">NFT Contract Address</Form.Label>
        <Form.Control type="text" placeholder="Enter NFT Contract Address" className="form-control-sm"/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="text-white">Date and Time</Form.Label>
        <Form.Control type="datetime-local" className="form-control-sm"/>
      </Form.Group>
      <Button variant="light" className="custom-btn w-100 mt-3">
        Create Vault
      </Button>
    </Form>
  );
};
export default VaultForm;
