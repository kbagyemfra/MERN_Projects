import AppNavbar from './components/AppNavbar.js'
import ShoppingList from './components/ShoppingList.js';
import ItemModal from './components/ItemModal.js'
import { Container } from 'reactstrap'

import React from 'react';
import { Provider } from 'react-redux'
import store from './store'

import { loadUser } from './actions/authActions.js';


import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser()) // calling it directly when the app loads 
  }


  render() {
    return (
      // In order to use redux in our components
  // we have to wrap everything in the provider
  <Provider store={store}> 
      <div className="App">
        <AppNavbar />
        <Container>
        <ItemModal />
        <ShoppingList />
        </Container>
      </div>
      </Provider>
    );
  }
}

export default App;
