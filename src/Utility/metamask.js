import {ethers} from 'ethers'
import { Redirect } from 'react-router-dom';

//https://ethereum.stackexchange.com/questions/27366/how-can-i-check-if-a-user-is-logged-in-to-metamask
export async function checkMetaMaskConnection(){

    var finalVal;

    const isMetaMaskConnected = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const accounts = await provider.listAccounts();
        return accounts.length > 0;
    }
    
    await isMetaMaskConnected().then((connected) => {
        if (connected) {
            // metamask is connected
            //window.alert("User is connected")
            finalVal=true
        } else {
            // metamask is not connected
            //window.alert("User is not connected")

            finalVal = false
        }
    });

    return finalVal
}
