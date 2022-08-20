import * as API from '../Utility/API'
import { setRegisterUser } from './users'
import {getAllMarketplaceItems} from './items'
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

export function handleGetAllMarketplaceItems(page){
    return(dispatch)=>{
        return API.getAllMarketplaceAPI(page).then((response)=>{
            dispatch(getAllMarketplaceItems(response))
        })
    }
}