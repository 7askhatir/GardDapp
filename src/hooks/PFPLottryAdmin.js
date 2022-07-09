import { Component } from "react";
import {Button ,Form   ,ListGroup } from 'react-bootstrap'
import Web3 from 'web3';

export class AdminPFPLottry extends Component {
  constructor(props) {
    super(props);
    this.stateLouttry();
    this.getIdTicketWinner()

  }
  state = {louttyState:"" ,number:0,ticketW:[]};

  stateLouttry  =  async () => {
    
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    const contract_abi=require('./../PFPLouttry.json');
    const contract_address="0x7fab30c02675ba2f9ce7278f965fa2a47326f718";
    const NameContract =new web3.eth.Contract(contract_abi, contract_address);
    const user=await web3.eth.getAccounts();
    const numver=await NameContract.methods.lotteryState().call(function(err,res){
     
    });
  
  this.setState({louttyState:numver});
  }

  startLouttry  =  async () => {
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    const contract_abi=require('./../PFPLouttry.json');
    const contract_address="0x7fab30c02675ba2f9ce7278f965fa2a47326f718";
    const NameContract =new web3.eth.Contract(contract_abi, contract_address);
    const user=await web3.eth.getAccounts();
    const numver=await NameContract.methods.startNewLouttry().send({from: user[0]},function(err, res){
    });
  }
  GenerateRandumFromChainLink = async (e)=>{
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    const contract_abi=require('./../PFPLouttry.json');
    const contract_address="0x7fab30c02675ba2f9ce7278f965fa2a47326f718";
    const NameContract =new web3.eth.Contract(contract_abi, contract_address);
    const user=await web3.eth.getAccounts();
    const numver=await NameContract.methods.requestRandomWords(e).send({from: user[0]},function(err, res){
    });
  }
  GenerateWinners= async()=>{
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    const contract_abi=require('./../PFPLouttry.json');
    const contract_address="0x7fab30c02675ba2f9ce7278f965fa2a47326f718";
    const NameContract =new web3.eth.Contract(contract_abi, contract_address);
    const user=await web3.eth.getAccounts();
    const numver=await NameContract.methods.generateRandomWinners().send({from: user[0]},function(err, res){
    });
  }
  getIdTicketWinner=  async()=>{
    let array = [];
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    const contract_abi=require('./../PFPLouttry.json');
    const contract_address="0x7fab30c02675ba2f9ce7278f965fa2a47326f718";
    const NameContract =new web3.eth.Contract(contract_abi, contract_address);
    const user=await web3.eth.getAccounts();
    const numver=await NameContract.methods.getWinnerTicket().call({from: user[0]},function(err, res){
      
    });
    this.setState({ticketW:numver})
  }
  
 render() {
  var button;
  if (this.state.louttyState==1) {
    button = <div>
      <Button onClick={() => this.startLouttry()}>Start New Louttry</Button>
      <br></br><br></br><br></br>
      <h4>Last Winners</h4>

      <ListGroup  style={{ width: '40rem' ,margin : 'auto' }} as="ol" numbered>
      {this.state.ticketW.map((nft,index) => <ListGroup.Item as="li">Ticket : {nft}</ListGroup.Item>)}
  
</ListGroup>
      </div>;
  } else if(this.state.louttyState==0) {
    button = <Form>

    <br></br><br></br>
      <Form.Group style={{ width: '25rem' ,margin : 'auto' }} className="mb-3" controlId="formBasicPassword">
        <Form.Label>Number Of winners</Form.Label>
        <Form.Control type="number" onChange={(e) => this.setState({number:e.target.value})} placeholder="Number" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
      </Form.Group>
      <Button onClick={(e) => this.GenerateRandumFromChainLink(this.state.number)} variant="primary" >
        Generate random winner
      </Button>
    </Form>;
  }
  else if(this.state.louttyState==2){
  button= <div><Button onClick={(e) => this.GenerateWinners()} variant="primary">Generate Ticket Winners</Button> </div>;
 
  
  }
    return(
      
        <div>
            <br></br>
            <h1>FPF Lottry</h1>
            <br></br>

            <div>
            {button}
            </div>

       

        </div>
    )
 }
}