import { NavigationComponent } from 'react-native-material-bottom-navigation';
import { TabNavigator } from 'react-navigation';
import Activities from '../screens/Activities';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Settings from '../screens/Settings';

const BarBackgroundColor = '#efefef';

const BottomBar = TabNavigator({
  Home: { screen: Home },
  Activities: { screen: Activities },
  Search: { screen: Search },
  Settings: { screen: Settings },
}, {
  tabBarComponent: NavigationComponent,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  elevation: 15,
  tabBarOptions: {
    bottomNavigationOptions: {
      labelColor: '#01152d',
      rippleColor: '#01152d',
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
