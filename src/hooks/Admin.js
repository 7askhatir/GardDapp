import { Component } from "react";
import { Admin } from "./AdminLouttry";
import { AdminNFTLottry } from "./NFTLottryAdmin";
import { AdminPFPLottry } from "./PFPLottryAdmin";

export class AdminA extends Component {
    render() {
        return(<div>
            <Admin/>
            <AdminNFTLottry/>
            <AdminPFPLottry/>
        </div>)
    }
}