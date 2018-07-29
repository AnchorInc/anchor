import { AppRegistry } from 'react-native';
import App from './app/index';
import { backgroundMessageListener, backgroundActionHandler } from './app/cloudmessaging';

AppRegistry.registerComponent('anchor', () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => backgroundMessageListener);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundNotificationAction', () => backgroundActionHandler);
