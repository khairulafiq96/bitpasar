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

        const {purchase,items,itemId} = this.props
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

        return (
            <div>
                {items && itemId in items && purchase?
                                <div className="flex 
                                                xs:flex-col xs:space-x-0 xs:space-y-5 
                                                lg:flex-row lg:w-full lg:space-x-5 lg:space-y-0 pb-5">
                                    {renderRedirectToPurchase()}
                                    {renderRedirectToBuyNow()}
                                    <div className="flex flex-col  
                                                    items-center sm:space-y-5">
                                        <div className="flex flex-col items-center h-min-1/2
                                                        box bg-white">
                                            <img src={items[itemId]['images'][0]}
                                                    className="bg-slate-200 object-scale-down 
                                                                h-48 w-96 sm:h-68 sm:w-96
                                                                p-5" ></img>
                                            <div className="p-4 sm:text-md font-mono sm:w-[250px] sm:w-min-[300px]">
                                                {items[itemId]['title']}
                                            </div>
                                        </div>
                                        <div className="flex justify-center items-center h-full w-full 
                                                        box bg-white
                                                        font-mono xs:p-3 p-2">
                                            <div className="flex flex-col space-y-2 w-11/12 ">
                                                <div>
                                                    Item<div className="float-right">{items[itemId]['itemprice']} ETH</div>
                                                </div>
                                                <div>
                                                    Postage ({purchase['postagename']})<div className="float-right">{purchase['postageprice']} ETH</div>
                                                </div>
                                                <div className="border-t-2 border-gray-400">
                                                    <div className="py-2">
                                                        Total Price <div className="float-right">{purchase['totalprice']} ETH</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap flex-col space-y-2 
                                                    box bg-white
                                                    lg:min-h-[450px] sm:w-[550px] p-5 break-words">
                                        <div>
                                            <div className="font-mono text-lg underline">
                                                Shipping to :
                                            </div>
                                            <div className="flex flex-col space-y-2 font-robotomono p-2 ">
                                                <div className="flex flex-col  space-y-1">
                                                    <div>{purchase['buyername']}</div>
                                                    <div>{purchase['buyerphonenum']}</div>
                                                    <div>{purchase['address1']},</div>
                                                    <div>{purchase['address2']},</div>
                                                    <div className="flex flex-row">
                                                        <div>{purchase['city']},</div>
                                                        <div>{purchase['state']},</div>
                                                        <div>{purchase['zipcode']}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col flex-wrap break-all">
                                            <div className="font-mono text-lg underline">
                                                Pay to :
                                            </div>
                                            <div className="flex flex-col p-2 space-y-2 font-robotomono ">
                                                <div>{purchase['ownername']}</div>
                                                <div>{purchase['ownerwallet']}</div>
                                                <div>{purchase['totalprice']} ETH</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row space-x-2 justify-center pt-7">
                                            <button
                                                className=""
                                                onClick={()=>this.handleBackButton()}>Back
                                            </button>
                                            <button 
                                                className=""
                                                onClick={()=>this.handleProceedPayment(purchase)}>Proceed to Payment
                                            </button>
                                        </div>
                                    </div>
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