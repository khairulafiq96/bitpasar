import React, {Component} from 'react'
import '../Styles/Footer.css'

class Footer extends Component {
    render(){
        return(
            <div className='footer h-10 backdrop-blur bg-white/50 flex'>
                <div className='pl-10 pt-2'>Privacy policy</div>
                <div className='pl-10 pt-2'>Contribute now</div>
            </div>
        )
    }

}

export default Footer