import React, {Component} from 'react'
import WalletConnect from '../Buttons/WalletConnect'
import '../Styles/Header.css'
import {NavLink} from 'react-router-dom'

class Header extends Component {
    render(){
        return(
            <div className='pb-5'>
                <div className='p-4 backdrop-blur bg-white/50 flex font-mono items-center justify-center'>
                    <div className='flex flex-end items-center  w-full sm:w-10/12'>
                        <div className=''>
                            <NavLink title='Home page'
                                      className='bitpasar_text text-xl text-blue-600 hover:drop-shadow-lg' 
                                      exact to='/home'>bitPasar</NavLink>
                        </div>
                        <div className='ml-auto'>
                            <WalletConnect></WalletConnect>
                        </div>
                    </div>
                   
                </div>
            </div>
        )
    }

}

export default Header