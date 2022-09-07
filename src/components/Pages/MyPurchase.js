import React, {Component} from "react";
import {connect} from 'react-redux';
import { Redirect } from "react-router-dom";
import { handleGetUserPurchases } from '../../actions';
import '../Styles/Item.css'

class MyPurchase extends Component {

    state = {
        redirectToHome : false
    }

    async componentDidMount(){
        if(this.props.user){
            this.setState({
                redirectToHome : false
            })
            await this.props.dispatch(handleGetUserPurchases(this.props.user['address']))
        }else{
            this.setState({
                redirectToHome : true
            })
        }
    }

    render(){

        const {user} = this.props
        const {redirectToHome} = this.state

        const toHome = () =>{
            if(redirectToHome === true){
                window.alert("Please connect to your wallet to access this page")
                return <Redirect exact to='/home'></Redirect>
            } 
        }

        return (
                <div>
                   {toHome()}
                    My purchase
                    <br></br>
                    <br></br>
                    {user && user['mypurchase'] ?
                                        <div>
                                            {Object.keys(user['mypurchase']).map((item)=>
                                                <div key={item}>
                                                    <div className="itemImage">
                                                        <img src={user['mypurchase'][item]['images']}></img>
                                                    </div>
                                                    <div>{user['mypurchase'][item]['title']}</div>
                                                    <div>{user['mypurchase'][item]['itemprice']} ETH</div>
                                                    <div>Status : {user['mypurchase'][item]['status']}</div>
                                                    <div>Date of purchase : {user['mypurchase'][item]['timestamp']}</div>
                                                    <div>{user['mypurchase'][item]['shortdescription']}</div>
                                                    <div>Order Id : {item}</div>
                                                    <div>
                                                        Seller Contact Details
                                                        <div>{user['mypurchase'][item]['ownername']}</div>
                                                        <div>{user['mypurchase'][item]['ownerphonenum']}</div>
                                                        <div>{user['mypurchase'][item]['ownerwallet']}</div>
                                                    </div>
                                                    <br></br>
                                                    <br></br>
                                                </div> 
                                            )}
                                        </div>
                                        : 
                                        <div>Loading ...</div>}
                </div>
                )
    }
}

function mapStateToProps({user}) {
    return {
        user
    }
}


export default connect(mapStateToProps)(MyPurchase)