import React, { Component } from 'react'
import { View, Button } from 'react-native'
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import { TabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ActivityList from '../common/ActivityList';


class Activities extends Component {
  static navigationOptions = {
    tabBarLabel: "Activities",
    header: null,
    tabBarIcon: () => <Icon size={24} name="directions-run" color="#01152d" />
  }

  render() {
    return (
      <ActivityList />
    );
  }
}

// const ActivityNavigation = StackNavigator({
//   Activities: { screen: Activities },
//   TeacherView: { screen: TeacherView },
// });

export default Activities;
