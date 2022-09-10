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

        return(<div>
                    {JSON.stringify(this.state)}
                    <div className="itemImage">
                            <img src={user['myorders'][item]['images']}></img>
                    </div>
                    <div>{user['myorders'][item]['title']}</div>
                    <div>{user['myorders'][item]['itemprice']} ETH</div>
                    <div>Status : {user['myorders'][item]['status']}</div>
                    <div>Buyer Name : {user['myorders'][item]['buyername']}</div>
                    <div>Buyer Contact Details : {user['myorders'][item]['buyerphonenum']}</div>
                    <div>Buyer Wallet : {user['myorders'][item]['buyerwallet']}</div>
                    <div>Shipping Address : {user['myorders'][item]['address1']}</div>
                    <div>{user['myorders'][item]['address2']}</div>
                    <div>{user['myorders'][item]['city']}</div>
                    <div>{user['myorders'][item]['state']}</div>
                    <div>{user['myorders'][item]['zipcode']}</div>
                    <div>Buyer Wallet : {user['myorders'][item]['buyerwallet']}</div>
                    <input type="text" placeholder="Tracking Number" onChange={(e)=>this.handleTrackingNumber(e)}></input>
                    <br></br>
                    <button onClick={()=>updateTracker(item, trackingnumber)}>Ship Item</button>
                    <br></br>
                    <br></br>
            </div>)
    }
}

function mapStateToProps({user}) {
    return {
      user
    }
  }


export default connect(mapStateToProps)(ToShipForm)