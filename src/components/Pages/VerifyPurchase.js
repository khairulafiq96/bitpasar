import React,{Component} from "react";
import {connect} from 'react-redux'

class VerifyPurchase extends Component {
    render(){
        return (
            <div>
                Verify Purchase component
            </div>
        )
    }
}

function mapStateToProps({user}){
    return {
        user
    }
}

export default connect(mapStateToProps)(VerifyPurchase)