import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Header } from '../common';
import { BACKGROUND_COLOR } from '../../config';

class Settings extends Component {
  state = {
    switchValue: false,
  };

  toggleSwitch = (value) => {
    this.setState({ switchValue: value });
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <Header title='Settings' />
        <View style={styles.headerStyle}>
          <Text style={styles.textStyle}>General</Text>
        </View>
        <View style={styles.headerStyle}>
          <Text style={styles.textStyle}>Reminders</Text>
        </View>
        <View style={styles.headerStyle}>
          <Text style={styles.textStyle}>Account</Text>
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    backgroundColor: BACKGROUND_COLOR,
  },
  headerStyle: {
    backgroundColor: '#d5d5d5',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textStyle: {
    padding: 10,
    fontSize: 14,
    color: '#858585',
    fontFamily: 'avenir_medium',
  },
};

export { Settings };
