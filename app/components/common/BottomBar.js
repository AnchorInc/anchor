import { NavigationComponent } from 'react-native-material-bottom-navigation';
import { TabNavigator } from 'react-navigation';
import Activities from '../screens/Activities';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Settings from '../screens/Settings';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BarBackgroundColor = '#efefef';

const BottomBar = TabNavigator({
  Home: { screen: Home },
  Activities: { screen: Activities },
  Search: { screen: Search },
  Settings: { screen: Settings },
}, {
  tabBarComponent: NavigationComponent,
  transitions: false,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  tabBarOptions: {
    bottomNavigationOptions: {
      labelColor: '#01152d',
      rippleColor: '#01152d',
      shifting: true,
      tabs: {
        Home: {
          barBackgroundColor: BarBackgroundColor,
        },
        Search: {
          barBackgroundColor: BarBackgroundColor,
        },
        Activities: {
          barBackgroundColor: BarBackgroundColor,
        },
        Settings: {
          barBackgroundColor: BarBackgroundColor,
        },
      },
    },
  },
});

export default BottomBar;
