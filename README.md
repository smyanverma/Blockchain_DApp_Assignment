# Decentralized Pet Registry DApp 🐾

## 1. Problem Addressed
Lost or stolen pets are a major issue globally. While microchips exist, their databases are highly centralized and fragmented across different regions and companies, making cross-reference difficult. This DApp solves the problem by providing a transparent, immutable global registry on the Ethereum blockchain where pet microchip IDs can be permanently linked to an owner's wallet address.

## 2. Steps to Execute the Application
1. **Setup Blockchain:** Open Ganache or Remix VM to run a local blockchain.
2. **Deploy Contract:** Open `PetRegistry.sol` in Remix IDE. Compile the contract using solidity compiler `^0.8.0`. Deploy the contract.
3. **Copy Contract Address:** Once deployed, copy the deployed contract address.
4. **Update Frontend:** Open `app.js` and replace `"REPLACE_WITH_YOUR_DEPLOYED_CONTRACT_ADDRESS"` with your copied contract address.
5. **Run Application:** Open `index.html` in any web browser. Make sure you have the MetaMask extension installed and configured to point to your Ganache/Local test network.

## 3. Connecting MetaMask
1. Click the "Connect MetaMask" button on the webpage UI.
2. MetaMask will prompt you to select an account and connect.
3. Once authorized, your wallet address will appear on the UI showing successful integration.

## 4. Deployment Details
- **Deployment Network:** Ganache Local Network / Sepolia Testnet (Update this based on what you use)
- **Deployed Smart Contract Address:** `<Paste your address here>`

## 5. Test Cases
- **Valid Input (Register Pet):** Enter ID: `101`, Name: `Rex`, Breed: `Husky`. Click Register. **Result:** MetaMask prompts a transaction. Once confirmed, it is written to the blockchain.
- **Valid Input (Retrieve Data):** Enter ID `101` in the search box. **Result:** Displays "Name: Rex, Breed: Husky, Owner: 0x...".
- **Invalid Input (Duplicate Registration):** Try to register ID `101` again. **Result:** Transaction reverts with error: "Pet with this ID is already registered."
- **Unauthorised Input (Transfer Ownership):** Switch to a different MetaMask account and try to call the `transferOwnership` function on ID `101`. **Result:** Reverts with "Unauthorised: Only the owner can transfer ownership."

## 6. Screenshots Checklist (Add these to your repository)
- [ ] Smart contract compilation (Remix IDE)
- [ ] Smart contract deployment (Remix IDE showing contract address)
- [ ] MetaMask wallet connection (UI showing connected address)
- [ ] Successful transaction (MetaMask popup / Etherscan block confirmation)
- [ ] Failed transaction (MetaMask error showing revert message)
- [ ] Blockchain data displayed through the user interface (Search result shown on frontend)
