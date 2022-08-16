import React, {Component} from 'react'
import WalletConnect from '../Buttons/WalletConnect'
import {NavLink, Redirect} from 'react-router-dom'

class CategoryPage extends Component {
    render(){
        return(
            <div>
                <br></br>
                <div className='pb-2'>Buy and sell physical items with cryptocurrencies</div>
                <button
                    className="text-xs bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Buy Items
                    </button>
                <br></br>
                <br></br>
                <NavLink
                    exact to='/additem'
                    className=" text-xs bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Sell Items</NavLink>
                <br></br>
                <br></br>
                <div className='pb-2'>the bridge between real life and virtual currency</div>
                <WalletConnect></WalletConnect>
            </div>
        )
    }

}

export default CategoryPage