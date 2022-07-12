import { Component } from "react";
import {Navbar,Nav,Badge,Container} from 'react-bootstrap'
import { NFT } from "../hooks/nft";
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import { Lottery } from "../hooks/box";
import { Admin } from "../hooks/AdminLouttry"
import Web3 from 'web3';
import { Home } from "../hooks/Home";
import { GenarateLouttry } from "../hooks/GeneraleLouttry";
import { PFPLouttry } from "../hooks/PFPLouttry";
import { NFTLouttry } from "../hooks/NFTLouttry";
import { AdminA } from "../hooks/Admin";


export class NabBarCompanant extends Component {
    constructor(props) {
		super(props);
      this.state = {
        numberOfNft:0,
        balance:0

    }
    this.Balance();

}
    

    
       NftByOwner = async() => {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const contract_abi=require('./../abiContrat.json');
        const contract_address="0xCA71d3FCA5D65Ce3C4aEaa588Dbe3118657dF73a";
        const NameContract =new web3.eth.Contract(contract_abi, contract_address);
        const user=await web3.eth.getAccounts();
        const numver=await NameContract.methods.walletOfOwner(user[0]).call(function(res,err){
            
        });
        this.setState({numberOfNft:numver.length})
       
       }
       Balance= async() => {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const contract_abi=require('./../GardIno.json');
        const contract_address="0xA9B20bAD2543ED2f8cc7C8d4E6F3C2376d10134E";
        const NameContract =new web3.eth.Contract(contract_abi, contract_address);
        const user=await web3.eth.getAccounts();
        const numver=await NameContract.methods.balanceOf(user[0]).call(function(res,err){
        });
        this.setState({balance:numver})


       
       }
    render(){
        return(
        <div>
            <Router>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="#home">Guard Inu</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link href="/">Nfts <Badge bg="secondary">{this.state.numberOfNft}</Badge></Nav.Link>
                <Nav.Link href="Nft">Mint NFT</Nav.Link>
                <Nav.Link href="Lottery">Lottery</Nav.Link>
                <Nav.Link href="Generate">General Lottery</Nav.Link>
                <Nav.Link href="NFTLottry">NFT Lottery</Nav.Link>
                <Nav.Link href="FPF">FPF Lottery</Nav.Link>
                <Nav.Link href="Admin">Admin</Nav.Link>

                </Nav>
            </Navbar.Collapse>
            <Navbar.Brand href="#home">Guard Balance : {this.state.balance/1000000000000000000}</Navbar.Brand>

            </Container>
            </Navbar>
            <Routes>
                 <Route exact path='/' element={< Home />}></Route>
                 <Route exact path='/Nft' element={< NFT />}></Route>
                 <Route exact path='/Lottery' element={< Lottery />}></Route>
                 <Route exact path='/Generate' element={< GenarateLouttry />}></Route>
                 <Route exact path='/Admin' element={< AdminA />}></Route>
                 <Route exact path='/FPF' element={< PFPLouttry />}></Route>
                 <Route exact path='/NFTLottry' element={< NFTLouttry />}></Route>
          </Routes>
          </Router>
        </div>

        )
    }
}