import { Component } from "react";
import {Card ,ListGroup ,ListGroupItem ,Row ,Column ,Col,Container,Button} from "react-bootstrap";
import Web3 from 'web3';

function newFonction(to){
  console.log(to);
}
export class Home extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
          nfts:[]
        }
        this.NftAllByOwner();
        
    }
    

    NftAllByOwner= async() => {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const contract_abi=require('./../abiContrat.json');
        const contract_address="0x1e7EC0Da70099B38CC10690d208b643289f1B63f";
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
          console.log(o);

        }
        this.setState({nfts:nftArray})
       
    }

    UpgradeNft = async(tokenId) => {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const contract_abi=require('./../abiContrat.json');
      const contract_address="0x1e7EC0Da70099B38CC10690d208b643289f1B63f";
      const NameContract =new web3.eth.Contract(contract_abi, contract_address);
      const user=await web3.eth.getAccounts();
      const numver=await NameContract.methods.upgradeNft(tokenId).send({from:user[0]},function(res,err){
        console.log(err);
        console.log(res);
      });
      
     
  }
 

  ChargePoint = async(tokenId) => {
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    const contract_abi=require('./../abiContrat.json');
    const contract_address="0x1e7EC0Da70099B38CC10690d208b643289f1B63f";
    const NameContract =new web3.eth.Contract(contract_abi, contract_address);
    const user=await web3.eth.getAccounts();
    const numver=await NameContract.methods.chargePoints(tokenId).send({from:user[0]},function(res,err){
      console.log(err);
      console.log(res);
    });
    
   
}
       fromTokrnToType =(tokenId)=>{
         var type ="";
         if(tokenId%10==0) type="Simple";
         else if(tokenId%10==1) type="Tier 1 PFP";
         else if(tokenId%10==2) type="Tier 2 PFP";
         else if(tokenId%10==3) type="Tier 3 PFP";
         else if(tokenId%10==4) type="Tier 4 PFP";
         else if(tokenId%10==5) type="Tier 5 PFP";
         else if(tokenId%10==6) type="Tier 6 PFP";
         else if(tokenId%10==7) type="Tier 7 PFP";


         return type;

       }
       LevelTokrn =(level)=>{
        var type ="";
        if(level==1) type="Bronze";
        else if(level==2) type="Silver";
        else if(level==3) type="Gold";
        else if(level==4) type="Diamond";
        return type;
      }
    fromShieldToString =(shi) =>{
      return shi?"Shield": "no Shield";
    }

     
   render(){
    let NewArray=this.state.nfts
    return(
        <Container>
            <br></br>
          <Row>
             {
        NewArray.map(
         (nft,index) => 
         <Col key={index}>
        <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/2/24/NFT_Icon.png" />
      <Card.Body>
        <Card.Title>Token Id : {nft.id}</Card.Title>
      
      </Card.Body>
      <ListGroup className="list-group-flush">
      <ListGroupItem>Type Of Nft : {this.fromTokrnToType(nft.id)}</ListGroupItem>
        <ListGroupItem>Number Of Hearts : {nft.hearts}</ListGroupItem>
        <ListGroupItem>Point : {nft.points}</ListGroupItem>
        <ListGroupItem>Level : {this.LevelTokrn(nft.level)}</ListGroupItem>
        <ListGroupItem>Shield : {this.fromShieldToString(nft.Shield)}</ListGroupItem>
        <ListGroupItem>URI {nft.uri} </ListGroupItem>
      </ListGroup>
      <Card.Body>
        <Button  onClick={() => {
            this.UpgradeNft(nft.id)}}
           >Upgrade Nft</Button>
        <Button>Charge Hearts</Button>
        <Button onClick={() => {
            this.ChargePoint(nft.id)}}>Charge Points</Button>
      </Card.Body>
    </Card>
        </Col>

        )
       }
          </Row>
           
           
  
        {/*  */}
    

    
</Container>



    )
   }
}