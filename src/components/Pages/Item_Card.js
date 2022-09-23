import React, {Component} from "react";
import '../Styles/Item.css'

export class Item_Card extends Component{
    render(){

        const {individualItem} = this.props

        return(
            <div title={individualItem['shortdescription']} 
                className="border-solid border-2 border-gray-400 p-3 sm:h-48 sm:w-56 w-36
                          bg-lightblue  hover:bg-yellow-200 title:bg-red-200">
                
                <div className="flex justify-center">
                    {individualItem['images'] ? 
                                                    <img className="object-scale-down h-24 w-32"
                                                        src={individualItem['images'][0]}>
                                                    </img>
                                                
                                                :
                                                <div>No Images Provided</div>}
                </div>  
                <div className="font-robotomono p-2">
                    <div className="text-xs h-8 overflow-hidden">
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