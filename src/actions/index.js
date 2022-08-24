import * as API from '../Utility/API'
import { setRegisterUser } from './users'
import {getAllMarketplaceItems,getSearchMarketplaceItems,getIndividualItem} from './items'
import {getSearchMarketplaceTotalPages} from './marketplace'
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


export function handleGetAllMarketplaceItems(page,search){
    return(dispatch)=>{
        return API.getAllMarketplaceAPI(page,search).then((response)=>{
            dispatch(getAllMarketplaceItems(response))
        })
    }
}

export function handleGetSearchMarketplaceItems(page,search){
    return(dispatch)=>{
        return API.getAllMarketplaceAPI(page,search).then((response)=>{
            dispatch(getSearchMarketplaceItems(response))
        })
    }
}

export function handleMarketplaceTotalPage(page,search){

    if(page === 1){
        return(dispatch)=>{
            return API.getMarketplacePageNumAPI(page,search).then((response)=>{
                dispatch(getSearchMarketplaceTotalPages(response))
            })
        }
    }
}


export function handleGetIndividualItem(itemId){
    return(dispatch)=>{
        return API.getIndividualItemAPI(itemId).then((response)=>{
            dispatch(getIndividualItem(response))
        })
    }
}


