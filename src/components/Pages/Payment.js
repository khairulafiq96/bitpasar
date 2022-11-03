import React, {Component, useEffect} from "react";
import {connect, useDispatch} from 'react-redux'
import {ethers} from 'ethers'
import { handleCreateOrder } from "../../actions";
import {NavLink} from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import { useSendTransaction,useWaitForTransaction  } from '@web3modal/react'
import { BigNumber } from 'ethers'

const MySubComponent = (props) => {

    const transaction = {
        request: {
          to: props.receiverWallet,
          //value: BigNumber.from(ethers.utils.parseUnits(props.price.toString(), "ether"))
          value : BigNumber.from('1000000')
        }
      }
      
      const { data, error, isLoading, sendTransaction } = useSendTransaction(transaction)
      const { receipt, isWaiting } = useWaitForTransaction({ hash: data?.hash })

      useEffect(()=>{
        async function dispatchData(){
            await props.dispatch(handleCreateOrder(props.purchase))
        }
        if(receipt && isWaiting === false){
            //window.alert(JSON.stringify(receipt))
            dispatchData()
        }
      })

    return (
        <div className="flex flex-col items-center justify-center font-robotomono">
             {!receipt && !data ? 
                                <button
                                    className="text-lg" 
                                    onClick={async () => sendTransaction()}>
                                    Pay Now
                                </button>
                                :
                                <></>
                                }
             <div>
                {isWaiting  ? <div className="flex flex-col space-y-3 items-center">
                                <div>
                                    Payment initiated
                                </div> 
                                <img src="https://i.stack.imgur.com/27Rnd.gif"></img>
                                <div className="font-mono p-5">
                                    Check your transaction status here
                                </div>
                                <a  className="font-robotomono underline"
                                    target="_blank" href={`https://goerli.etherscan.io/tx/${data?.hash}`}>
                                    https://goerli.etherscan.io/tx/{data?.hash}</a>
                            </div> 
                            :
                            <></>}
             </div>
             <div>
                {receipt ?  <div className="flex flex-col items-center space-y-3">
                                <div className="p-3">Transaction Completed !</div>
                                <div className="flex flex-col items-center">
                                    <div className="font-mono p-5">
                                        Check your transaction status here
                                    </div>
                                    <a  className="font-robotomono underline"
                                        target="_blank" href={`https://goerli.etherscan.io/tx/${data?.hash}`}>
                                        https://goerli.etherscan.io/tx/{data?.hash}</a>
                                </div>
                                <div>Check out your purchases here</div>
                                <NavLink
                                    exact to={`/profile/purchase/${props.wallet}`}
                                    className="box w-fit text-lg bg-beige hover:bg-button hover:text-white text-black py-2 px-4 font-mono">
                                    My Purchases
                                </NavLink>    
                            </div> 
                        :
                            <></>}
             </div>
        </div>
       )

}


class Payment extends Component {

    //Test wallet : 0x1CB8C4aE3CaA2cCf38bc65cF04B22b7B50a3F11b
    //Completed payment hash : 0xa1963c9fc5fe23dd558d8311f75e3f496a45e02f586f6d1a6f0e5dae47ee110f
    //Test URL : http://localhost:3000/buynow/verifypurchase/payment/595c3bda-467b-4a45-8fdd-551d96fee19b

    render(){

        const {purchase,itemId,wallet,dispatch} = this.props

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
                                </div>
    
                                <div className="flex flex-col items-center break-all p-5
                                            xs:text-xs sm:text-sm md:text-base
                                            box bg-white"> 
                                    <MySubComponent dispatch={dispatch} wallet={wallet.address} purchase={purchase} price={purchase['totalprice']} receiverWallet={purchase['ownerwallet']}></MySubComponent>
                                </div>
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