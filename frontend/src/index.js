import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { configureChains, WagmiConfig, createClient } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { sepolia } from '@wagmi/chains';
import './index.css'
try{
  const { provider, webSocketProvider } = configureChains(
    [sepolia],
    [publicProvider()],
  )
  
  const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
  })

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <WagmiConfig client={client}>
      <App />
    </WagmiConfig>
  );
}
catch(e){

  console.log(e);
} 