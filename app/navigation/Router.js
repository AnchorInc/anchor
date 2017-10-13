import React from 'react';

import { TabNavigator, StackNavigator, NavigationActions, TabBarBottom } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BOTTOM_BAR_ICON_NORMAL, BOTTOM_BAR_ICON_FOCUSED, BOTTOM_BAR_COLOR } from '../config';
import { Classes, Settings, Search } from '../components/screens';
import AppSetup from '../components/screens/AppSetup';
import Main from '../components/screens/Main';
import Login from '../components/screens/Login';
import Profile from '../components/screens/Profile';
import TeacherProfile from '../components/screens/TeacherProfile';
import Preferences from '../components/screens/Preferences';

const TabNavigatorConfig = {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused }) => {
      const { routeName } = navigation.state;
      let iconName;
      switch (routeName) {
        case 'Classes':
          iconName = 'home';
          break;
        case 'Search':
          iconName = 'search';
          break;
        case 'Settings':
          iconName = 'settings';
          break;
        default:
          iconName = 'home';
          break;
      }
      return (<Icon size={22} name={iconName} color={focused ? BOTTOM_BAR_ICON_FOCUSED : BOTTOM_BAR_ICON_NORMAL} />);
    },
  }),
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  lazy: true,
  backBehavior: 'none',
  animationEnabled: true,
  tabBarOptions: {
    showLabel: false,
    labelStyle: {
      fontSize: 12,
    },
    style: {
      backgroundColor: BOTTOM_BAR_COLOR,
    },
  },
};

export const Tabs = TabNavigator({
  Classes: { screen: Classes },
  Search: { screen: Search },
  Settings: { screen: Settings },
}, TabNavigatorConfig);

const ClassesStackConfig = {
  navigationOptions: {
    header: null,
  },
  headerMode: 'none',
};

export const ClassesStack = StackNavigator({
  Classes: { screen: Tabs },
  TeacherProfile: { screen: TeacherProfile },
}, ClassesStackConfig);

const MainStackConfig = {
  navigationOptions: {
    header: null,
  },
  headerMode: 'none',
};

export const MainStack = StackNavigator({
  AppSetup: { screen: AppSetup },
  Login: { screen: Login },
  Preferences: { screen: Preferences },
  Main: { screen: Main },
  Profile: { screen: Profile },
}, MainStackConfig);

const defaultGetStateForAction = MainStack.router.getStateForAction;

MainStack.router.getStateForAction = (action, state) => {
  // Prevent access to the 'goback' nav prop
  if (
    state &&
    action.type === NavigationActions.BACK &&
    (state.routes[state.index].routeName === 'AppSetup' ||
      state.routes[state.index].routeName === 'Login' ||
      state.routes[state.index].routeName === 'Preferences' ||
      state.routes[state.index].routeName === 'Main')
  ) { return null; }

  return defaultGetStateForAction(action, state);
};
