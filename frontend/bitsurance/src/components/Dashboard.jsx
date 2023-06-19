import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import CustomNavbar from './Navbar.jsx';
import VaultForm from './CreateVault.jsx';
import DepositForm from './Deposit.jsx';
import WithdrawForm from './Withdraw.jsx';
import Vaults from './Vaults.jsx';
import './css/Dashboard.css';

const { ethers } = require("ethers");

const Dashboard = () => {

  const ethprovider = new ethers.BrowserProvider(window.ethereum);
  const [signer, setSigner] = useState();
  const [selectedOption, setSelectedOption] = useState("createVault");

  useEffect(() => {
    (async () => {
      const _signer = await ethprovider.getSigner();
      setSigner(_signer);
//      const res = await bitContract.getVaultDetails();
//      console.log(res);
    })();
  }, []);  

  const renderContent = () => {
    switch (selectedOption) {
      case 'createVault':
        return <VaultForm />;
      case 'deposit':
        return <DepositForm />;
      case 'withdraw':
        return <WithdrawForm />;
      case 'vaults':
        return <Vaults signer={signer}/>;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard" style={{ backgroundColor: '#020118' }}>
      <CustomNavbar
        onYourVaultsClick={() => setSelectedOption('vaults')}
        onCreateVaultClick={() => setSelectedOption('createVault')}
        onDepositClick={() => setSelectedOption('deposit')}
        onWithdrawClick={() => setSelectedOption('withdraw')}
      />
      <Container fluid className="justify-content-center d-flex align-items-center" style={{ minHeight: '80vh' }}>
        {renderContent()}
      </Container>
    </div>
  );
};

export default Dashboard;
