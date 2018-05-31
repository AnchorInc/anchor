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

// get rid of annoying yellow box
console.disableYellowBox = true;

// set default font family
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

// setup channel for misc notifications
const miscChannel = new firebase.notifications.Android.Channel('misc-channel', 'Misc Channel', firebase.notifications.Android.Importance.Max);
miscChannel
.setShowBadge(true)
.setSound('5');

// setup channel for chat notifications
const chatChannel = new firebase.notifications.Android.Channel('chat-channel', 'Chat Channel', firebase.notifications.Android.Importance.Max);
chatChannel
.setShowBadge(true)
.setSound('10');

// create the channels and connect to firebase
firebase.notifications().android.createChannels([miscChannel, chatChannel]);

const middleware = createSagaMiddleware();
const store = createStore(reducers, {}, applyMiddleware(middleware));
middleware.run(rootSaga);

class Init extends Component {

  render() {
    return (
      <Provider store={store} >
        <MainStack />
      </Provider>
    );
  }
}

export default Init;
