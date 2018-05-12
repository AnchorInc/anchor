import { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import SplashScreen from 'react-native-splash-screen';

import { getUser, getUserType, startSyncUser } from '../../actions';

class AppSetup extends Component {
  componentWillMount() {
    // splash screen is already showing
    this.getUserType();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.startSyncUser();
        this.props.getUser();
        SplashScreen.hide();
        return this.props.navigation.navigate('Main');
      }
      SplashScreen.hide();
      return this.props.navigation.navigate('Login');
    });
  }

  getUserType() {
    AsyncStorage.getItem('user_type')
      .then((type) => {
        this.props.getUserType(type);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return null;
  }
}

const mapFunctionsToProps = {
  getUser,
  startSyncUser,
  getUserType,
};

export default connect(null, mapFunctionsToProps)(AppSetup);
