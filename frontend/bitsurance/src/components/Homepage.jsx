import React from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import Image from './Images/NFT.jpeg';
import Image1 from './Images/Image1.jpg';
import Image2 from './Images/Image2.jpg'; 
import Image3 from './Images/Image3.jpg'; 
import './css/HomePage.css';
import { Link } from 'react-router-dom';

const Homepage = () => {
    return (
        <Container fluid style={{backgroundColor: '#000', color: 'white'}} className="p-5">
            <Navbar expand="lg" variant="dark" style={{marginBottom: '3em'}}>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Link to={'/claim'} className="btn animated-button">NFT Users</Link>
                        <Link to={'/dashboard'} className="btn animated-button">NFT Collection Owners</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Row className="justify-content-md-center text-center">
                <Col xs={12} md={6} className="d-flex flex-column justify-content-center align-items-center">
                <h1 className="font-weight-bold mt-3" style={{ fontSize: "6rem" }}>BitSurance</h1>
                    <p className="lead">A decentralized insurance platform for your NFT assets.</p>
                    <p className="lead">Insure your ERC721 assets with BFT.</p>
                </Col>
                <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                    <img src={Image} alt="Bitsurance" style={{width: '80%', height: 'auto', borderRadius: '4%'}} />
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col md="auto">
                <h1 className="font-weight-bold mt-3" style={{ fontSize: "5rem" }}>Features</h1>
                </Col>
            </Row>
            <Row className="justify-content-md-center text-center mt-5">
                <Col xs={12} md={4}>
                    <img src={Image1} alt="Feature1" style={{width: '35%', height: 'auto',  borderRadius: '4%'}} />
                    <h2 className="font-weight-bold mt-3">Decentralized Insurance</h2>
                    <p>With Bitsurance, your NFT assets are protected by a trustless, 
                        immutable insurance policy that ensures your digital properties' safety.</p>
                </Col>
                <Col xs={12} md={4}>
                    <img src={Image2} alt="Feature2" style={{width: '35%', height: 'auto',  borderRadius: '4%'}} />
                    <h2 className="font-weight-bold mt-3">Value Assurance</h2>
                    <p>With Bitsurance, NFT owners get assurance of value retention amidst market volatility.</p>
                </Col>
                <Col xs={12} md={4}>
                    <img src={Image3} alt="Feature3" style={{width: '35%', height: 'auto',  borderRadius: '4%'}} />
                    <h2 className="font-weight-bold mt-3">Collection Safety</h2>
                    <p>Bitsurance provides a safety net for NFT collection launchers and their investors, 
                        promising some return even if the project underperforms.</p>
                </Col>
            </Row>
        </Container>
    );
}
export default Homepage;    