import { AppRegistry } from 'react-native';
import App from './app/App';

global.Buffer = global.Buffer || require('buffer').Buffer;

AppRegistry.registerComponent('anchor', () => App);
