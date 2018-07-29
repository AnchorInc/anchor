import React from 'react';
import { TabNavigator, StackNavigator, NavigationActions, TabBarBottom } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  AppSetup,
  Chat,
  ChatsOverview,
  Classes,
  Batches,
  Login,
  Main,
  StudentProfile,
  StudentProfileEditing,
  TeacherProfile,
  TeacherProfileEditing,
  Search,
  Settings,
  BatchSettings,
} from '../components';

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
        case 'Batches':
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
  animationEnabled: false,
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

export const StudentTabs = TabNavigator({
  Classes: { screen: Classes },
  Search: { screen: Search },
  Settings: { screen: Settings },
}, TabNavigatorConfig);

export const TeacherTabs = TabNavigator({
  Batches: { screen: Batches },
  Settings: { screen: Settings },
}, TabNavigatorConfig);

const StackConfig = {
  navigationOptions: {
    header: null,
  },
  headerMode: 'none',
};

export const StudentStack = StackNavigator({
  Classes: { screen: StudentTabs },
  Search: { screen: StudentTabs },
  StudentProfile: { screen: StudentProfile },
  TeacherProfile: { screen: TeacherProfile },
  StudentProfileEditing: { screen: StudentProfileEditing },
  ChatsOverview: { screen: ChatsOverview },
  Chat: { screen: Chat },
  BatchSettings: { screen: BatchSettings },
}, StackConfig);

export const TeacherStack = StackNavigator({
  Batches: { screen: TeacherTabs },
  TeacherProfile: { screen: TeacherProfile },
  TeacherProfileEditing: { screen: TeacherProfileEditing },
  ChatsOverview: { screen: ChatsOverview },
  Chat: { screen: Chat },
  BatchSettings: { screen: BatchSettings },
}, StackConfig);

export const MainStack = StackNavigator({
  AppSetup: { screen: AppSetup },
  Login: { screen: Login },
  Main: { screen: Main },
  StudentProfileEditing: { screen: StudentProfileEditing },
  TeacherProfileEditing: { screen: TeacherProfileEditing },
  Chat: { screen: Chat },
}, StackConfig);

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
