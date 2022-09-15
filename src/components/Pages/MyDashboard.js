import React, {Component} from "react";
import {connect} from 'react-redux'
import { handleGetAllOrders } from '../../actions';
import '../Styles/Item.css'
import { Redirect } from "react-router-dom";
import ToShipForm from "../PageComponents/ToShipForm";
import ShippedItem from "../PageComponents/ShippedItems";
import { convertUserId } from "../../Utility/general";

//Todo : Create another component for individual ship items

class MyDashboard extends Component{
    //If the user does not have any items to ship or ads or non shipped , display a button to sell products

    state = {
        redirectToRegistrationPage : false,
    }

    async componentDidMount(){
        if( convertUserId(this.props.user)){
            this.setState({
                redirectToRegistrationPage : false
            })
            //This API must be called every time the page renders to get the latest data
            await this.props.dispatch(handleGetAllOrders(this.props.user['address']))
        }else{
            this.setState({
                redirectToRegistrationPage : true
            })
        }
    }

    render(){
        const {user} = this.props
        const {redirectToRegistrationPage,displayTrackingComponent} = this.state

        const toHome = () =>{
            if(redirectToRegistrationPage === true){
                window.alert("Please complete your registration to access this page")
                return <Redirect exact to='/registration'></Redirect>
            } 
        }

        const displayNoItem = (toship) => {
            if(Object.keys(toship).length === 0){
                return <div> There are no items to be shipped out</div>
            }
        }

        const renderToShipItems = (item,user,status) => {
            if(status === "completed payment"){
                return (<ToShipForm item={item} user={user} key={item}></ToShipForm>)
            }
        }

        const renderShippedItems = (item,user,status) => {
           if(status === "shipped"){
                return (<ShippedItem item={item} user={user} key={item}></ShippedItem>)
            }
        }
        
    
        return(
        <div>
            {toHome()}
            {user && user['myorders'] ? 
                                    <div>
                                        <div>
                                            To Ship 
                                            {displayNoItem(user['myorders'])}
                                            {Object.keys(user['myorders']).map((item)=>{
                                            return renderToShipItems(item, user,user['myorders'][item]['status'])
                                            }
                                            )}
                                        </div>
                                        <div>
                                            Shipped Items
                                            {Object.keys(user['myorders']).map((item)=>{
                                                return renderShippedItems(item, user,user['myorders'][item]['status'])
                                            }
                                            )}

                                        </div>
                                    </div> 
                                    :
                                     <div>Loading</div>}<div>
                
            </div>
            
        </div>)
    }
}

function mapStateToProps({user}) {
    return {
      user
    }
  }

export default connect(mapStateToProps)(MyDashboard)