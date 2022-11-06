import {Web3Button,useDisconnect  } from '@web3modal/react'
import WalletConnect from '../../Buttons/WalletConnect'
import UseAccount from './useAccount'
import { useDispatch, useSelector } from 'react-redux'
import { handleClearLocalStorage } from '../../../actions'
import { convertUserId } from '../../../Utility/general'

export default function ConnectButton() {

  const dispatch = useDispatch()

  const wallet = UseAccount()
  
  //Clearing user from state when user is clicking "Disconnect"
  const clearData = () => {
    if(convertUserId(appState.user)){
      //window.alert("Deleting user from state")
      dispatch(handleClearLocalStorage())
    }
  }
  
  const appState = useSelector(state => state)

  return (
    <div className="flex flex-row items-center space-x-3">
        {wallet.isConnected ? <WalletConnect wallet={wallet}></WalletConnect> : <></>}
        <Web3Button onClick={clearData} />
    </div>
  )
}