import React, {useState, useEffect} from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import abi from "../abi/abi.json";

const { ethers } = require("ethers");

const Vaults = ({signer}) => {

  const [loading, setLoading] = useState(false);
  const bitContract = new ethers.Contract(ethers.getAddress("0x48d04242a1eE506489cBeb5847C770001CF86adD"), abi.abi, signer);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await bitContract.getVaultDetails();
      let currDate = new Date();
      var i = 0;
      var temp_vaults = [];
      while(i < res.length) {
        console.log(res[i]);

        console.log(Number(res[i][1]))
        console.log(currDate.getTime());
        let temp_unix = Math.ceil((currDate.getTime() / 1000) + Number(res[i][1]));

        let v = {
          contractAddress: res[i][3],
          totalFunds: res[i][0],
          tokenIds: res[i][2],
          minWithdrawTime: new Date(temp_unix * 1000).toLocaleDateString("default")
        }

        console.log(typeof(v.tokenIds));
        temp_vaults.push(v);
        i = i + 1;
      }
      setVaults(temp_vaults);
      setLoading(false);
    })();
  }, []);  

  const [vaults, setVaults] = useState([
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

  return (
    <Container>
      <h2 className="text-white mb-4">Your Vaults:</h2>
      <Row>
        { loading ? "Loading.." : vaults.map((vault, index) => (
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
                  {vault.tokenIds}
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
