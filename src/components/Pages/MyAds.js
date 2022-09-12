import React, {Component} from "react";
import {connect} from 'react-redux'
import { handleGetAllAds } from "../../actions";
import Advertisement from "../PageComponents/Advertisement";
import {NavLink} from 'react-router-dom'

class MyAds extends Component{

    async componentDidMount(){

        const {user} = this.props

        if(user){
            const userId = Object.keys(user).filter((details)=> details !== 'address' && details !== 'balance' && details !== 'myorders' && details !== 'mypurchases' && details !== 'myads')
            await this.props.dispatch(handleGetAllAds(userId[0]))
        }
    }

    

    render(){

        const {user} = this.props

        const renderOnMarketplaceAds = (item,user,status) => {
            if(status === "new"){
                return (<Advertisement item={user['myads'][item]} itemId={item} key={item}></Advertisement>)
            }
        }

        const displayNoItem = (toship) => {
            if(Object.keys(toship).length === 0){
                return <div>
                            <div> You dont have any ads displayed in the marketplace</div>
                            <div>Start Selling here</div>
                            <NavLink
                                exact to='/additem'
                                className=" text-xs bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Sell Items</NavLink>
                        </div>
            }
        }

        return (<div>
                    {user && user['myads'] ? <div>
                                                On Marketplace
                                                {JSON.stringify(this.userId)}
                                                <br></br>
                                                <br></br>
                                                {displayNoItem(user['myads'])}
                                                {Object.keys(user['myads']).map((item)=>{
                                                 return renderOnMarketplaceAds(item, user,user['myads'][item]['status'])
                                                    }
                                                )}
                                            </div> 
                                            : <div>Loading</div>}

            
                </div>)
    }
}

function mapStateToProps({user}){
    return {
       user 
    }
}


export default connect(mapStateToProps)(MyAds)