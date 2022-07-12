import {Component,useState} from 'react';
import {Card ,Modal,ListGroup ,ListGroupItem ,Row ,Column ,Col,Container,Button} from "react-bootstrap";
import Web3 from 'web3';
export let data={token:"",nft:0}
let array = [];
export  function Example() {
    const [smShow, setSmShow] = useState(false);
    const [lgShow, setLgShow] = useState(false);
    const selectNft=(e)=>{
       
      data.nft=e;
      setLgShow(false);
      
      
    }
  const test = async () =>{
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    const contract_abi=require('./../abiContrat.json');
    const contract_address="0xCA71d3FCA5D65Ce3C4aEaa588Dbe3118657dF73a";
    const NameContract =new web3.eth.Contract(contract_abi, contract_address);
    const user=await web3.eth.getAccounts();
    const numver=await NameContract.methods.walletOfOwner(user[0]).call(function(res,err){
    });
   
    let nftArray = [];
    for(let i=0;i<numver.length;i++){
      var nftPro= await NameContract.methods.getNftById(numver[i]).call();
      const uri=await NameContract.methods.tokenURI(nftPro.id).call();
      var o = {
        'id':nftPro.id,
        'Type':nftPro.Type,
        'level':nftPro.level,
        'hearts':nftPro.hearts,
        'points':nftPro.points,
        'Shield':nftPro.Shield,
        'uri':uri
        
      };
      nftArray.push(o);

    }
    array= nftArray;
  }
  
  test();
  var divStyles = {
    boxShadow: '1px 2px 9px green',
    margin: '1em',
    cursor: 'pointer',
    padding: '1em',

  };
  var simpleDtyle={
    margin: '1em',
    cursor: 'pointer',
    padding: '1em',
  }
  function Type(type){
    if(type == 0) return "Simple";
    else return "PFP "+(type-1);
  }
    return (
      <>
                  <br></br>

        <Button onClick={() => setLgShow(true)}>Select your Nft</Button>

        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Select Your NFT
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Row>
          {array.map((e, index) =>
            <Col style={data.nft==array[index].id?divStyles:simpleDtyle}>
            <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/2/24/NFT_Icon.png" />
          <Card.Body>
            <Card.Title> {array[index].id}</Card.Title> 
            <Card.Text>
              Number Of hearts : {array[index].hearts}
            </Card.Text>
            <Card.Text>
              Type : {Type(array[index].Type)}
            </Card.Text>
            <Button variant="primary" onClick={() => {
             selectNft(array[index].id);
          }}>Select this NFT</Button>
          </Card.Body>
        </Card>
          </Col>
            )}
          </Row>
            
          
          </Modal.Body>
        </Modal>
      </>
    );
  }
export class PFPLouttry extends Component {
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
        const contract_abi=require('./../PFPLouttry.json');
        const contract_address="0x7fAb30c02675Ba2F9ce7278f965fA2a47326F718";
        const NameContract =new web3.eth.Contract(contract_abi, contract_address);
        const user=await web3.eth.getAccounts();
        const numver=await NameContract.methods.checkUseralreadyParticipating().call({from: user[0]},function(err, res){
        });
        this.setState({isAleredyExist:numver})
      }
      Enter  =  async () => {
        console.log(data);

        let array = [];
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const contract_abi=require('./../PFPLouttry.json');
        const contract_address="0x7fAb30c02675Ba2F9ce7278f965fA2a47326F718";
        const NameContract =new web3.eth.Contract(contract_abi, contract_address);
        const user=await web3.eth.getAccounts();
        const numver=await NameContract.methods.enterToLoutry(data.nft).send({from: user[0]},function(err, res){
        });
        this.setState({isAleredyExist:numver});
        
      }
      GetTicketByUser  =  async () => {
        let array = [];
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const contract_abi=require('./../PFPLouttry.json');
        const contract_address="0x7fAb30c02675Ba2F9ce7278f965fA2a47326F718";
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
            <h1>PFP Lottery</h1>
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
                    <Example />

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