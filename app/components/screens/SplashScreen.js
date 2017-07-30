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
    // AsyncStorage.multiGet([USER_TOKEN, PROVIDER])
    // .then((values) => {
    //   const userToken = JSON.parse(values[0][1]);
    //   const providerType = values[1][1];
    //   if (!userToken && !providerType) {
    //     this.props.navigation.navigate('Login');
    //   } else {
    //     const credential = this.getCredential(userToken, providerType);
    //     firebase.auth().signInWithCredential(credential)
    //     .then(() => {
    //       this.props.navigation.navigate('Main');
    //     });
    //   }
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate('Main');
      } else {
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
