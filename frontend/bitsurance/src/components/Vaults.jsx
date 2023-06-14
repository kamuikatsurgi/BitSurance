import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';

const Vaults = ({ vaults }) => {
  return (
    <Container>
      <h2 className="text-white mb-4">Your Vaults:</h2>
      <Row>
        {vaults.map((vault, index) => (
          <Col md={6} key={index} className="mb-4">
            <Card className="vault-card text-white" style={{backgroundColor: '#2B2A3D'}}>
              <Card.Body>
                <Card.Title>{vault.contractAddress}</Card.Title>
                <Card.Text>
                  <strong>Minimum Withdraw Time: </strong>
                  {vault.minWithdrawTime}
                </Card.Text>
                <Card.Text>
                  <strong>Total Funds: </strong>
                  {vault.totalFunds}
                </Card.Text>
                <Card.Text>
                  <strong>Token IDs: </strong>
                  {vault.tokenIds.join(', ')}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Vaults;
