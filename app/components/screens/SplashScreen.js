import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import * as colors from '../../config/data';

const logo = require('../../resources/images/splashScreenLogo.png');

const { width } = Dimensions.get('window');

const SplashScreen = () => {
  return (
    <View style={styles.viewStyle}>
      <Image source={logo} style={styles.logoStyle} />
      <Text style={styles.textStyle}>Start Learning With Anchor</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'space-around',
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
    color: colors.MAIN,
    textAlign: 'center',
    fontFamily: 'avenir_medium',
    padding: 20,
    marginBottom: 20,
  },
};

export { SplashScreen };
