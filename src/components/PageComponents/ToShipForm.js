import React, {Component} from "react";
import { handleUpdateOrderTracker } from "../../actions";
import {connect} from 'react-redux'

class ToShipForm extends Component{

    state = {
        trackingnumber : null,
    }

    handleTrackingNumber(event){
        event.preventDefault()
        const val = event.target.value;
        this.setState({
            trackingnumber: val
        })
    }

    render(){

        const {item, user} = this.props
        const {trackingnumber} = this.state

        const updateTracker = async (orderid, trackerid) => {
            if(trackerid){
                await this.props.dispatch(handleUpdateOrderTracker(orderid, trackerid))
            }
            else {
                window.alert("Please update the tracking number to ship out the order.")
            }
        }

        return(<div className="flex flex-col space-x-0 space-y-2 p-5
                               sm:flex-row sm:space-x-5 sm:space-y-0 sm:p-5 sm:min-w-[300px] 
                               box bg-slate-200">
                    <div className="flex flex-col items-center space-y-2 sm:w-1/3">
                        <div className="flex items-center justify-center box bg-white p-2 w-full">
                                <img className="object-scale-down h-[170px]" src={user['myorders'][item]['images']}></img>
                        </div>
                        <div className="bitpasar_text underline">
                            {user['myorders'][item]['title']}
                        </div>
                        <div className="bitpasar_text underline">
                            {user['myorders'][item]['itemprice']} ETH
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2 break-words">
                        <div>
                            <div className="bitpasar_text text-sm sm:text-base">
                                Order Id
                            </div>
                            <div className="bitpasar_subtext text-xs sm:text-sm ">
                                {item}
                            </div>
                        </div>
                        <div>
                            <div className="bitpasar_text text-sm sm:text-base">
                                Status
                            </div>
                            <div className="bitpasar_subtext text-xs sm:text-sm">
                                {user['myorders'][item]['status']}
                            </div>
                        </div>
                        <div className="sm:w-[360px] flex flex-col space-y-2">
                            <div className='bitpasar_text text-sm sm:text-base underline'>
                                Buyer Details
                            </div>
                            <div className="bitpasar_subtext text-xs sm:text-sm">
                                <div>{user['myorders'][item]['buyername']}</div>
                                <div>{user['myorders'][item]['buyerphonenum']}</div>
                                <div>{user['myorders'][item]['buyerwallet']}</div>
                            </div>
                            <div className="bitpasar_subtext text-xs sm:text-sm">
                                <div>{user['myorders'][item]['address1']}, {user['myorders'][item]['address2']}</div>
                                <div>{user['myorders'][item]['zipcode']} , {user['myorders'][item]['city']} , {user['myorders'][item]['state']}</div>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-5 pt-3 ">
                            <input type="text" placeholder="Tracking Number" onChange={(e)=>this.handleTrackingNumber(e)}></input>
                            <div className="flex justify-center ">
                                <button onClick={()=>updateTracker(item, trackingnumber)}>Ship Item</button>
                            </div>
                        </div>
                    </div>
            </div>)
    }
}

function mapStateToProps({user}) {
    return {
      user
    }
  }


export default connect(mapStateToProps)(ToShipForm)