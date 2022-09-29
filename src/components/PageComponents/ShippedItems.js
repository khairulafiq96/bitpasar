import React, {Component} from "react";
import {connect} from 'react-redux'

class ShippedItem extends Component{
    render(){

        const {user,item} = this.props

        return (<div className="flex flex-col space-x-0 space-y-2 p-5
                               sm:flex-row sm:space-x-5 sm:space-y-0 sm:p-5 sm:min-w-[300px] 
                               bitpasar_bg bitpasar_border">
                    <div className="flex flex-col items-center space-y-2 sm:w-1/3">
                        <div className="flex items-center justify-center bg-white p-2 w-full">
                                <img className="object-scale-down h-[170px]" src={user['myorders'][item]['images']}></img>
                        </div>
                        <div className="bitpasar_text">
                            {user['myorders'][item]['title']}
                        </div>
                        <div className="bitpasar_text">
                            {user['myorders'][item]['itemprice']} ETH
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2 break-words">
                        <div>
                            <div className="bitpasar_text text-sm sm:text-base">
                                Order Id
                            </div>
                            <div className="bitpasar_subtext text-xs sm:text-sm ">
                                {item}
                            </div>
                        </div>
                        <div>
                            <div className="bitpasar_text text-sm sm:text-base">
                                Status
                            </div>
                            <div className="bitpasar_subtext text-xs sm:text-sm">
                                {user['myorders'][item]['status']}
                            </div>
                        </div>
                        <div>
                            <div className="bitpasar_text">
                                Postage
                            </div>
                            {user['myorders'][item]['status'] === 'shipped' ? <div className="bitpasar_subtext text-sm">
                                                                                    <div>Courier name : {user['myorders'][item]['postagename']}</div>
                                                                                    <div>Postage price : {user['myorders'][item]['postageprice']} ETH</div>
                                                                                    <div>Tracker id : {user['myorders'][item]['trackerid']}</div>
                                                                                </div>
                                                                                :<div className="bitpasar_subtext text-sm">
                                                                                    Item has not been shipped out
                                                                                    </div>}
                        </div>
                        <div className="sm:w-[360px] flex flex-col space-y-2">
                            <div className='bitpasar_text text-sm sm:text-base'>
                                Buyer Details
                            </div>
                            <div className="bitpasar_subtext text-xs sm:text-sm">
                                <div>{user['myorders'][item]['buyername']}</div>
                                <div>{user['myorders'][item]['buyerphonenum']}</div>
                                <div>{user['myorders'][item]['buyerwallet']}</div>
                            </div>
                            <div className="bitpasar_subtext text-xs sm:text-sm">
                                <div>{user['myorders'][item]['address1']}, {user['myorders'][item]['address2']}</div>
                                <div>{user['myorders'][item]['zipcode']} , {user['myorders'][item]['city']} , {user['myorders'][item]['state']}</div>
                            </div>
                        </div>
                    </div>
            </div>)
    }
}

function mapStateToProps({user}) {
    return {
      user
    }
  }

export default connect(mapStateToProps)(ShippedItem)