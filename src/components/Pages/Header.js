import React, {Component} from 'react'
import WalletConnect from '../Buttons/WalletConnect'
import '../Styles/Header.css'
import {NavLink} from 'react-router-dom'

class Header extends Component {
    render(){
        return(
            <div className='pb-5'>
                <div className='p-4 backdrop-blur bg-white/50 flex justify-between items-center font-mono'>
                    <div className='float-left'>
                        <NavLink className='drop-shadow-lg  text-bitpasar' exact to='/home'>bitPasar</NavLink>
                    </div>
                    <div className='float-right'>
                        <WalletConnect></WalletConnect>
                    </div>
                </div>
            </div>
        )
    }

}

export default Header