import { Web3Modal, useAccount } from "@web3modal/react";
import { chains, providers } from '@web3modal/ethereum'
import React, {Component} from "react";


class web3modal extends Component {
    modalConfig = {
        theme : "dark",
        accentColor : "default",
        ethereum : {
            appName: 'web3Modal',
            autoConnect: true,
            chains: [
              chains.goerli,
              chains.polygonMumbai,
            ],
            providers : [providers.walletConnectProvider({projectId : "c2b975a1e9bc302f69b3adf13a2c3f4b"})]
        },
        projectId : "c2b975a1e9bc302f69b3adf13a2c3f4b"

    }
    

    

    render(){

        function Home () {
            const {account, address, isConnected} = useAccount()
            return <div> Connected: <span>{account.isConnected  ? 'Yes' : 'No'}</span></div>
        }

     

        return(
            <>
            <div>Web3 Modal</div>
            <Web3Modal config={this.modalConfig} ></Web3Modal>
            </>
        )
    }
}

export default web3modal