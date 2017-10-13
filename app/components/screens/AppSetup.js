import { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import SplashScreen from 'react-native-splash-screen';
import { appSetup, getUser, startSyncUser } from '../../actions';

class AppSetup extends Component {
  state = { donePref: true, photoURL: null };

  componentWillMount() {
    // splash screen is already showing
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.startSyncUser();
        this.props.getUser();
        SplashScreen.hide();
        return this.props.navigation.navigate('Preferences');
      }
      SplashScreen.hide();
      return this.props.navigation.navigate('Login');
    });
  }

  render() {
    return null;
  }
}

const mapFunctionsToProps = {
  appSetup,
  getUser,
  startSyncUser,
};

export default connect(null, mapFunctionsToProps)(AppSetup);
