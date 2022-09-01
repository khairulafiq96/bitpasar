import React,{Component} from "react";
import {connect} from 'react-redux'
import '../Styles/Item.css'
import { Redirect } from 'react-router-dom';

class VerifyPurchase extends Component {

    state = {
        redirectToPurchase : false,
        redirectToBuyNow : false
    }

    handleProceedPayment(purchase){
        if(purchase){
            this.setState({redirectToPurchase : true})
        }
    }

    //Redirects user to buy now/edit details page
    handleBackButton(){
        this.setState({redirectToBuyNow : true})
       
    }

    


    render(){

        const {purchase,items} = this.props
        const {itemId} = this.props.match.params
        const {redirectToPurchase, redirectToBuyNow} = this.state

        function renderRedirectToPurchase(){
            if(redirectToPurchase){
                return <Redirect exact to = {"/buynow/verifypurchase/payment/"+itemId} ></Redirect>
            }
        }

        function renderRedirectToBuyNow(){
            if(redirectToBuyNow){
                return <Redirect exact to = {"/buynow/"+itemId} ></Redirect>
            } 
        }

        function redirectToIndividualItem(){
            return <Redirect exact to = {"/item/"+itemId} ></Redirect>
        }

        const checkItems = () => {
            try {
                if(items[itemId] && purchase){
                   return true
                }
            } catch (e){
                return false
            } 
        }

        return (
            <div>
                {checkItems() ?
                                <div>
                                {renderRedirectToPurchase()}
                                {renderRedirectToBuyNow()}
                            
                                <div className="itemLargeImage">
                                    <img src={items[itemId]['images'][0]}></img>
                                </div>
                                <div>
                                    <div>{items[itemId]['title']}</div>
                                    <div> From :  {purchase['ownername']}</div>
                                    <div>Seller wallet : {purchase['ownerwallet']}</div>
                                    <div>Total Price : {purchase['totalprice']}</div>
                                </div>
                                <br></br>
                                <div>
                                    Ship to : 
                                    <br></br>
                                    <div>{purchase['buyername']}</div>
                                    <div>{purchase['buyerphonenum']}</div>
                                    <div>{purchase['address1']}</div>
                                    <div>{purchase['address2']}</div>
                                    <div>{purchase['city']}</div>
                                    <div>{purchase['state']}</div>
                                    <div>{purchase['zipcode']}</div>
                                </div>
                                <br></br>
                                <div>
                                    Postage Details :
                                    <br></br>
                                    <div>{purchase['postagename']}</div>
                                    <div>{purchase['postageprice']}</div>
                                </div>
                                <br></br>
                                <div>
                                    Payment details
                                    <br></br>
                                    Item : {items[itemId]['title']} , {items[itemId]['itemprice']} ETH
                                    <br></br>
                                    Postage : {purchase['postagename']} , {purchase['postageprice']} ETH
                                    <br></br>
                                    Total price : {purchase['totalprice']} 
                                </div>
                                <br></br>
                                <button onClick={()=>this.handleBackButton()}>Back</button>
                                <br></br>
                                <button onClick={()=>this.handleProceedPayment(purchase)}>Proceed to Payment</button>
                            </div>
                            :
                            redirectToIndividualItem()
                }
            </div>
        )
    }
}

function mapStateToProps({items,purchase}){
    return {
        items,
        purchase
    }
}

export default connect(mapStateToProps)(VerifyPurchase)