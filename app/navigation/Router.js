import React from 'react';

import { TabNavigator, StackNavigator, NavigationActions, TabBarBottom } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BOTTOM_BAR_ICON_COLOR, BOTTOM_BAR_COLOR, MAIN_COLOR, ACCENT_COLOR } from '../config';
import { Classes, Settings, Search, AppSetup, Preferences, Main } from '../components/screens';
// import { Header } from '../components/common';
import Login from '../components/screens/Login';

const LoginStackConfig = {
  navigationOptions: {
    header: null,
  },
  headerMode: 'none',
};

export const LoginStack = StackNavigator({
  AppSetup: { screen: AppSetup },
  Login: { screen: Login },
  Preferences: { screen: Preferences },
  Main: { screen: Main },
}, LoginStackConfig);

const defaultGetStateForAction = LoginStack.router.getStateForAction;

LoginStack.router.getStateForAction = (action, state) => {
  // Prevent access to the Splash screen from the Login screen
  if (
    state &&
    action.type === NavigationActions.BACK &&
    state.routes[state.index].routeName === 'Login'
  ) { return null; }

  // Prevent access to Login screen after login/signup or to the Preferences screen
  if (
    state &&
    action.type === 'Navigation/BACK' &&
    (state.routes[state.index].routeName !== 'AppSetup' &&
      state.routes[state.index].routeName !== 'Login' &&
      state.routes[state.index].routeName !== 'Preferences')
  ) { return null; }
  return defaultGetStateForAction(action, state);
};

const TabNavigatorConfig = {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused }) => {
      const { routeName } = navigation.state;
      const color = ACCENT_COLOR;
      let iconName;
      switch (routeName) {
        case 'Classes':
          iconName = 'list';
          break;
        case 'Search':
          iconName = 'search';
          break;
        case 'Settings':
          iconName = 'settings';
          break;
        default:
          iconName = 'list';
          break;
      }
      return (<Icon size={22} name={iconName} color={focused ? color : 'white'} />);
    },
  }),
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  animationEnabled: true,
  tabBarOptions: {
    showLabel: false,
    labelStyle: {
      fontSize: 12,
    },
    style: {
      backgroundColor: MAIN_COLOR,
    },
  },
};

export const Tabs = TabNavigator({
  Classes: { screen: Classes },
  Search: { screen: Search },
  Settings: { screen: Settings },
}, TabNavigatorConfig);
