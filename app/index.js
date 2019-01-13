import React, { Component } from 'react';
import { setCustomText } from 'react-native-global-props';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';

import { MainStackContainer } from './navigation/Router';
import { colors, store } from './config';

// get rid of annoying yellow box
console.disableYellowBox = true;

// required when migrating to react navigation v3
const AppNavigator = createAppContainer(MainStackContainer);

// set default font family
const customTextProps = {
  style: {
    fontFamily: 'AvenirLTStd-Book',
  },
};
setCustomText(customTextProps);

// set status bar variables globally
StatusBar.setBarStyle('light-content');
StatusBar.setBackgroundColor(colors.primary.dark);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

export default App;
