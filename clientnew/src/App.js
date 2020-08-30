import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {Container} from "reactstrap"

import AppNavBar from "./components/AppNavBar"
import ShopingList from "./components/ShoppingList";
import ItemModal from "./components/ItemModal"

import {Provider} from "react-redux";

import store from "./store";

function App() {
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

export default App;
