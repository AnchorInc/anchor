import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text, Image, Dimensions, AsyncStorage } from 'react-native';
import { MAIN_COLOR, PROVIDER_FB, PROVIDER_GOOGLE } from '../../config';

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
    AsyncStorage.getItem('user_credential')
    .then((token) => {
      const userToken = JSON.parse(token);
      if (userToken === null) {
        this.props.navigation.navigate('Login');
      } else {
        AsyncStorage.getItem('provider_type')
        .then((providerType) => {
          const credential = this.getCredential(userToken, providerType);
          console.log(`Google Credential: ${JSON.stringify(credential, undefined, 2)}`);
          if (credential === null) {
            this.props.navigation.navigate('Login');
          }
          return firebase.auth().signInWithCredential(credential);
        })
        .then(() => {
          this.props.navigation.navigate('Main');
        })
        .catch((error) => {
          console.log(error);
        });
      }
    });
  }

  render() {
    return (
      <View style={styles.viewStyle}>
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
