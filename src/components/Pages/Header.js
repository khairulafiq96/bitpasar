import React, {Component} from 'react'
import '../Styles/Header.css'

class Header extends Component {
    render(){
        return(
            <div className='header backdrop-blur bg-white/50'>
                <div className='pt-2 pb-2'>
                        <div className='float-left pl-10'>bitPasar</div>
                        <div className='float-right pr-10'>Connect Wallet</div>
                </div>
            </div>
        )
    }

}

export default Header