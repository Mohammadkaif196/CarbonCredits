const contractabi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "cost",
        "type": "uint256"
      }
    ],
    "name": "CreditsBought",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "supplier",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "CreditsMinted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "seller",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "revenue",
        "type": "uint256"
      }
    ],
    "name": "CreditsSold",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "supplier",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "projectName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "reportIPFSLink",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "creditAmount",
        "type": "uint256"
      }
    ],
    "name": "ProjectSubmitted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "enum UserRegistry.Role",
        "name": "role",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "nftHash",
        "type": "bytes32"
      }
    ],
    "name": "UserSignedUp",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "TOKEN_PRICE",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "TOTAL_SUPPLY",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "balances",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "login",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "enum UserRegistry.Role",
        "name": "role",
        "type": "uint8"
      },
      {
        "internalType": "bytes32",
        "name": "nftHash",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "projectReports",
    "outputs": [
      {
        "internalType": "string",
        "name": "projectName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "companyPhone",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "geographicLocation",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "reportIPFSLink",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "creditAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "internalType": "enum CarbonCredits.ReportStatus",
        "name": "status",
        "type": "uint8"
      },
      {
        "internalType": "address",
        "name": "supplier",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      },
      {
        "internalType": "enum UserRegistry.Role",
        "name": "_role",
        "type": "uint8"
      }
    ],
    "name": "signup",
    "outputs": [],
    "stateMutability": "nonpayable",
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
    "name": "supplierAddresses",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "totalMinted",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "totalUsers",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "users",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "email",
        "type": "string"
      },
      {
        "internalType": "enum UserRegistry.Role",
        "name": "role",
        "type": "uint8"
      },
      {
        "internalType": "bytes32",
        "name": "nftHash",
        "type": "bytes32"
      },
      {
        "internalType": "bool",
        "name": "registered",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      }
    ],
    "name": "transferBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_supplier",
        "type": "address"
      }
    ],
    "name": "buyCredits",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "sellCredits",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_projectName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_companyPhone",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_geographicLocation",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_reportIPFSLink",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_creditAmount",
        "type": "uint256"
      }
    ],
    "name": "submitReport",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [],
    "name": "getSupplierReports",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "projectName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "companyPhone",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "geographicLocation",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "reportIPFSLink",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "creditAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "internalType": "enum CarbonCredits.ReportStatus",
            "name": "status",
            "type": "uint8"
          },
          {
            "internalType": "address",
            "name": "supplier",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          }
        ],
        "internalType": "struct CarbonCredits.ProjectReport[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "viewPendingReportsForAuditor",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "projectName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "companyPhone",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "geographicLocation",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "reportIPFSLink",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "creditAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "internalType": "enum CarbonCredits.ReportStatus",
            "name": "status",
            "type": "uint8"
          },
          {
            "internalType": "address",
            "name": "supplier",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          }
        ],
        "internalType": "struct CarbonCredits.ProjectReport[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "viewPendingReportsForRegulator",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "projectName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "companyPhone",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "geographicLocation",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "reportIPFSLink",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "creditAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "internalType": "enum CarbonCredits.ReportStatus",
            "name": "status",
            "type": "uint8"
          },
          {
            "internalType": "address",
            "name": "supplier",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          }
        ],
        "internalType": "struct CarbonCredits.ProjectReport[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "supplier",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "reportIndex",
        "type": "uint256"
      }
    ],
    "name": "approveReportByAuditor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "supplier",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "reportIndex",
        "type": "uint256"
      }
    ],
    "name": "rejectReportByAuditor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "supplier",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "reportIndex",
        "type": "uint256"
      }
    ],
    "name": "mintCredits",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "reportIndex",
        "type": "uint256"
      }
    ],
    "name": "supplierGetTokens",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [],
    "name": "getApprovedReportsForSupplier",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "projectName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "companyPhone",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "geographicLocation",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "reportIPFSLink",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "creditAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "internalType": "enum CarbonCredits.ReportStatus",
            "name": "status",
            "type": "uint8"
          },
          {
            "internalType": "address",
            "name": "supplier",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          }
        ],
        "internalType": "struct CarbonCredits.ProjectReport[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getRejectedReportsForSupplier",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "projectName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "companyPhone",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "geographicLocation",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "reportIPFSLink",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "creditAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "internalType": "enum CarbonCredits.ReportStatus",
            "name": "status",
            "type": "uint8"
          },
          {
            "internalType": "address",
            "name": "supplier",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          }
        ],
        "internalType": "struct CarbonCredits.ProjectReport[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getSuppliers",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "supplierAdd",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "balance",
            "type": "uint256"
          }
        ],
        "internalType": "struct CarbonCredits.SupplierAddBalance[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "gettressurybalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
]

export default contractabi;
