import React, {Component} from "react";
import {connect} from 'react-redux';
import {handleGetAllMarketplaceItems,handleGetSearchMarketplaceItems,handleMarketplaceTotalPage} from '../../actions'
import Item_Card from "./Item_Card";
import '../Styles/Item.css'
import { Link, Redirect } from 'react-router-dom';


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
            <div className="w-full pb-2">
                <div className="font-mono py-4 text-xl">
                    Marketplace
                </div>
                <div className="font-robotomono flex">
                    <input type="text" 
                           placeholder="Search Items" 
                           className="w-1/2 py-2 px-3 "
                           onChange={(e)=>handleSearchInput(e)}>
                    </input>
                    <div className="pl-4">
                    <button className="bg-beige hover:bg-yellow-200 text-black py-2 px-4"
                            onClick={()=>filterResults(search,1)}>
                        Search
                    </button>
                    </div>
                </div>

      
                {items ? 
                        <div className="pt-7">
                            {Object.keys(items).map(function(keyValue, index){
                                return(
                                    <Link key={keyValue} className="inline-block pr-5 " to={"/item/"+keyValue}>
                                        <Item_Card individualItem={items[keyValue]}></Item_Card>
                                        <br/>
                                    </Link>   
                                )  
                            })}
                        </div>
                        :
                        <div>
                            Loading...    
                        </div>}
       

                {marketplace ? 
                             marketplace['totalPage'].map((pageNum)=>
                             {return(
                                    <div className="inline-block pr-2">
                                        <button key={pageNum} 
                                                className="font-robotomono  hover:bg-yellow-200 bg-beige p-2" 
                                                onClick={()=>filterResults(search,pageNum)}>
                                                {pageNum}
                                        </button>
                                    </div>
                                )})
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