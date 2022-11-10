import React, {Component} from 'react'
import {connect} from 'react-redux';
import {ethers} from 'ethers'
import { setSignedInUser,getUserBalance } from '../../actions/users';
import { handleGetUserDetails } from "../../actions";
import { NavLink } from 'react-router-dom';
import { convertUserId } from '../../Utility/general';

class WalletConnect extends Component {

    state = {
        renderDropdown : false
    }

    //For future enhancement : https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
    displayDropdown(renderDropdown){
        this.setState({
            renderDropdown : !renderDropdown
        })
    }

    renderDropdownItems(address){
        if(this.state.renderDropdown){
            return(
                <div className='flex flex-col box_background absolute space-y-2'>
                    <NavLink onClick={()=>this.displayDropdown(this.state.renderDropdown)} 
                             className='px-2 py-1 hover:bg-amber-200' exact to ={"/profile/" + address}>My Profile</NavLink>
                    <NavLink onClick={()=>this.displayDropdown(this.state.renderDropdown)} 
                             className='px-2 py-1 hover:bg-amber-200'  exact to ={"/profile/purchase/"+address}>My Purchase</NavLink>
                    <NavLink onClick={()=>this.displayDropdown(this.state.renderDropdown)} 
                             className='px-2 py-1 hover:bg-amber-200' exact to ={"/dashboard/"+address}>My Orders</NavLink>
                    <NavLink onClick={()=>this.displayDropdown(this.state.renderDropdown)} 
                             className='px-2 py-1 hover:bg-amber-200' exact to ={"/ads/"+address}>My Ads</NavLink>
                </div>
            )
        }
    }

    async componentDidMount(){
        const {dispatch, wallet, user} = this.props
        const userId = convertUserId(user)
        if (wallet.isConnected === false || !userId){
            await dispatch(handleGetUserDetails(wallet.address))}
    }


    render(){

        const {user,wallet} = this.props
        const {renderDropdown} = this.state

        //converting address to a shorter version
        const displayAddress = (address) => {
            const len = address.length
            const finalString = address.substring(0,5) + "..." + address.substring((len-5),len)
            return finalString
        }


        return(
            <div>
                {wallet.isConnected ?<div>
                            <button title={wallet.address}
                                    onClick={()=>this.displayDropdown(renderDropdown)} 
                                    className=" text-xs hover:bg-blue-500 bg-bitpasar text-white py-2 px-4">
                                    {displayAddress(wallet.address)}
                            </button>
                            {renderDropdown ? this.renderDropdownItems(wallet.address) : <div></div>}
                        </div>
                      :<></>}
                

                
                
               
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