import React, {Component} from 'react'
import {connect} from 'react-redux';
import {ethers} from 'ethers'
import { setSignedInUser } from '../../actions/users';

class WalletConnect extends Component {

    state = {
        address : null,
        balance : null
    } 

    render(){

        const {user} = this.props

        const connectWalletHandler = () => {
            if (window.ethereum && window.ethereum.isMetaMask) {
                console.log('MetaMask Here!');

                window.ethereum.request({method: 'eth_requestAccounts'}).then(result=>{
                    
                    this.props.dispatch(setSignedInUser(result))

                }
                )
    
            } else {
                console.log('Need to install MetaMask');
                window.alert('Please install MetaMask browser extension to interact');
            }
        }


        return(
            <div>
                <button 
                    className=" text-xs bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={connectWalletHandler}
                    >Connect Wallet</button>
                
                {JSON.stringify(this.props.user)}
            </div>
        )
    }

}

function mapStateToProps({user}) {
    return {
      user
    }
  }



export default connect(mapStateToProps)(WalletConnect)