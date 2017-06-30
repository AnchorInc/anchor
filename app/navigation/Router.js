import React from 'react';
import { TabNavigator, StackNavigator, NavigationActions } from 'react-navigation';
import { NavigationComponent } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as colors from '../config/data';
import { Home, Activities, Settings, Search, SplashScreen } from '../components/screens';
import LoginForm from '../components/screens/LoginForm';
import Main from '../Main';

export const LoginStack = StackNavigator({
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: {
      header: null,
    },
  },
  Login: {
    screen: LoginForm,
    navigationOptions: {
      header: null,
    },
  },
  Main: {
    screen: Main,
    navigationOptions: {
      header: null,
    },
  },
});

const defaultGetStateForAction = LoginStack.router.getStateForAction;

LoginStack.router.getStateForAction = (action, state) => {
  if (
    state &&
    action.type === NavigationActions.BACK &&
    state.routes[state.index].routeName === 'Main'
  ) {
    return null;
  }
  return defaultGetStateForAction(action, state);
};

export const Tabs = TabNavigator({
  Home: {
    screen: Home,
     navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: () => <Icon size={24} name="home" color={colors.BOTTOM_BAR_ICON} />,
      },
    },
  Activities: {
    screen: Activities,
    navigationOptions: {
      tabBarLabel: 'Activities',
      tabBarIcon: () => <Icon size={24} name="directions-run" color={colors.BOTTOM_BAR_ICON} />,
    },
  },
  Search: {
    screen: Search,
    navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: () => <Icon size={24} name="search" color={colors.BOTTOM_BAR_ICON} />,
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: () => <Icon size={24} name="settings" color={colors.BOTTOM_BAR_ICON} />,
    },
  },
}, {
  tabBarComponent: NavigationComponent,
  transitions: false,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  tabBarOptions: {
    bottomNavigationOptions: {
      labelColor: colors.BOTTOM_BAR_ICON,
      rippleColor: colors.MAIN,
      shifting: false,
      tabs: {
        Home: {
          barBackgroundColor: colors.BOTTOM_BAR,
          activeIcon: <Icon size={24} name="home" color={colors.MAIN} />,
          activeLabelColor: colors.MAIN,
        },
        Search: {
          barBackgroundColor: colors.BOTTOM_BAR,
          activeIcon: <Icon size={24} name="search" color={colors.MAIN} />,
          activeLabelColor: colors.MAIN,
        },
        Activities: {
          barBackgroundColor: colors.BOTTOM_BAR,
          activeIcon: <Icon size={24} name="directions-run" color={colors.MAIN} />,
          activeLabelColor: colors.MAIN,
        },
        Settings: {
          barBackgroundColor: colors.BOTTOM_BAR,
          activeIcon: <Icon size={24} name="settings" color={colors.MAIN} />,
          activeLabelColor: colors.MAIN,
        },
      },
    },
  },
});
