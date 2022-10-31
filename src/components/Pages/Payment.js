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
                //TODO : Please include transaction hash to be inserted into the db, for alpha no need but in further development
                //this ensures the anonymity of the buyer and seller at the same time complying to 'tax' and security compliance
                //when the user deletes the account
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
            return(
                <div className="flex flex-col items-center space-y-5 p-5
                                font-mono underline
                                box bg-white">
                    <div>Checking transaction</div>
                    <img src="https://i.stack.imgur.com/27Rnd.gif"></img>
                </div>
                )
        } else {
            return(
                <div className="flex flex-col space-y-2 items-center p-5
                                font-mono w-full
                                box bg-white">
                    <div>Transaction Completed !</div>
                    <div>Check out your purchases here</div>
                    <div className="pt-5">
                        <NavLink
                            exact to={`/profile/purchase/${buyerwallet}`}
                            className="box text-lg bg-beige hover:bg-button hover:text-white text-black py-2 px-4 font-mono">
                            My Purchases
                        </NavLink>
                    </div>
                 </div>)}
    }

    render(){

        const {transaction} = this.state
        const {purchase} = this.props
        const {itemId} = this.props.match.params

        function redirectToIndividualItem(){
            if(!purchase){
                return <Redirect exact to = {"/item/"+itemId} ></Redirect>
            }
        }

        return(
            <div >
                {purchase ?
                            <div className="flex flex-col space-y-5 items-center xs:p-2 sm:p-0">
                                <div className="flex flex-col space-y-2 items-center 
                                                p-5
                                                box bg-white">
                                    <div className="font-mono text-md">
                                        To pay
                                    </div>
                                    <div className="font-robotomono text-2xl underline"> 
                                        {purchase['totalprice']} ETH
                                    </div>
                                    <div className="font-mono text-md">
                                        to
                                    </div>
                                    <div className="font-robotomono text-xs">
                                        {purchase['ownername']}
                                    </div>
                                    <div className="font-robotomono text-xs pb-5">
                                        {purchase['ownerwallet']}
                                    </div>
                                    {transaction ? 
                                                <div className="font-robotomono">
                                                    Payment initiated
                                                </div> 
                                                : 
                                                <button 
                                                    className="text-lg"
                                                    onClick={()=>this.startPayment('0.00001', purchase['ownerwallet'])}>
                                                        Pay Now
                                                </button>
                                                }
                                                {/*<button onClick={()=>this.startPayment('purchase['totalprice'].toString() 0.00001', purchase['ownerwallet'])}>Pay Now</button>*/}
                                </div>
                                {transaction ? 
                                            <div className="flex flex-col items-center break-all p-5
                                                        xs:text-xs sm:text-sm md:text-base
                                                        box bg-white"> 
                                                <div className="font-mono pb-5">
                                                    Check your transaction here
                                                </div>
                                                <a  className="font-robotomono underline"
                                                    target="_blank" href={`https://goerli.etherscan.io/tx/${transaction['hash']}`}>
                                                    https://goerli.etherscan.io/tx/{transaction['hash']}</a>
                                            </div>
                                            : 
                                            <div>
                                            </div>}
                                {/*this.renderCheckTransaction(transaction['hash'], purchase['buyerwallet']) */}
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