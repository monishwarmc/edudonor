//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.19;

contract eduDonor{

    //declaring owner as public to be viewed by all
    address public owner;

    //Works only while deploying, here we assign owner to the address who deploys the contract
    constructor(){
        owner = msg.sender;
    }

    // modifier works if a condition passes else it reverts, here we require owner to run the function in which we use this modifier
    modifier onlyOwner{
        require(msg.sender == owner, "you don't have access");
        _;
    }

    uint public idCounter;
    uint public totalFundsNeeded;
    uint public totalFundsReceived;

    // struct is a structure of variables, here we have the student structure
    struct Student {
        uint id;
        string name;
        uint256 fundsReceived;
        uint256 fundsNeeded;
        string studentId;
        string incomeCertificate;
        address walletAddress;
    }

    // mapping maps a variable to the other, here we map id to the student struct
    mapping(uint => Student) public students;

    // Events are the transactions confirmed and is emitted while execution, here we declare 3 events which will be emitted
    event DonationReceived(address indexed donor, uint256 amount);
    event FundsAllocated(address indexed student, uint256 amount);
    event StudentRegistered(uint indexed id);


    //Student registration function assigning struct values for the student and emitting student registered event
    function registerStudent(
        string memory _name,
        uint256 _fundsNeeded,
        string memory _studentId,
        string memory _incomeCertificate
    ) public {
        idCounter++;

        students[idCounter].id = idCounter;
        students[idCounter].name = _name;
        students[idCounter].studentId = _studentId;
        students[idCounter].incomeCertificate = _incomeCertificate;
        students[idCounter].fundsNeeded = _fundsNeeded;
        students[idCounter].walletAddress = msg.sender;

        totalFundsNeeded += students[idCounter].fundsNeeded;
        emit StudentRegistered(idCounter);
    }


    // Donating the funds function
    function donate() public payable{
        require(0 < msg.value, "you cannot donate beyond the limit");

        totalFundsReceived += msg.value;
        totalFundsNeeded -= msg.value;
    }


    // Fund transfers to students function
    function allocateFunds() public onlyOwner payable {
        require(totalFundsReceived > 0, "No funds to allocate");

        uint remainingFunds = totalFundsReceived;
        for (uint i = 1; i <= idCounter && remainingFunds > 0; i++) {
            Student storage student = students[i];
            if (student.fundsReceived < student.fundsNeeded) {
                if (student.fundsNeeded > remainingFunds) {
                    revert("not enough funds");
                }
                else{
                    // Transfer funds to the student's wallet address
                    payable(student.walletAddress).transfer(student.fundsNeeded);
                    totalFundsReceived -= student.fundsNeeded;
                }
            }
        }

        totalFundsReceived = remainingFunds;
        emit DonationReceived(msg.sender, msg.value);
    }

    //Getting the balance of the address
    function getContractBalance() onlyOwner public view returns(uint){
        return address(this).balance;
    }

    //Getting the balance of the address
    function getBalance(address add) public view returns(uint){
        return add.balance;
    }

}