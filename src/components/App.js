import React, {Component} from 'react'
import {Switch,Route, withRouter, Redirect, useParams} from 'react-router-dom'

import HomePage from './Pages/HomePage';
import Header from './Pages/Header';

import {connect} from 'react-redux';
import Footer from './Pages/Footer';
import Registration from './Pages/Registration';
import AddItem from './Pages/AddItem';
import Marketplace from './Pages/Marketplace';
import Item_Individual from './Pages/Item_Individual';
import BuyNow from './Pages/BuyNow';
import VerifyPurchase from './Pages/VerifyPurchase';
import Payment from './Pages/Payment';
import MyPurchase from './Pages/MyPurchase';
import MyProfile from './Pages/MyProfile'
import MyDashboard from './Pages/MyDashboard';
import MyAds from './Pages/MyAds';
import UseAccount from './Pages/web3modal/useAccount';

import { checkMetaMaskConnection } from '../Utility/metamask';
import { resetUser } from '../actions/users';
import { handleClearLocalStorage } from '../actions';

import { chains, providers } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'

import './Styles/App.css'



class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loaded: true
    }
  }

  async componentDidMount(){
    const status =  await checkMetaMaskConnection().then((result)=>{
      if(!result){
        //Clears state
        this.props.dispatch(handleClearLocalStorage(this.props.user, this.props.purchase))
      } 
    })
  }
 

  render(){

    const modalConfig = {
      projectId: "c2b975a1e9bc302f69b3adf13a2c3f4b",
      theme: 'dark',
      accentColor: 'default',
      ethereum: {
        appName: 'web3Modal',
        autoConnect: true,
        chains: [
          chains.mainnet,
          chains.goerli
        ]
      }
    }

    const walletAuth = () => {
      if(wallet.isLoading === false && wallet.isConnected === true){
        return true
      } else {
        return false
      }
    }


    //Checking if the User has signed in their wallet
    //Since web3modal require some time to Load the data, isLoading is used
    //Only when isLoading is false, then other variables are accessible
    const renderLoading = () =>{
      if(wallet.isLoading === true){
        //render component
        return (<div className='font-mono'>Loading Web3Modal...</div>)
      } else if(wallet.isConnected === false) {
        return(<Redirect exact to="/home"></Redirect>)
      }
    }
 
    const {wallet} = this.props

    return ( 
      <div className='min-h-screen flex flex-col background_color'>
        <Web3Modal config={modalConfig} />
        <Header></Header>
        {JSON.stringify(wallet.isLoading)}
        {JSON.stringify(wallet.isConnected)}
          <div className='flex flex-1 sm:container mx-auto justify-center'>
                    <Switch>
                      <Route exact path={["/","/home"]} component={HomePage} />
                      <Route exact path="/marketplace" component={Marketplace} />
                      <Route exact path="/registration" component={Registration}/>
                      <Route exact path="/item/:itemId" 
                        render={(props)=>(<Item_Individual 
                                            wallet={wallet} 
                                            itemId={props.match.params.itemId}>
                                          </Item_Individual>)} />
                      <Route exact path="/profile/:userId">
                        {walletAuth() ? <Route path="/profile/:userId" 
                                                render={(props)=>(<MyProfile 
                                                wallet={wallet}
                                                userId={props.match.params.userId}>
                                                </MyProfile>)}>
                                         </Route> : renderLoading()}
                      </Route>
                      <Route exact path="/additem">
                        {wallet.isConnected ? <AddItem></AddItem> : <Redirect exact to="/home"></Redirect>}
                      </Route>
                      <Route exact path="/buynow/:itemId">
                        {walletAuth()  ? <Route path="/buynow/:itemId" 
                                                render={(props)=>(<BuyNow 
                                                wallet={wallet}
                                                itemId={props.match.params.itemId}>
                                                </BuyNow>)}>
                                          </Route> : renderLoading()}
                      </Route>
                      <Route exact path="/buynow/verifypurchase/:itemId">
                        {walletAuth()  ? <Route path="/buynow/verifypurchase/:itemId" 
                                                  render={(props)=>(<VerifyPurchase
                                                  itemId={props.match.params.itemId}>
                                                  </VerifyPurchase>)}>
                                          </Route> : renderLoading()}
                      </Route>
                      <Route exact path="/buynow/verifypurchase/payment/:itemId">
                        {walletAuth() && wallet.provider ? <Route path="/buynow/verifypurchase/payment/:itemId" 
                                                    render={(props)=>(<Payment
                                                    wallet={wallet}
                                                    itemId={props.match.params.itemId}>
                                                    </Payment>)}>
                                          </Route> : renderLoading()}
                      </Route>
                      <Route exact path="/profile/purchase/:walletaddress" component={MyPurchase}>
                        {wallet.isConnected ? <Route path="/buynow/verifypurchase/payment/:itemId" component={Payment} ></Route> : <Redirect exact to="/home"></Redirect> }
                      </Route>
                      <Route exact path="/dashboard/:walletid">
                        {wallet.isConnected ? <Route path="/dashboard/:walletid" component={MyDashboard} ></Route> : <Redirect exact to="/home"></Redirect> }
                      </Route>
                      <Route exact path="/ads/:walletid">
                        {wallet.isConnected ? <Route path="/ads/:walletid" component={MyAds} ></Route> : <Redirect exact to="/home"></Redirect> }
                      </Route>
                    </Switch>

          </div>
        <Footer></Footer>
      </div>
    )
  }
}

function mapStateToProps({user, purchase}) {
  return { 
    user,
    purchase
  }
}

const web3modal = Component => props => {
  const wallet = UseAccount();
  return <Component {...props} wallet={wallet} />;
};

//WITH web3modal HOC
export default web3modal(withRouter(connect(mapStateToProps)(App)))

//WITH REDUX
//export default withRouter(connect(mapStateToProps)(App));
