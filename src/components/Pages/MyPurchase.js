import React, {Component} from "react";
import {connect} from 'react-redux';
import { Redirect } from "react-router-dom";
import { handleGetUserPurchases } from '../../actions';
import '../Styles/Item.css'
import {convertUTCtoDate} from '../../Utility/general'

class MyPurchase extends Component {

    state = {
        redirectToHome : false
    }

    async componentDidMount(){
        //This must be called everytime as the user should get the latest data
        await this.props.dispatch(handleGetUserPurchases(this.props.wallet.address))
    }

    render(){

        const {user} = this.props

        const displayButton = (mypurchases) => {
            if(Object.keys(mypurchases).length === 0){
                return <div className="font-mono"> There are no recent purchases</div>
            }
        }

        return (<div className="md:w-[620px] px-2 sm:px-0">
                   <div className="font-mono text-lg pb-5 underline">
                        My purchase(s)
                    </div>
                    {user && user['mypurchases'] ?
                                                    <div className="flex flex-col space-y-2">
                                                        {displayButton(user['mypurchases'])}
                                                        {Object.keys(user['mypurchases']).map((item)=>
                                                            <div className="flex flex-col space-x-0 space-y-2
                                                                            sm:flex-row sm:space-x-5 sm:space-y-0
                                                                            box bg-white min-w-[300px] 
                                                                            break-all p-5"
                                                                            key={item}>
                                                                <div className="flex items-center flex-col space-y-2 sm:w-1/3">
                                                                    <div className="flex items-center justify-center box bg-slate-200 p-2">
                                                                        <img className="object-scale-down h-[170px]" 
                                                                             src={user['mypurchases'][item]['images']}></img>
                                                                    </div>
                                                                    <div className="font-mono underline">
                                                                        {user['mypurchases'][item]['title']}
                                                                    </div>
                                                                    <div className="font-robotomono underline">
                                                                        {user['mypurchases'][item]['itemprice']} ETH
                                                                    </div>
                                                                </div>
                                                                <div className="flex w-full sm:w-1/2 flex-col space-y-2">
                                                                    <div>
                                                                        <div className="bitpasar_text ">
                                                                            Order Id
                                                                        </div>
                                                                        <div className="bitpasar_subtext text-sm">
                                                                            {item}
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div className="bitpasar_text">
                                                                            Status
                                                                        </div>
                                                                        <div className="bitpasar_subtext text-sm">
                                                                            {user['mypurchases'][item]['status']}
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div className="bitpasar_text">
                                                                            Postage
                                                                        </div>
                                                                        {user['mypurchases'][item]['status'] === 'shipped' ? <div className="bitpasar_subtext text-sm">
                                                                                                                                <div>Courier name : {user['mypurchases'][item]['postagename']}</div>
                                                                                                                                <div>Postage price : {user['mypurchases'][item]['postageprice']} ETH</div>
                                                                                                                                <div>Tracker id : {user['mypurchases'][item]['trackerid']}</div>
                                                                                                                            </div>
                                                                                                                            :<div className="bitpasar_subtext text-sm">
                                                                                                                                Item has not been shipped out
                                                                                                                             </div>}
                                                                    </div>
                                                                    <div>
                                                                        <div className="bitpasar_text">
                                                                            Date of purchase
                                                                        </div>
                                                                        <div className="bitpasar_subtext text-sm">
                                                                            {convertUTCtoDate(user['mypurchases'][item]['timestamp'])}
                                                                        </div>
                                                                    </div>
                                                                    <div className="bitpasar_subtext text-sm">
                                                                        {user['mypurchases'][item]['shortdescription']}
                                                                    </div>
                                                                    <div className="w-[300px]">
                                                                        <div className="bitpasar_text underline">
                                                                            Seller Contact Details
                                                                        </div>
                                                                        <div className="
                                                                                bitpasar_subtext text-sm">
                                                                            <div>
                                                                                {user['mypurchases'][item]['ownername']}
                                                                            </div>
                                                                            <div>
                                                                                {user['mypurchases'][item]['ownerphonenum']}
                                                                            </div>
                                                                            <div>
                                                                                {user['mypurchases'][item]['ownerwallet']}
                                                                        </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div> 
                                                        )}
                                                    </div>
                                                    : 
                                                    <div className="bitpasar_loading">Loading ...</div>}
                </div>
                )
    }
}

function mapStateToProps({user}) {
    return {
        user
    }
}


export default connect(mapStateToProps)(MyPurchase)