import React, {Component} from 'react'
import WalletConnect from '../Buttons/WalletConnect'
import {NavLink, Redirect} from 'react-router-dom'
import HomeMarketplace from '../PageComponents/HomeMarketplace'

class HomePage extends Component {
    render(){
        return(
            <div className='pt-4 '>
                <div className='bg-bitpasar p-4 text-white text-center'>
                    <div className='border-solid border-2 border-beige p-1 drop-shadow-2xl'>
                        <div className='font-robotomono p-2 '>
                            Buy and sell physical items with Ethereum
                        </div>
                        <div className='flex p-2 pb-3 justify-center'>
                            <div className='pr-2'>
                                <NavLink
                                    exact to="/marketplace"
                                    className="text-lg bg-beige hover:bg-yellow-200 text-black py-2 px-4 font-mono">
                                    Buy Items
                                    </NavLink>
                            </div>
                            <div>
                                <NavLink
                                    exact to='/additem'
                                    className="text-lg bg-beige hover:bg-yellow-200 text-black py-2 px-4 font-mono">
                                    Sell Items</NavLink>
                            </div>
                            
                            
                        </div>
                    </div>
                </div>
                <div className='pt-5'>
                    <HomeMarketplace></HomeMarketplace>
                </div>
            </div>
        )
    }

}

export default HomePage