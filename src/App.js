import React, { Component } from 'react';
import firebase from 'firebase';
import { setCustomText } from 'react-native-global-props';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import LoginForm from './components/screens/LoginForm';
import MainScreen from './components/screens/MainScreen';

console.disableYellowBox = true;

const customTextProps = {
  style: {
    fontFamily: 'avenir_book',
  },
};

setCustomText(customTextProps);

class App extends Component {
  componentWillMount() {
    const config = {
    apiKey: 'AIzaSyBJlKq6rsEVUQlaJOrFYKJc15HLWpHjMII',
    authDomain: 'anchorapp-feed3.firebaseapp.com',
    databaseURL: 'https://anchorapp-feed3.firebaseio.com',
    projectId: 'anchorapp-feed3',
    storageBucket: 'anchorapp-feed3.appspot.com',
    messagingSenderId: '489771714033',
  };
  firebase.initializeApp(config);
  }
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store} >
        <LoginForm />
      </Provider>
    );
  }
}

export default App;
