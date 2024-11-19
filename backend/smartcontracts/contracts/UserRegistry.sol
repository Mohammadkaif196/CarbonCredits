// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserRegistry {
    // User roles available in the system
    enum Role {
        None,
        Supplier,
        Auditor,
        Regulator,
        Buyer
    }

    // Structure to store user information
    struct User {
        string name;
        string email;
        Role role;
        bytes32 nftHash; // Hashed NFT ID (keccak256)
        bool registered;
    }

    // Mapping to store registered users by their address
    mapping(address => User) public users;
    uint256 public totalUsers; // Track total number of registered users

    // Event for successful signup
    event UserSignedUp(address indexed user, Role role, bytes32 nftHash);

    // Modifier to ensure only unregistered users can call signup
    modifier onlyUnregistered() {
        require(!users[msg.sender].registered, "User already registered.");
        _;
    }

    /**
     * @dev Register a new user with a hashed NFT ID, name, email, and role.
     */
    function signup(
        string memory _name,
        string memory _email,
        Role _role
    ) public onlyUnregistered {
        require(_role != Role.None, "Invalid role.");

        // Generate a unique NFT hash using keccak256
        bytes32 nftHash = keccak256(
            abi.encodePacked(msg.sender, block.timestamp, totalUsers)
        );

        // Store user details with hashed NFT ID
        users[msg.sender] = User({
            name: _name,
            email: _email,
            role: _role,
            nftHash: nftHash,
            registered: true
        });

        totalUsers++; // Increment total user count

        emit UserSignedUp(msg.sender, _role, nftHash);
    }

    /**
     * @dev Login function to retrieve user details if registered.
     */
    function login()
        public
        view
        returns (string memory name, Role role, bytes32 nftHash)
    {
        require(users[msg.sender].registered, "User not registered.");
        User memory user = users[msg.sender];
        return (user.name, user.role, user.nftHash);
    }
}
