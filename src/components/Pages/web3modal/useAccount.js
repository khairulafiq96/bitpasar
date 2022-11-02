import { useAccount,useBalance,Web3Button, useConnectModal } from '@web3modal/react'

export default function UseAccount() {
  const { account, isReady } = useAccount()
  const { data, error, isLoading, refetch } = useBalance({
    addressOrName: account.address
  })


  const user = {
    "isLoading" : account.isLoading,
    "isConnected" : account.isConnected,
    "address" : account.address,
    "account" : account

  }

  return (
    user
  )
}