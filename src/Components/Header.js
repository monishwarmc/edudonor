import React from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import {MetaMaskConnector} from 'wagmi/connectors/metaMask';


const Header = () => {
  const {address, isConnected} = useAccount();
  const {disconnect} = useDisconnect();
  const {connect} = useConnect({
    connector: new MetaMaskConnector(),
});
  return (
    <>
        <div className='logo'>
            <h1>edudonor</h1>
        </div>
        <div className='wallet'>
            {isConnected ? <><h2>{address}</h2><button onClick={disconnect}>disconnect</button></> : <button onClick={connect}>connect</button>}

        </div>
    </>
  )
}

export default Header