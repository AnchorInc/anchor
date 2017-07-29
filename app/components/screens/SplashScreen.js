import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text, Image, Dimensions, AsyncStorage, StatusBar } from 'react-native';
import { MAIN_COLOR, STATUS_BAR_COLOR, PROVIDER_FB, PROVIDER_GOOGLE, PROVIDER, USER_TOKEN } from '../../config';

const logo = require('../../resources/images/splashScreenLogo.png');

const { width } = Dimensions.get('window');

class SplashScreen extends Component {
  getCredential(token, providerType) {
    if (providerType === PROVIDER_FB) {
      return firebase.auth.FacebookAuthProvider.credential(token);
    } else if (providerType === PROVIDER_GOOGLE) {
      return firebase.auth.GoogleAuthProvider.credential(token);
    }
    return null;
  }

  checkForUser() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('there is a user signed in');
        this.props.navigation.navigate('Main');
      } else {
        console.log('no user signed in');
        this.props.navigation.navigate('Login');
      }
    });
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        <StatusBar backgroundColor={STATUS_BAR_COLOR} />
        <Image source={logo} style={styles.logoStyle} />
        <Text style={styles.textStyle}>Start Learning With Anchor</Text>
        {this.checkForUser()}
      </View>
    );
  }
}

const styles = {
  viewStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoStyle: {
    flex: 1,
    width,
    height: width,
    transform: [
      {
        scaleX: 0.5,
      },
      {
        scaleY: 0.5,
      },
    ],
  },
  textStyle: {
    fontSize: 35,
    color: MAIN_COLOR,
    textAlign: 'center',
    fontFamily: 'avenir_medium',
    padding: 20,
    marginBottom: 20,
  },
};

export { SplashScreen };
