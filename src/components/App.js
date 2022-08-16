import React, {Component} from 'react'
import {Switch,Route, withRouter} from 'react-router-dom'

import HomePage from './Pages/HomePage';
import Header from './Pages/Header';

import {connect} from 'react-redux';
import Footer from './Pages/Footer';
import Registration from './Pages/Registration';
import AddItem from './Pages/AddItem';

import './Styles/App.css'
import TestUploadImages from './Pages/TestUploadImage';



class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loaded: true
    }
  }

 


  pages(){
    return (
      <div className='main_container'>
        <Header></Header>
          <div className='main flex justify-center'>
                <div className='container'>
                    <Switch>
                      <Route exact path="/home" component={HomePage} />
                      <Route exact path="/registration" component={Registration} />
                      <Route exact path="/additem" component={AddItem} />
                      <Route exact path="/testUpload" component={TestUploadImages} />
                    </Switch>
                </div>
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
