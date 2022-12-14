import { async } from '@firebase/util';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleUserRegistration,handleUpdateUserDetails,handleDeleteUser } from '../../actions';
import { convertUserId } from '../../Utility/general';


class MyProfile extends Component{

    //test url : http://localhost:3000/profile/0x68eb837dc8a82e717b3e1df31573bb217f9298da

    constructor(){
        super()
        this.state = {
            'name' : null,
            'email' : null,
            'phonenum' : null,
            'address1' : null,
            'address2' : null,
            'city' : null,
            'state' : null,
            'zipcode' : null,
            'redirectToRegistrationPage' : false
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (evt) {
        // check it out: we get the evt.target.name (which will be either "email" or "password")
        // and use it to target the key on our `state` object with the same name, using bracket syntax
        this.setState({ [evt.target.name]: evt.target.value });
    }

    async componentDidMount(){

        const {user,wallet} = this.props
        const userId = convertUserId(user)

        if(userId){
            //console.log("User details is identified")
            this.setState({
                'name' : user[userId]['name'],
                'email' : user[userId]['email'],
                'phonenum' : user[userId]['phonenum'],
                'address1' : user[userId]['address1'],
                'address2' : user[userId]['address2'],
                'city' : user[userId]['city'],
                'state' : user[userId]['state'],
                'zipcode' : user[userId]['zipcode'],
                "walletid" : wallet.address
            })
        }
        
    }

    handleSubmission = async (e,wallet) => {
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
               "walletid" : wallet.address  
        }
        await dispatch(handleUpdateUserDetails(obj))
     }

    handleDeleteAccount = async(userid) => {
        await this.props.dispatch(handleDeleteUser(userid))
    }

    render(){

        const {user,wallet} = this.props
        const { name,
                email,
                phonenum,
                address1,
                address2,
                city,
                state, 
                zipcode } = this.state
        const userId = convertUserId(user)
        
        const renderExternalComponent = () => {
            if(!userId){
                window.alert("Please complete your registration to access this page")
                return(<Redirect exact to="/registration"></Redirect>)
            } else {
                return(<div className="font-mono">Loading...</div>)
            }
        }

        return (
            <div>
                <div className='font-mono text-lg pb-5 underline'>
                                    Your details
                                </div>
                {userId ? 
                            <div className='flex flex-col space-y-4 p-5
                                            text-sm sm:text-base
                                            box bg-slate-200'>
                                <div className='font-robotomono'>
                                    Contact Details
                                </div>
                                
                                <div className='w-2/3'>
                                    <label for="fullname">Name</label>
                                    <input className='text-xs sm:text-base'
                                        type="text" placeholder='Name' name='name' id="fullname"
                                        onChange={this.handleChange} value={name || ''}></input> 
                                </div>
                                <div className='w-2/3'>
                                    <label for="email">Email</label>
                                    <input type="text" placeholder='Email' name='email' id="email"
                                    onChange={this.handleChange} value={email || ''}></input>
                                </div>
                                <div className='w-2/3'>
                                    <label for="phonenum">Phone number</label>
                                    <input type="text" placeholder='Phonenum' name='phonenum' id="phonenum"
                                        onChange={this.handleChange} value={phonenum || ''}></input>
                                </div>
                                <div className='flex flex-col space-y-2 min-w-[300px]'>
                                            <label for='address'>Shipping Address</label>
                                            <input id='address 'type="text" className='' 
                                                placeholder='Address line 1' name='address1'
                                                onChange={this.handleChange} value={address1 || ''}></input>
                                            <input  type="text" placeholder='Address line 2' name='address2'
                                                onChange={this.handleChange} value={address2 || ''}></input>
                                            <div className='flex flex-col space-y-2 w-2/3 
                                                            sm:flex-row sm:space-x-2 sm:space-y-0 sm:w-full'>
                                                <input  type="text" 
                                                    placeholder='City' name='city'
                                                    onChange={this.handleChange} value={city || ''}></input>
                                                <input  type="text" 
                                                    placeholder='State' name='state'
                                                    onChange={this.handleChange} value={state || ''}></input>
                                                <input type="text" 
                                                    placeholder='Zipcode' name='zipcode'
                                                    onChange={this.handleChange} value={zipcode || ''}></input>
                                            </div>
                                </div>
                                <div className='flex items-center justify-center pt-3'>
                                    <div className='flex flex-row space-x-2'>
                                        <button onClick={(e)=>this.handleSubmission(e,wallet)}>Save</button>
                                        <button onClick={(e)=>this.handleDeleteAccount(userId)}>Delete Account</button>
                                    </div>
                                </div>
                            </div>
                        
                        :
                        renderExternalComponent()}
                
            </div>
        )
    }
}

function mapStateToProps({user}) {
    return {
      user
    }
  }

export default connect(mapStateToProps)(MyProfile)