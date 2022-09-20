import React, {Component} from 'react'
import WalletConnect from '../Buttons/WalletConnect'
import {NavLink, Redirect} from 'react-router-dom'
import MarketplaceTop5 from '../PageComponents/MarketplaceTop5'

class HomePage extends Component {
    render(){
        return(
            <div className='pt-4 '>
                <div className='bg-bitpasar p-4 text-white text-center'>
                    <div className='border-solid border-2 border-beige p-1 '>
                        <div className='font-robotomono p-2 '>
                            Buy and sell physical items with Ethereum
                        </div>
                        <div className='flex p-2 pb-3 justify-center'>
                            <div className='pr-2'>
                                <NavLink
                                    exact to="/marketplace"
                                    className="text-xs bg-beige hover:bg-yellow-200 text-black py-2 px-4 font-mono">
                                    Buy Items
                                    </NavLink>
                            </div>
                            <div>
                                <NavLink
                                    exact to='/additem'
                                    className="text-xs bg-beige hover:bg-yellow-200 text-black py-2 px-4 font-mono">
                                    Sell Items</NavLink>
                            </div>
                            
                            
                        </div>
                    </div>
                </div>
                <div className='pt-5'>
                    <MarketplaceTop5></MarketplaceTop5>
                </div>
            </div>
        )
    }

}

export default HomePage