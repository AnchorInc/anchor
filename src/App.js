import React, { Component } from 'react';
import { setCustomText } from 'react-native-global-props';
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
  render() {
    return (
      <MainScreen />
    );
  }
}

export default App;
