import React from 'react';
import { TabNavigator, StackNavigator, NavigationActions, TabBarBottom } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Search, Chat } from '../components/screens';
import Classes from '../components/screens/Classes';
import Settings from '../components/screens/Settings';
import AppSetup from '../components/screens/AppSetup';
import Main from '../components/screens/Main';
import Login from '../components/screens/Login';
import Profile from '../components/screens/Profile';
import TeacherProfile from '../components/screens/TeacherProfile';
import TeacherSetup from '../components/screens/TeacherSetup';
import ProfileEditing from '../components/screens/ProfileEditing';
import ChatsOverview from '../components/screens/ChatsOverview';

import { colors } from '../config';

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
      return (
        <Icon
          size={22}
          name={iconName}
          color={focused ? colors.secondary.normal : colors.other.bbIconNormal}
        />
      );
    },
  }),
  animationEnabled: true,
  tabBarComponent: TabBarBottom,
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
  Search: { screen: Tabs },
  Profile: { screen: Profile },
  TeacherProfile: { screen: TeacherProfile },
  ProfileEditing: { screen: ProfileEditing },
  TeacherSetup: { screen: TeacherSetup },
  ChatsOverview: { screen: ChatsOverview },
  Chat: { screen: Chat },
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
  Main: { screen: Main },
  ProfileEditing: { screen: ProfileEditing },
  TeacherSetup: { screen: TeacherSetup },
}, MainStackConfig);

const defaultGetStateForAction = MainStack.router.getStateForAction;

MainStack.router.getStateForAction = (action, state) => {
  // Prevent access to the 'goback' nav prop
  if (
    state &&
    action.type === NavigationActions.BACK &&
    (state.routes[state.index].routeName === 'AppSetup' ||
      state.routes[state.index].routeName === 'Login' ||
      state.routes[state.index].routeName === 'Main'
    )
  ) { return null; }

  return defaultGetStateForAction(action, state);
};
