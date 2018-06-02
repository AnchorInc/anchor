import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions';

import { Header } from '../header';

class Settings extends Component {
  state = {
    switchValue: false,
  };

  render() {
    return (
      <View>
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
        <Button title='logout' onPress={this.props.logoutUser.bind(this)} />
      </View>
    );
  }
}

const styles = {
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

export default connect(null, { logoutUser })(Settings);
