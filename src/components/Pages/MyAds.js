import React, {Component} from "react";

class MyAds extends Component{
    render(){
        return (<div>
                        My Ads
                            <br></br>
                            <div>
                                My Ads
                                <div>Image</div>
                                <div>Name</div>
                                <div>Short Description</div>
                                <div>Time added</div>
                                <div>Price</div>
                                <button>Delete Item</button>
                            </div>
                            <br></br>
                            <div>
                                Shipped and Sold Ads
                                <div>Image</div>
                                <div>Name</div>
                                <div>Sold to : </div>
                                <div>Buyer walletaddress</div>
                                <div>Buyer address</div>
                                <div>Tracking number</div>
                            </div>
                </div>)
    }
}

export default MyAds