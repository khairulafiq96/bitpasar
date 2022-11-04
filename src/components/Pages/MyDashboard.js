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
            await this.props.dispatch(handleGetAllOrders(convertUserId(this.props.user)))
        }else{
            this.setState({
                redirectToRegistrationPage : true
            })
        }
    }

    render(){
        const {user} = this.props
        const userId = convertUserId(user)
        const {redirectToRegistrationPage,displayTrackingComponent} = this.state


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
        
        const renderExternalComponent = () => {
            if(!userId){
                window.alert("Please complete your registration to access this page")
                return(<Redirect exact to="/registration"></Redirect>)
            } else {
                return(<div className="font-mono">Loading...</div>)
            }
        }
    
        return(
        <div className="md:w-[620px] px-2 sm:px-0">
            {userId && user['myorders'] ? 
                                    <div className="flex flex-col space-y-7">
                                        <div className="flex flex-col space-y-3">
                                            <div className="font-mono text-lg underline">
                                                To Ship 
                                            </div>
                                            
                                            {Object.keys(user['myorders']).map((item)=>{
                                            return renderToShipItems(item, user,user['myorders'][item]['status'])
                                            }
                                            )}
                                        </div>
                                        <div className="flex flex-col space-y-3">
                                            <div className="font-mono text-lg underline">
                                                Shipped Items
                                            </div>
                                           
                                            {Object.keys(user['myorders']).map((item)=>{
                                                return renderShippedItems(item, user,user['myorders'][item]['status'])
                                            }
                                            )}

                                        </div>
                                    </div> 
                                    :
                                    renderExternalComponent()}<div>
                
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