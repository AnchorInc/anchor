import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text, Image, Dimensions, AsyncStorage } from 'react-native';
import { MAIN_COLOR } from '../../config';

const logo = require('../../resources/images/splashScreenLogo.png');

const { width } = Dimensions.get('window');

class SplashScreen extends Component {
  getCredential() {
  }

  checkForUser() {
    AsyncStorage.getItem('user_credential')
    .then((token) => {
      const facebookToken = JSON.parse(token);
      if (facebookToken === null) {
        this.props.navigation.navigate('Login');
      } else {
        const credential = firebase.auth.FacebookAuthProvider.credential(facebookToken);
        firebase.auth().signInWithCredential(credential)
        .then(() => {
          this.props.navigation.navigate('Main');
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
