import { AppRegistry } from 'react-native';
import Init from './app/Init';

global.Buffer = global.Buffer || require('buffer').Buffer;

AppRegistry.registerComponent('anchor', () => Init);
