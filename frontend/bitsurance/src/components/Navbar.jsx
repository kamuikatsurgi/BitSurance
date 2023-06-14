import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import MetaMaskLogo from './Images/metamask-icon.svg';
import './css/CustomNavbar.css';

const CustomNavbar = (props) => {
  return (
    <Navbar bg="transparent" variant="dark" expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand className="navbar-brand">Bitsurance</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Button variant="outline-light" className="nav-btn" onClick={props.onYourVaultsClick}>Your Vaults</Button>
          <Button variant="outline-light" className="nav-btn" onClick={props.onCreateVaultClick}>Create Vault</Button>
          <Button variant="outline-light" className="nav-btn" onClick={props.onDepositClick}>Deposit</Button>
          <Button variant="outline-light" className="nav-btn" onClick={props.onWithdrawClick}>Withdraw</Button>
          <Button className="connect-btn">
            <img src={MetaMaskLogo} alt="MetaMask logo" className="metamask-logo" />
            Connect MetaMask
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
