require("@nomicfoundation/hardhat-toolbox");


const PRIVATE_KEY = "";


module.exports = {
  solidity: "0.8.17",
  networks: {
    testnet: {
      url: `https://testnet.bitfinity.network`,
      accounts: [PRIVATE_KEY]
    }
  }
};
