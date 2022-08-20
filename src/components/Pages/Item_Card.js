import React, {Component} from "react";
import '../Styles/Item.css'

export class Item_Card extends Component{
    render(){

        const {individualItem} = this.props

        return(
            <div className="itemPadding">
                <img className="itemImage" src={individualItem['images'][0]}></img>
                <div>{individualItem['title']}</div>
                <div>{individualItem['itemprice']} ETH</div>
            </div>
        )
    }
}

export default Item_Card