import React, {Component} from "react";
import '../Styles/Item.css'

export class Item_Card extends Component{
    render(){

        const {individualItem} = this.props

        return(
            <div className="border-solid border-2 border-gray-400 p-3 h-48 ">
                
                <div className="flex justify-center">
                    {individualItem['images'] ? 
                                                    <img className="object-scale-down h-24 w-32"
                                                        src={individualItem['images'][0]}>
                                                    </img>
                                                
                                                :
                                                <div>No Images Provided</div>}
                </div>  
                <div className="font-robotomono p-2">
                    <div className="font-bold">
                        {individualItem['title']}
                    </div>
                    <div className="text-xs">
                        {individualItem['itemprice']} ETH
                    </div>
                    <div className="text-xs">
                        {individualItem['location']}
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Item_Card