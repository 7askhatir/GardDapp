import { Component } from "react";
import {Navbar,Nav,Badge,Container} from 'react-bootstrap'
import { NFT } from "../hooks/nft";
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import { Box } from "../hooks/box";
import Web3 from 'web3';
import { Home } from "../hooks/Home";


export class NabBarCompanant extends Component {
    constructor(props) {
		super(props);
	  this.NumberOfBox();
      this.NftByOwner();
      this.state = {
        numberOfBox:0,
        numberOfNft:0,

    }}
    

    NumberOfBox= async() => {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const contract_abi=require('./../abiContrat.json');
        const contract_address="0x1e7EC0Da70099B38CC10690d208b643289f1B63f";
        const NameContract =new web3.eth.Contract(contract_abi, contract_address);
        const user=await web3.eth.getAccounts();
        const numver=await NameContract.methods.getNumberOfBoxByOwne(user[0]).call();
       this.setState({numberOfBox:numver})
       }
       NftByOwner= async() => {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const contract_abi=require('./../abiContrat.json');
        const contract_address="0x2E6e71D747e575D8be7F1a464713f27618Bc377b";
        const NameContract =new web3.eth.Contract(contract_abi, contract_address);
        const user=await web3.eth.getAccounts();
        const numver=await NameContract.methods.walletOfOwner(user[0]).call(function(res,err){
            
        });
        this.setState({numberOfNft:numver.length})
       
       }
    render(){
        return(
        <div>
            <Router>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="#home">GardIno</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link href="/">Nfts <Badge bg="secondary">{this.state.numberOfNft}</Badge></Nav.Link>
                <Nav.Link href="Box">Box <Badge bg="secondary">{this.state.numberOfBox}</Badge></Nav.Link>
                <Nav.Link href="Nft">Mint NFT</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
            </Navbar>
            <Routes>
                 <Route exact path='/' element={< Home />}></Route>
                 <Route exact path='/Nft' element={< NFT />}></Route>
                 <Route exact path='/Box' element={< Box />}></Route>
          </Routes>
          </Router>
        </div>

        )
    }
}