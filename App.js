/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


/************************************
 * React Ntive Test START
 ************************************/
// import React from 'react';
import Repro from 'react-native-repro';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

import React, { useEffect } from 'react';
import { Alert } from 'react-native';
// import messaging, { 
//   FirebaseMessagingTypes.RemoteMessage 
// } from '@react-native-firebase/messaging';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

console.log('Hello hoge');
Repro.track("user review hoge", { rating: 3 })
Repro.getDeviceID((error, deviceID) => {
  console.log('deviceID=' + deviceID)
});

if (firebase.apps.length === 0) {
  const instance = firebase.initializeApp({
    appId: '1:816137118864:android:91403311a77da0b6f12415',
    messagingSenderId: '816137118864',
    projectId: 'test-app-android-4c9bf',
    storageBucket: '',
    apiKey: 'repro-react-native-sample',
    databaseURL: ''
  });
}

requestUserPermission();

//トークンの取得
const token: string = messaging().getToken();//await
console.log('token=' + JSON.stringify(token));

//トークンリフレッシュ
// messaging().onTokenRefresh((token: string) => {
//   // トークンリフレッシュ時の処理
// });

// 起動中のメッセージ受信
// const unsubscribeMessage = messaging().onMessage((
//   message: messaging.FirebaseMessagingTypes.RemoteMessage
// ) => {
//   console.log('起動中メッセージ受信コールバック')
// });

// プッシュ通知をタップしてバックグラウンドから復帰した際の処理
// const unsubscribeNotificationOpenedApp = messaging().onNotificationOpenedApp((
//   message: FirebaseMessagingTypes.RemoteMessage
// ) => {
//   console.log('バックグラウンド中メッセージ受信コールバック')
// });

//setBackgroundMessageHandler が動作しないのを確かめる？

/************************************
 * React Ntive Test END
 ************************************/

const App: () => React$Node = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
