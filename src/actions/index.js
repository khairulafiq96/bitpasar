import * as API from '../Utility/API'
import { setRegisterUser } from './users'
import { Redirect } from 'react-router'

export function handleUserRegistration(user){
    return(dispatch)=>{
        return API.registrationAPI(user).then((response)=>{
            if(response.status=="denied"){
                window.alert(response.message)
                return "denied"
            } else {
                dispatch(setRegisterUser(response))
                window.alert("Registration Successful")
                return "success"
                
            }
            
        })
    }
}