import { useAccount,useBalance,Web3Button, useConnectModal } from '@web3modal/react'

export default function UseAccount() {
  const { account, isReady } = useAccount()
  const { data, error, isLoading, refetch } = useBalance({
    addressOrName: account.address
  })


  const user = {
    "status" : account.status,
    "isLoading" : isLoading,
    "isConnected" : account.isConnected,
    "address" : account.address,
    "balance" : data
  }

  return (
    user
  )
}