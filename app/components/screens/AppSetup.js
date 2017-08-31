import { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import SplashScreen from 'react-native-splash-screen';
import { getUserProfile } from '../../actions';

class AppSetup extends Component {
  state = { donePref: false };

  componentWillMount() {
    // splash screen is already showing
    firebase.auth().onAuthStateChanged((user) => {
      SplashScreen.hide();
      if (user) {
        // send the donePref and profile to Main as props
        this.props.getUserProfile();
        this.checkForFirstLogin();
        const props = { donePref: this.state.donPref, profile: this.props.profile };
        return this.props.navigation.navigate('Main', props);
      }
      return this.props.navigation.navigate('Login');
    });
  }

  checkForFirstLogin = () => {
    AsyncStorage.getItem('done_pref')
    .then((result) => {
      if (JSON.parse(result)) {
        this.setState({ donePref: true });
      }
    });
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state) => {
  return { profile: state.user.profile };
};

export default connect(mapStateToProps, { getUserProfile })(AppSetup);
