import React from 'react';

import { TabNavigator, StackNavigator, NavigationActions, TabBarBottom } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BOTTOM_BAR_ICON_NORMAL, BOTTOM_BAR_ICON_FOCUSED, BOTTOM_BAR_COLOR } from '../config';
import { Classes, Settings, Search } from '../components/screens';
import AppSetup from '../components/screens/AppSetup';
import Main from '../components/screens/Main';
import Login from '../components/screens/Login';
import Profile from '../components/screens/Profile';

const MainStackConfig = {
  navigationOptions: {
    header: null,
  },
  headerMode: 'none',
};

export const MainStack = StackNavigator({
  AppSetup: { screen: AppSetup },
  Login: { screen: Login },
  Main: { screen: Main },
  Profile: { screen: Profile },
}, MainStackConfig);

const defaultGetStateForAction = MainStack.router.getStateForAction;

MainStack.router.getStateForAction = (action, state) => {
  // Prevent access to the Splash screen from the Login screen
  if (
    state &&
    action.type === NavigationActions.BACK &&
    state.routes[state.index].routeName === 'Login'
  ) { return null; }

  // Prevent access to Login screen after login/signup
  if (
    state &&
    action.type === 'Navigation/BACK' &&
    (state.routes[state.index].routeName !== 'Login' &&
      state.routes[state.index].routeName !== 'Profile')
  ) { return null; }
  return defaultGetStateForAction(action, state);
};

const TabNavigatorConfig = {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused }) => {
      const { routeName } = navigation.state;
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
      return (<Icon size={22} name={iconName} color={focused ? BOTTOM_BAR_ICON_FOCUSED : BOTTOM_BAR_ICON_NORMAL} />);
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
      backgroundColor: BOTTOM_BAR_COLOR,
    },
  },
};

export const Tabs = TabNavigator({
  Classes: { screen: Classes },
  Search: { screen: Search },
  Settings: { screen: Settings },
}, TabNavigatorConfig);
