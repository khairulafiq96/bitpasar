import React, {Component} from 'react'
import WalletConnect from '../Buttons/WalletConnect'
import {NavLink, Redirect} from 'react-router-dom'
import HomeMarketplace from '../PageComponents/HomeMarketplace'

class HomePage extends Component {
    render(){
        return(
            <div className=''>
                <div className='box bg-bitpasar p-4 text-white text-center'>
                    
                        <div className='font-robotomono text-lg pb-4 '>
                            Buy and sell physical items with Ethereum
                        </div>
                        <div className='flex flex-row space-x-4 p-2 pb-3 justify-center'>
                            <div>
                                <NavLink
                                    exact to="/marketplace"
                                    className="box text-lg bg-beige hover:bg-button hover:text-white text-black py-2 px-4 font-mono">
                                    Buy Items
                                    </NavLink>
                            </div>
                            <div>
                                <NavLink
                                    exact to='/additem'
                                    className="box text-lg bg-beige hover:bg-button hover:text-white text-black py-2 px-4 font-mono">
                                    Sell Items</NavLink>
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