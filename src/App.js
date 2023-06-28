import React, { useState } from 'react'
import './App.css'
import Header from './Components/Header'
import Register from './Components/Register';
import { Tab, TabList } from '@web3uikit/core';
import Donate from './Components/Donate';
const { ethers } = require("ethers");

const App = () => {

  const [add, setAdd] = useState();
  const [balance, setBalance] = useState();

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()

  const contractAddress = "0x731a94f8Dd45a956DF1727D339CA4eBE8Effa460"
  const abi = [
    {
      "inputs": [],
      "name": "allocateFunds",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "donate",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_fundsNeeded",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_studentId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_incomeCertificate",
          "type": "string"
        }
      ],
      "name": "registerStudent",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
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
          "internalType": "address",
          "name": "donor",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "DonationReceived",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "student",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "FundsAllocated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "StudentRegistered",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "add",
          "type": "address"
        }
      ],
      "name": "getBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getContractBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "idCounter",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
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
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "students",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "fundsReceived",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "fundsNeeded",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "studentId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "incomeCertificate",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "walletAddress",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalFundsNeeded",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalFundsReceived",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  const contract = {
    address: contractAddress,
    abi : abi
  }
  const ethContract = new ethers.Contract(contractAddress, abi, provider);
  const ethContractSigner = ethContract.connect(signer);

  return (
    <>
      <Header
      contract={contract}
      setAdd={setAdd}
      setBalance={setBalance}
      balance={balance}
      />
      <TabList className={'tabList'}>
        <Tab className={'tab'} tabKey={1} tabName={"Register"}>
          <Register
          contractAddress={contractAddress}
          abi={abi}
          />
        </Tab>
        <Tab className={'tab'} tabKey={2} tabName={"Donate"}>
          <Donate
          ethContractSigner={ethContractSigner}
          ethContract={ethContract}
          />
        </Tab>
      </TabList>
      
    </>
  )
}

export default App;