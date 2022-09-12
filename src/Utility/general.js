export function convertUserId (user) {
    const userId = Object.keys(user).filter((details)=> details !== 'address' && details !== 'balance' && details !== 'myorders' && details !== 'mypurchases' && details !== 'myads')
    return userId[0]
}