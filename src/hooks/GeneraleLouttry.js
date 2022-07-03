import {Component} from 'react';
import {Card ,ListGroup ,ListGroupItem ,Row ,Column ,Col,Container,Button} from "react-bootstrap";
import Web3 from 'web3';
export class GenarateLouttry extends Component {
    constructor(props) {
        super(props);
            this.isAleredyExist();
            this.GetTicketByUser();
      }
      state = {isAleredyExist:false ,ticketId:0,from:0,to:0 };
    isAleredyExist  =  async () => {
        let array = [];
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const contract_abi=require('./../generateL.json');
        const contract_address="0x57204fcE36084A2257a72eD71beBC8D9d752c8e7";
        const NameContract =new web3.eth.Contract(contract_abi, contract_address);
        const user=await web3.eth.getAccounts();
        const numver=await NameContract.methods.checkUseralreadyParticipating().call({from: user[0]},function(err, res){
        });
        this.setState({isAleredyExist:numver})
      }
      Enter  =  async () => {
        let array = [];
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const contract_abi=require('./../generateL.json');
        const contract_address="0x57204fcE36084A2257a72eD71beBC8D9d752c8e7";
        const NameContract =new web3.eth.Contract(contract_abi, contract_address);
        const user=await web3.eth.getAccounts();
        const numver=await NameContract.methods.enterToLoutry().send({from: user[0]},function(err, res){
        });
        this.setState({isAleredyExist:numver});
        
      }
      GetTicketByUser  =  async () => {
        let array = [];
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const contract_abi=require('./../generateL.json');
        const contract_address="0x57204fcE36084A2257a72eD71beBC8D9d752c8e7";
        const NameContract =new web3.eth.Contract(contract_abi, contract_address);
        const user=await web3.eth.getAccounts();
        const numver=await NameContract.methods.getTicketByUser().call({from: user[0]},function(err, res){
        });
        console.log(numver);
        this.setState({ticketId:numver.idTickets,from:numver.from,to:numver.to})

      }
     
render() {
    return (
        <div>
        <div>
             <br></br>
            <h1>Genarate Louttry</h1>
            <br></br>
            {this.state.isAleredyExist?(<div >
             <h3>Your ticket</h3>
             <br></br>
             <Card style={{ width: '18rem' , margin:'auto' }}>
      <Card.Img variant="top" src="https://media.istockphoto.com/vectors/person-holding-a-winning-lottery-ticket-vector-id1291862179?k=20&m=1291862179&s=612x612&w=0&h=uUBGRfzjh1YcD_htmpgrftCA6RQ8o4sX9odW7KX0J3k=" />
      <Card.Body>
        <Card.Title>Ticket Id :{this.state.ticketId}</Card.Title> 
      </Card.Body>
      <ListGroup className="list-group-flush">
      <ListGroupItem>From : {this.state.from} </ListGroupItem>
        <ListGroupItem>To : {this.state.to} </ListGroupItem>
      </ListGroup>
    </Card>
            </div>):(   <div>
        <header>
                    <br></br><br></br>
                <Card style={{ width: '25rem' }} className="m-auto">
                        <Card.Img variant="top" src="https://i.imgur.com/pe5Bf8B.png" />
                        <Card.Body>
                            <Card.Title>Enter to this Louttry</Card.Title>
                            <Button onClick={() => {
                  this.Enter();
               }}  variant="primary">Enter</Button>
                        </Card.Body>
                        </Card>
                </header>
        </div>)}
            
        </div>
     

    
           
        </div>
    )
}
}