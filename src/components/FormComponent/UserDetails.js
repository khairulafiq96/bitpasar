import React, {Component} from 'react'

class UserDetails extends Component {

    state = {
        name : null,
        email : null,
        phonenum : null,
        acctype: null
    }



    handleName(event){
        const val = event.target.value;
        this.setState({
            name: val
        })
    }

    handleEmail(event){
        const val = event.target.value;
        this.setState({
            email: val
        })
    }

    handlePhonenum(event){
        const val = event.target.value;
        this.setState({
            phonenum: val
        })
    }
    

    render(){


        return(
            <div>
                <div>Contact Details</div>
                <input className='min-w-4' type="text" placeholder='Name'
                       onChange={(e)=>this.handleName(e)}></input> 
                <input type="text" placeholder='Email'
                       onChange={(e)=>this.handleEmail(e)}></input>
                <br></br>
                <input type="text" placeholder='Phonenum'
                       onChange={(e)=>this.handlePhonenum(e)}></input>
                <input type="text" placeholder='Account Type'></input>
                <br></br>
                <button>Save</button>
            </div>
        )
    }

}

export default UserDetails;
