import { Component } from 'react';
import firebase from 'firebase';
import SplashScreen from 'react-native-splash-screen';

class AppSetup extends Component {
  componentWillMount() {
    // splash screen is already showing
    firebase.auth().onAuthStateChanged((user) => {
      SplashScreen.hide();
      if (user) return this.props.navigation.navigate('Main');
      return this.props.navigation.navigate('Login');
    });
  }

  render() {
    return null;
  }
}

export { AppSetup };
