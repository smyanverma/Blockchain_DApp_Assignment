// IMPORTANT: Update this address after deploying your smart contract in Remix!
const contractAddress = "REPLACE_WITH_YOUR_DEPLOYED_CONTRACT_ADDRESS"; 

const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "petId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "oldOwner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "petId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "PetRegistered",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "contractOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_petId",
				"type": "uint256"
			}
		],
		"name": "getPetDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "pets",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "breed",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "isRegistered",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_petId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_breed",
				"type": "string"
			}
		],
		"name": "registerPet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_petId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

let provider;
let signer;
let contract;

document.getElementById('connectWalletBtn').addEventListener('click', async () => {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            const address = await signer.getAddress();
            document.getElementById('walletStatus').innerText = `Connected: ${address}`;
            
            contract = new ethers.Contract(contractAddress, contractABI, signer);
        } catch (error) {
            console.error("User denied account access", error);
        }
    } else {
        alert('MetaMask is not installed!');
    }
});

document.getElementById('registerBtn').addEventListener('click', async () => {
    if (!contract) return alert('Please connect wallet first.');
    const id = document.getElementById('regPetId').value;
    const name = document.getElementById('regPetName').value;
    const breed = document.getElementById('regPetBreed').value;
    
    try {
        const tx = await contract.registerPet(id, name, breed);
        alert('Transaction submitted! Waiting for confirmation...');
        await tx.wait();
        alert('Pet successfully registered on the blockchain!');
    } catch (error) {
        console.error(error);
        alert(error.message || 'Transaction failed!');
    }
});

document.getElementById('searchBtn').addEventListener('click', async () => {
    if (!contract) return alert('Please connect wallet first.');
    const id = document.getElementById('searchPetId').value;
    
    try {
        const result = await contract.getPetDetails(id);
        if (result[3] === false) {
            document.getElementById('petResult').innerText = "Pet not found in registry.";
        } else {
            document.getElementById('petResult').innerHTML = `
                Name: ${result[0]} <br>
                Breed: ${result[1]} <br>
                Owner Address: ${result[2]}
            `;
        }
    } catch (error) {
        console.error(error);
        alert('Failed to retrieve data.');
    }
});
