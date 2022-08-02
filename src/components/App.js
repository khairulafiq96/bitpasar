import React, {Component} from 'react'
import {Switch,Route, withRouter} from 'react-router-dom'

import HomePage from './Pages/HomePage';
import Header from './Pages/Header';

import {connect} from 'react-redux';
import Footer from './Pages/Footer';

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
      <div className='main_container'>
        <Header></Header>
          <div className='main'>
            <Switch>
              <Route exact path="/home" component={HomePage} />
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
