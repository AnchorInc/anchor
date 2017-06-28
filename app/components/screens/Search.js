import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Button, Dimensions } from 'react-native';
import { NavigationComponent } from 'react-native-material-bottom-navigation';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Input from '../common/Input';

const { width, height } = Dimensions.get('window');

class Search extends Component {
  static navigationOptions = {
    tabBarLabel: "Search",
    tabBarIcon: () => <Icon size={24} name="search" color="#01152d" />
  }

  render() {
    return (
			<View style={{ width: width, height: height, alignItems: 'center' }}>
        <Input icon="search" label="Search" />

			</View>
		);
  };
}

export default Search;