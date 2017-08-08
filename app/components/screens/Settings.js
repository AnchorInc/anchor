import React, { Component } from 'react';
import { Text, View, Switch } from 'react-native';
import { ListDetail } from '../common';
import { ACCENT_COLOR } from '../../config';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      switchValue: false,
   };
  }

  toggleSwitch(value) {
    this.setState({ switchValue: value });
  }

  render() {
    return (
      <View>
        <View style={styles.headerStyle}>
          <Text style={styles.textStyle}>General</Text>
        </View>
        <ListDetail>
          <Text>
            I Am a Potato
          </Text>
          <Switch thumbTintColor={ACCENT_COLOR} onTintColor='#de9393' onValueChange={this.toggleSwitch.bind(this)} value={this.state.switchValue} />
        </ListDetail>
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
  headerStyle: {
    backgroundColor: '#d5d5d5',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textStyle: {
    padding: 10,
    fontSize: 14,
    color: '#a5a5a5',
    fontFamily: 'avenir_medium',
  },
};

export { Settings };
