import { Component } from 'react';
import firebase from 'firebase';
import SplashScreen from 'react-native-splash-screen';

class AppSetup extends Component {
  componentWillMount() {
    // splash screen is already showing
    const user = this.checkForUser();
    SplashScreen.hide();
    if (user) {
      this.props.navigation.navigate('Main');
    }
    this.props.navigation.navigate('Login');
  }

  checkForUser = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        return true;
      }
      return false;
    });
  }

  render() {
    return null;
  }
}

export { AppSetup };
