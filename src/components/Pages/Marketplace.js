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
            <div className="w-full px-2 sm:px-0 pb-2">
                <div className="font-mono pb-3 text-xl underline">
                    Marketplace
                </div>
                <div className="font-robotomono flex w-full lg:w-11/12">
                    <input type="text" 
                           placeholder="Search Items" 
                           className="w-1/2 py-2 px-3 "
                           onChange={(e)=>handleSearchInput(e)}>
                    </input>
                    <div className="pl-4">
                        <button className=""
                                onClick={()=>filterResults(search,1)}>
                            Search
                        </button>
                    </div>
                </div>

                <div className="flex flex-1">
                {items ? 
                        <div className="pt-5 flex flex-row flex-wrap justify-center lg:justify-start">
                            {Object.keys(items).map(function(keyValue, index){
                                return(
                                    <div className="w-1/2 xs:w-fit xs:p-1 sm:pr-3">
                                        <Link key={keyValue} className="" to={"/item/"+keyValue}>
                                            <Item_Card individualItem={items[keyValue]}></Item_Card>
                                        </Link>
                                    </div>
                                )  
                            })}
                        </div>
                        :
                        <div>
                            Loading...    
                        </div>}
       
                </div>
                <div className="flex flex-row space-x-2 justify-center pt-5">
                {marketplace ? 
                             marketplace['totalPage'].map((pageNum)=>
                             {return(
                                    <div className="">
                                        <button key={pageNum} 
                                                className="text-lg" 
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