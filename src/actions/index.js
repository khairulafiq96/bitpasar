import * as API from '../Utility/API'
import { setRegisterUser,getUserDetails, getUserPurchases,getAllOrders,
        updateOrderTracker,getAllAds,resetUser} from './users'
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

export function handleGetAllOrders(ownerid){
    return(dispatch)=>{
        return API.getAllOrdersAPI(ownerid).then((response)=>{
            //Reusing getUserDetails reducer
            dispatch(getAllOrders(response))
        })
    }
}

export function handleUpdateOrderTracker(orderid, trackerid){
    return(dispatch)=>{
        return API.updateOrderTrackerAPI(orderid, trackerid).then((response)=>{
            if (response.status === 'unsuccessful'){
                window.alert(response.message)
            } else {
                window.alert("Item has been shipped")
                //window.location.reload(false);
                dispatch(updateOrderTracker(response))
                
            }
           
        })

        /*
        Only for testing purposes
        var obj = {
            "29c29605-7a81-4ac9-9fc2-9931c4b85abf": {
                "status": "shipped",
                "trackerid": "YAY"
            }
        }

        dispatch(updateOrderTracker(obj))
        */
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

export function handleGetAllAds(userid){
    return(dispatch)=>{
        return API.getAllAdsAPI(userid).then((response)=>{
            dispatch(getAllAds(response))
        })
    }
}

//This function deletes the user Ads, no action & reducer is created
//Once successful deletion of data in the db, getAllAds API will be called
export function handleDeleteAds(userid,itemid){
    return(dispatch)=>{
        return API.deleteAdsAPI(itemid).then((response)=>{
            if(response.status === 'successful'){
                //Run Get my ads function
                dispatch(handleGetAllAds(userid))
                window.alert(response.message)
            } else {
                window.alert(response.message)
            }
        })

    }
}

export function handleDeleteUser(userid){
    return (dispatch)=>{
        return API.deleteUserAPI(userid).then((response)=>{
            if(response.status === 'successful'){
                window.alert(response.message)
                dispatch(resetUser(userid))
            } else if (response.status === 'unsuccessful'){
                window.alert(response.message)
            }
        })
    }
}

/*
            var test = {
                "id" : '3f1748fa-632c-463e-aea7-71dfcb3c6a74'
            }
            dispatch(deleteMyAds(test))


*/


