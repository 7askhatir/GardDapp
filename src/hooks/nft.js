import React, { Component } from 'react'  ;
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Web3 from 'web3';
import {Navbar,
        Container,
        Nav,
        Badge,
        Card,
        Button}
         from 'react-bootstrap';

export class NFT extends Component {
    constructor(props) {
		super(props);
	  this.ConnectContrat();
      this.state = {
      }

    }
    
     ConnectContrat= async() => {
    
       }

       MintNft =  async() => {
        console.log("eeeeeeeeeeeee");
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const contract_abi=require('../abiContrat.json');
        const contract_address="0x2E6e71D747e575D8be7F1a464713f27618Bc377b";
        const NameContract =new web3.eth.Contract(contract_abi, contract_address);
        const user=await web3.eth.getAccounts();
        await NameContract.methods.mint().send({from: user[0]},function(err, res){
            if(err == null){
                NotificationManager.success('Error message', 'Click me!', 200000, () => {
                    // confirm("Do you want to save changes?");
                    // alert()
                  });
            }
            else{
                console.log(err);
                NotificationManager.warning('Erreur in this transaction ', 'Close after 3000ms', 3000);
            }
        });

       }

    render(){
        return (
           <div>
                <header>
                    <br></br><br></br>
                <Card style={{ width: '25rem' }} className="m-auto">
                        <Card.Img variant="top" src="https://academy-public.coinmarketcap.com/optimized-uploads/069e8c89bdf647bd84423ee184fd618e.png" />
                        <Card.Body>
                            <Card.Title>Mint new nft</Card.Title>
                            <Card.Text>
                            Open Your Box and Mint Your Nft
                            </Card.Text>
                            <Button onClick={this.MintNft} variant="primary">Mint</Button>
                        </Card.Body>
                        </Card>
                </header>
                <NotificationContainer/>
           </div>
           
        )
    }
}