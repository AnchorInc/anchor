import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Button, Rect, Dimensions } from 'react-native';
import { NavigationComponent } from 'react-native-material-bottom-navigation';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

class Home extends Component {
  static navigationOptions = {
    tabBarLabel: "Home",
    tabBarIcon: () => <Icon size={24} name="home" color="#01152d" />
  }

  render() {
    return (
			<View style={{ justifyContent: 'center', alignContent: 'center' }}>
        <Text style={{ alignSelf: 'center' }}>Home</Text>
			</View>
		);
  }
}

export default Home;