import React, {Component} from "react";
import '../Styles/Item.css'

export class Item_Card extends Component{
    render(){

        const {individualItem} = this.props

        return(
            <div className="border-solid border-2 border-black p-2 h-[270px] w-[250px]">
                <img className="itemImage justify-center" src={individualItem['images'][0]}></img>
                <div className="max-w-[250px]">{individualItem['title']}</div>
                <div>{individualItem['itemprice']} ETH</div>
            </div>
        )
    }
}

export default Item_Card