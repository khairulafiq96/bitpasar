import React, {Component} from 'react'
import {Switch,Route, withRouter} from 'react-router-dom'

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

import './Styles/App.css'



class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loaded: true
    }
  }

 


  pages(){
    return (
      <div className='min-h-screen flex flex-col bg-violet-200'>
        <Header></Header>
          <div className='flex flex-1 container mx-auto justify-center'>
                    <Switch>
                      <Route exact path={["/","/home"]} component={HomePage} />
                      <Route exact path="/registration" component={Registration} />
                      <Route exact path="/additem" component={AddItem} />
                      <Route exact path="/marketplace" component={Marketplace} />
                      <Route exact path="/item/:itemId" component={Item_Individual} />
                      <Route exact path="/buynow/:itemId" component={BuyNow} />
                      <Route exact path="/buynow/verifypurchase/:itemId" component={VerifyPurchase} />
                      <Route exact path="/buynow/verifypurchase/payment/:itemId" component={Payment} />
                      <Route exact path="/profile/purchase/:walletaddress" component={MyPurchase} />
                      <Route exact path="/profile/:userId" component={MyProfile} />
                      <Route exact path="/dashboard/:walletid" component={MyDashboard} />
                      <Route exact path="/ads/:walletid" component={MyAds} />
                    </Switch>

          </div>
        <Footer></Footer>
      </div>
    )
  }



  render(){
    return (
      
        <div>
          {this.state.loaded?this.pages():null}
         
        </div>
    )
  }
}

function mapStateToProps() {
  return { 
  }
}

export default withRouter(App)

//WITH REDUX
//export default withRouter(connect(mapStateToProps)(App));
