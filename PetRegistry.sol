// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PetRegistry {
    struct Pet {
        string name;
        string breed;
        address owner;
        bool isRegistered;
    }

    mapping(uint256 => Pet) public pets;
    address public contractOwner;

    event PetRegistered(uint256 indexed petId, string name, address owner);
    event OwnershipTransferred(uint256 indexed petId, address oldOwner, address newOwner);

    constructor() {
        contractOwner = msg.sender;
    }

    // Function to register a new pet
    function registerPet(uint256 _petId, string memory _name, string memory _breed) public {
        require(!pets[_petId].isRegistered, "Pet with this ID is already registered.");
        
        pets[_petId] = Pet(_name, _breed, msg.sender, true);
        emit PetRegistered(_petId, _name, msg.sender);
    }

    // Function to transfer pet ownership
    function transferOwnership(uint256 _petId, address _newOwner) public {
        require(pets[_petId].isRegistered, "Pet is not registered.");
        require(pets[_petId].owner == msg.sender, "Unauthorised: Only the owner can transfer ownership.");
        require(_newOwner != address(0), "Invalid address.");

        address oldOwner = pets[_petId].owner;
        pets[_petId].owner = _newOwner;
        emit OwnershipTransferred(_petId, oldOwner, _newOwner);
    }

    // Function to retrieve pet data
    function getPetDetails(uint256 _petId) public view returns (string memory, string memory, address, bool) {
        Pet memory p = pets[_petId];
        return (p.name, p.breed, p.owner, p.isRegistered);
    }
}
