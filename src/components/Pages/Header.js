import React, {Component} from 'react'
import WalletConnect from '../Buttons/WalletConnect'
import '../Styles/Header.css'

class Header extends Component {
    render(){
        return(
            <div className='header h-16 backdrop-blur bg-white/50'>
                <div className='pt-2 pb-2'>
                        <div className='float-left pl-10 pt-2.5'>bitPasar</div>
                        <div className='float-right pr-10 pt-2'>
                           <WalletConnect></WalletConnect>
                        </div>
                </div>
            </div>
        )
    }

}

export default Header