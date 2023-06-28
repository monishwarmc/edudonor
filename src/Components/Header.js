import { Badge, Button, Credentials, Loading } from '@web3uikit/core';
import React, { useState } from 'react'
import { useAccount, useConnect, useContractRead, useDisconnect } from 'wagmi'
import {MetaMaskConnector} from 'wagmi/connectors/metaMask';


const Header = ({ contract, setAdd, setBalance, balance }) => {
  const { address, isConnected} = useAccount();
  const {disconnect} = useDisconnect();
  const {connect} = useConnect({
    connector: new MetaMaskConnector(),
  });
  setAdd(address);
  const { data, isError, isLoading } = useContractRead({
      ...contract,
      functionName: 'getBalance',
      args: [address],
  })
  setBalance(Number(data)/1e18);
  console.log(Number(data));
  let bal;
  if(!isError && balance != null){
    bal = 'Balance:' + balance.toFixed(2) + '~eth';
  }
  return (
    <div className='header'>
        <div className='logo'>
            <h1>EduDonor</h1>
        </div>
        <div className='walletInputs'>
            { isConnected ? 
            <>
              {isLoading ? 
              <div
                style={{
                  backgroundColor: '#ECECFE',
                  borderRadius: '8px',
                  padding: '20px'
                }}
              >
                <Loading />
              </div>
              :
              <Badge
                text={bal}
              />}
              <Credentials
                customize={{
                    backgroundColor: 'darkblue',
                    color: 'white',
                    fontSize: '16px',
                    margin: '16px',
                    padding: '8px 12px'
                  }}
                text={address}
                isHidden={false}
                />
                <Button onClick={disconnect}
                text='disconnect'
                />
            </> 
            : <Button onClick={connect}
            text='connect'
            />}

        </div>
    </div>
  )
}

export default Header