import React, {Component} from 'react'
import {connect} from 'react-redux';
import UserAddress from '../FormComponent/UserAddress'
import UserDetails from '../FormComponent/UserDetails'
import { handleUserRegistration } from '../../actions';

class Registration extends Component {

    constructor(){
        super();

        this.state = {
            name : null,
            email : null,
            phonenum : null,
            acctype: null,
            address1:null,
            address2:null,
            city:null,
            state:null,
            zipcode:null,
            privacypolicy : false
        }

        this.handleChange = this.handleChange.bind(this);
    
    }

    handleChange (evt) {
        // check it out: we get the evt.target.name (which will be either "email" or "password")
        // and use it to target the key on our `state` object with the same name, using bracket syntax
        this.setState({ [evt.target.name]: evt.target.value });
    }

    handleCheckbox = () => {
        this.setState({privacypolicy:!this.state.privacypolicy})
      };

    handleSubmission = async (e) => {
       e.preventDefault();
       const {dispatch,user} = this.props
       var obj = {
              "name" : this.state.name,
              "email" : this.state.email,
              "phonenum" : this.state.phonenum,
              "address1" : this.state.address1,
              "address2" : this.state.address2,
              "city" : this.state.city,
              "state" : this.state.state,
              "zipcode" : this.state.zipcode,
              "walletid" :user['address']  
       }
       await dispatch(handleUserRegistration(obj))
    }
    

    render(){
        return(
            <div>
                <br/>
                Registration
                <div>Contact Details</div>
                <input className='min-w-4' 
                       type="text" placeholder='Name' name='name'
                       onChange={this.handleChange}></input> 
                <input type="text" placeholder='Email' name='email'
                       onChange={this.handleChange}></input>
                <br></br>
                <input type="text" placeholder='Phonenum' name='phonenum'
                       onChange={this.handleChange}></input>
                <input type="text" placeholder='Account Type'></input>
                <br></br>
         
                <div>Address</div>
                <input type="text" 
                       placeholder='Address line 1' name='address1'
                       onChange={this.handleChange}></input>
                <br/>
                <input type="text" placeholder='Address line 2' name='address2'
                       onChange={this.handleChange}></input>
                <br/>
                <input className='w-16' type="text" 
                       placeholder='City' name='city'
                       onChange={this.handleChange}></input>
                <input className='w-26' type="text" 
                       placeholder='State' name='state'
                       onChange={this.handleChange}></input>
                <input className='w-16' type="text" 
                       placeholder='Zipcode' name='zipcode'
                       onChange={this.handleChange}></input>
                <br/>
                <label>
                <input type="checkbox"
                       checked={this.state.privacypolicy}
                       onChange={this.handleCheckbox}></input> I have read, understand and agree on the privacy policy stated here
                </label>
                <br/>

                <button disabled={!this.state.privacypolicy} onClick={(e)=>this.handleSubmission(e)}>Submit</button>
            </div>

            
        )
    }

    
}

function mapStateToProps({user}) {
       return {
           user
       }
}

export default connect(mapStateToProps)(Registration)