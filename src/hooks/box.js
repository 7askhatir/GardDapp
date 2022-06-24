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
export class Box extends Component {

    constructor(props) {
		super(props);
	  this.ConnectContrat();
      this.state = {
        numberOfBox :0
      }

    }
    
     ConnectContrat= async() => {
    
       }

       ByBox =  async() => {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const contract_abi=require('./../abiContrat.json');
        const contract_address="0x2E6e71D747e575D8be7F1a464713f27618Bc377b";
        const NameContract =new web3.eth.Contract(contract_abi, contract_address);
        const user=await web3.eth.getAccounts();
        await NameContract.methods.ByBox().send({from: user[0], gas: 3000000, value: 100}, function(err, res){
            if(err == null){
                NotificationManager.success('Error message', 'Click me!', 200000, () => {
                    // confirm("Do you want to save changes?");
                    // alert()
                  });
            }
            else{
                NotificationManager.warning('Erreur in this transaction ', 'Close after 3000ms', 3000);
            }
        });

       }

      

render(){
    return(
        <div>
        <header>
            <br></br><br></br>
        <Card style={{ width: '25rem' }} className="m-auto">
                <Card.Img variant="top" src="https://public.nftstatic.com/static/nft/zipped/2928a4dfa6354f3b8445c2d251527ce1_zipped.jpeg" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button onClick={this.ByBox} variant="primary">By new Box 10£</Button>
                </Card.Body>
                </Card>
        </header>
        <NotificationContainer/>
   </div>
    );
}
}