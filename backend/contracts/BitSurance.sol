// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "hardhat/console.sol";

/**
 * @title Vault
 * @dev Vault contract that allows for storing balances associated with Token IDs.
 */
contract Vault {
    address public NFTContract;
    mapping(uint256 => uint256) public tokenBalances;
    uint256 public minTime;
    uint256 public creationTime;
    address public bitsurance;
    address public admin;

    // array to store all insured token ids
    uint256[] public tokenIds;

    modifier onlyBitsurance{
        require(msg.sender == bitsurance, "Only Bitsurance contract can call this function");
        _;
    }

    /**
     * @dev Contract constructor that sets initial values
     * @param NFTContractAddress address of the NFT contract
     * @param _minTime minimum time before claim and 2 * minTime before withdraw
     * @param _admin admin address
     */
    constructor(address NFTContractAddress, uint256 _minTime, address _admin) {
        NFTContract = NFTContractAddress;
        minTime = _minTime;
        admin = _admin;
        creationTime = block.timestamp;
        bitsurance = msg.sender;
    }

    fallback() external payable{}
    receive() external payable{}

    /**
     * @dev Function to add balance for a specific token ID
     * @param _tokenID Token ID to which the balance is added
     * @param amount Amount to add to the balance
     */
    function addBalance(uint256 _tokenID, uint256 amount) external onlyBitsurance {
        if (tokenBalances[_tokenID] == 0) {
            tokenIds.push(_tokenID);
        }
        tokenBalances[_tokenID] += amount;
    }

    function getTokenIds() public view returns(uint256[] memory) {
        return tokenIds;
    }

    /**
     * @dev Function to claim funds from the vault
     * @param recipient Recipient address to receive the funds
     * @param _tokenID Token ID to claim
     */
    function claimFunds(address payable recipient, uint256 _tokenID) external payable onlyBitsurance {
        require(tokenBalances[_tokenID] > 0, "No balance for this tokenID");
        require(block.timestamp - creationTime >= minTime, "Cannot access function before the minimum time has passed");
        uint256 amount = tokenBalances[_tokenID];
        tokenBalances[_tokenID] = 0;
        recipient.transfer(amount);
    }

    /**
     * @dev Function to withdraw funds from the vault
     * @param recipient Recipient address to receive the funds
     * @param _tokenIDs Array of Token IDs to withdraw
     */
    function withdraw(address payable recipient, uint256[] memory _tokenIDs) external payable onlyBitsurance {
        require(block.timestamp - creationTime >= 2 * minTime, "Cannot access function before the minimum time has passed");
        uint256 totalAmount = 0;
        for (uint256 i = 0; i < _tokenIDs.length; i++) {
            require(tokenBalances[_tokenIDs[i]] > 0, "No balance for this tokenID");
            totalAmount += tokenBalances[_tokenIDs[i]];
            tokenBalances[_tokenIDs[i]] = 0;
        }
        recipient.transfer(totalAmount);
    }
}
/**
 * @title Bitsurance
 * @dev Bitsurance contract that interacts with Vaults and manages the creation and operations on them
 */
contract Bitsurance {

    struct VaultDetails {
        uint256 totalBalance;
        uint256 minimumWithdrawTime;
        uint256[] insuredTokenIds;
        address nftContractAddress;
    }
    
    // An array of vaults
    Vault[] private vaults;
    
    // Event to notify when a vault is created
    event VaultCreated(uint256 date, address vaultAddress, address NFT_address);

    // Mapping of NFT contract address to corresponding vault address
    mapping(address => address) public vaultAddress;
    
    // Mapping of admins to NFT contracts
    mapping(address => address[]) public adminToNFTContracts;

    /**
     * @dev Function to create a new vault
     * @param _NFTContractAddress address of the NFT contract
     * @param _minTime minimum time before withdrawal
     */
    function createVault(address _NFTContractAddress, uint256 _minTime) public{
        require(vaultAddress[_NFTContractAddress] == address(0), "Vault already exists for this NFT contract");
        Vault vault = new Vault(_NFTContractAddress,_minTime, msg.sender);
        vaults.push(vault);
        vaultAddress[_NFTContractAddress]= address(vault);
        adminToNFTContracts[msg.sender].push(_NFTContractAddress);
        emit VaultCreated(block.timestamp,address(vault),_NFTContractAddress);
    }

    /**
     * @dev Function to deposit funds into a vault
     * @param NFTContractAddress address of the NFT contract
     * @param _tokenIDs Array of Token IDs for deposit
     * @param amounts Array of corresponding amounts for deposit
     */
    function depositFunds(address NFTContractAddress, uint256[] memory _tokenIDs, uint256[] memory amounts) public payable{
        require(vaultAddress[NFTContractAddress] != address(0), "Vault does not exists for this NFT contract");
        require(_tokenIDs.length == amounts.length, "Mismatched arrays");
        
        uint256 useramount = msg.value;
        address payable vaultContract_address = payable(getContractAddress(NFTContractAddress));

        Vault vault = Vault(vaultContract_address);
        require(vault.admin() == msg.sender, "Only the person who created vault can deposit funds into it");

        uint256 totalAmount = 0;        
        for (uint256 i = 0; i < _tokenIDs.length; i++) {
            totalAmount += amounts[i];
        }
        require(useramount == totalAmount, "Mismatched total deposit amount");
        for (uint256 i = 0; i < _tokenIDs.length; i++) {
            vault.addBalance(_tokenIDs[i], amounts[i]);
        }
        vaultContract_address.transfer(totalAmount);
    }

    /**
     * @dev Function to withdraw funds from a vault
     * @param NFTContractAddress address of the NFT contract
     * @param tokenIDs Array of Token IDs for withdrawal
     */
    function withdrawFunds(address NFTContractAddress, uint256[] memory tokenIDs) public payable{
        require(vaultAddress[NFTContractAddress] != address(0), "Vault does not exists for this NFT contract");
        
        address payable vaultContract_address = payable(getContractAddress(NFTContractAddress));
        Vault vault = Vault(vaultContract_address);
        require(vault.admin() == msg.sender, "Only the person who created vault can withdraw funds");

        vault.withdraw(payable(msg.sender), tokenIDs);
    }

    /**
     * @dev Function to claim a Token ID from a vault
     * @param NFTContractAddress address of the NFT contract
     * @param _tokenID Token ID to claim
     */
    function claim(address NFTContractAddress, uint256 _tokenID) public payable {
        require(vaultAddress[NFTContractAddress] != address(0), "Vault does not exists for this NFT contract");

        ERC721Burnable asset = ERC721Burnable(NFTContractAddress);

        address payable vaultContract_address = payable(getContractAddress(NFTContractAddress));
        address tokenOwner = asset.ownerOf(_tokenID);
        
        require(tokenOwner == msg.sender, "You are not the owner of this token!");
        require(asset.getApproved(_tokenID) == address(this), "Contract not approved to burn token");

        asset.burn(_tokenID);

        address payable recipient = payable(msg.sender);
        Vault vault = Vault(vaultContract_address);

        vault.claimFunds(recipient, _tokenID);
    }

    /**
     * @dev Function to get the contract address of the vault
     * @param NFTContractAddress address of the NFT contract
     * @return Address of the vault contract
     */
    function getContractAddress(address NFTContractAddress) public view returns(address){
        return vaultAddress[NFTContractAddress];
    }

    /**
     * @dev Function to get details of all vaults associated with the caller
     * @return An array of structures containing the total balance of each vault, minimum time before withdraw, 
     * array of token ids insured, and the associated NFT contract address
     */
    function getVaultDetails() public view returns (VaultDetails[] memory) {
        address[] memory nftContracts = adminToNFTContracts[msg.sender];
        VaultDetails[] memory vaultDetailArray = new VaultDetails[](nftContracts.length);

        for (uint i = 0; i < nftContracts.length; i++) {
            Vault vault = Vault(payable(vaultAddress[nftContracts[i]]));
            uint256[] memory insuredTokenIds = vault.getTokenIds();
            VaultDetails memory vaultDetails = VaultDetails({
                totalBalance: address(vault).balance,
                minimumWithdrawTime: 2 * vault.minTime(),
                insuredTokenIds: insuredTokenIds,
                nftContractAddress: nftContracts[i]
            });
            vaultDetailArray[i] = vaultDetails;
        }
        return vaultDetailArray;
    }
}