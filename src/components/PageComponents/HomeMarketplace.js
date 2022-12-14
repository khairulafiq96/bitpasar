import React,{ Component } from "react";
import { handleGetAllMarketplaceItems } from "../../actions";
import {connect} from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import Item_Card from "../Pages/Item_Card";

class HomeMarketplace extends Component{

    componentDidMount= async () => {
        //quite inneficient to call 2 API's all the time
        await Promise.all([
            this.props.dispatch(handleGetAllMarketplaceItems(1,""),
            )])

    }

    render(){

        const {items} = this.props

        return (
            <div data-testid="display-tiles"
                 className="p-2 box box_background">
                    <div className="font-mono text-center text-lg p-5 underline">
                        Latest Listings
                    </div>
                        {items ? 
                                <div className="flex flex-wrap justify-center">
                                    {Object.keys(items).map(function(keyValue, index){
                                        return(
                                            <div key={keyValue} className="p-2 w-1/8">
                                                <Link  to={"/item/"+keyValue}>
                                                    <Item_Card individualItem={items[keyValue]}></Item_Card>
                                                    <br/>
                                                </Link>
                                            </div>
                                        )  
                                    })}
                                </div>
                                :
                                <div className="font-mono text-center p-5">
                                    Loading...    
                                </div>}
            </div>
        )
    }
}

function mapStateToProps({items}) {
    return {
        items
    }
}

export default connect(mapStateToProps)(HomeMarketplace)