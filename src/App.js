import { useEffect } from 'react'
import './App.css'
import { Button ,Card } from 'react-bootstrap'
import useMetaMask from './hooks/metamask';
import { NFT } from './hooks/nft';
import {NabBarCompanant} from './components/nav';

function App() {
  

  
  const { connect, disconnect, isActive, account, shouldDisable } = useMetaMask()
  
  return (

    <div className="App">
      
        <NabBarCompanant></NabBarCompanant>
     
        
    </div>

  );
}

export default App;
