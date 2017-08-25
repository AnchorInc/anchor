import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Image, Dimensions, StatusBar } from 'react-native';
import { STATUS_BAR_COLOR } from '../../config';

const logo = require('../../resources/images/splashScreen.png');

const { width, height } = Dimensions.get('window');

class SplashScreen extends Component {
  checkForUser = () => {
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
    height,
  },
};

export { SplashScreen };
