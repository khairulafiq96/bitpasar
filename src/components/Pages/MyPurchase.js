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

        const displayButton = (mypurchases) => {
            if(Object.keys(mypurchases).length === 0){
                return <div> There are no recent purchases</div>
            }
        }

        return (
                <div>
                   {toHome()}
                    My purchase
                    <br></br>
                    <br></br>
                    {user && user['mypurchases'] ?
                                        <div>
                                            {displayButton(user['mypurchases'])}
                                            {Object.keys(user['mypurchases']).map((item)=>
                                                <div key={item}>
                                                    <div className="itemImage">
                                                        <img src={user['mypurchases'][item]['images']}></img>
                                                    </div>
                                                    <div>{user['mypurchases'][item]['title']}</div>
                                                    <div>{user['mypurchases'][item]['itemprice']} ETH</div>
                                                    <div>Status : {user['mypurchases'][item]['status']}</div>
                                                    <div>Date of purchase : {user['mypurchases'][item]['timestamp']}</div>
                                                    <div>{user['mypurchases'][item]['shortdescription']}</div>
                                                    <div>Order Id : {item}</div>
                                                    <div>
                                                        Seller Contact Details
                                                        <div>{user['mypurchases'][item]['ownername']}</div>
                                                        <div>{user['mypurchases'][item]['ownerphonenum']}</div>
                                                        <div>{user['mypurchases'][item]['ownerwallet']}</div>
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