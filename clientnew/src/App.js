import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {Container} from "reactstrap"

import AppNavBar from "./components/AppNavBar"
import ShopingList from "./components/ShoppingList";
import ItemModal from "./components/ItemModal"

import {Provider} from "react-redux";

import store from "./store";
import {loaduser } from "./action/AuthAction"

class App extends React.Component{


  componentDidMount() {
    
    store.dispatch(loaduser());
  }
  render(){
    return (
      <Provider store={store}>
          <div className="">
            <AppNavBar/>
            <Container>
              <ItemModal/>
              <ShopingList/>
            </Container>
              
          </div>
      </Provider>
      
    );

  }
  
}

export default App;
