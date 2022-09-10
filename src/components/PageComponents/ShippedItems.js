import React, {Component} from "react";
import {connect} from 'react-redux'

class ShippedItem extends Component{
    render(){

        const {user, key,item} = this.props

        return (<div>
                    <div>
                    <div className="itemImage">
                            <img src={user['myorders'][item]['images']}></img>
                    </div>
                        <div>{user['myorders'][item]['title']}</div>
                        <div>{user['myorders'][item]['itemprice']} ETH</div>
                        <div>Status : {user['myorders'][item]['status']}</div>
                        <div>Tracker ID : {user['myorders'][item]['trackerid']}</div>
                        <div>Buyer Name : {user['myorders'][item]['buyername']}</div>
                        <div>Buyer Contact Details : {user['myorders'][item]['buyerphonenum']}</div>
                        <div>Buyer Wallet : {user['myorders'][item]['buyerwallet']}</div>
                        <div>Shipping Address : {user['myorders'][item]['address1']}</div>
                        <div>{user['myorders'][item]['address2']}</div>
                        <div>{user['myorders'][item]['city']}</div>
                        <div>{user['myorders'][item]['state']}</div>
                        <div>{user['myorders'][item]['zipcode']}</div>
                        <div>Buyer Wallet : {user['myorders'][item]['buyerwallet']}</div>
                    </div>
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

export default connect(mapStateToProps)(ShippedItem)