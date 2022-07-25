/**
 * @format
 */
import {AppRegistry} from 'react-native';//Add
import messaging from '@react-native-firebase/messaging';//Add
import App from './App';
import {name as appName} from './app.json';

//Add
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('ここがsetBackgroundMessageHandlerです2', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);