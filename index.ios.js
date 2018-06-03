import { AppRegistry } from 'react-native';
import Buffer from 'buffer';

import App from './app/index';

global.Buffer = global.Buffer || Buffer.Buffer;

AppRegistry.registerComponent('anchor', () => App);
