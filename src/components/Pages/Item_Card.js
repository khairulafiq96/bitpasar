import React, {Component} from "react";
import '../Styles/Item.css'

export class Item_Card extends Component{
    render(){

        const {individualItem} = this.props

        return(
            <div className="xs:w-[150px] sm:w-[265px]">
                <div title={individualItem['shortdescription']} 
                    className="border-solid border-2 border-gray-400
                            bg-white hover:bg-button hover:text-white">
                    
                    <div className="flex h-[165px] justify-center bg-slate-200 p-2">
                        {individualItem['images'] ? 
                                                        <img className="object-scale-down"
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
            </div>
        )
    }
}

export default Item_Card