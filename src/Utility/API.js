const url = 'http://127.0.0.1:5000'
//const url = 'https://bitpasar-api.herokuapp.com'
const appKey = 'vlone'

//Registration Page
export function registrationAPI(user){

    var obj = {  
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'appKey' : appKey
                },
                //HAD to JSON stringify because the body datatype is Object and the API could not process any Object item
                body: JSON.stringify({
                    "name" : user['name'],
                    "email" : user['email'],
                    "phonenum" : user['phonenum'],
                    "address1" : user['address1'],
                    "address2" : user['address2'],
                    "city" : user['city'],
                    "state" : user['state'],
                    "zipcode" : user['zipcode'],
                    "walletid" : user['walletid']               
                }) 
              }
      return fetch(url+'/registeruser', obj).then(function(res) {
          //console.log(res)
          return res.json();
         })
        .then(function(resJson) {
          //console.log(resJson)
          return resJson;
         })
}

//My Profile page, updates user details
export function updateUserDetailsAPI(user){
  var obj = {  
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'appKey' : appKey
              },
              //HAD to JSON stringify because the body datatype is Object and the API could not process any Object item
              body: JSON.stringify({
                  "name" : user['name'],
                  "email" : user['email'],
                  "phonenum" : user['phonenum'],
                  "address1" : user['address1'],
                  "address2" : user['address2'],
                  "city" : user['city'],
                  "state" : user['state'],
                  "zipcode" : user['zipcode'],
                  "walletid" : user['walletid']               
              }) 
            }
    return fetch(url+'/updateUserDetails', obj).then(function(res) {
        //console.log(res)
        return res.json();
       })
      .then(function(resJson) {
        //console.log(resJson)
        return resJson;
       })
}

export function getUserDetailsAPI(walletid){
  var obj = {

    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'appKey' : appKey
    },

    body: JSON.stringify({
        "walletid" : walletid,
    })

  }

  return fetch(url+'/getUserDetails', obj).then(function(res){
    return res.json();
  }).then(function(resJson){
    return resJson;
  })
}

export function getUserPurchasesAPI(walletid){
  var obj = {

    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'appKey' : appKey
    },

    body: JSON.stringify({
        "walletid" : walletid,
    })

  }

  return fetch(url+'/getUserPurchases', obj).then(function(res){
    return res.json();
  }).then(function(resJson){
    return resJson;
  })
}

export function getAllOrdersAPI(ownerid){
  var obj = {

    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'appKey' : appKey
    },

    body: JSON.stringify({
        "ownerid" : ownerid,
    })

  }

  return fetch(url+'/getAllOrders', obj).then(function(res){
    return res.json();
  }).then(function(resJson){
    return resJson;
  })
}

export function addItemAPI(item){
    var obj = {

      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'appKey' : appKey
      },

      body: JSON.stringify({
          "ownerid" : item['ownerid'],
          "title" : item['title'],
          "type" : item['type'],
          "shortdescription" : item['shortdescription'],
          "longdescription" : item['longdescription'],
          "itemprice" : item['itemprice'],
          "status" : item['status'],
          "postagename" : item['postagename'],
          "postageprice" : item['postageprice'],
          "images" : item['images'],
          "status" : "new"
      })

    }

    return fetch(url+'/addItem', obj).then(function(res){
      return res.json();
    }).then(function(resJson){
      return resJson;
    })
  }

  export function getAllMarketplaceAPI(page,search){
    var obj = {

      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'appKey' : appKey
      },

      body: JSON.stringify({
          "page" : page,
          "search" : search
      })

    }

    return fetch(url+'/getFilteredMarketplace', obj).then(function(res){
      return res.json();
    }).then(function(resJson){
      return resJson;
    })
}

export function getMarketplacePageNumAPI(page,search){
    var obj = {

      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'appKey' : appKey
      },

      body: JSON.stringify({
          "page" : page,
          "search" : search
      })

    }

    return fetch(url+'/marketplacePageNum', obj).then(function(res){
      return res.json();
    }).then(function(resJson){
      return resJson;
    })
}


export function getIndividualItemAPI(itemId){
    var obj = {

      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'appKey' : appKey
      },

      body: JSON.stringify({
          "itemId" : itemId,
      })

    }

    return fetch(url+'/getItemDetail', obj).then(function(res){
      return res.json();
    }).then(function(resJson){
      return resJson;
    })
}


export function postCreateOrder(purchase){ 
  var obj = {

    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'appKey' : appKey
    },

    body: JSON.stringify({
        "buyername" : purchase['buyername'], 
        "buyerwallet":purchase['buyerwallet'], 
        "ownername":purchase['ownername'], 
        "ownerwallet":purchase['ownerwallet'], 
        "address1":purchase['address1'], 
        "address2":purchase['address2'], 
        "city":purchase['city'], 
        "state":purchase['state'], 
        "zipcode":purchase['zipcode'], 
        "postagename":purchase['postagename'], 
        "postageprice":purchase['postageprice'], 
        "buyeremail":purchase['buyeremail'], 
        "buyerphonenum":purchase['buyerphonenum'], 
        "itemid":purchase['itemid'], 
        "ownerid":purchase['ownerid'], 
        "buyerid":purchase['buyerid'] || "", 
        "status":'completed payment'
    })

  }
  
  return fetch(url+'/createOrder',obj).then(function(res){
    return res.json()
  }).then(function(resJson){
    return resJson
  })
}

export function updateOrderTrackerAPI(orderid, trackerid){
  var obj = {

    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'appKey' : appKey
    },

    body: JSON.stringify({
      "orderid" : orderid,
      "trackerid" : trackerid
    })

  }

  return fetch(url+'/updateOrderTracker', obj).then(function(res){
    return res.json();
  }).then(function(resJson){
    return resJson;
  })
}

export function getAllAdsAPI(ownerid){
  var obj = {

    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'appKey' : appKey
    },

    body: JSON.stringify({
      "ownerid" : ownerid
    })

  }

  return fetch(url+'/getAllAds', obj).then(function(res){
    return res.json();
  }).then(function(resJson){
    return resJson;
  })
}

export function deleteAdsAPI(itemid){
  var obj = {

    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'appKey' : appKey
    },

    body: JSON.stringify({
      "id" : itemid
    })

  }

  return fetch(url+'/deleteAds', obj).then(function(res){
    return res.json();
  }).then(function(resJson){
    return resJson;
  })
}

export function deleteUserAPI(userid){
  var obj = {

    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'appKey' : appKey
    },

    body: JSON.stringify({
      "userid" : userid
    })

  }

  return fetch(url+'/deleteUser', obj).then(function(res){
    return res.json();
  }).then(function(resJson){
    return resJson;
  })
}