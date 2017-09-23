import { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import SplashScreen from 'react-native-splash-screen';
import { appSetup, getUser } from '../../actions';

class AppSetup extends Component {
  state = { donePref: true, photoURL: null };

  componentWillMount() {
    // splash screen is already showing
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.getUser();
        this.props.appSetup();
        SplashScreen.hide();
        return this.props.navigation.navigate('Main');
      }
      SplashScreen.hide();
      return this.props.navigation.navigate('Login');
    });
  }

  render() {
    return null;
  }
}

export default connect(null, { appSetup, getUser })(AppSetup);
