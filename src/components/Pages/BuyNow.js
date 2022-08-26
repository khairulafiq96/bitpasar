import React, {Component} from "react";
import {connect} from 'react-redux'
import { handleGetUserDetails } from "../../actions";
import '../Styles/Item.css'
import {handleGetIndividualItem} from '../../actions'
import { Redirect } from "react-router-dom";

class BuyNow extends Component{

    constructor(){
        super()
        this.state = {
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
            redirectToBuyNow: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount(){
        const {itemId} = this.props.match.params
        const {user,dispatch,items} = this.props
        
        if(user) {
            const userId = Object.keys(user).filter((details)=> details !== 'address' && details !== 'balance')
            this.setState({
                name : user[userId]['name'],
                email : user[userId]['email'],
                phonenum : user[userId]['phonenum'],
                address1:user[userId]['address1'],
                address2:user[userId]['address2'],
                city:user[userId]['city'],
                states:user[userId]['state'],
                zipcode: user[userId]['zipcode'],
                postagename : items[itemId]['postagename'],
                postageprice : items[itemId]['postageprice']
            })
        } else {
            window.alert("Please connect to your wallet")
            this.setState({redirectToBuyNow : true})
        }
        
    }


    handleChange (evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    render (){

        const {itemId} = this.props.match.params
        const {items,user} = this.props
        const {name,email,phonenum,address1,address2,city,zipcode,states,postagename,postageprice,redirectToBuyNow} =this.state

        const checkItems = () => {
            try {
                if(items[itemId] && user['address'] ){
                   return true
                }
            } catch (e){
                return false
            } 
        }



        function renderRedirect(){
            if(redirectToBuyNow){
                return <Redirect exact to = {"/item/"+itemId} ></Redirect>
            }
        }

        return (
            <div>
                Buy Now Component
                {renderRedirect()}
                {checkItems() ? 
                            <div>
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
                                        <input onChange={this.handleChange} type="text" placeholder="Name" name="name" defaultValue={name}></input>
                                        <input onChange={this.handleChange} type="text" placeholder="Email"  name="email" defaultValue={email}></input>
                                        <br></br>
                                        <input onChange={this.handleChange} type="text" placeholder="Phone Num"  name="phonenum" defaultValue={phonenum}></input>
                                    </div>
                                </div>
                                <br></br>
                                <div>
                                    Ship To :
                                    <br></br>
                                    <input type="text" name="address1" placeholder="Address 1" onChange={this.handleChange} defaultValue={address1}></input>
                                    <br></br>
                                    <input type="text" name="address2" placeholder="Address 2" onChange={this.handleChange} defaultValue={address2}></input>
                                    <br></br>
                                    <input type="text" name="city" placeholder="City" onChange={this.handleChange} defaultValue={city}></input>
                                    <input type="text" name="state" placeholder="State" onChange={this.handleChange} defaultValue={states}></input>
                                    <input type="text" name="zipcode" placeholder="Zipcode" onChange={this.handleChange} defaultValue={zipcode}></input>
                                </div>
                                <br></br>
                                <div>
                                    Postage
                                    <br></br>
                                    <input disabled type="text" name="postagename" placeholder="Postage Name" onChange={this.handleChange} defaultValue={postagename} ></input>
                                    <input disabled type="text" name="postageprice" placeholder="Postage Price" onChange={this.handleChange} defaultValue={postageprice}></input>
                                </div>
                                <br></br>
                                <button>Proceed</button>
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