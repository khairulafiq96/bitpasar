import React, {Component} from "react";
import {connect} from 'react-redux'
import { handleGetUserDetails } from "../../actions";
import '../Styles/Item.css'
import {handleGetIndividualItem} from '../../actions'
import { Redirect } from "react-router-dom";
import {setConfirmPurchase} from '../../actions/items'

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
        const {itemId} = this.props.match.params
        const {user,dispatch,items} = this.props
        
        if(user){
            //checks if the user already registed their details in the registration form
            try{
                const userId = Object.keys(user).filter((details)=> details !== 'address' && details !== 'balance')
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

            } catch (e) {
                window.alert("Please update your details in the edit profile page for better user experience later.")
                this.setState({
                    form : {
                        postagename : items[itemId]['postagename'],
                        postageprice : items[itemId]['postageprice'],
                        totalprice : parseFloat(items[itemId]['postageprice']) + parseFloat(items[itemId]['itemprice'])
                    }
                })
            }

            
        } else {
            window.alert("Please connect to your wallet")
            this.setState({redirectToBuyNow : true})
        }
        
    }


    handleFormChange (evt) {
        this.setState((prevState, props) => ({ form : {...prevState.form,[evt.target.name]: evt.target.value }}));
    }

    async handleSubmission(formState, item, url, user){
        //filtering null items in form state
        const values = Object.values(formState).filter((item)=> item === '')
        if(values.length > 0 ){
            window.alert("Please fill all of the input required *")
        } else {

            await this.props.dispatch(setConfirmPurchase(this.handlePurchaseObject(formState, item ,url , user)))
            this.setState({
                redirect:{
                    redirectToVerifyPurchase : true
                }
            })
        }
    }

    handlePurchaseObject(form, items, itemId, user){

        const userId = Object.keys(user).filter((details)=> details !== 'address' && details !== 'balance')

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
            "buyerid" : userId[0],
            "buyerwallet" : user['address']
        }

        
        return purchase
    }


    render (){

        const {itemId} = this.props.match.params
        const {items,user} = this.props
        const {name,email,phonenum,address1,address2,city,zipcode,states,postagename,postageprice,totalprice} =this.state.form
        const {redirectToBuyNow,redirectToVerifyPurchase} = this.state.redirect

        const checkItems = () => {
            try {
                if(items[itemId] && user['address'] ){
                   return true
                }
            } catch (e){
                return false
            } 
        }


        //Redirect users if they are not connected to their wallet
        function renderRedirect(){
            if(redirectToBuyNow){
                return <Redirect exact to = {"/item/"+itemId} ></Redirect>
            }
        }

        function renderToVerifyPurchase(){
            if(redirectToVerifyPurchase){
                return <Redirect exact to={"/buynow/verifypurchase/"+itemId}></Redirect>
            }
        }


        return (
            <div>
                Buy Now Component
                {renderRedirect()}
                {renderToVerifyPurchase()}
                {checkItems() ? 
                            <div>
                                {JSON.stringify(this.state.form)}
                                <div>
                                    <div className="itemLargeImage">
                                        <img src={items[itemId]['images'][0]}></img>
                                    </div>
                                    <div>
                                        <div>{items[itemId]['title']}</div>
                                        <div>{items[itemId]['itemprice']} ETH</div>
                                        <div>{items[itemId]['ownername']}</div>
                                    </div>
                                </div>
                                <div>
                                    Contact Details
                                    <div>
                                        <input onChange={this.handleFormChange} type="text" placeholder="Name" name="name" value={name || ''}></input>
                                        <input onChange={this.handleFormChange} type="text" placeholder="Email"  name="email" value={email || ''}></input>
                                        <br></br>
                                        <input onChange={this.handleFormChange} type="text" placeholder="Phone Num"  name="phonenum" value={phonenum || ''}></input>
                                    </div>
                                </div>
                                <br></br>
                                <div>
                                    Ship To :
                                    <br></br>
                                    <input type="text" name="address1" placeholder="Address 1" onChange={this.handleFormChange} value={address1 || ''}></input>
                                    <br></br>
                                    <input type="text" name="address2" placeholder="Address 2" onChange={this.handleFormChange} value={address2 || ''}></input>
                                    <br></br>
                                    <input type="text" name="city" placeholder="City" onChange={this.handleFormChange} value={city || ''}></input>
                                    <input type="text" name="states" placeholder="State" onChange={this.handleFormChange} value={states || ''}></input>
                                    <input type="text" name="zipcode" placeholder="Zipcode" onChange={this.handleFormChange} value={zipcode || ''}></input>
                                </div>
                                <br></br>
                                <div>
                                    Postage
                                    <br></br>
                                    <div>{postagename}</div>
                                    <div>{postageprice}</div>
                                </div>
                                <br></br>
                                <div>
                                    Total Price : {items[itemId]['itemprice']} + {postageprice} = {totalprice} ETH
                                </div>
                                <br></br>
                                <button onClick={()=>this.handleSubmission(this.state.form, items[itemId], itemId, user )}>Proceed</button>
                            </div>
                            :
                            <div></div>
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

export default connect(mapStateToProps)(BuyNow);