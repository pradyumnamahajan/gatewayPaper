/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './shim.js'
import crypto from 'crypto'
AppRegistry.registerComponent(appName, () => App);
