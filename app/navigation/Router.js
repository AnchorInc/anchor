import React from 'react';

import { TabNavigator, StackNavigator, NavigationActions, TabBarBottom, TabBarTop } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BOTTOM_BAR_ICON_COLOR, ACCENT_COLOR, BOTTOM_BAR_COLOR } from '../config';
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
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  animationEnabled: false,
  tabBarOptions: {
    showLabel: true,
    activeTintColor: ACCENT_COLOR,
    labelStyle: {
      fontSize: 12,
    },
   },
};

export const Tabs = TabNavigator({
  Classes: {
    screen: Classes,
    navigationOptions: {
      tabBarLabel: 'Classes',
      tabBarIcon: () => <Icon size={24} name="list" color={BOTTOM_BAR_ICON_COLOR} />,
    },
  },
  Search: {
    screen: Search,
    navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: () => <Icon size={24} name="search" color={BOTTOM_BAR_ICON_COLOR} />,
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: () => <Icon size={24} name="settings" color={BOTTOM_BAR_ICON_COLOR} />,
    },
  },
}, TabNavigatorConfig);
