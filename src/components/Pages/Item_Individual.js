import React,{Component} from "react";
import {connect} from 'react-redux';
import { Redirect } from "react-router-dom";
import {handleGetIndividualItem} from '../../actions'
import '../Styles/Item.css'
import { convertUTCtoDate } from "../../Utility/general";

class Item_Individual extends Component{

    state = {
        photoCount : 0,
        buyNow : false,
        buyButtonMessage:[],
        redirectToBuyNow : false
    }

    componentDidMount= async () => {
        const {items,dispatch} = this.props
        const {itemId} = this.props.match.params

        //console.log("Running component did mount")

        //This function checks if the page contains the itemId in the State of the app, 
        //If its not available, the app will call an API to be appended to the current state
        try {
            //This is the way to check if the item is in the state, It will always return an
            //error if items[itemId] is used any where in the code, therefore a try catch is used
            if(items[itemId] && items[itemId] !== undefined){
                console.log("Item "+items[itemId] + "is in state, No need for API Call" )
            } else {
                individualItem()
            }

        } catch (e) {
            individualItem()
        }

        //Calling the API and dispatching the object
        async function individualItem(){
            try {    
                await dispatch(handleGetIndividualItem(itemId))
            } catch (e){
                window.alert(e)
            }
        }
        
        
       

        

    }

    render(){

        const {items,user} = this.props
        const {itemId} = this.props.match.params
        const {photoCount,buyNow,buyButtonMessage,redirectToBuyNow} = this.state
        //const photoLength = items[itemId]['images'].length

        const decrementPic = (currPhoto) => {
            if(currPhoto!==0){
                this.setState({photoCount:photoCount-1})
            }
        }

        const incrementPic = (currPhoto) => {
            if(currPhoto !== (items[itemId]['images'].length -1)){
                this.setState({photoCount:photoCount+1})
            }
        }

        const handleBuyItem = () =>{
            console.log("Running buy now button")
            if(!user){
              window.alert("Please sign in to your wallet to buy")
              //this.setState({buyButtonMessage : [...this.state.buyButtonMessage, 'new value'] })
            } else if (items[itemId]['status'] !== 'new'){
                window.alert("Item is "+ items[itemId]['status'])
                //this.setState({buyButtonMessage : [...this.state.buyButtonMessage, 'new value'] })
            } else if (parseFloat(user['balance']) < parseFloat(items[itemId]['itemprice'])){
                window.alert("Balance is unsufficient")
                //this.setState({buyButtonMessage : [...this.state.buyButtonMessage, 'new value'] })
            }
            
            else {
                //redirect to next page
                //window.alert(user['balance'])
                this.setState({redirectToBuyNow : true})
                //return <Redirect exact to = {"/buynow/"+itemId} ></Redirect>
            }
           
        }

        //Redirecting user to the next page
        function renderRedirect(){
            if(redirectToBuyNow){
                return <Redirect exact to = {"/buynow/"+itemId} ></Redirect>
            }
        }

        //as items[itemId] always return an error when null/undefined, try catch is used
        const checkItems = () => {
            try {
                if(items[itemId]){
                   return true
                }
            } catch (e){
                return false
            } 
        }

        return (
            <div className="w-full lg:w-3/4">
                {renderRedirect()}
                {checkItems() ? 
                                <div className="w-full flex flex-col items-center">
                                    <div className="sm:flex sm:space-x-2 sm:pb-3 w-full">
                                        <div className="flex flex-1 items-center flex-col 
                                                        box bg-white 
                                                        ">
                                            <div className="flex flex-1 w-full h-full p-2
                                                           justify-center items-center bg-slate-200">
                                                
                                                <img className="object-scale-down w-[493px] h-[268px]"
                                                        src={items[itemId]['images'][photoCount]}></img>
                                                
                                            </div>
                                            <div className="font-mono xs:py-2 sm:py-5 flex items-center">
                                                <button className="" 
                                                        onClick={()=>decrementPic(photoCount)}>
                                                        Previous
                                                </button>
                                                <div className="px-2">
                                                    {photoCount+1} of {items[itemId]['images'].length}
                                                </div>
                                                <button className="" 
                                                        onClick={()=>incrementPic(photoCount)}>
                                                        Next
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex flex-col box bg-white sm:w-1/2">
                                            <div className="font-robotomono p-5 break-words ">
                                                <div className="sm:text-lg underline">
                                                    {items[itemId]['title']}
                                                </div>
                                                <div className="sm:text-lg py-2 underline">
                                                    {items[itemId]['itemprice']} ETH
                                                </div>
                                                <div className="text-xs sm:text-sm py-2">
                                                    <div className="">
                                                        From : {items[itemId]['location']}
                                                    </div>
                                                    <div className="">
                                                        Date added : {convertUTCtoDate(items[itemId]['timestamp'])}
                                                    </div>
                                                </div>
                                                
                                                <div className="text-xs sm:text-sm">
                                                    <div className="py-1 text-base underline">
                                                        Contact Details
                                                    </div>
                                                    <div>
                                                        {items[itemId]['ownername']}
                                                    </div>
                                                    <div>
                                                        {items[itemId]['phonenum']}
                                                    </div>
                                                    <div>
                                                        {items[itemId]['walletid']}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-center items-center w-full h-full p-5">
                                                    {items[itemId]['postagename'] !== 'None' ?
                                                                                            <div className="">
                                                                                                <button className="xs:text-sm sm:text-lg"
                                                                                                        onClick={()=>{handleBuyItem()}}>
                                                                                                        Buy Now
                                                                                                </button>
                                                                                            </div>
                                                                                            :<div>
                                                                                                Please contact seller to enquire about this item
                                                                                            </div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box bg-white w-full">
                                        <div className="xs:p-3 sm:p-5">
                                            <div className="font-mono sm:font-lg underline">
                                                Description
                                            </div>
                                            <div className="font-robotomono text-sm py-3 leading-snug whitespace-pre-line">
                                                {items[itemId]['longdescription']}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div>
                                    Loading....
                                   
                                </div>   
                }
                

                
            </div>
        )
    }
}

function mapStateToProps({user,items}) {
    return {
      user,
      items
    }
  }

export default connect(mapStateToProps)(Item_Individual)