import * as API from '../Utility/API'
import { setRegisterUser } from './users'

export function handleUserRegistration(user){
    return(dispatch)=>{
        return API.registrationAPI(user).then((response)=>{
            if(response.status=="denied"){
                window.alert(response.message)
            } else {
                dispatch(setRegisterUser(response))
                window.alert("Registration Successful")
            }
            
        })
    }
}