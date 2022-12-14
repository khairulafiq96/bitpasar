import React, {Component} from "react";
import {connect} from 'react-redux'
import '../Styles/Item.css'
import {handleGetIndividualItem} from '../../actions'
import { Redirect } from "react-router-dom";
import {setConfirmPurchase} from '../../actions/items'
import { convertUserId } from "../../Utility/general";
import UseAccount from "./web3modal/useAccount";

class BuyNow extends Component{

    constructor(){
        super()
        this.state = {
            form : {
                itemid :null,
                ownerid :null,
                buyerid : null,
                
                name:null,
                email:null,
                phonenum:null,
                address1:null,
                address2:null,
                city:null,
                zipcode: null,
                states : null,
                postagename : null,
                postageprice : null,
                totalprice: null
            },
            redirect:{
                redirectToBuyNow: false,
                redirectToVerifyPurchase: false,
            }
        }
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    async componentDidMount(){
        const {user,items,itemId} = this.props
        const userId = convertUserId(user)
        if(userId){
            //checks if the user already registed their details in the registration form
                this.setState({
                    form : {
                        name : user[userId]['name'],
                        email : user[userId]['email'],
                        phonenum : user[userId]['phonenum'],
                        address1:user[userId]['address1'],
                        address2:user[userId]['address2'],
                        city:user[userId]['city'],
                        states:user[userId]['state'],
                        zipcode: user[userId]['zipcode'],
                        postagename : items[itemId]['postagename'],
                        postageprice : items[itemId]['postageprice'],
                        totalprice : parseFloat(items[itemId]['postageprice']) + parseFloat(items[itemId]['itemprice'])
                    }
                })
        } else {
            window.alert("Please update your details in the edit profile page for better user experience later.")
                this.setState({
                    form : {
                        postagename : items[itemId]['postagename'],
                        postageprice : items[itemId]['postageprice'],
                        totalprice : parseFloat(items[itemId]['postageprice']) + parseFloat(items[itemId]['itemprice'])
                    }
                })
        }
    }


    handleFormChange (evt) {
        this.setState((prevState, props) => ({ form : {...prevState.form,[evt.target.name]: evt.target.value }}));
    }

    async handleSubmission(formState, item, url, user,wallet){
        //filtering null items in form state
        const values = Object.values(formState).filter((item)=> item === '')
        if(values.length > 0 ){
            window.alert("Please fill all of the input required *")
        } else {
            await this.props.dispatch(setConfirmPurchase(this.handlePurchaseObject(formState, item ,url , user, wallet)))
            this.setState({
                redirect:{
                    redirectToVerifyPurchase : true
                }
            })
        }
    }

    handlePurchaseObject(form, items, itemId, user, wallet){

        const userId = convertUserId(user)

        var purchase = {
            "buyername" : form['name'],
            "ownername" : items['ownername'],
            "ownerwallet" : items['walletid'],
            "totalprice" : form['totalprice'],
            "address1" : form['address1'],
            "address2" : form['address2'],
            "city" : form['city'],
            "state" : form['states'],
            "zipcode" : form['zipcode'],
            "postagename" : items['postagename'],
            "postageprice" : items['postageprice'],
            "buyeremail" : form['email'],
            "buyerphonenum" : form['phonenum'],
            "itemid" : itemId,
            "ownerid" : items['ownerid'],
            "buyerid" : userId,
            "buyerwallet" : wallet.address
        }

        
        return purchase
    }


    render (){

        const {items,user,itemId,wallet} = this.props
        const {name,email,phonenum,address1,address2,city,zipcode,states,postagename,postageprice,totalprice} =this.state.form
        const {redirectToVerifyPurchase} = this.state.redirect


        //Redirect users if they are not connected to their wallet
        function renderToVerifyPurchase(){
            if(redirectToVerifyPurchase){
                return <Redirect exact to={"/buynow/verifypurchase/"+itemId}></Redirect>
            }
        }

        /* {renderRedirect()}
           {renderToVerifyPurchase()} */
        return (
            <div>
                {renderToVerifyPurchase()}
                {items && itemId in items ? 
                            <div className="flex 
                                            xs:flex-col xs:space-x-0 xs:space-y-5 
                                            lg:flex-row lg:w-full lg:space-x-5 lg:space-y-0 pb-5">
                                <div className="flex flex-col  
                                                items-center sm:space-y-5">
                                    <div className="flex flex-col items-center h-min-1/2
                                                    box bg-white">
                                        <img src={items[itemId]['images'][0]}
                                                className="bg-slate-200 object-scale-down 
                                                            h-48 w-96 sm:h-68 sm:w-96
                                                            p-5" ></img>
                                        <div className="p-4 sm:text-md font-mono sm:w-[250px] sm:w-min-[300px]
                                                        underline">
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
                                                Postage ({postagename})<div className="float-right">{postageprice} ETH</div>
                                            </div>
                                            <div className="border-t-2 border-gray-400">
                                                <div className="py-2">
                                                    Total Price <div className="float-right">{totalprice} ETH</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="box bg-slate-200 lg:min-h-[450px] lg:w-[550px] p-5">
                                    <div className="">
                                        <div className="font-mono text-lg underline">
                                            Shipping details
                                        </div>
                                        <div className="font-robotomono w-2/3">
                                            <div className="py-2 flex flex-col ">
                                                <label for="fullname" 
                                                        className="text-sm">
                                                        Name
                                                </label>
                                                <input onChange={this.handleFormChange} 
                                                    className="p-1  "
                                                    type="text" 
                                                    placeholder="Name" 
                                                    name="name" value={name || ''}
                                                    id="fullname">
                                                </input>
                                            </div>
                                            <div className="py-2 flex flex-col">
                                                <label for="email" 
                                                       className="text-sm">
                                                        Email
                                                </label>
                                                <input onChange={this.handleFormChange} 
                                                        className="p-1  "
                                                       type="text" placeholder="Email"  
                                                       name="email" value={email || ''}
                                                       id="email">
                                                 </input>
                                            </div>
                                            <div className="py-2 flex flex-col">
                                                <label for="phonenum" 
                                                       className="text-sm">
                                                        Phone number
                                                </label>
                                                <input onChange={this.handleFormChange} 
                                                       className="p-1  "
                                                       type="text" placeholder="Phone Num"  
                                                       name="phonenum" value={phonenum || ''}
                                                       id="phonenum">
                                                </input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col  space-y-2 font-robotomono lg:w-[500px] pt-3">
                                        <div className="text-sm">
                                            Ship To :
                                        </div>
                                        <input type="text" 
                                            name="address1" 
                                            placeholder="Address 1"
                                            className="p-1  " 
                                            onChange={this.handleFormChange} 
                                            value={address1 || ''}>
                                        </input>
                                        <input type="text" 
                                                name="address2" 
                                                className="p-1  " 
                                                placeholder="Address 2" 
                                                onChange={this.handleFormChange} 
                                                value={address2 || ''}>
                                        </input>
                                        <div className="flex sm:flex-row xs:flex-col 
                                                        sm:space-x-2 sm:space-y-0 
                                                        space-x-0 space-y-2 w-2/3 sm:w-full">
                                            <input type="text" 
                                                   name="city" 
                                                   className="p-1"
                                                   placeholder="City" 
                                                   onChange={this.handleFormChange} 
                                                   value={city || ''}></input>
                                            <input type="text" 
                                                   name="states"
                                                   className="p-1" 
                                                   placeholder="State" 
                                                   onChange={this.handleFormChange} 
                                                   value={states || ''}></input>
                                            <input type="text" 
                                                   name="zipcode"
                                                   className="p-1" 
                                                   placeholder="Zipcode" 
                                                   onChange={this.handleFormChange} 
                                                   value={zipcode || ''}></input>
                                        </div>
                                    </div>
                                    <div className="flex justify-center pt-10">
                                        <button className="text-lg"
                                                onClick={()=>this.handleSubmission(this.state.form, items[itemId], itemId, user,wallet )}
                                                >Proceed</button>
                                    </div>
                                </div>
                            </div>
                            :
                            <Redirect exact to = {"/item/"+itemId} ></Redirect>
                            }
                
            </div>
        )
    }
}

function mapStateToProps({user,items}) {
    return {
      user,
      items
    }
  }


export default connect(mapStateToProps)(BuyNow)