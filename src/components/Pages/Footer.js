import React, {Component} from 'react'
import '../Styles/Footer.css'

class Footer extends Component {
    render(){
        return(
            <div className='pt-5'>
                <div className='p-4 backdrop-blur bg-white/50 flex items-center font-mono text-sm'>
                    <div className='pr-4'>Privacy policy</div>
                    <div className=''>Contribute now</div>
                </div>
            </div>
        )
    }

}

export default Footer