import React, {Component} from 'react'

class UserAddress extends Component {
    render(){
        return(
            <div>
                <div>Address</div>
                <input type="text" placeholder='Address line 1'></input>
                <br/>
                <input type="text" placeholder='Address line 2'></input>
                <br/>
                <input className='w-16' type="text" placeholder='City'></input>
                <input className='w-16' type="text" placeholder='State'></input>
                <input className='w-16' type="text" placeholder='Zipcode'></input>
                <br/>
                <button>Save</button>
            </div>

            
        )
    }

}

export default UserAddress