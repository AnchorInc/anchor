import React, { Component } from 'react';
import firebase from 'react-native-firebase';
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

// main notification channel
const mainChannel = new firebase.notifications.Android.Channel('main-channel', 'Main Channel', firebase.notifications.Android.Importance.Max);
mainChannel
.setShowBadge(true)
.setSound('5');

// chat notification channel
const chatChannel = new firebase.notifications.Android.Channel('chat-channel', 'Chat Channel', firebase.notifications.Android.Importance.Max);
chatChannel
.setShowBadge(true)
.setSound('10');

firebase.notifications().android.createChannels([mainChannel, chatChannel]);

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
