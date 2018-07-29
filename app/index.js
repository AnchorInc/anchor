import React, { Component } from 'react';
import { setCustomText, setCustomStatusBar } from 'react-native-global-props';
import { Provider } from 'react-redux';

import { MainStack } from './navigation/Router';
import { colors, store } from './config';

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

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainStack />
      </Provider>
    );
  }
}

export default App;
