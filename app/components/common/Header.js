import React from 'react';
import { View, Text, Dimensions, Platform, StatusBar } from 'react-native';
import { HeaderProfileButton } from './';
import * as colors from '../../config/data';

const { width, height } = Dimensions.get('window');

const Header = ({ title }) => {
  return (
    <View style={styles.containerStyle}>
      <StatusBar
        backgroundColor={colors.STATUS_BAR}
      />
      <Text style={styles.headerStyle}>
        {title}
      </Text>
      <View style={styles.buttonContainerStyle}>
        <HeaderProfileButton />
      </View>
    </View>
  );
};

const styles = {
  containerStyle: {
    backgroundColor: colors.MAIN,
    justifyContent: 'space-between',
    alignContent: 'center',
    height: 0.08 * height,
    paddingTop: (Platform.OS === 'ios') ? 15 : 0,
    flexDirection: 'row',
  },
  headerStyle: {
    fontSize: 20,
    fontFamily: 'avenir_heavy',
    color: 'white',
    paddingLeft: 0.05 * width,
    alignSelf: 'center',
  },
  buttonContainerStyle: {
    paddingTop: 0.25 * 0.07 * height,
    paddingRight: 0.05 * width,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
};

export { Header };
