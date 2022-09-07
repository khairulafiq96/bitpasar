import * as API from '../Utility/API'
import { setRegisterUser,getUserDetails, getUserPurchases} from './users'
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

export function handleGetUserDetails(walletid){
    return(dispatch)=>{
        return API.getUserDetailsAPI(walletid).then((response)=>{
            if(response.status === 'unregistered'){
                window.alert(response.message)
            } else {
                dispatch(getUserDetails(response))
            }
        })
    }
}

export function handleGetUserPurchases(walletid){
    return(dispatch)=>{
        return API.getUserPurchasesAPI(walletid).then((response)=>{
            //Reusing getUserDetails reducer
            dispatch(getUserPurchases(response))
        })
    }
}

export function handleUpdateUserDetails(form){
    return(dispatch)=>{
        return API.updateUserDetailsAPI(form).then((response)=>{
            window.alert("User details has been succesfully updated")
            //Reusing getUserDetails reducer
            dispatch(getUserDetails(response))
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


export function handleCreateOrder(purchase){
    return(dispatch)=>{
        return API.postCreateOrder(purchase).then((response)=>{
            if (response['status'] === 'successful'){
                window.alert(response['message'])
            } else {
                window.alert(response['message'])
            }
        })
    }
}


