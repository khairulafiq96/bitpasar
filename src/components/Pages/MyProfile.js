import { async } from '@firebase/util';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleGetUserDetails } from "../../actions";
import { handleUserRegistration,handleUpdateUserDetails } from '../../actions';


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

        const {user,dispatch} = this.props
        const userId = Object.keys(user).filter((details)=> details !== 'address' && details !== 'balance' && details !== 'mypurchase')
        
        if(user[userId]){
            console.log("User details is identified")
            this.setState({
                'name' : user[userId]['name'],
                'email' : user[userId]['email'],
                'phonenum' : user[userId]['phonenum'],
                'address1' : user[userId]['address1'],
                'address2' : user[userId]['address2'],
                'city' : user[userId]['city'],
                'state' : user[userId]['state'],
                'zipcode' : user[userId]['zipcode'],
                "walletid" :user['address']
            })
        }else{
            //User did not registered to the app
           window.alert("Please complete your registration")
           this.setState({
                'redirectToRegistrationPage' : true
           })
        }
        
    }

    handleSubmission = async (e,walletaddress) => {
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
               "walletid" : walletaddress  
        }
        await dispatch(handleUpdateUserDetails(obj))
     }

    render(){

        const {user} = this.props
        const { name,
                email,
                phonenum,
                address1,
                address2,
                city,
                state, 
                zipcode } = this.state
        const {userId} = this.props.match.params
        

        //TOdo : If user hasent registered,redirect user to the Registration page

        const redirectToRegistrationPage =() =>{
            if(this.state.redirectToRegistrationPage === true){
                return <Redirect exact to='/registration'></Redirect>
            }
        }

        const redirectToHome = () =>{
            window.alert("Please connect to your wallet to access this page")
            return <Redirect exact to='/home'></Redirect>
        }

        return (
            <div>
                {redirectToRegistrationPage()}
                {user ?
                        <div>
                            <div>
                                <br></br>
                                Your details
                                <br></br>
                                <br></br>
                                <div>
                                    Contact Details
                                </div>
                                <input className='min-w-4' 
                                            type="text" placeholder='Name' name='name'
                                            onChange={this.handleChange} value={name || ''}></input> 
                                        <input type="text" placeholder='Email' name='email'
                                            onChange={this.handleChange} value={email || ''}></input>
                                        <br></br>
                                        <input type="text" placeholder='Phonenum' name='phonenum'
                                            onChange={this.handleChange} value={phonenum || ''}></input>
                            </div>
                            <div>
                                <div>Address</div>
                                        <input type="text" 
                                            placeholder='Address line 1' name='address1'
                                            onChange={this.handleChange} value={address1 || ''}></input>
                                        <br/>
                                        <input type="text" placeholder='Address line 2' name='address2'
                                            onChange={this.handleChange} value={address2 || ''}></input>
                                        <br/>
                                        <input className='w-16' type="text" 
                                            placeholder='City' name='city'
                                            onChange={this.handleChange} value={city || ''}></input>
                                        <input className='w-26' type="text" 
                                            placeholder='State' name='state'
                                            onChange={this.handleChange} value={state || ''}></input>
                                        <input className='w-16' type="text" 
                                            placeholder='Zipcode' name='zipcode'
                                            onChange={this.handleChange} value={zipcode || ''}></input>
                            </div>
                            <br></br>
                            <div>
                                <button onClick={(e)=>this.handleSubmission(e,user['address'])}>Save</button>
                                <br></br>
                                <button>Delete Account</button>
                            </div>
                        </div>
                        :
                        redirectToHome()}
                
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