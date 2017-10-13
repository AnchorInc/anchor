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
        if (this.props.donePref) {
         return this.props.navigation.navigate('Main') ;
        }
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

const mapStateToProps = (state) => {
  let donePref;
  if (state.user.user) {
    donePref = state.user.user.donePref;
  }
  return { donePref };
};

const mapFunctionsToProps = {
  appSetup,
  getUser,
  startSyncUser,
};

export default connect(mapStateToProps, mapFunctionsToProps)(AppSetup);
