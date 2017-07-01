import React from 'react';
import { TabNavigator, StackNavigator, NavigationActions } from 'react-navigation';
import { NavigationComponent } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BOTTOM_BAR_COLOR, BOTTOM_BAR_ICON_COLOR, MAIN_COLOR } from '../config';
import { Home, Activities, Settings, Search, SplashScreen } from '../components/screens';
import Login from '../components/screens/Login';
import Main from '../Main';

export const LoginStack = StackNavigator({
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: {
      header: null,
    },
  },
  Login: {
    screen: Login,
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
        tabBarIcon: () => <Icon size={24} name="home" color={BOTTOM_BAR_ICON_COLOR} />,
      },
    },
  Activities: {
    screen: Activities,
    navigationOptions: {
      tabBarLabel: 'Activities',
      tabBarIcon: () => <Icon size={24} name="directions-run" color={BOTTOM_BAR_ICON_COLOR} />,
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
}, {
  tabBarComponent: NavigationComponent,
  transitions: false,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  tabBarOptions: {
    bottomNavigationOptions: {
      labelColor: BOTTOM_BAR_ICON_COLOR,
      rippleColor: MAIN_COLOR,
      shifting: false,
      tabs: {
        Home: {
          barBackgroundColor: BOTTOM_BAR_COLOR,
          activeIcon: <Icon size={24} name="home" color={MAIN_COLOR} />,
          activeLabelColor: MAIN_COLOR,
        },
        Search: {
          barBackgroundColor: BOTTOM_BAR_COLOR,
          activeIcon: <Icon size={24} name="search" color={MAIN_COLOR} />,
          activeLabelColor: MAIN_COLOR,
        },
        Activities: {
          barBackgroundColor: BOTTOM_BAR_COLOR,
          activeIcon: <Icon size={24} name="directions-run" color={MAIN_COLOR} />,
          activeLabelColor: MAIN_COLOR,
        },
        Settings: {
          barBackgroundColor: BOTTOM_BAR_COLOR,
          activeIcon: <Icon size={24} name="settings" color={MAIN_COLOR} />,
          activeLabelColor: MAIN_COLOR,
        },
      },
    },
  },
});
