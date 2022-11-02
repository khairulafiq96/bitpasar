import {Web3Button } from '@web3modal/react'
import WalletConnect from '../../Buttons/WalletConnect'
import UseAccount from './useAccount'

export default function ConnectButton() {

  const wallet = UseAccount()
  
  return (
    <div className="flex flex-row items-center space-x-3">
        {wallet.isConnected ? <WalletConnect wallet={wallet}></WalletConnect> : <></>}
        <Web3Button />
    </div>
  )
}