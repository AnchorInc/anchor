import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native'
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import { TabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

class Settings extends Component {
  static navigationOptions = {
    tabBarLabel: "Settings",
    tabBarIcon: () => <Icon size={24} name="settings" color="#01152d" />
  }

  render() {
    return (
			<View style={{ justifyContent: 'center', alignContent: 'center' }}>
				<Text style={{ alignSelf: 'center' }}>Settings</Text>
			</View>
		);
  }
}

export default Settings;