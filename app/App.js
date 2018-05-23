import React, { Component } from 'react';
import { GoogleSignin } from 'react-native-google-signin';
import { setCustomText, setCustomStatusBar } from 'react-native-global-props';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import reducers from './reducers';
import { MainStack } from './navigation/Router';
import { colors, gsigninConfig } from './config';

console.disableYellowBox = true;

const customTextProps = {
  style: {
    fontFamily: 'avenir_book',
  },
};

setCustomText(customTextProps);
setCustomStatusBar({ backgroundColor: colors.primary.dark });

// google sign in config
GoogleSignin.configure({
  webClientId: gsigninConfig.webClientId,
});

const middleware = createSagaMiddleware();
const store = createStore(reducers, {}, applyMiddleware(middleware));
middleware.run(rootSaga);

class App extends Component {

  render() {
    return (
      <Provider store={store} >
        <MainStack />
      </Provider>
    );
  }
}

export default App;
