import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import CustomNavbar from './Navbar.jsx';
import VaultForm from './CreateVault.jsx';
import DepositForm from './Deposit.jsx';
import WithdrawForm from './Withdraw.jsx';
import Vaults from './Vaults.jsx';
import './css/Dashboard.css';

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const [vaults, setVaults] = React.useState([
    {
      contractAddress: '0x3D980E50508CFd41a13837A60149927a11c03731',
      minWithdrawTime: '2023-06-20 12:00:00',
      totalFunds: '5000 BFT',
      tokenIds: ['1', '2', '3']
    },
    {
      contractAddress: '0x6A823E4652be4F5A6f22b51f620Ad0C89e3B4b56',
      minWithdrawTime: '2023-06-22 12:00:00',
      totalFunds: '3000 BFT',
      tokenIds: ['4', '5', '6']
    },
  ]);

  const renderContent = () => {
    switch (selectedOption) {
      case 'createVault':
        return <VaultForm />;
      case 'deposit':
        return <DepositForm />;
      case 'withdraw':
        return <WithdrawForm />;
      case 'vaults':
        return <Vaults vaults={vaults} />;
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
