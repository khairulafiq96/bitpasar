import React, {Component} from "react";
import {connect} from 'react-redux';
import {handleGetAllMarketplaceItems,handleGetSearchMarketplaceItems,handleMarketplaceTotalPage} from '../../actions'
import Item_Card from "./Item_Card";
import '../Styles/Item.css'

class Marketplace extends Component {

    state = {
        search : ""
    }

    componentDidMount= async () => {
        //quite inneficient to call 2 API's all the time
        await Promise.all([
            this.props.dispatch(handleGetAllMarketplaceItems(1,""),
            this.props.dispatch(handleMarketplaceTotalPage(1,""))
            )])

    }

    /*
        To be added LAter

                <div>
                    Sort by :
                    <br/>
                    <button>Latest</button>
                    <br/>
                    <button>Lowest Price</button>
                    <br/>
                    <button>Highest Price</button>
                </div>
    */




    render(){

        const {items,marketplace} = this.props
        const {search} = this.state
        
        
        const handleSearchInput = (event)=>{
            var lowercase = event.target.value.toLowerCase();
            this.setState({search : lowercase})
        }

        const filterResults = async (search,page) => {
            //quite inneficient to call 2 API's all the time
            await Promise.all([this.props.dispatch(handleGetSearchMarketplaceItems(page,search)),
                               this.props.dispatch(handleMarketplaceTotalPage(page,search)) 
            ]) 
        }

        return (
            <div>
                <div>Marketplace</div>
                <div>
                    
                    <input type="text" placeholder="Search Items" onChange={(e)=>handleSearchInput(e)}></input>
                    <button onClick={()=>filterResults(search,1)}>Search</button>
                </div>

      
                {items ? 
                        <div className="max-w-xl pt-10">
                            {Object.keys(items).map(function(keyValue, index){
                                return(
                                    <div key={keyValue} className="inline-block pr-5" >
                                        <Item_Card individualItem={items[keyValue]}></Item_Card>
                                        <br/>
                                    </div>   
                                )  
                            })}
                        </div>
                        :
                        <div>
                            Loading...    
                        </div>}
       

                {marketplace ? 
                             marketplace['totalPage'].map((pageNum)=>
                             {
                                return(
                                    <div className="inline-block border-solid border-2 border-black p-2">
                                        <button onClick={()=>filterResults(search,pageNum)}>{pageNum}</button>
                                    </div>
                                )
                             }
                             )
                             :
                             <div>
                                Loading...
                             </div>
                }

                
            </div>
        )
    }
}

function mapStateToProps({items,marketplace}) {
    return {
        items,
        marketplace
    }
}

export default connect(mapStateToProps)(Marketplace)