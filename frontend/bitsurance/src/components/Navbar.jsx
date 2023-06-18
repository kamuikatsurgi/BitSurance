import React, {useState, useEffect} from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import MetaMaskLogo from './Images/metamask-icon.svg';
import './css/CustomNavbar.css';
import { onConnect } from './Utils';

const CustomNavbar = (props) => {

  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState("");

  useEffect(() => {
    (async () => {
      const {res, conn} = await onConnect(connected);
      setAccount(res);
      setConnected(conn);
    })();
  }, []);

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
            { connected ? account.slice(0,10) + "..." : "Connect MetaMask" }
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
