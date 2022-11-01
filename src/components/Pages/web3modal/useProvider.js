import { useAccount, useProvider, useWebsocketProvider  } from '@web3modal/react'



export default function UseProvider () {
    const {provider , isReady} = useProvider()
    const { websocketProvider } = useWebsocketProvider()
    return (
        <div>
        {provider ? <div>{provider['_network']['name']}</div> : <div>Loading</div>}
        {provider ? <div>{JSON.stringify(provider)}</div> : <div>Loading</div>}
        {websocketProvider ? <div>{JSON.stringify(websocketProvider)} </div> : 'No'}
        </div>
    )
}