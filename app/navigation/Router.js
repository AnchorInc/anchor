import React from 'react';
import {
  NavigationActions,
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  AppSetup,
  Chat,
  ChatsOverview,
  Classes,
  Login,
  Main,
  StudentProfile,
  StudentProfileEditing,
  Search,
  Settings,
  TeacherProfile,
  Batches,
} from '../components';

import { colors } from '../config';

const TabNavigatorConfig = {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused }) => {
      const { routeName } = navigation.state;
      let iconName;
      switch (routeName) {
        case 'Classes':
          iconName = 'home';
          break;
        case 'Search':
          iconName = 'magnify';
          break;
        case 'Settings':
          iconName = 'settings';
          break;
        default:
          iconName = 'home';
          break;
      }
      return (
        <Icon
          size={22}
          name={iconName}
          color={focused ? colors.secondary.normal : colors.other.bbIconNormal}
        />
      );
    },
  }),
  animationEnabled: false,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  backBehavior: 'none',
  tabBarOptions: {
    showLabel: false,
    style: {
      backgroundColor: colors.other.bgNormal,
    },
  },
};

export const Tabs = createBottomTabNavigator({
  Classes: { screen: Classes },
  Search: { screen: Search },
  Settings: { screen: Settings },
}, TabNavigatorConfig);

const StackConfig = {
  navigationOptions: {
    header: null,
  },
  headerMode: 'none',
};
const NavStack = createStackNavigator({
  Classes: { screen: Tabs },
  StudentProfile: { screen: StudentProfile },
  StudentProfileEditing: { screen: StudentProfileEditing },
  ChatsOverview: { screen: ChatsOverview },
  Chat: { screen: Chat },
  TeacherProfile: { screen: TeacherProfile },
  Batches: { screen: Batches },
}, StackConfig);

export const NavStackContainer = createAppContainer(NavStack);

const MainStack = createStackNavigator({
  AppSetup: { screen: AppSetup },
  Login: { screen: Login },
  Main: { screen: Main },
  StudentProfileEditing: { screen: StudentProfileEditing },
  Chat: { screen: Chat },
}, StackConfig);

const defaultGetStateForAction = MainStack.router.getStateForAction;

MainStack.router.getStateForAction = (action, state) => {
  // Prevent access to the 'goback' nav prop
  if (
    state
    && action.type === NavigationActions.BACK
    && (state.routes[state.index].routeName === 'AppSetup'
      || state.routes[state.index].routeName === 'Login'
      || state.routes[state.index].routeName === 'Main'
    )
  ) { return null; }

  return defaultGetStateForAction(action, state);
};

export const MainStackContainer = createAppContainer(MainStack);
