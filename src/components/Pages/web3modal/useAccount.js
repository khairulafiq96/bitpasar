import { useAccount,Web3Button, useConnectModal } from '@web3modal/react'

export default function UseAccount() {
  const { account, isReady } = useAccount()

  const user = {
    "isConnected" : account.isConnected,
    "address" : account.address
  }

  return (
    
    user
    
  )
}