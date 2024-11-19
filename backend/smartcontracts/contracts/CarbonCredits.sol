// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

pragma experimental ABIEncoderV2;

import "./UserRegistry.sol";

contract CarbonCredits is UserRegistry {
    uint256 public constant TOKEN_PRICE = 0.1 ether; 
    uint256 public constant TOTAL_SUPPLY = 1_000_000_000 * 10 ** 18; 
    uint256 public totalMinted;

    enum ReportStatus{
        Pending,
        Approved,
        Minted,
        Rejected
    }

    struct ProjectReport {
        string projectName;
        string companyPhone;
        string geographicLocation;
        string reportIPFSLink;
        uint256 creditAmount;
        uint256 timestamp;
        ReportStatus status;
        address supplier;
        uint256 id;
    }

    struct SupplierAddBalance {
        address supplierAdd;
        uint balance;
    }


    mapping(address => ProjectReport[]) public projectReports;
    mapping(address => uint256) public balances;
    address[] public supplierAddresses;
    mapping(address => bool) private isSupplierMap;

    event ProjectSubmitted(
        address indexed supplier,
        string projectName,
        string reportIPFSLink,
        uint256 creditAmount
    );
    event CreditsMinted(address indexed supplier, uint256 amount);
    event CreditsBought(address indexed buyer, uint256 amount, uint256 cost);
    event CreditsSold(
        address indexed seller,
        address buyer,
        uint256 amount,
        uint256 revenue
    );

    // Modifiers
    modifier onlySupplier() {
        require(
            users[msg.sender].role == Role.Supplier,
            "Only Suppliers allowed."
        );
        _;
    }

    modifier onlyRegulator() {
        require(
            users[msg.sender].role == Role.Regulator,
            "Only Regulators allowed."
        );
        _;
    }

    modifier onlyAuditor() {
        require(
            users[msg.sender].role == Role.Auditor,
            "Only Auditors allowed."
        );
        _;
    }

    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

    function transferBalance(
        uint256 amount,
        address recipient
    ) public returns (uint256) {
        require(balances[msg.sender] >= amount, "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
        return balances[msg.sender];
    }

 function buyCredits(uint256 amount, address _supplier) public payable {
    uint256 requiredEth = amount * (1 ether / 100); // Calculate required ETH
    
    require(msg.value >= requiredEth, "Insufficient ETH to purchase credits");
    require(balances[_supplier] >= amount, "Supplier does not have enough credits");
    
    balances[msg.sender] += amount;
    balances[_supplier] -= amount;
    
    payable(_supplier).transfer(requiredEth);
    
    if (msg.value > requiredEth) {
        payable(msg.sender).transfer(msg.value - requiredEth);
    }
}


    function sellCredits(address buyer, uint256 amount) public onlySupplier {
        require(
            balances[msg.sender] >= amount,
            "Insufficient balance to sell credits."
        );

        uint256 revenue = amount * TOKEN_PRICE;
        require(
            address(this).balance >= revenue,
            "Contract has insufficient ETH to complete the sale."
        );

        // Update balances and transfer ETH to the seller
        balances[msg.sender] -= amount;
        balances[buyer] += amount;
        payable(msg.sender).transfer(revenue); // Transfer ETH to the supplier

        emit CreditsSold(msg.sender, buyer, amount, revenue);
    }


function submitReport(
    string memory _projectName,
    string memory _companyPhone,
    string memory _geographicLocation,
    string memory _reportIPFSLink,
    uint256 _creditAmount
) public payable onlySupplier {
    require(msg.value == 1 ether, "Exact 1 ETH is required");
    uint256 reportId = projectReports[msg.sender].length;

    ProjectReport memory newReport = ProjectReport({
        projectName: _projectName,
        companyPhone: _companyPhone,
        geographicLocation: _geographicLocation,
        reportIPFSLink: _reportIPFSLink,
        creditAmount: _creditAmount,
        timestamp: block.timestamp,
        status: ReportStatus.Pending,
        supplier: msg.sender,
        id: reportId
    });

    projectReports[msg.sender].push(newReport);

    if (!isSupplierMap[msg.sender]) {
        supplierAddresses.push(msg.sender);
        isSupplierMap[msg.sender] = true;
    }
    emit ProjectSubmitted(
        msg.sender,
        _projectName,
        _reportIPFSLink,
        _creditAmount
    );
}


    function getSupplierReports() public view returns (ProjectReport[] memory) {
        return projectReports[msg.sender];
    }

    function viewPendingReportsForAuditor()
        public
        view
        onlyAuditor
        returns (ProjectReport[] memory)
    {
        return filterReportsByStatus(ReportStatus.Pending);
    }

    function viewPendingReportsForRegulator()
        public
        view
        onlyRegulator
        returns (ProjectReport[] memory)
    {
        return filterReportsByStatus(ReportStatus.Approved);
    }

    function approveReportByAuditor(
        address supplier,
        uint256 reportIndex
    ) public onlyAuditor {
        require(
            reportIndex < projectReports[supplier].length,
            "Invalid report index."
        );
        ProjectReport storage report = projectReports[supplier][reportIndex];
        require(
            report.status == ReportStatus.Pending,
            "Report is not pending."
        );
        report.status = ReportStatus.Approved;
    }

    function rejectReportByAuditor(
        address supplier,
        uint256 reportIndex
    ) public onlyAuditor {
        require(
            reportIndex < projectReports[supplier].length,
            "Invalid report index."
        );
        ProjectReport storage report = projectReports[supplier][reportIndex];
        require(
            report.status == ReportStatus.Pending,
            "Report is not pending."
        );
        report.status = ReportStatus.Rejected;
    }

    function mintCredits(
        address supplier,
        uint256 reportIndex
    ) public onlyRegulator {
        ProjectReport storage report = projectReports[supplier][reportIndex];
        require(
            report.status == ReportStatus.Approved,
            "Report not approved by Auditor."
        );
        require(
            report.status != ReportStatus.Minted,
            "Credits already minted."
        );
        report.status = ReportStatus.Minted;
        emit CreditsMinted(supplier, report.creditAmount);
}

function supplierGetTokens(uint reportIndex) payable public onlySupplier {
    ProjectReport storage report = projectReports[msg.sender][reportIndex];
    uint requiredAmount = (report.creditAmount * 1 ether) / 100;
    require(msg.value >= requiredAmount, "Insufficient funds sent to buy token");
    balances[msg.sender] += report.creditAmount;
}

function filterReportsByStatus(
        ReportStatus status
    ) internal view returns (ProjectReport[] memory) {
        uint256 count = 0;

        for (uint256 i = 0; i < supplierAddresses.length; i++) {
            ProjectReport[] memory reports = projectReports[
                supplierAddresses[i]
            ];
            for (uint256 j = 0; j < reports.length; j++) {
                if (reports[j].status == status) {
                    count++;
                }
            }
        }

        ProjectReport[] memory filteredReports = new ProjectReport[](count);
        uint256 index = 0;

        for (uint256 i = 0; i < supplierAddresses.length; i++) {
            address supplier = supplierAddresses[i];
            ProjectReport[] memory reports = projectReports[supplier];
            for (uint256 j = 0; j < reports.length; j++) {
                if (reports[j].status == status) {
                    filteredReports[index] = reports[j];
                    index++;
                }
            }
        }

        return filteredReports;
    }

    function getApprovedReportsForSupplier()
        public
        view
        onlySupplier
        returns (ProjectReport[] memory)
    {
        return
            filterReportsForSupplierByStatus(msg.sender, ReportStatus.Minted);
    }

    function getRejectedReportsForSupplier()
        public
        view
        onlySupplier
        returns (ProjectReport[] memory)
    {
        return
            filterReportsForSupplierByStatus(msg.sender, ReportStatus.Minted);
    }

    function filterReportsForSupplierByStatus(
        address supplier,
        ReportStatus status
    ) internal view returns (ProjectReport[] memory) {
        uint256 count = 0;
        ProjectReport[] memory reports = projectReports[supplier];

        for (uint256 i = 0; i < reports.length; i++) {
            if (reports[i].status == status) {
                count++;
            }
        }

        ProjectReport[] memory filteredReports = new ProjectReport[](count);
        uint256 index = 0;

        for (uint256 i = 0; i < reports.length; i++) {
            if (reports[i].status == status) {
                filteredReports[index] = reports[i];
                index++;
            }
        }

        return filteredReports;
    }



    function getSuppliers() public view returns (SupplierAddBalance[] memory) {
        uint n = supplierAddresses.length;

        SupplierAddBalance[] memory results = new SupplierAddBalance[](n);

        for (uint i = 0; i < n; i++) {
            results[i] = SupplierAddBalance(
                supplierAddresses[i],
                balances[supplierAddresses[i]]
            );
        }
        return results; 
    }




 
  function gettressurybalance() public view onlyAuditor onlyRegulator returns(uint){
    return  address(this).balance/1 ether;
  }
   


}
/*full code*/