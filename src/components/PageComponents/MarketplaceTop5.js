import React,{ Component } from "react";
import { handleGetAllMarketplaceItems } from "../../actions";
import {connect} from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import Item_Card from "../Pages/Item_Card";

class MarketplaceTop5 extends Component{

    componentDidMount= async () => {
        //quite inneficient to call 2 API's all the time
        await Promise.all([
            this.props.dispatch(handleGetAllMarketplaceItems(1,""),
            )])

    }

    render(){

        const {items} = this.props

        return (
            <div className="p-2 bg-beige">
                <div className="border-solid border-2 border-green p-2">
                    <div className="font-mono text-center">
                        Latest Listings
                    </div>
                        {items ? 
                                <div className="flex flex-wrap justify-center">
                                    {Object.keys(items).map(function(keyValue, index){
                                        return(
                                            <div className="p-2 sm:w-2/8">
                                                <Link key={keyValue} to={"/item/"+keyValue}>
                                                    <Item_Card individualItem={items[keyValue]}></Item_Card>
                                                    <br/>
                                                </Link>
                                            </div>
                                        )  
                                    })}
                                </div>
                                :
                                <div>
                                    Loading...    
                                </div>}
                </div>
            </div>
        )
    }
}

function mapStateToProps({items}) {
    return {
        items
    }
}

export default connect(mapStateToProps)(MarketplaceTop5)