import React, { useContext }from 'react';
import { Container, Form, Button, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Claim = () => {
    return (
        <Container fluid style={{backgroundColor: '#020118', height: '100vh', color: 'white'}} className="p-5 d-flex flex-column justify-content-center align-items-center">
            <Navbar expand="lg" variant="dark" style={{marginBottom: '3em'}}>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Link to={'/'} className="btn animated-button">Home</Link>
                        <Link to={'/dashboard'} className="btn animated-button">NFT Collection Owners</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <h1 className="display-4 font-weight-bold" style={{fontSize: '3em', marginBottom: '1em'}}>Claim Funds</h1>
            <p className="lead" style={{fontSize: '1.2em', marginBottom: '2em'}}>Initiate a claim for your insured NFT assets</p>

            <Form className="p-5 rounded d-flex flex-column align-items-center" style={{width: '50%', backgroundColor: '#212034'}}>
                <Form.Group controlId="formNFTContractAddress" className="w-100 mb-4">
                    <Form.Label style={{fontSize: '1.1em', color: '#fff'}}>Enter Your NFT Contract Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter NFT Contract Address" size="lg" style={{borderRadius: '15px'}}/>
                </Form.Group>
                <Form.Group controlId="formTokenId" className="w-100 mb-4">
                    <Form.Label style={{fontSize: '1.1em', color: '#fff'}}>Enter Your Token ID</Form.Label>
                    <Form.Control type="text" placeholder="Enter Token ID" size="lg" style={{borderRadius: '15px'}}/>
                </Form.Group>
                <Button variant="light" className="mt-4" style={{borderRadius: '25px', fontSize: '1.2em', width: '40%'}}>Claim Funds</Button>
            </Form>
        </Container>
    );
}
export default Claim;