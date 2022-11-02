export function convertUserId (user) {
    if(user){
        const userId = Object.keys(user).filter((details)=> details !== 'myorders' && details !== 'mypurchases' && details !== 'myads')
        return userId[0]
    }
}

export function convertUTCtoDate(unixdate){
    var unix = new Date(unixdate * 1000)
    var date = unix.toLocaleDateString("default")
    var time = unix.toLocaleTimeString("default")
    return `${date} ${time}`
}

export function APIerrorHandling(response){
    window.alert("Code : " + response.code + " Name : " + response.name )
}