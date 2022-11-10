import React, {Component} from "react";
import {connect} from 'react-redux'
import { handleGetAllAds } from "../../actions";
import Advertisement from "../PageComponents/Advertisement";
import {NavLink} from 'react-router-dom'
import { convertUserId } from "../../Utility/general";
import { Redirect } from 'react-router-dom';

class MyAds extends Component{

    state = {
        displaySellButton : true,
        redirectToRegistrationPage : false
    }

    async componentDidMount(){
        const {user} = this.props
        const userId = convertUserId(user)
        if(userId){
            await this.props.dispatch(handleGetAllAds(userId))
        }
    }

    render(){

        const {user} = this.props
        const userId = convertUserId(user)

        const renderOnMarketplaceAds = (item,user,status) => {
            if(status === "new"){
                return (<Advertisement item={user['myads'][item]} itemId={item} key={item}></Advertisement>)
            }
        }

        const displayNoItem = (toship) => {
            if(Object.keys(toship).length === 0){
                return <div className="font-mono">
                            <div> You dont have any ads displayed in the marketplace</div>
                            <br></br>
                            <div>Start Selling here</div>
                            <br></br>
                            <NavLink
                                exact to='/additem'
                                className=" text-xs bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Sell Items</NavLink>
                        </div>
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

        return (<div className="md:w-[620px] px-2 sm:px-0">
                    {userId && user['myads'] ? <div className="flex flex-col space-y-3">
                                                <div className="bitpasar_text text-lg underline">On Marketplace</div>
                                                {displayNoItem(user['myads'])}
                                                {Object.keys(user['myads']).map((item)=>{
                                                 return renderOnMarketplaceAds(item, user,user['myads'][item]['status'])
                                                    }
                                                )}
                                            </div> 
                                            :
                                            renderExternalComponent()
                                            }
                </div>)
    }
}

function mapStateToProps({user}){
    return {
       user 
    }
}


export default connect(mapStateToProps)(MyAds)