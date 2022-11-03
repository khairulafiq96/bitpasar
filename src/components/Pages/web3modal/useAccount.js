import { useAccount,useBalance,Web3Button, useConnectModal,useProvider } from '@web3modal/react'

export default function UseAccount() {
  const { account, isReady } = useAccount()
  const { data, error, isLoading, refetch } = useBalance({
    addressOrName: account.address
  })
  //Provider would require some time to load, any component that requires this value
  //Checks are added in the APP.js to check the provider value
  const { provider } = useProvider()


  const user = {
    "status" : account.status,
    "isLoading" : isLoading,
    "isConnected" : account.isConnected,
    "address" : account.address,
    "balance" : data,
    "provider" : provider
  }

  return (
    user
  )
}