import React, {Component} from 'react'
import {connect} from 'react-redux';
import {ethers} from 'ethers'
import { setSignedInUser,getUserBalance } from '../../actions/users';

class WalletConnect extends Component {


    render(){

        const {user} = this.props

        const connectWalletHandler = () => {
            if (window.ethereum && window.ethereum.isMetaMask) {
                console.log('MetaMask Here!');

                window.ethereum.request({method: 'eth_requestAccounts'}).then(result=>{
                    
                    //Just to dispatch account
                    accountChangedHandler(result)

                }
                ).catch(error =>{
                    window.alert(error.message)
                })
    
            } else {
                console.log('Need to install MetaMask');
                window.alert('Please install MetaMask browser extension to interact');
            }
        }

        const getAccountBalance = (account) => {
            //console.log("Running Account balance")
            window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
            .then(balance => {
                console.log((ethers.utils.formatEther(balance)))
                this.props.dispatch(getUserBalance(ethers.utils.formatEther(balance)));
            })
            .catch(error => {
                window.alert(error.message);
            });
        };

        //converting address to a shorter version
        const displayAddress = (address) => {
            const len = address.length
            const finalString = address.substring(0,5) + "..." + address.substring((len-5),len)
            return finalString
        }

        //dispatching account
        const accountChangedHandler = (result) => {
            this.props.dispatch(setSignedInUser(result))
            getAccountBalance(result.toString())
            //window.location.reload();
        }

        //To refresh page when chain is chabged
        const chainChangedHandler = () => {
            //console.log("Changing account")
            getAccountBalance(this.props.user.address)
            //window.location.reload();
        }

        //Listener when account is changed and dispatching the value
        window.ethereum.on('accountsChanged', accountChangedHandler);

        //Listener when chain is changed
        window.ethereum.on('chainChanged', chainChangedHandler) 


        return(
            <div>
                {user ?
                       <button className=" text-xs bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            {displayAddress(user.address)} 
                        </button>
                      : <button 
                            className=" text-xs bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={connectWalletHandler}>
                                Connect Wallet
                        </button>}
                

                
                
               
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