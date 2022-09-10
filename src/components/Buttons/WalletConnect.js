import React, {Component} from 'react'
import {connect} from 'react-redux';
import {ethers} from 'ethers'
import { setSignedInUser,getUserBalance } from '../../actions/users';
import { handleGetUserDetails } from "../../actions";
import { NavLink } from 'react-router-dom';

class WalletConnect extends Component {

    state = {
        renderDropdown : false
    }

    displayDropdown(renderDropdown){
        this.setState({
            renderDropdown : !renderDropdown
        })
    }

    renderDropdownItems(address){
        if(this.state.renderDropdown){
            return(
                <div className='bg-amber-200'>
                    <NavLink className='border-solid border-2 border-black' exact to ={"/profile/" + address}>My Profile</NavLink>
                    <br></br>
                    <NavLink className='border-solid border-2 border-black' exact to ={"/profile/purchase/"+address}>My Purchase</NavLink>
                    <br></br>
                    <NavLink className='border-solid border-2 border-black' exact to ={"/dashboard/"+address}>My Dashboard</NavLink>
                </div>
            )
        }
    }


    render(){

        const {user,dispatch} = this.props
        const {renderDropdown} = this.state

        

        const connectWalletHandler = async () => {
            if (window.ethereum && window.ethereum.isMetaMask) {
                console.log('MetaMask Here!');

                await window.ethereum.request({method: 'eth_requestAccounts'}).then(result=>{
                    
                    //Just to dispatch account
                    console.log(result)
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
        const accountChangedHandler = async (result) => {
            this.props.dispatch(setSignedInUser(result))
            await dispatch(handleGetUserDetails(result.toString()))
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
                {user ?<div>
                            <button onClick={()=>this.displayDropdown(renderDropdown)} className=" text-xs bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    {displayAddress(user.address)}
                            </button>
                            {renderDropdown ? this.renderDropdownItems(user.address) : <div></div>}
                        </div>
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