import React, {Component} from "react";
import {connect} from 'react-redux'
import {ethers} from 'ethers'
import { handleCreateOrder } from "../../actions";
import {NavLink} from 'react-router-dom'
import { Redirect } from 'react-router-dom';

class Payment extends Component {

    //Test wallet : 0x1CB8C4aE3CaA2cCf38bc65cF04B22b7B50a3F11b
    //Completed payment hash : 0xa1963c9fc5fe23dd558d8311f75e3f496a45e02f586f6d1a6f0e5dae47ee110f
    //Test URL : http://localhost:3000/buynow/verifypurchase/payment/595c3bda-467b-4a45-8fdd-551d96fee19b

    state = {
        transaction : null,
        gasprice : null,
    }


    async startPayment (totalprice, ownerwallet){
        try {
            await window.ethereum.send("eth_requestAccounts");
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const gasprice = await signer.getGasPrice().then((gas)=>gas.toString())
            //console.log(gasprice)
            ethers.utils.getAddress(ownerwallet);
            const tx = await signer.sendTransaction({
               to: ownerwallet,
               value: ethers.utils.parseEther(totalprice)
              });
            //console.log(tx)
            
            this.setState({
                            transaction : tx,
                            gasprice : gasprice,
                            runCheckTransaction : true
                             })
        } catch (e){
            window.alert(e.message)
        }
        
    }

    checkTransaction = async (txnHash) => {
        console.log("Running check transaction")
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        let txn_test = await provider.getTransactionReceipt(txnHash)
        if (txn_test) {
            if (txn_test.blockNumber && txn_test['status'] === 1) {
                const {purchase, dispatch} = this.props
                dispatch(handleCreateOrder(purchase))
                this.setState({runCheckTransaction : false})
            }
        } else {   
                //window.alert("Transaction still in progress")    
                setTimeout(()=>{
                    this.setState({
                        runCheckTransaction : true
                    })
                },4000)
        }
    
    }


    renderCheckTransaction(txnHash,buyerwallet){
        if(this.state.runCheckTransaction){
            this.checkTransaction(txnHash)
            return(<div className="inline-block">
                <div>Checking transaction</div>
                    <img src="https://i.stack.imgur.com/27Rnd.gif"></img>
                </div>)
        } else {
            return(<div>
                        <div>Transaction Completed</div>
                        <br></br>
                        <div>Check out your purchases here</div>
                        <br></br>
                        <NavLink
                            exact to={"/profile/purchase/" + buyerwallet}
                            className="text-xs bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            My Purchases
                        </NavLink>
                    </div>)
        }
       
    }

    render(){

        const {gasprice,transaction,transactionStatus,runCheckTransaction} = this.state
        const {purchase} = this.props
        const {itemId} = this.props.match.params

        function redirectToIndividualItem(){
            if(!purchase){
                return <Redirect exact to = {"/item/"+itemId} ></Redirect>
            }
        }

        return(
            <div>
                {purchase ?
                            <div>
                            <br></br>
                            <br></br>
                            <div>To pay : {purchase['totalprice']} ETH</div>
                            <div>to : {purchase['ownerwallet']}</div>
                            <br></br>
                            {transaction ? 
                                        <div>Payment initiated</div> 
                                        : 
                                        <div>
                                            <button onClick={()=>this.startPayment('0.00001', purchase['ownerwallet'])}>Pay Now</button>
                                        </div>}
                            {/*<button onClick={()=>this.startPayment('purchase['totalprice'].toString() 0.00001', purchase['ownerwallet'])}>Pay Now</button>*/}
                            <br></br>
                            <div>Check your transaction here</div>
                            {transaction ? 
                                        <div> 
                                            <a target="_blank" href={"https://ropsten.etherscan.io/tx/"+transaction['hash']}>https://ropsten.etherscan.io/tx/{transaction['hash']}</a>
                                        </div> 
                                        : 
                                        <div>
                                        </div>}
                            <br></br>
                            {transaction ? 
                                        this.renderCheckTransaction(transaction['hash'], purchase['buyerwallet']) 
                                        : 
                                        <div>
                                        </div>}
                            </div> 
                            :
                            redirectToIndividualItem() }
                
                    
            </div>
        )
    }
}

function mapStateToProps({items,purchase}){
    return {
        items,
        purchase
    }
}

export default connect(mapStateToProps)(Payment)