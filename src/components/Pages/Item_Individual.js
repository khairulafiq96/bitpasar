import React,{Component} from "react";
import {connect} from 'react-redux';
import { Redirect } from "react-router-dom";
import {handleGetIndividualItem} from '../../actions'
import '../Styles/Item.css'

class Item_Individual extends Component{

    state = {
        photoCount : 0,
        buyNow : false,
        buyButtonMessage:[]
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
        const {photoCount,buyNow,buyButtonMessage} = this.state
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
                window.alert(user['balance'])
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
            <div>
                
                {checkItems() ? 
                                <div>
                                    
                                    <div>
                                    <div className="itemLargeImage">
                                            <img src={items[itemId]['images'][photoCount]}></img>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="pr-[10px]" onClick={()=>decrementPic(photoCount)}>Previous</button>
                                        {photoCount+1} of {items[itemId]['images'].length}
                                        <button className="pl-[10px]" onClick={()=>incrementPic(photoCount)} >Next</button>
                                    </div>
                                    
                                    <div>
                                        {items[itemId]['title']}
                                    </div>
                                    <div>
                                        {items[itemId]['timestamp']}
                                    </div>
                                    <div>
                                        {items[itemId]['itemprice']} ETH
                                    </div>
                                    <div>
                                        {items[itemId]['ownername']}
                                    </div>
                                    <div>
                                        {items[itemId]['walletid']}
                                    </div>
                                    <div>
                                        {items[itemId]['location']}
                                    </div>
                                    <div>
                                        {items[itemId]['type']}
                                    </div>
                                    <div>
                                        {items[itemId]['longdescription']}
                                    </div>
                                    <div>
                                        {items[itemId]['phonenum']}
                                    </div>
                                    <div>
                                        <button onClick={()=>{handleBuyItem()}}>Buy Now</button>
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