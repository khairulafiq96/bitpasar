import React, {Component} from 'react'
import {connect} from 'react-redux';
import UserAddress from '../FormComponent/UserAddress'
import UserDetails from '../FormComponent/UserDetails'
import { handleUserRegistration } from '../../actions';
import WalletConnect from '../Buttons/WalletConnect';
import { Redirect } from 'react-router-dom';

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
            privacypolicy : false,
            redirectToHome : false
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
       await dispatch(handleUserRegistration(obj)).then((response)=>{
              if (response==="success"){
                     this.setState({redirectToHome : true})
              } else {
                     this.setState({redirectToHome : false}) 
              }
                   
                     
       })
    }


    render(){
       const {user} = this.props
       const {redirectToHome} = this.state

       /*if(redirectToHome== true){
              return <Redirect exact to='/home'></Redirect>
       }*/

        return(
            <div className='flex justify-center'>
              {user ? <div className='px-2 sm:w-[500px]'>
                            <div className='flex flex-col space-y-2
                                            box bg-slate-200 p-5'>
                                   <div className='font-mono text-lg pb-3 '>
                                          Registration
                                   </div>
                                   <div className='font-robotomono'>
                                          My Details</div>
                                   <div className='w-2/3'>
                                          <label htmlFor="name">Name</label>
                                          <input id="name" 
                                                 type="text" placeholder='Name' name='name'
                                                 onChange={this.handleChange}></input>
                                   </div>
                                   <div className='w-2/3'>
                                          <label className='text-xs'htmlFor="email">Email</label>
                                          <input id="email" type="text" placeholder='Email' name='email'
                                                 onChange={this.handleChange}></input>
                                   </div>
                                   <div className='w-2/3'>
                                          <label className='text-xs'htmlFor="phonenum">Phone number</label>
                                          <input id='phonenum' type="text" placeholder='Phonenum' name='phonenum'
                                                 onChange={this.handleChange}></input>
                                   </div>
                                   <div className='pt-3'>
                                          <label clasname='text-xs' htmlFor='address'>Shipping Address</label>
                                          <input id='address'
                                                 type="text" 
                                                 placeholder='Address line 1' name='address1'
                                                 onChange={this.handleChange}></input>
                                   </div>
                                   <input type="text" placeholder='Address line 2' name='address2'
                                          onChange={this.handleChange}></input>
                                   <div className='flex flex-col w-2/3 space-y-2 
                                                   sm:flex-row sm:space-x-2 sm:space-y-0 sm:w-full'>
                                          <input className='' type="text" 
                                                 placeholder='City' name='city'
                                                 onChange={this.handleChange}></input>
                                          <input className='' type="text" 
                                                 placeholder='State' name='state'
                                                 onChange={this.handleChange}></input>
                                          <input className='' type="text" 
                                                 placeholder='Zipcode' name='zipcode'
                                                 onChange={this.handleChange}></input>
                                   </div>
                                   <div className='py-5'>
                                          <label className='text-sm'>
                                          <input type="checkbox"
                                                 checked={this.state.privacypolicy}
                                                 onChange={this.handleCheckbox}></input> I have read, understand and agree on the privacy policy stated here
                                          </label>
                                   </div>
                                   <div className='flex justify-center'>
                                          <button className='disabled:bg-red-200 disabled:line-through disabled:text-white' 
                                                 disabled={!this.state.privacypolicy} 
                                                  onClick={(e)=>this.handleSubmission(e)}>
                                                 Submit
                                          </button>
                                   </div>
                            </div>
                     </div>
                     :
                     <div>  
                            <br/>
                            <div>Please connect to your wallet to proceed to registration</div>
                            <WalletConnect></WalletConnect>
                     </div>}
              
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