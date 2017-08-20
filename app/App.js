import React, { Component } from 'react';
import firebase from 'firebase';
import { GoogleSignin } from 'react-native-google-signin';
import { setCustomText } from 'react-native-global-props';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './config/sagas';
import reducers from './reducers';
import { LoginStack } from './navigation/Router';

const customTextProps = {
  style: {
    fontFamily: 'avenir_book',
  },
};

setCustomText(customTextProps);

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyCGttWR24ng1Y87ruWfjAcGCISGLKz8jUE',
      authDomain: 'anchorapp-feed3.firebaseapp.com',
      databaseURL: 'https://anchorapp-feed3.firebaseio.com',
      projectId: 'anchorapp-feed3',
      storageBucket: 'anchorapp-feed3.appspot.com',
      messagingSenderId: '489771714033',
    };
    try {
      firebase.initializeApp(config);
    } catch (err) {
      console.log('error');
    }

    GoogleSignin.configure({
      webClientId: '489771714033-ej9vlft4gfm6enq8fsosh135vac9vnu7.apps.googleusercontent.com',
    });
  }
  render() {
    const middleware = createSagaMiddleware();
    const store = createStore(reducers, {}, applyMiddleware(middleware));
    middleware.run(rootSaga);
    return (
      <Provider store={store} >
        <LoginStack />
      </Provider>
    );
  }
}

export default App;
