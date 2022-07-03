import React, { Component ,useState } from 'react' ;
import 'react-notifications/lib/notifications.css';
import {render} from 'react-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Web3 from 'web3';
import {Navbar,
  Form,Row,Col,
        ListGroup,
        Modal,  
        Badge,
        Card,
        Button}
         from 'react-bootstrap';
         export let data={token:"",nft:0}

         export class Tkn extends Component {
          constructor(props) {
            super(props);
            this.getAllTokenForThisMonth();

          }
          state = {tokens:[]  };
          getAllTokenForThisMonth  =  async () => {
            let array = [];
            const web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
            const contract_abi=require('./../louttry.json');
            const contract_address="0xfB5E75D3521A88683B282E7E7d2D677c48636a4C";
            const NameContract =new web3.eth.Contract(contract_abi, contract_address);
            const user=await web3.eth.getAccounts();
            const numver=await NameContract.methods.getAllTokensForThisMounts().call(function(err,res){
              if(res!=null){
                 array=res;
               }
            });
          this.setState({tokens:array});
          }
           selectToken=(e)=>{
             data.token=e;
             console.log(data);
             this.getAllTokenForThisMonth();
          }

          getBalance= async (token) => {
            let balance;
            const web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
            const contract_abi=require('./../louttry.json');
            const contract_address="0xfB5E75D3521A88683B282E7E7d2D677c48636a4C";
            const NameContract =new web3.eth.Contract(contract_abi, contract_address);
            const user=await web3.eth.getAccounts();
            const numver=await NameContract.methods.checkBalanceToken(token,user).call(function(err,res){
              if(res!=null){
                balance=res
               }
            });
            return balance;
          }
          
          render() { 
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
            return ( 
              <div>
                {this.state.tokens.map((token) =>
                 <ListGroup.Item  style={data.token==token?divStyles:simpleDtyle} onClick={() => {
                  this.selectToken(token);
               }}
                 as="li"
                 className="d-flex justify-content-between align-items-start cursor-pointer"
                 >
                   <div className="ms-2 me-auto">
                     <div className="fw-bold"></div>
                     <Row>
                      <Col><h6>
                      {token}
                      </h6></Col>
                      <Col><h6>
                      Balace : {1}
                      </h6></Col>
                     </Row>
                                        
                     </div>
                 </ListGroup.Item>
                  )}
              </div>
             );
          }
         };
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
          return (
            <>
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
        
        

export class Lottery extends Component {
  enterToLouttry=()=>{
      console.log(data);
  }
    render(){
      return (<div >
        <br></br>
        <h2 style={{padding: " 10px"}}>
    Select your token <Badge bg="secondary">New</Badge>
  </h2> 
  <Form>
  <ListGroup as="ol" numbered style={{padding: "30px 30px"}}>
  <Tkn render={this.DataTest} />
  </ListGroup>
  </Form>
  <h2 style={{padding: " 10px"}}>
    select Your NFT <Badge bg="secondary">New</Badge>
  </h2> 
  <Example />
  <br></br><br></br>
  <Button variant="secondary" onClick={() => {
                     this.enterToLouttry();
                  }}>Enter in Loutter</Button>
       
      </div>)
    }
}