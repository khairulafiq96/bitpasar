import React, {Component} from "react";
import {connect} from 'react-redux';
import {handleGetAllMarketplaceItems} from '../../actions'
import Item_Card from "./Item_Card";
import '../Styles/Item.css'

class Marketplace extends Component {

    state = {
        search : null
    }

    componentDidMount= async () => {
        
        await Promise.all([
            this.props.dispatch(handleGetAllMarketplaceItems(1))])

    }





    render(){

        const {items} = this.props
        const {search} = this.state
        
        
        const handleSearchInput = (event)=>{
            var lowercase = event.target.value.toLowerCase();
            this.setState({search : lowercase})
        }

        const filterResults = (search) => {
            
        }

        return (
            <div>
                <div>Marketplace</div>
                <div>
                    <input type="text" placeholder="Search Items" onChange={(e)=>handleSearchInput(e)}></input>
                    <button>Search</button>
                </div>
                <div>
                    Sort by :
                    <br/>
                    <button>Latest</button>
                    <br/>
                    <button>Lowest Price</button>
                    <br/>
                    <button>Highest Price</button>
                </div>
                <div>
                    {Object.keys(items).map(function(keyValue, index){
                        return(
                            <div key={keyValue} className="itemCard">
                                <Item_Card individualItem={items[keyValue]}></Item_Card>
                                <br/>
                            </div>
                            
                        )
                        

                    })}
                   
                </div>
            </div>
        )
    }
}

function mapStateToProps({items}) {
    return {
        items
    }
}

export default connect(mapStateToProps)(Marketplace)